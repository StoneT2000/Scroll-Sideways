var cWidth = window.innerWidth;
var cHeight = window.innerHeight;
var count = 0;
var ids = [];
var maxParticles = 100;
var smokeTimer;
var colorC = false;
var waterHeight = 150;
$(document).on("ready", function(){
  var test = 0;
  repeatSmoke(50);
  //The above tiemout must be such that at any one time, max Particles is 10
  $(".cup").bind("touchstart mousedown", function(e){
    var offsetx = ($(".container").height()/2 - 4);
    var posx = e.pageY - offsetx + 95;
    var percent = 200- posx;
    if (percent < 10){
      percent = 10;
    }
    else if (percent >= 180){
      percent = 180;
    }
    setWaterHeight(percent);
  });
});

function createSmoke(offx,offy){

  var ox = 0;
  var oy = 0;
  if (offx){
    ox = offx;
  }
  if (offy){
    oy = offy;
  }
  var thiscount = count;
  count ++;
  var randomx = Math.round (Math.random(0,1) * 400) - 200;
  //randomx = 0;
  //ox = randomx;
  var randomAngle = Math.round(Math.random(0,1)*600 -300);
  //randomAngle = 0;
  $("#waterglass").append("<div class=\"smoke\" id=\"smoke" + thiscount + "\"></div>")
  $("#smoke" + thiscount).css("transform","translate(" + ox +"px," + oy +"px) rotate(0deg)");
  ids.push(thiscount);
  window.setTimeout(function(){
    var smokeE = $("#smoke" + ids[ids.length-1]);
    smokeE.css("transform","translate(" + randomx +"px,-300px) rotate(" + randomAngle + "deg)");
    smokeE.css("opacity","0");
    var rand = Math.random(0,1)*20 + 20
    smokeE.css("width", rand +"px");
    smokeE.css("height",rand +"px");
    
  }, 100);
  window.setTimeout(function(){
    $("#smoke" + ids[0]).remove();

    ids.shift();
    if (count > maxParticles){
      count = 0;
    }
  }, 4000);
  
}
function changeWaterColor(arg){
  if (arg == 0){
    $("#water").css("background-color","deepskyblue");
    $("#watert").css("border","2px dashed");
    $("#watert").css("color","deepskyblue");
    $("#coffeet").css("border","none");
    $("#coffeet").css("color","inherit");
  }
  else if (arg == 1){
    $("#water").css("background-color","rgba(222, 184, 135, 1)"); 
    $("#watert").css("border","none");
    $("#watert").css("color","inherit");
    $("#coffeet").css("border","2px dashed");
    $("#coffeet").css("color","rgba(222, 184, 135, 1)");
  }
}
function toggleFullScreen() {
  if (!document.fullscreenElement &&    // alternative standard method
      !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement ) {  // current working methods
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) {
      document.documentElement.msRequestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
      document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
}

function repeatSmoke(offy){
  var timeOut = Math.random(0,1)*400 + 150;
  smokeTimer = window.setTimeout(function(){
    createSmoke(-20, offy);
    repeatSmoke(offy);
  }, timeOut)
}

function setWaterHeight(height){
  var displace = 190 - height;
  //change css for water and start pos of smoke
  $("#water").css("height",height+"px");
  $("#water").css("transform","translate(-50%," + displace + "px)");
  clearTimeout(smokeTimer);
  repeatSmoke(displace+10);
}