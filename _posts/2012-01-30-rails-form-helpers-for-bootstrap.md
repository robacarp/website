---
title: Rails3.1 Bootstrap html helpers
date: 2012-01-30 09:31:00 -0700
tags: ruby
layout: post
imported-from: gist
gist-url: https://gist.github.com/robacarp/1705296
category: dev
---

Working with Rails forms is usually a dream. They do the right thing, pretty much always. Similarly, working with Bootstrap is a dream. I don't fancy myself a designer and don't want to fuss with design elements. I just want it to look good enough.

Unfortunately, the two don't often mix well. Bootstrap is _verbose_ CSS classification, and very semantically opinionated html. When mixing with Rails 3 forms, the repeated verbosity makes me a little unsettled.

These files create a rails3 form helper style that emits Bootstrap html structure which is well decorated with Bootstraps CSS.

This started out as a gist but I can't seem to find the original.

    # A good place to save this file is:
    # /app/form_builders/bootstrap_form_builder.rb
    # It is probably the weakest link in this library between bootstrap and rails3.1
    # because you're always going to come across circumstances where its not doing
    # *quite* what you want. 
    #
    # As it stands now you'll have to write the form fields directly using rails'
    # form helpers as if you were outside of the context of a form_for in order
    # to get direct control over the field html being generated.
    class BootstrapFormBuilder < ActionView::Helpers::FormBuilder

      delegate :capture, :content_tag, :tag, to: :@template

      %w[text_field text_area password_field collection_select].each do |method_name|
        define_method(method_name) do |name, *args|
          options = args.extract_options!

          errors = object.errors[name].any?? 'error' : ''
          error_msg = object.errors[name].any?? content_tag(:span, object.errors[name].join(","), class: 'help-inline') : ''

          help_text =  options[:help_text].blank? ? '' : content_tag(:span,options[:help_text], class: 'help-block')
          label = options[:label] == '' ? ''.html_safe : field_label(name, options)
          if options[:large] || method_name == 'text_area'
            options[:class] = [options[:class]] || []
            options[:class].push 'xxlarge'
          end

          content_tag :div, class: "clearfix #{errors}" do
            #field_label(name, options) + content_tag(:div, class: "input#{errors}") do
            label + content_tag(:div, class: "input #{errors}") do
              super(name, *(args.push(options))) + ' ' + error_msg
            end + help_text
          end
        end
      end

      def check_box(name, *args)
        content_tag :div, class:"clearfix" do
          content_tag(:div, class:"input") do
            content_tag(:ul, class:"inputs-list") do
              content_tag(:li) do
                content_tag(:label) do
                  super(name, *args) + content_tag(:span) do
                    field_label(name, *args)
                  end
                end
              end
            end
          end
        end
      end

      def submit *args
        options = args.extract_options!
        args = args.push options

        if options[:clean]
          super *args
        else
          content_tag :div, class: :clearfix do
            content_tag :div, class: :input do
              super *args
            end
          end
        end

      end

    private

      def field_label(name, *args)
        options = args.extract_options!
        required = object.class.validators_on(name).any? { |v| v.kind_of? ActiveModel::Validations::PresenceValidator}
        label(name, options[:label], class: ("required" if required))
      end

      def objectify_options(options)
        super.except(:label)
      end

    end

Similarly, `will_paginate` is a great library for paginating ActiveRecord sets on index pages, but the syntax and style don't play well with Bootstrap's own pagination styles.

    # This file probably belongs in /app/helpers/bootstrap_pagination_helper.rb
    #
    # This is sort of a compilation of several gists I found while looking for 
    # something that was already written to do the job.
    #
    # A non-exhaustive list of gists which attempt to accomplish this and may or may
    # not have been used as a starting point for some or all of the code:
    #   - https://gist.github.com/1182136
    #   - https://gist.github.com/1205828

    module BootstrapPaginationHelper 
      class LinkRenderer < WillPaginate::ActionView::LinkRenderer
        protected

          def page_number(page)
            unless page == current_page
              link(page, page, :rel => rel_value(page))
            else
              link(page, "#", :class => 'active')
            end
          end

          def gap
            text = @template.will_paginate_translate(:page_gap) { '&hellip;' }
            %(<li class="disabled"><a>#{text}</a></li>)
          end

          def next_page
            num = @collection.current_page < @collection.total_pages && @collection.current_page + 1
            previous_or_next_page(num, @options[:next_label], 'next')
          end

          def previous_or_next_page(page, text, classname)
            if page
              link(text, page, :class => classname)
            else
              link(text, "#", :class => classname + ' disabled')
            end
          end

          def html_container(html)
            tag(:div, tag(:ul, html), container_attributes)
          end

        private

          def link(text, target, attributes = {})
            if target.is_a? Fixnum
              attributes[:rel] = rel_value(target)
              target = url(target)
            end

            unless target == "#"
              attributes[:href] = target
            end

            classname = attributes[:class]
            attributes.delete(:classname)
            tag(:li, tag(:a, text, attributes), :class => classname)
          end
      end
    end

In order to use these classes, you'll need to toss these methods in your `application_helper.rb`:

    # This is to be used instead of will_paginate's inbuilt view function and calls the BootstrapPaginationHelper
    def paginate *params
      params[1] = {} if params[1].nil?
      params[1][:renderer] = BootstrapPaginationHelper::LinkRenderer
      will_paginate *params
    end

    # This is to be used instead of form_for as a shortcut to calling BootstrapFormBuilder
    def bootstrapped_form object, options={}, &block
      options[:builder] = BootstrapFormBuilder
      form_for(object, options, &block)
    end
