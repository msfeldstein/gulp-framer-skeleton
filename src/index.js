require("./js/framer");
Framer.Device = new Framer.DeviceView();
Framer.Device.deviceType = "iphone-5s-silver-hand"
Framer.Device.setupContext();

c1 = new Layer({
  width:100,
  height: 100,
  backgroundColor: "blue",
  borderRadius: 50
})
