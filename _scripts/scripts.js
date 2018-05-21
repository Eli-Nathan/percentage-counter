// Set canvas size
var canvasSize = 200,
  // Set center point
  centre = canvasSize / 2,
  // Set circle radius
  radius = canvasSize * 0.8 / 2,
  // Define s as the Snap.svg svg
  s = Snap('#svg'),
  //Set path as empty string
  path = "",
  // Arc is the path
  arc = s.path(path),
  // Set start point
  startY = centre - radius,
  // Define elements: Button, Percent text and input
  runBtn = document.getElementById('run'),
  percDiv = document.getElementById('percent'),
  input = document.getElementById('input');
error = document.getElementById('error');
dontRun = false;

// Submit value if user presses enter key
input.addEventListener("keypress", function(event) {
  if (event.keyCode == 13) {
      runBtn.click();
    }
});

// On keyup save value of input
input.addEventListener("input", function() {
  if (isNaN(input.value)) {
    input.value = '';
  } else {
    if (input.value > 100) {
      dontRun = true;
      error.innerHTML = "Please enter a value between 0 and 100";
      runBtn.href = "javascript:void(0)";
    } else {
      dontRun = false;
      error.innerHTML = "";
    }
  }
});

// When clicking run button, fire run funtion and pass the value and divide by 100 to get percentage as a fraction
runBtn.addEventListener("click", function() {
  if (dontRun == true) {
    return false;
  } else {
    run(input.value / 100);
  }
});

// Run function
function run(percent) {
  // Set endpoint as the percent of 360
  var endpoint = percent * 360;
  if(endpoint == 360) {
    endpoint = 359.9;
  }
  // Fire snap event
  // 2 second animation
  Snap.animate(0, endpoint, function(val) {
    arc.remove();
      var d = val,
        dr = d - 90;
        radians = Math.PI * (dr) / 180,
        endx = centre - radius * Math.cos(radians),
        endy = centre + radius * Math.sin(radians),
        largeArc = d > 180 ? 1 : 0;
        if (d == 1) {
          path = "M100,20 A80,80 0 1,0 100.11880525121381,20.000088216846862";
        }
        else {
          path = "M" + centre + "," + startY + " A" + radius + "," + radius + " 0 " + largeArc + ",0 " + endx + ","   + endy;
        }

        arc = s.path(path);
        arc.attr({
          stroke: '#fff',
          fill: 'none',
          strokeWidth: 12
        });
        percDiv.innerHTML = Math.round(val / 360 * 100) + '%';


  }, 2000, mina.easeinout);
}

// Fire run event
run(input.value / 100);
