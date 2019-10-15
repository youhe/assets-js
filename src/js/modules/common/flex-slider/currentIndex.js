export default class CurrentIndex {

  constructor(min, max, initValue) {

    if (initValue < min) {
      console.error('Error');
      return;
    }

    if (max < initValue) {
      console.error('Error');
      return;
    }

    // 表示上のスライド番号
    this.slideVal = initValue;
    this.prevSlideVal = null;

    // 内部のスライド番号
    this.indexVal = initValue;
    this.prevIndexVal = null;

    this.MIN = min;
    this.MAX = max;

  }

  getIndexVal() {

    return this.indexVal;

  }

  getPrevIndexVal() {

    return this.prevIndexVal;

  }

  getSlideVal() {

    return this.slideVal;

  }

  getPrevSlideVal() {

    return this.prevSlideVal;

  }

  set(value) {

    if (value < this.MIN) {
      console.error('Error');
      return;
    }

    if (this.MAX < value) {
      console.error('Error');
      return;
    }

    this.prevIndexVal = this.indexVal;

    this.indexVal = value;

  }

  prev() {

    this.prevIndexVal = this.indexVal;

    if (this.indexVal == 0)
      this.indexVal = this.MAX - 1;
    else
      this.indexVal -= 1;

    this.prevSlideVal = this.slideVal;
    this.slideVal = this.indexVal % (this.MAX / 2);

  }

  next() {

    this.prevIndexVal = this.indexVal;

    if (this.indexVal == this.MAX - 1)
      this.indexVal = 0;
    else
      this.indexVal += 1;

      this.prevSlideVal = this.slideVal;
      this.slideVal = this.indexVal % (this.MAX / 2);

  }

}
