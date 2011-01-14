class ErrorsController < ApplicationController
  errors = {
    :not_found => "That page doesn't exist", 
    :internal_server_error => "Something is broken.  We're probably already fixing it."
  }


  #define methods for each of these errors
  errors.each do |error,msg|

    define_method error do
      if request.env['HTTP_REFERER']
        render :error, :alert => msg
      else
        render :error, :alert => msg
      end
    end

  end
end
