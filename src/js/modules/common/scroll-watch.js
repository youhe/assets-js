/****************************************************
  - Usage
  require('./modules/common/scroll-watch');
****************************************************/

import boundRect from "./bound-rect.js";
const Mkai = require("./mkai");

class ScrollWatch {
  constructor() {
    this.instances = [];

    this.x = window.pageXOffset;
    this.y = window.pageYOffset;
    this.nX = 0;
    this.nY = 0;

    this.bodyBR = boundRect(document.body);
    this.scroll();

    setTimeout(() => {
      this.bodyBR = boundRect(document.body);
      this.scroll();
    }, 1000);

    window.ResizeWatch.register(this);

    window.addEventListener(
      "scroll",
      e => {
        this.scroll();
      },
      false
    );
  }

  scroll() {
    this.x = window.pageXOffset;
    this.y = window.pageYOffset;
    this.nX = this.x / (this.bodyBR.width - window.innerWidth);
    this.nY = this.y / (this.bodyBR.height - window.innerHeight);
    this.nX = Mkai.constrain(this.nX, 0.0, 1.0);
    this.nY = Mkai.constrain(this.nY, 0.0, 1.0);

    for (var i = 0, l = this.instances.length; i < l; i++) {
      this.instances[i].scroll();
    }
  }

  resize() {
    this.bodyBR = boundRect(document.body);
  }

  register(instance) {
    this.instances.push(instance);
  }
}

window.ScrollWatch = new ScrollWatch();
