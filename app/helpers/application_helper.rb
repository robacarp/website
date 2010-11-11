module ApplicationHelper
  # Format text for display.
  def format(text)
    sanitize(markdown(text))
  end

  # Process text with Markdown.
  def markdown(text)
    BlueCloth::new(text).to_html
  end

  def title (text)
    content_for(:title) { " :: #{text}" }
  end

  def javascript(*files)
    content_for(:head) { javascript_include_tag(*files) }
  end

  def stylesheet(*files)
    content_for(:head) { stylesheet_link_tag(*files) }
  end

  def logged_in?
    authenticate_or_request_with_http_basic do |user,password|
      user=='robert' && password=='doom'
    end
  end
end
