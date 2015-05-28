// var Hammer = require("hammerjs");
//
// var ball = document.createElement('div');
// ball.style.backgroundColor = "Blue";
// ball.style.width = ball.style.height = "50px";
// ball.style.borderRadius = "25px";
// document.body.appendChild(ball);
//
// var hammertime = new Hammer(ball, {});
// hammertime.on('pan', function(ev) {
//     console.log(ev);
// });
var Framer = require("./js/framer");
var layer = new Layer({
  width: 100,
  height: 100,
  borderRadius: 50
})
layer.draggable.enabled = true
layer.center()
