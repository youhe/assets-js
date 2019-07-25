import boundRect from './bound-rect.js';

export default class FlexSlider {
  constructor(container, ops = {}) {

    this.container = container;

    this.opsPc = {
      slidesPerView: (ops.slidesPerView === undefined) ? 1 : ops.slidesPerView,
      spaceBetween: (ops.spaceBetween === undefined) ? 0 : ops.spaceBetween,
      initialSlide: (ops.initialSlide === undefined) ? 0 : ops.initialSlide,
      centeredSlides: (ops.centeredSlides === undefined) ? true : ops.centeredSlides,
      transitionTime: (ops.transitionTime === undefined) ? 0.5 : ops.transitionTime,
      autoPlay: (ops.autoPlay === undefined) ? true : ops.autoPlay,
      autoPlayInterval: (ops.autoPlayInterval === undefined) ? 4 : ops.autoPlayInterval,
    };

    if (ops.sp === undefined) ops.sp = {};
    this.opsSp = {
      maxWidth: (ops.sp.maxWidth === undefined) ? 767 : ops.sp.maxWidth,
      slidesPerView: (ops.sp.slidesPerView === undefined) ? 1 : ops.sp.slidesPerView,
      spaceBetween: (ops.sp.spaceBetween === undefined) ? 0 : ops.sp.spaceBetween,
      centeredSlides: (ops.sp.centeredSlides === undefined) ? true : ops.sp.centeredSlides,
      transitionTime: (ops.sp.transitionTime === undefined) ? 0.5 : ops.sp.transitionTime,
    };

    this.ops = this.opsPc;

    // カレントスライド
    this.currentIndex = this.ops.initialSlide;

    // スライドの横幅
    this.itemElmW = 0;

    // アニメーション中かどうかのflag
    this.isAnimation = false;

    this.frame = 0;

    this.moveX0 = 0;
    this.moveX1 = 0;

    this.wrapElm = this.container.querySelector('.js-flexslider-wrap');
    this.moveElm = this.container.querySelector('.js-flexslider-move');
    this.itemElm = this.container.querySelectorAll('.js-flexslider-item');
    this.navPrevElm = this.container.querySelector('.js-flexslider-nav-prev');
    this.navNextElm = this.container.querySelector('.js-flexslider-nav-next');
    this.paginationElm = this.container.querySelector('.js-flexslider-nav-pagination');
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

    // タッチイベント
    this.touchStartX = -1;
    this.touchMoveX = -1;

    this.wrapElm.addEventListener('touchstart', (e)=> {
      this.isAnimation = true;

      this.touchStartX = e.touches[0].pageX;
    }, false);

    this.wrapElm.addEventListener('touchmove', (e)=> {
      this.touchMoveX = e.touches[0].pageX;
      this.moveX0 = (this.touchMoveX - this.touchStartX) * 0.6;
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
    }, false);

    window.ResizeWatch.register(this);
    window.RenderWatch.register(this);

  }

  resize() {

    if (window.ResizeWatch.width <= this.opsSp.maxWidth) {
      this.ops = this.opsSp;
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
    for (var i = 0; i < this.length / 4; i++) {
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

  initItem(item, index) {

    // 初期化
    item.style.transition = '';
    item.tlX = 0;
    item.style.transform = 'translateX(0)';

    // トランジション付与
    setTimeout(()=> {
      item.style.transition = `transform ${this.ops.transitionTime}s ease 0s`;
    }, 100)

    // スライド横幅指定
    item.style.width = this.itemElmW + 'px';

    // スライドleft値指定
    let l = (this.itemElmW + this.ops.spaceBetween) * index;
    // 真ん中寄せの場合
    if (this.ops.centeredSlides) {
      l += (this.containerBR.width - this.itemElmW) * 0.5;
    }
    item.style.left = l + 'px';

  }

  prevItem() {

    this.animationStart();

    // 右端のスライドを反対側に移動
    let tIndex = this.currentIndex;
    let tLength = this.length - Math.floor(this.length / 4) - 1;
    for (var i = 0; i < tLength; i++) {
      tIndex = this.nextIndex(tIndex);
    }
    this.initItem(this.itemElm[tIndex], tLength - this.length);

    setTimeout(()=> {

      const ttIndex = this.currentIndex;
      this.currentIndex = this.prevIndex(this.currentIndex);

      for (var i = 0; i < this.length; i++) {
        this.itemElm[i].tlX += this.itemElmW + this.ops.spaceBetween;
        this.itemElm[i].style.transform = `translateX(${this.itemElm[i].tlX}px)`;
      }

      if (this.isPagination) {
        const rI = this.currentSlide(ttIndex);
        const aI = this.currentSlide(this.currentIndex);
        this.paginationItemElm[rI].classList.remove('on');
        this.paginationItemElm[aI].classList.add('on');
      }

    }, 100);

    setTimeout(()=> {
      this.animationEnd();
    }, (this.ops.transitionTime * 100) + 200);

  }

  nextItem() {

    this.animationStart();

    // 左端のスライドを反対側に移動
    let tIndex = this.currentIndex;
    let tLength = Math.floor(this.length / 4) + 1;
    for (var i = 0; i < tLength; i++) {
      tIndex = this.prevIndex(tIndex);
    }
    this.initItem(this.itemElm[tIndex], this.length - tLength);

    setTimeout(()=> {

      const ttIndex = this.currentIndex;
      this.currentIndex = this.nextIndex(this.currentIndex);

      for (var i = 0; i < this.length; i++) {
        this.itemElm[i].tlX -= this.itemElmW + this.ops.spaceBetween;
        this.itemElm[i].style.transform = `translateX(${this.itemElm[i].tlX}px)`;
      }

      if (this.isPagination) {
        const rI = this.currentSlide(ttIndex);
        const aI = this.currentSlide(this.currentIndex);
        this.paginationItemElm[rI].classList.remove('on');
        this.paginationItemElm[aI].classList.add('on');
      }

    }, 100);

    setTimeout(()=> {
      this.animationEnd();
    }, (this.ops.transitionTime * 100) + 200);

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

    if (this.isAnimation) return;
    this.isAnimation = true;
    this.frame = 0;

    for (var i = 0; i < this.length; i++) {
      this.itemElm[i].style.willChange = 'transform';
    }

  }

  animationEnd() {

    this.isAnimation = false;
    this.moveX0 = 0;

    for (var i = 0; i < this.length; i++) {
      this.itemElm[i].style.willChange = '';
    }

  }

  delete() {

  }

  render(frame) {

    this.moveX1 = (this.moveX0 - this.moveX1) * 0.1 + this.moveX1;
    this.moveElm.style.transform = `translateX(${this.moveX1}px)`;

    if ((this.frame + 1) % (this.opsPc.autoPlayInterval * 60) == 0) {
      this.nextItem();
    }
    this.frame = this.frame + 1;

  }

}
