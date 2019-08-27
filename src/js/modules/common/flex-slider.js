const easeing = require('./easing');
import boundRect from './bound-rect.js';

export default class FlexSlider {
  constructor(container, ops = {}) {

    this.container = container;

    this.opsPc = {
      slidesPerView:    (ops.slidesPerView === undefined) ? 1 : ops.slidesPerView,
      spaceBetween:     (ops.spaceBetween === undefined) ? 0 : ops.spaceBetween,
      initialSlide:     (ops.initialSlide === undefined) ? 0 : ops.initialSlide,
      centeredSlides:   (ops.centeredSlides === undefined) ? true : ops.centeredSlides,
      animationTime:    (ops.animationTime === undefined) ? 0.5 : ops.animationTime,
      animationEase:    (ops.animationEase === undefined) ? easeing.easeInOutQuad : ops.animationEase,
      autoPlay:         (ops.autoPlay === undefined) ? true : ops.autoPlay,
      autoPlayInterval: (ops.autoPlayInterval === undefined) ? 4 : ops.autoPlayInterval,
    };

    if (ops.sp === undefined) ops.sp = {};
    this.opsSp = {
      maxWidth:       (ops.sp.maxWidth === undefined) ? 767 : ops.sp.maxWidth,
      slidesPerView:  (ops.sp.slidesPerView === undefined) ? 1 : ops.sp.slidesPerView,
      spaceBetween:   (ops.sp.spaceBetween === undefined) ? 0 : ops.sp.spaceBetween,
      centeredSlides: (ops.sp.centeredSlides === undefined) ? true : ops.sp.centeredSlides,
      animationTime:  (ops.sp.animationTime === undefined) ? 0.5 : ops.sp.animationTime,
    };

    this.ops = this.opsPc;

    // カレントスライド
    this.currentIndex = this.ops.initialSlide;

    // スライドの横幅
    this.itemElmW = 0;

    // アニメーション中かどうかのflag
    this.isAnimation = false;

    // 自動再生の制御
    this.autoPlay = true;

    this.frame = 0;

    this.moveX0 = 0;
    this.moveX1 = 0;

    this.wrapElm           = this.container.querySelector('.js-flexslider-wrap');
    this.moveElm           = this.container.querySelector('.js-flexslider-move');
    this.itemElm           = this.container.querySelectorAll('.js-flexslider-item');
    this.navPrevElm        = this.container.querySelector('.js-flexslider-nav-prev');
    this.navNextElm        = this.container.querySelector('.js-flexslider-nav-next');
    this.paginationElm     = this.container.querySelector('.js-flexslider-nav-pagination');
    this.paginationItemElm = this.container.querySelectorAll('.js-flexslider-nav-pagination-item');

    // ページネーションがあるか
    this.isPagination = (this.paginationElm === null) ? false : true;

    // スライド複製
    for (var i = 0; i < this.itemElm.length; i++) {
      this.moveElm.appendChild(this.itemElm[i].cloneNode(true));
    }

    // 再取得
    this.itemElm = this.container.querySelectorAll('.js-flexslider-item');

    // スライド数
    this.length = this.itemElm.length;

    // スタイル初期化
    this.wrapElm.style.position = 'relative';
    for (var i = 0; i < this.length; i++) {
      this.itemElm[i].style.position = 'absolute';
      this.itemElm[i].style.left = '-100000000px';
      this.itemElm[i].style.top = '0';
    }

    // マウスオーバー中は自動再生させない
    this.wrapElm.addEventListener('mouseover', (e)=> {
      this.autoPlay = false;
    });
    this.wrapElm.addEventListener('mouseleave', (e)=> {
      this.autoPlay = true;
    });

    // ナビ イベント
    if (this.navPrevElm) {
      this.navPrevElm.addEventListener('click', ()=> {
        this.prevItem();
      }, false);
    }

    if (this.navNextElm) {
      this.navNextElm.addEventListener('click', ()=> {
        this.nextItem();
      }, false);
    }

    if (this.isPagination) {
      // for (var i = 0; i < this.paginationItemElm.length; i++) {
      //   this.paginationItemElm[i].index = i;
      //   this.paginationItemElm[i].addEventListener('click', (e)=> {
      //
      //     let index = e.currentTarget.index;
      //     if (index == this.currentIndex) return;
      //     if (index == this.currentIndex + (this.length / 2)) return;
      //
      //     if (this.length / 2 < this.currentIndex) index += this.length / 2;
      //
      //     this.paginationItem(index);
      //
      //   }, false);
      // }
    }

    // タッチイベント
    this.touchStartX = -1;
    this.touchMoveX = -1;

    this.wrapElm.addEventListener('touchstart', (e)=> {
      this.isAnimation = true;

      this.touchStartX = e.touches[0].pageX;
    }, false);

    this.wrapElm.addEventListener('touchmove', (e)=> {
      this.touchMoveX = e.touches[0].pageX;
      this.moveX0 = (this.touchMoveX - this.touchStartX) * 0.4;
    }, false);

    this.wrapElm.addEventListener('touchend', (e)=> {
      this.isAnimation = false;

      let tSX = this.touchStartX;
      let tMX = this.touchMoveX;
      this.touchStartX = -1;
      this.touchMoveX = -1;
      if (tSX != -1 && tMX != -1) {
        if (30 < tMX - tSX) this.prevItem();
        if (tMX - tSX < -30) this.nextItem();
      }

      setTimeout(()=> {
        this.moveX0 = 0;
      }, 300);
    }, false);

    window.ResizeWatch.register(this);
    window.RenderWatch.register(this);

  }

