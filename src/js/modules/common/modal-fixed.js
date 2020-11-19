/****************************************************

  - Usage
  const ModalFixed = require('./modules/common/modal-fixed').default;

****************************************************/

export default class ModalFixed {
  constructor(modal, open, close, {modalInner = null, closeTime = 100}) {
    this._windowPageY = 0;

    this._body = document.body;
    this._modal = modal;
    this._modalInnerScroll = modalInner;
    this._closeTime = closeTime;

    this._init();

    for (var i = 0; i < open.length; i++) {
      open[i].addEventListener(
        "click",
        e => {
          this._open();
        },
        false
      );
    }
    for (var i = 0; i < close.length; i++) {
      close[i].addEventListener(
        "click",
        e => {
          this._close();
        },
        false
      );
    }
  }

  _init() {
    this._modal.style.position = "fixed";
    this._modal.style.left = 0;
    this._modal.style.top = 0;
    this._modal.style.width = "100%";
    this._modal.style.height = "100%";
  }

  _open() {
    this._windowPageY = window.pageYOffset;
    this._modal.classList.add("on");
    this._body.style.position = "fixed";
    this._body.style.overflow = "hidden";
    this._body.style.top = 0;
    this._body.style.left = 0;
    this._body.style.bottom = 0;
    this._body.style.right = 0;
    this._body.style.marginTop = `${this._windowPageY * -1}px`;
  }

  _close() {
    this._modal.classList.remove("on");
    setTimeout(() => {
      this._body.style.position = "static";
      this._body.style.overflow = "";
      this._body.style.top = "auto";
      this._body.style.left = "auto";
      this._body.style.bottom = "auto";
      this._body.style.right = "auto";
      this._body.style.marginTop = 0;
      scrollTo(0, this._windowPageY);

      // モーダルのの中身をTOPに戻す
      if (this._modalInnerScroll != null) {
        this._modalInnerScroll.scrollTo(0, 0);
      }
    }, this._closeTime);
  }
}
