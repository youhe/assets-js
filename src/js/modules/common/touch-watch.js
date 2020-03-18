/****************************************************
 ****************************************************/

import boundRect from "./bound-rect.js";
const Mkai = require("./mkai.js");

export default class TouchMoveWatch {
  constructor(instance, target) {
    this._instance = instance;
    this._target = target;

    this._br = boundRect(this._target);

    this._sX = 0;
    this._sY = 0;

    this._mX = 0;
    this._mY = 0;

    if (window.UserAgent.pc) return;

    this._target.addEventListener(
      "touchstart",
      e => {
        this._touchstart(e);
      },
      false
    );
    this._target.addEventListener(
      "touchmove",
      e => {
        this._touchmove(e);
      },
      false
    );
    this._target.addEventListener(
      "touchend",
      e => {
        this._touchend(e);
      },
      false
    );
  }

  _touchstart(e) {
    this._sX = Mkai.map(
      e.touches[0].pageX,
      this._br.left,
      this._br.width + this._br.left,
      -1,
      1
    );
    this._sX = Mkai.constrain(this._sX, -1, 1);

    this._sY = Mkai.map(
      e.touches[0].pageY,
      this._br.top,
      this._br.height + this._br.top,
      -1,
      1
    );
    this._sY = Mkai.constrain(this._sY, -1, 1);

    this._instance.touchstart({ x: this._sX, y: this._sY });
  }

  _touchmove(e) {
    this._mX = Mkai.map(
      e.touches[0].pageX,
      this._br.left,
      this._br.width + this._br.left,
      -1,
      1
    );
    this._mX = Mkai.constrain(this._mX, -1, 1);

    this._mY = Mkai.map(
      e.touches[0].pageY,
      this._br.top,
      this._br.height + this._br.top,
      -1,
      1
    );
    this._mY = Mkai.constrain(this._mY, -1, 1);

    this._instance.touchmove({ x: this._mX, y: this._mY });
  }

  _touchend(e) {
    this._instance.touchend({
      sX: this._sX,
      sY: this._sY,
      mX: this._mX,
      mY: this._mY
    });

    this._sX = 0;
    this._sY = 0;

    this._mX = 0;
    this._mY = 0;
  }
}
