require("../modules/common/user-agent");
require("../modules/common/resize-watch");
require("../modules/common/render-watch");

import EaseScroll from "../modules/common/ease-scroll/app.js";
import boundRect from "../modules/common/bound-rect.js";

export default function() {
  const eScroll = new EaseScroll();

  const nav = document.querySelectorAll(".js-nav");
  const sec = document.querySelectorAll(".js-sec");
  for (let i = 0; i < nav.length; i++) {
    nav[i].index = i;
    nav[i].addEventListener(
      "click",
      e => {
        const index = e.currentTarget.index;
        const br = boundRect(sec[index]);
        eScroll.move(br.fixTop - 40);
      },
      false
    );
  }

  const scrollBar = document.getElementById("js-scroll-bar");
  this.render = () => {
    scrollBar.style.transform = `scaleY(${eScroll.nY})`;
  };
  window.RenderWatch.register(this);
}
