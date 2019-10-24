const THRESHOLD_X = 50;

export default class ScrollEvent {

  constructor(app, wrap, slideItems) {

    this._app = app;
    this._wrap = wrap;
    this._slideItems = slideItems;

    this._init();

    this._wrap.addEventListener('wheel',  (e)=> {this._wheel(e)}, false);

    window.RenderWatch.register(this);

  }

  _init() {

    this.isAnimation = false;
    this.wheelY = 0;
    this.ty = 0;
    this.dy = 0;
    this.moveDX = 0;

  }

  _wheel(e) {

    // console.log(e);
    this.wheelY = e.deltaY;

  }

  render() {

    this.ty = this.dy;
    this.dy = (this.wheelY - this.ty) * 0.15 + this.ty;

    if (this.dy == this.ty) {
      this.dy = this.dy * 0.8;
    }

    if (-0.4 < this.dy && this.dy < 0.4) {
      this.dy = 0;
    }

    if (this.dy == 0) {
      this.isAnimation = false;
    } else {
      this.isAnimation = true;
    }

    this.moveDX = this.dy * 10;

    console.log(this.dy);

  }

}
