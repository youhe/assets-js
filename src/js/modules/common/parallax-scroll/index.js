/****************************************************
  - Usage
  import EaseScroll from "../modules/common/ease-scroll/app.js";
****************************************************/

const Mkai = require("../mkai");
const easeing = require("../easing");
import boundRect from "../bound-rect.js";

const MOVE_Y = 120;
const SUB_Y = 0.5;

export default class ParallaxScroll {
  constructor() {
    this.direction = 1;

    this._items = document.querySelectorAll(".js-prl-item");
    for (let i = 0; i < this._items.length; i++) {
      this._items[i].uData = {};
      this._items[i].uData.y = 0;
      this._items[i].uData.br = boundRect(this._items[i]);
    }

    window.ResizeWatch.register(this);
    window.ScrollWatch.register(this);
    window.RenderWatch.register(this);
  }

  scroll() {
    if (this.scrollY < window.ScrollWatch.y) {
      this.direction = 1;
    } else {
      this.direction = -1;
    }
    this.scrollY = window.ScrollWatch.y;
  }

  render() {
    const pageY = window.ResizeWatch.height * 0.5 + window.ScrollWatch.y;

    let y = 0;
    for (let i = 0; i < this._items.length; i++) {
      const itemY =
        this._items[i].uData.br.height * 0.5 + this._items[i].uData.br.fixTop;
      y = Mkai.map(
        pageY - itemY,
        -window.ResizeWatch.height * 0.5,
        window.ResizeWatch.height * 0.5,
        0,
        1
      );
      // y = Math.pow(y, 2);
      // y = easeing.easeOutExpo(y);
      y = y * 2 - 1;
      y = y * MOVE_Y;
      y = Mkai.clamp(y, -MOVE_Y, MOVE_Y);
      let distY = this._items[i].uData.y;
      distY += (y - distY) * SUB_Y;
      this._items[i].style.transform = `matrix(1, 0, 0, 1, 0, ${distY})`;
      this._items[i].uData.y = distY;
    }

    // this.wdY *= 0.9;
    // this.wPw *= 0.8;
    // let power = Math.pow(
    //   Math.abs(this.tY - this.maxYHalf) / this.maxYHalf,
    //   20.0
    // );
    // power = Mkai.map(power, 1, 0, 0.05, 0.9);
    // this.tY += this.wdY * power + this.wPw;
    // this.tY = Mkai.constrain(this.tY, 0, this.maxY);
    // this.y += (this.tY - this.y) * REF_Y;
    // this.y = Mkai.floor(this.y, 0.001);
    // this.nY = this.y / this.maxY;
    // this.body.style.transform = `translate3D(0, ${this.y * -1}px, 0)`;
  }

  resize() {
    // this.bodyBR = boundRect(this.body);
    // this.maxY = this.bodyBR.height - window.ResizeWatch.height;
    // this.maxYHalf = this.maxY * 0.5;
    // if (WIDTH_SP < window.ResizeWatch.width) {
    //   if (this.mode == "sp") {
    //     window.location.href = location.href;
    //   }
    //   this.mode = "pc";
    // } else {
    //   if (this.mode == "pc") {
    //     window.location.href = location.href;
    //   }
    //   this.mode = "sp";
    // }
  }
}
