import boundRect from '../bound-rect.js';

export default class SlideItem {

  constructor(elm) {

    this.elm = elm;
    this.elm.style.position = 'absolute';
    this.elm.style.left = '-100000000px';
    this.elm.style.top = '0';

    this.br = null;

  }

  setBr() {

    this.br = boundRect(this.elm);

  }

  getLeft() {

    return Number(this.elm.style.left.replace('px', ''));

  }

  getHeight() {

    if (this.br == null) return null;
    else return this.br.height;

  }

  setHeight(val) {

  }

  init(left, width) {

    // 初期化
    this.elm.tlX = 0;
    this.elm.style.transition = '';
    this.elm.style.transform = 'translateX(0)';
    this.elm.style.width = `${ width }px`;
    this.elm.style.left = `${ left }px`;

  }

  set(left) {

    this.elm.style.left = `${ left }px`;

  }

  clickEventOn() {

    if (this.clickStatus == 'on') return;
    this.clickStatus = 'on'

    const link = this.elm.querySelectorAll('a');
    for (var i = 0; i < link.length; i++) {
      link[i].removeEventListener('click', this.clickOff);
    }

  }

  clickEventOff() {

    if (this.clickStatus == 'off') return;
    this.clickStatus = 'off'

    const link = this.elm.querySelectorAll('a');
    for (var i = 0; i < link.length; i++) {
      link[i].addEventListener('click', this.clickOff);
    }

  }

  clickOff(e) {
    e.preventDefault();
  }

}
