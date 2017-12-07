---
title: Ruby 2.2.2 Splat Bug
date: 2016-12-01 14:41:00 -0700
tags: ruby
imported-from: gist
gist-url: https://gist.github.com/robacarp/11aed78575b7b78db1b718016497f6aa
layout: post
---

Ruby 2.2.2 contains a nasty bug around passing a hash with keys that are symbolized strings to a method. A coworker and I stumbled onto this trap and wrote this proof before finding a bug report on ruby-lang.

The essence of the bug is that when you start with a hash which has string keys, symbolize those keys, and splat that hash into a method parameter, the receiver will not always get all the intended parameters.

    # require 'byebug'
    puts "ruby -v is #{RUBY_VERSION} but should be '2.2.2'" unless RUBY_VERSION == '2.2.2'

    class Hash
      def symbolize_keys
        dup = self.class.new

        each_key do |key|
          dup[ key.to_sym ] = self[key]
        end

        dup
      end
    end

    class MagicDance
      def initialize
        @rolled_back = false
      end

      def dance(one:, two:, **splat)
        puts "#{two} #{one}"
        puts splat
      end

      def one
        # ============================
        # Buggy, but only when it's by itself in the method:
        splat = { "three" => :anything }.symbolize_keys
        GC.start # fixes it
        dance two: :not, one: :broken, **splat

        # ============================

        # Uncomment to see above statement succeed
        # dance two: :not, one: :broken, **{ three: :anything }

        # ============================

        # Uncomment to see above statement succeed
        # dance two: :not, one: :broken, three: :anything
      end

      # Even in different methods!
      # Uncomment to see above statement succeed
      # def two
      #   dance two: :not, one: :broken, **{ three: :anything }
      # end
    end

    MagicDance.new.one
