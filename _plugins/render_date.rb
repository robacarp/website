class RenderDate < Jekyll::Generator
  def generate site
    site.data["yolo_time"] = Time.now.strftime "%c"
  end
end
