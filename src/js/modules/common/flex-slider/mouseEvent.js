const THRESHOLD_X = 50;

export default class MouseEvent {

  constructor(app, wrap, slideItems) {

    this._app = app;
    this._wrap = wrap;
    this._slideItems = slideItems;

    this._init();

    this._wrap.addEventListener('mousedown',  (e)=> {this._start(e)}, false);
    this._wrap.addEventListener('mousemove',  (e)=> {this._move(e)},  false);
    this._wrap.addEventListener('mouseup',    (e)=> {this._end(e)},   false);
    this._wrap.addEventListener('mouseleave', (e)=> {this._end(e)},   false);

  }

  _init() {

    this.isAnimation = false;
    this.startX = -1;
    this.moveX = -1;
    this.moveDX = 0;

  }

  _start(e) {

    e.preventDefault();

    this.isAnimation = true;
    this.startX = e.clientX;

  }

  _move(e) {

    e.preventDefault();

    if (this.isAnimation) {
      this.moveX = e.clientX;
      this.moveDX = (this.moveX - this.startX) * 1.0;
    }

    if (THRESHOLD_X < Math.abs(this.moveX - this.startX)) {
      for (var i = 0; i < this._slideItems.length; i++) {
        this._slideItems[i].clickEventOff();
      }
    }

  }

  _end(e) {

    e.preventDefault();

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

    setTimeout(()=> {
      for (var i = 0; i < this._slideItems.length; i++) {
        this._slideItems[i].clickEventOn();
      }
    }, 50);

  }

}
