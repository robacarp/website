(function($) {
  $.fn.getTweets = function() {
    $.getScript("http://twitter.com/javascripts/blogger.js");
    $.getJSON("http://twitter.com/statuses/user_timeline/robacarp.json?callback=?", function(data) {
      // remove preLoader from container element
      //$(pl).remove();
      $('#twitter').text(data[i].text);
      $(this).show();
    });
  };
})(jQuery);
