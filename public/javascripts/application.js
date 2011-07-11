$(
    function (){
      // =?  is an odd syntax, but it works...
      jQuery.getJSON("http://twitter.com/statuses/user_timeline/robacarp.json?callback=?",
        function(data){
          $('#tweet').html( data[0].text );
          $('#social').slideDown();
        });
    }
);

