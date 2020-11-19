require("../modules/common/user-agent");
require("../modules/common/resize-watch");
require("../modules/common/scroll-watch");
require("../modules/common/render-watch");

import ParallaxScroll from "../modules/common/parallax-scroll/index.js";

export default function() {
  window.RenderWatch.setFps(30);
  new ParallaxScroll();
}
