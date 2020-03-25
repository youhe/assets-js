/****************************************************
  - Usage
  import EaseScroll from "../modules/common/ease-scroll/app.js";
****************************************************/

const Mkai = require("../mkai");
const easeing = require("../easing");
import boundRect from "../bound-rect.js";

const MOVE_Y = 120;

export default class ParallaxScroll {
  constructor() {
    this._items = document.querySelectorAll(".js-prl-item");
    for (let i = 0; i < this._items.length; i++) {
      this._items[i].uData = {};
      this._items[i].uData.y = 0;
      this._items[i].uData.sub = this._items[i].dataset.sub
        ? Number(this._items[i].dataset.sub)
        : 0.2;
      this._items[i].uData.br = boundRect(this._items[i]);
    }

    window.ResizeWatch.register(this);
    window.ScrollWatch.register(this);
    window.RenderWatch.register(this);
  }

  scroll() {}

  render() {
    const pageY = window.ResizeWatch.height * 0.5 + window.ScrollWatch.y;

    let y = 0;
    for (let i = 0; i < this._items.length; i++) {
      const itemY =
        this._items[i].uData.br.height * 0.5 + this._items[i].uData.br.fixTop;
      y = Mkai.map(
        pageY - itemY,
        -window.ResizeWatch.height * 0.6,
        window.ResizeWatch.height * 0.5,
        -1,
        1
      );
      y = Mkai.clamp(y, -1, 1);
      y = y < 0 ? Math.pow(y, 10) : -Math.pow(y, 10);
      y = y * MOVE_Y;
      let distY = this._items[i].uData.y;
      distY += (y - distY) * this._items[i].uData.sub;
      this._items[i].style.transform = `matrix(1, 0, 0, 1, 0, ${distY})`;
      this._items[i].uData.y = distY;
    }
  }

  resize() {}
}
