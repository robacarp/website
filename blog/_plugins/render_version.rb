module Jekyll
  class VersionReporter < Generator
    def generate(site)
      filename = 'version.html'
      return unless Dir.exists? site.config["destination"]
      File.open(File.join(site.config["destination"], filename), 'w') do |f|
        f.write(generate_report(site))
      end
      site.pages << Page.new(site, site.dest, '/', filename)
    end

    private

    def generate_report(site)
      "Site generated with Jekyll version: #{Jekyll::VERSION}"
    end
  end
end