  resize() {

    if (window.ResizeWatch.width <= this.opsSp.maxWidth) {
      this.ops = this.opsSp;
      this.ops.animationEase = this.opsPc.animationEase;
      this.ops.autoPlay = this.opsPc.autoPlay;
      this.ops.autoPlayInterval = this.opsPc.autoPlayInterval;
    } else {
      this.ops = this.opsPc;
    }

    this.init();

  }

  init() {

    this.containerBR = boundRect(this.container);

    // 表示内のマージン合計
    const spaceBetweenW = this.ops.spaceBetween * Math.ceil(this.ops.slidesPerView - 1);
    // スライド１つの横幅
    this.itemElmW = (this.containerBR.width - spaceBetweenW) / this.ops.slidesPerView;

    // スライド初期化
    let index1 = this.currentIndex;
    for (var i = 0; i < this.length; i++) {
      this.initItem(this.itemElm[index1], i);
      index1 = this.nextIndex(index1);
    }

    // 半分だけ左側に配置
    let index2 = this.currentIndex;
    for (var i = 0; i < this.length / 2; i++) {
      index2 = this.prevIndex(index2);
      this.initItem(this.itemElm[index2], -i - 1);
    }

    // スライドの最大の高さ取得
    setTimeout(()=> {
      let itemMaxH = 0;
      for (var i = 0; i < this.length; i++) {
        const br = boundRect(this.itemElm[index1]);
        if (itemMaxH < br.height) {
          itemMaxH = br.height;
        }
      }
      this.wrapElm.style.height = `${itemMaxH}px`;
    }, 100)

    // ページネーション初期化
    if (this.isPagination) {
      this.paginationItemElm[this.currentIndex].classList.add('on');
    }

  }

  initItem(item, step) {

    // 初期化
    item.style.transition = '';
    item.tlX = 0;
    item.style.transform = 'translateX(0)';

    // スライド横幅指定
    item.style.width = `${this.itemElmW}px`;

    // スライドleft値指定
    let l = (this.itemElmW + this.ops.spaceBetween) * step;
    // 真ん中寄せの場合
    if (this.ops.centeredSlides) {
      l += (this.containerBR.width - this.itemElmW) * 0.5;
    }
    item.style.left = `${l}px`;

  }

  prevItem() {

    if (this.isAnimation == true) return;
    this.isAnimation = true;

    this.animationStart();
    this.moveItem('prev', this.currentIndex);

    setTimeout(()=> {

      const ttIndex = this.currentIndex;
      this.currentIndex = this.prevIndex(this.currentIndex);

      this.animation(-(this.itemElmW + this.ops.spaceBetween), 0);

      if (this.isPagination) {
        this.chengePagination(ttIndex, this.currentIndex);
      }

    }, 100);

    setTimeout(()=> {
      this.animationEnd();
    }, (this.ops.animationTime * 100) + 200);

  }

  nextItem() {

    if (this.isAnimation == true) return;
    this.isAnimation = true;

    this.animationStart();
    this.moveItem('next', this.currentIndex);

    setTimeout(()=> {

      const ttIndex = this.currentIndex;
      this.currentIndex = this.nextIndex(this.currentIndex);

      this.animation(this.itemElmW + this.ops.spaceBetween, 0);

      if (this.isPagination) {
        this.chengePagination(ttIndex, this.currentIndex);
      }

    }, 100);

  }

