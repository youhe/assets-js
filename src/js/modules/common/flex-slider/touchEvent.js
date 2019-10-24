const THRESHOLD_X = 30;

export default class TouchEvent {

  constructor(app, wrap) {

    this._app = app;
    this._wrap = wrap;

    this._init();

    if (window.UserAgent.mobile) {
      this._wrap.addEventListener('touchstart',  (e)=> {this._start(e)}, false);
      this._wrap.addEventListener('touchmove',  (e)=> {this._move(e)},  false);
      this._wrap.addEventListener('touchend',    (e)=> {this._end(e)},   false);
    }

  }

  _init() {

    this.isAnimation = false;
    this.startX = -1;
    this.moveX = -1;
    this.moveDX = 0;

  }

  _start(e) {

    // e.preventDefault();

    this.isAnimation = true;
    this.startX = e.touches[0].pageX;

  }

  _move(e) {

    this.moveX = e.touches[0].pageX;

    const th = Math.abs(this.moveX - this.startX);
    if (7 <= th) {
      e.preventDefault();
    }

    this.moveDX = (this.moveX - this.startX) * 1.2;

  }

  _end(e) {

    if (this.startX != -1 && this.moveX != -1) {
      const x = this.moveDX;
      const itemW = this._app.itemElmW;
      const absX = Math.abs(x) + (itemW * 0.5);
      const count = Math.floor(absX / itemW);
      if (THRESHOLD_X < x) {
        this._app.prevItem(count);
      } else if (x < -THRESHOLD_X) {
        this._app.nextItem(count);
      } else {
        this._app.animationStart(null, 0);
      }
    }

    this._init();

  }

}
