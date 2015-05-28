require("./js/framer");
var sc = require("./js/soundcloud");

var scroller = new ScrollComponent({
  width: 300,
  height: 100,
  scrollVertical: false
})

var waveform = new Layer({
  superLayer: scroller.content,
  width: 640,
  height: 100,
  image: "images/waveform.png"
});

scroller.center();
