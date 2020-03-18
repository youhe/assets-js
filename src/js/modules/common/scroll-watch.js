/****************************************************
  - Usage
  require('./modules/common/scroll-watch');
****************************************************/

import boundRect from "./bound-rect.js";
const Mkai = require("./mkai");

class ScrollWatch {
  constructor() {
    this._instances = [];

    this.x = window.pageXOffset;
    this.y = window.pageYOffset;
    this.nX = 0;
    this.nY = 0;

    this._bodyBR = boundRect(document.body);
    this._scroll();

    setTimeout(() => {
      this._bodyBR = boundRect(document.body);
      this._scroll();
    }, 1000);

    window.ResizeWatch.register(this);

    window.addEventListener(
      "scroll",
      e => {
        this._scroll();
      },
      false
    );
  }

  _scroll() {
    this.x = window.pageXOffset;
    this.y = window.pageYOffset;
    this.nX = this.x / (this._bodyBR.width - window.innerWidth);
    this.nY = this.y / (this._bodyBR.height - window.innerHeight);
    this.nX = Mkai.constrain(this.nX, 0.0, 1.0);
    this.nY = Mkai.constrain(this.nY, 0.0, 1.0);

    for (var i = 0, l = this._instances.length; i < l; i++) {
      this._instances[i].scroll();
    }
  }

  resize() {
    this._bodyBR = boundRect(document.body);
  }

  register(instance) {
    this._instances.push(instance);
  }
}

window.ScrollWatch = new ScrollWatch();
