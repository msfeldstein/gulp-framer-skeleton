require("./js/framer");

# If you want to have a device frame when debugging in Chrome, use this
# If you just want full-screen prototypes, remove these lines
Framer.Device = new Framer.DeviceView();
Framer.Device.deviceType = "iphone-5s-silver-hand"
Framer.Device.deviceScale = 0.5;
Framer.Device.setupContext();

dots = []
['#4A90E2', '#B8E986', '#F73F56'].forEach (c, i) ->
  radius = 100
  dot = new Layer({
    x: Framer.Device.screen.width / 2 + radius * (-2 + i)
    width:radius * 2
    height: radius * 2
    backgroundColor: c
    borderRadius: radius
    opacity: 0
  })
  dots.push dot
  dot.on Events.Click, (e, layer) ->
    layer.animate
      properties:
        y: layer.y + 200
        opacity: 0
      time: .4

animate = () ->
  dots.forEach (dot, i) ->
    dot.centerY()
    animateTo = dot.y
    dot.y += 200
    dot.animate
      properties:
        y: animateTo
        opacity: 1
      time: .4
      delay: i * .2
setTimeout animate, 700
