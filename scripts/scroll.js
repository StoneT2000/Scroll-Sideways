var p0_timers = [];
$(document).on("ready",function(){
  $(document).scrollLeft(0)
  var halfW = window.innerWidth;
  halfW/=2
  halfW-=150;
  $("#p0").css("left",halfW + "px");
  
  var last_known_scroll_position = 0;
  var prev_scroll_pos = 0;
  var ticking = false;
  var timer = 0;
  
  var left_break_stage = 0;
  function doSomething(scroll_pos) {
    // do something with the scroll position
    if (scroll_pos >= halfW+180){
      //$("#p0 p").css("display","block");
      for (var i = 0; i< p0_timers.length; i++){
        //console.log("clear!")
        clearInterval(p0_timers[i]);
        if (i == p0_timers.length-1){
          p0_timers = [];
        }
      }
    } 
    //console.log(scroll_pos)
    if (left_break_stage >= 0){
      if (scroll_pos + 5 <= prev_scroll_pos && scroll_pos == 0){
        //Scrolling left...
        //console.log("hit left side")
        if (left_break_stage == 0){
          $(".container").css("margin-left","50px");
          //$("body").css("width","43650px");
          left_break_stage ++;
        }
        else if (left_break_stage == 1){
          left_break_stage ++;
          $(".container").css("margin-left","100px");
        }
        else if (left_break_stage == 2){
          $(".container").css("margin-left","5200px");
          $(document).scrollLeft(4600)
          //$("body").css("overflow","hidden")
          //window.setTimeout(function(){$("body").css("overflow","")},200);
          //Break left wall
          left_break_stage ++;
        }
        
      }
    }
  }

  //Listen for scrolling
  window.addEventListener('scroll', function(e) {
    prev_scroll_pos = last_known_scroll_position;
    last_known_scroll_position = window.scrollX;

    if (!ticking) {

      window.requestAnimationFrame(function() {
        doSomething(last_known_scroll_position);
        ticking = false;
      });

      ticking = true;

    }

  });
  
  
  
  //Specific timing

  //store last index0
  var pindex0 = 0;
  p0_timers.push(window.setTimeout(function(){
    if (last_known_scroll_position < halfW+180){
      $("#p0 p").css("display","block");
    }
  },5000));
  p0_timers.push(window.setTimeout(function(){
    if (last_known_scroll_position < halfW+180){
      $("#p0 p").text("(Seriously this site has no meaning if you don't scroll right.)");
    }
  },10000));
  p0_timers.push(window.setTimeout(function(){
    if (last_known_scroll_position < halfW+180){
      $("#p0 p").text("(Wow do you just want to see me talk instead of exploring???)");
    }
  },15000));
  p0_timers.push(window.setTimeout(function(){
    if (last_known_scroll_position < halfW+180){
      $("#p0 p").text("(So be it then... just click this to one-way talk to me.)");
    }
    $("#p0 p").css("cursor","pointer");
    $("#p0 p").on("click", function(){
      var index0 = Math.round(Math.random(0,1)*(messages0.length - 1));
      if (index0 == pindex0){
        index0++;
        index0 = index0 % messages0.length
      }
      pindex0 = index0;
      $("#p0 p").text("(" + messages0[index0] +")")
    });
  },20000));
  //$("#rating").on("click", );
  jQuery('img.svg').each(function(){
    var $img = jQuery(this);
    var imgID = $img.attr('id');
    var imgClass = $img.attr('class');
    var imgURL = $img.attr('src');

    jQuery.get(imgURL, function(data) {
        // Get the SVG tag, ignore the rest
        var $svg = jQuery(data).find('svg');

        // Add replaced image's ID to the new SVG
        if(typeof imgID !== 'undefined') {
            $svg = $svg.attr('id', imgID);
        }
        // Add replaced image's classes to the new SVG
        if(typeof imgClass !== 'undefined') {
            $svg = $svg.attr('class', imgClass+' replaced-svg');
        }

        // Remove any invalid XML tags as per http://validator.w3.org
        $svg = $svg.removeAttr('xmlns:a');

        // Replace image with new SVG
        $img.replaceWith($svg);

    }, 'xml');  
  });
})

function parseRating(){
    var orig = $("#ratingInput").val();
    var rating = parseFloat($("#ratingInput").val());
    var resthtml = "<input id=\"ratingInput\" style=\"height:50px;text-align: center;margin-top: 20px;\" type=\"text\" placeholder=\"1-10\"><div id=\"rating\" style=\"background-color:deepskyblue;color:white;margin-top:20px;cursor:pointer;\" onclick=\"parseRating()\">Submit</div>"
    if (!isNaN(rating)){
      if (rating <1){
        $("#ratingFeedback").html("You know what 1-10 means right..." + resthtml);
      }
      else if (rating <= 2){
        $("#ratingFeedback").html("Pretty accurate rating" + resthtml);
      }
      else if (rating <= 4){
        $("#ratingFeedback").html("Huh, a little high don't you think?" + resthtml);
      }
      else if (rating <=6){
        $("#ratingFeedback").html("Wow. That high? Either you like useless stuff or you gave a higher rating to see what I had to say" + resthtml);
      }
      else if (rating <=8){
        $("#ratingFeedback").html("A rating of 1 means extremely pointless, you know that right?" + resthtml)
      }
      else if (rating<=10){
        $("#ratingFeedback").html("So if you gave a site this rating, you are basically saying this site is one of the most useful and meaningful sites in the world? I don't believe you." + resthtml);
      }
      else if (rating > 10){
        $("#ratingFeedback").html("You know what 1-10 means right..." + resthtml);
      }
      $("#ratingInput").val(rating);
    }
    else {
      $("#ratingFeedback").html("From 1-10, how pointless is this site? Be honest." + resthtml);
      $("#ratingInput").val(orig);
    }
  
    
}