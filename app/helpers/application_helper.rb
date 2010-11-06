module ApplicationHelper
  # Format text for display.
  def format(text)
    sanitize(markdown(text))
  end

  # Process text with Markdown.
  def markdown(text)
    BlueCloth::new(text).to_html
  end

  def logged_in?
    authenticate_or_request_with_http_basic do |user,password|
      user=='robert' && password=='doom'
    end
  end
end
