export default class SlideOrder {

  constructor(slideLength, centeredSlides, slidesPerView) {

    const length = slideLength;

    this.list = [];
    for (var i = 0; i < length; i++) {
      this.list[i] = i;
    }

    for (var i = 0; i < (length - 1) / 2; i++) {
      const tI = this.list.pop();
      this.list.unshift(tI);
    }

  }

  prev() {

    const tI = this.list.pop();
    this.list.unshift(tI);

  }

  next() {

    const tI = this.list.shift();
    this.list.push(tI);

  }

  set() {

  }

  getList(index) {

    return this.list[index];

  }

  // 左端の slide index を返す
  getLeftEdge() {

    return this.list[0];

  }

  // 右端の slide index を返す
  getRightEdge() {

    return this.list[this.list.length - 1];

  }

}
