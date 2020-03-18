export default class Accordion {
  constructor(elm) {
    this._open = elm.querySelector(".js-accordion-open");
    this._contents = elm.querySelector(".js-accordion-contents");
    this._contentsWrap = elm.querySelector(".js-accordion-contents-wrap");

    this._contents.style.height = 0;
    this._contents.style.overflow = "hidden";
    this._contents.style.transition = "height .3s ease 0s";

    this._isAnimate = false;

    this._addEvent();
  }

  _addEvent() {
    this._open.addEventListener(
      "click",
      () => {
        if (this._isAnimate) return;
        this._isAnimate = true;
        setTimeout(() => {
          this._isAnimate = false;
        }, 400);
        this._toggle();
      },
      false
    );
  }

  _toggle() {
    if (this._contents.classList.contains("on")) {
      // off
      this._open.classList.remove("on");
      this._contents.classList.remove("on");
      this._contents.style.height = this._getContentsHeight();
      setTimeout(() => {
        this._contents.style.willChange = "height";
        this._contents.style.height = 0;
      }, 100);
      setTimeout(() => {
        this._contents.style.willChange = "";
      }, 500);
    } else {
      // on
      this._open.classList.add("on");
      this._contents.classList.add("on");
      this._contents.style.willChange = "height";
      this._contents.style.height = this._getContentsHeight();
      setTimeout(() => {
        this._contents.style.height = "auto";
        this._contents.style.willChange = "";
      }, 400);
    }
  }

  _getContentsHeight() {
    return `${this._contentsWrap.getBoundingClientRect().height}px`;
  }
}