  paginationItem(index) {

    if (this.isAnimation == true) return;
    this.isAnimation = true;

    this.animationStart();

    const cI = (this.length / 2 < this.currentIndex) ? this.currentIndex / 2 : this.currentIndex;
    // 移動ステップ数
    // start -> goal
    const step0 = -(index - cI);
    // start -> 0 -> end -> goal
    const step1 = -(0 - cI + index - (this.length - 1));
    // start -> end -> 0 -> goal
    const step2 = -((this.length - 1) - cI + index - 0);
    // １番ステップ数が少ない物を選ぶ
    let step = (Math.abs(step0) < Math.abs(step1)) ? step0 : step1;
    step = (Math.abs(step) < Math.abs(step2)) ? step : step2;

    if (step < 0) {
      for (var i = 0; step < i; i--) {
        this.moveItem('next', this.currentIndex - i, i);
      }
    } else {
      for (var i = 0; i < step; i++) {
        this.moveItem('prev', this.currentIndex - i, i);
      }
    }

    setTimeout(()=> {

      const ttIndex = this.currentIndex;
      this.currentIndex = index;

      const mX = -(this.itemElmW + this.ops.spaceBetween) * step;
      this.animation(mX, 0);

      if (this.isPagination) {
        this.chengePagination(ttIndex, this.currentIndex);
      }

    }, 100);

  }

  moveItem(ac, index, mStep = 0) {

    if (ac == 'prev') {

      // 右端のスライドを反対側に移動
      let tIndex = index;
      let tLength = this.length / 2 - 1;
      for (var i = 0; i < tLength; i++) {
        tIndex = this.nextIndex(tIndex);
      }
      const step = tLength - this.length - mStep;
      this.initItem(this.itemElm[tIndex], step);

    } else if (ac == 'next') {

      // 左端のスライドを反対側に移動
      let tIndex = index;
      let tLength = this.length / 2;
      for (var i = 0; i < tLength; i++) {
        tIndex = this.prevIndex(tIndex);
      }
      const step = this.length - tLength - mStep;
      this.initItem(this.itemElm[tIndex], step);

    }

  }

  prevIndex(index) {

    if (index == 0) return this.length - 1;
    else return index - 1;

  }

  nextIndex(index) {

    if (index == this.length - 1) return 0;
    else return index + 1;

  }

  currentSlide(index) {

    if (index < this.length / 2) return index;
    else return index - (this.length / 2);

  }

  animationStart() {

    this.frame = 0;

    for (var i = 0; i < this.length; i++) {
      this.itemElm[i].style.willChange = 'transform';
    }

  }

  animation(moveX, frame) {

    const f = frame / 60 / this.ops.animationTime;

    if (f < 1) {

      const mX = moveX * this.ops.animationEase(f);
      for (var i = 0; i < this.length; i++) {
        const tlX = this.itemElm[i].tlX - mX;
        this.itemElm[i].style.transform = `translateX(${tlX}px)`;
      }

      requestAnimationFrame(() => {
        this.animation(moveX, frame + 1);
      });

    } else {

      const mX = moveX;
      for (var i = 0; i < this.length; i++) {
        this.itemElm[i].tlX = this.itemElm[i].tlX - mX;
        this.itemElm[i].style.transform = `translateX(${this.itemElm[i].tlX}px)`;
      }

      setTimeout(()=> {
        this.animationEnd();
      }, 100);

      return;

    }

  }

  animationEnd() {

    this.isAnimation = false;

    for (var i = 0; i < this.length; i++) {
      this.itemElm[i].style.willChange = '';
    }

  }

  chengePagination(rmIndex, adIndex) {

    const rI = this.currentSlide(rmIndex);
    const aI = this.currentSlide(adIndex);
    this.paginationItemElm[rI].classList.remove('on');
    this.paginationItemElm[aI].classList.add('on');

  }

  delete() {

  }

  render(frame) {

    this.moveX1 = (this.moveX0 - this.moveX1) * 0.2 + this.moveX1;
    this.moveElm.style.transform = `translateX(${this.moveX1}px)`;

    if (!this.ops.autoPlay) return;
    if (!this.autoPlay) return;
    if ((this.frame + 1) % (this.opsPc.autoPlayInterval * 60) == 0) {
      this.nextItem();
    }
    this.frame = this.frame + 1;

  }

}
