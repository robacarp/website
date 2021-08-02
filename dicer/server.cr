require "http/server"
require "json"

require "./word_list"

port = 8080

class Router
  include HTTP::Handler

  def initialize
    @matches = {} of String => Proc(HTTP::Request, Tuple(String, String))
  end

  def call(context)
    if route = @matches[context.request.path]?
      mime_type, body = route.call(context.request)
      context.response.content_type = mime_type
      context.response.print body
    else
      call_next context
    end
  end

  def on(path : String, &block : HTTP::Request -> Tuple(String, String)) : Nil
    @matches[path] = block
  end
end

router = Router.new
router.on("/new_dice.json") do |request|
  count = request.query_params["count"]?
  count = count.to_i? if count
  count ||= 1
  count = 100 if count > 100
  count = 1 if count < 1

  results = {
    _meta: {
      "don't use this": "as a password",
      entropy: Dicer::WordList::Entropy,
      guess_count: Dicer::WordList::GuessCount
    },
    chosen: Array(Int32).new(count, 0).map { Dicer::WordList.choose }
  }

  { "application/json", results.to_json }
end

server = HTTP::Server.new([
  HTTP::LogHandler.new(Log.for("http.server")),
  HTTP::ErrorHandler.new,
  router
]) do |context|
  context.response.content_type = "text/html"
  context.response.status = HTTP::Status::NOT_FOUND
  context.response.print "<strong>Not found.</strong>"
end

address = server.bind_tcp port

puts "Crystal is listening on #{port}"
server.listen
