require 'erb'

template = DATA.read
puts ERB.new(template).run

__END__

tracking_code: '<%= ENV["MY_SOUL"] %>'
