require 'bundler'
Bundler.setup

require 'static_serve'

run Static::Rack.new(
  path: '_site',
  mime_map: {
    gif: 'image/gif',
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    css: 'text/css'
  }
)
