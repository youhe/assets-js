/****************************************************
  - Usage
  import EaseScroll from "../modules/common/ease-scroll/app.js";
****************************************************/

const Mkai = require("../mkai");
import boundRect from "../bound-rect.js";

const WIDTH_SP = 767;

export default class EaseScroll {
  constructor() {
    this.body = document.getElementById("js-es-body");
    this.bodyBR = boundRect(this.body);

    this.wdY = 0;
    this.wPw = 0;
    this.tY = 0;
    this.y = 0;
    this.maxY = this.bodyBR.height - window.ResizeWatch.height;
    this.maxYHalf = this.maxY * 0.5;

    if (WIDTH_SP < window.ResizeWatch.width) {
      this.mode = "pc";
      this.body.addEventListener("wheel", e => {
        e.preventDefault();
        this.wheel(e);
      });
    } else {
      this.mode = "sp";
    }

    window.ResizeWatch.register(this);
    window.RenderWatch.register(this);
  }

  wheel(e) {
    this.wdY = e.deltaY;
    this.wPw += e.deltaY < 0 ? -0.5 : 0.5;
  }

  resize() {
    this.bodyBR = boundRect(this.body);
    this.maxY = this.bodyBR.height - window.ResizeWatch.height;
    this.maxYHalf = this.maxY * 0.5;

    if (WIDTH_SP < window.ResizeWatch.width) {
      if (this.mode == "sp") {
        window.location.href = location.href;
      }
      this.mode = "pc";
    } else {
      if (this.mode == "pc") {
        window.location.href = location.href;
      }
      this.mode = "sp";
    }
  }

  render() {
    this.wdY *= 0.9;
    this.wPw *= 0.8;

    let power = Math.pow(
      Math.abs(this.tY - this.maxYHalf) / this.maxYHalf,
      20.0
    );
    power = Mkai.map(power, 1, 0, 0.05, 0.9);

    this.tY += this.wdY * power + this.wPw;
    this.tY = Mkai.constrain(this.tY, 0, this.maxY);

    this.y += (this.tY - this.y) * 0.3;

    this.body.style.transform = `translate3D(0, ${this.y * -1}px, 0)`;
  }
}
