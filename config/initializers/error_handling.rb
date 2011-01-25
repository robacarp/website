# helps render custom 404s in rails 3.0.
#

require 'action_dispatch/middleware/show_exceptions'

module ActionDispatch
  class ShowExceptions
    private
      def render_exception_with_template(env, exception)
        request = Request.new(env)

        #don't hide errors in development environments
        if @consider_all_requests_local || request.local?
          super
        end
        body = ErrorsController.action(rescue_responses[exception.class.name]).call(env)
        log_error(exception)
        body
      rescue
        render_exception_without_template(env, exception)
      end

      #makes render_exception => render_exception_with_template
      #  and render_exception_without_template => the original render_exception
      alias_method_chain :render_exception, :template
  end
end

