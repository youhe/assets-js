require("../modules/common/user-agent");
require("../modules/common/resize-watch");
require("../modules/common/render-watch");

import EaseScroll from "../modules/common/ease-scroll/app.js";

export default function() {
  const easeScroll = new EaseScroll();

  const nav = document.querySelectorAll(".js-nav");
  const sec = document.querySelectorAll(".js-sec");
  for (let i = 0; i < nav.length; i++) {
    nav[i].index = i;
    nav[i].addEventListener(
      "click",
      e => {
        const index = e.currentTarget.index;
        easeScroll.move(sec[index]);
      },
      false
    );
  }
}
