const easeing = require('../easing');
import boundRect from '../bound-rect.js';

const Mkai = require('../mkai.js');

import CurrentIndex from './currentIndex.js';
import SlideOrder from './slideOrder.js';
import SlideItem from './slideItem.js';

export default class FlexSlider {
  constructor(container, ops = {}) {

    this.container = container;

    this.opsPc = {
      slidesPerView:    (ops.slidesPerView === undefined) ? 1 : ops.slidesPerView,
      spaceBetween:     (ops.spaceBetween === undefined) ? 0 : ops.spaceBetween,
      initialSlide:     (ops.initialSlide === undefined) ? 0 : ops.initialSlide,
      centeredSlides:   (ops.centeredSlides === undefined) ? true : ops.centeredSlides,
      animationTime:    (ops.animationTime === undefined) ? 500 : ops.animationTime,
      animationEase:    (ops.animationEase === undefined) ? easeing.easeInOutQuad : ops.animationEase,
      autoPlay:         (ops.autoPlay === undefined) ? true : ops.autoPlay,
      autoPlayInterval: (ops.autoPlayInterval === undefined) ? 4 : ops.autoPlayInterval,
    };

    if (ops.sp === undefined) ops.sp = {};
    this.opsSp = {
      maxWidth:         (ops.sp.maxWidth === undefined) ? 767 : ops.sp.maxWidth,
      slidesPerView:    (ops.sp.slidesPerView === undefined) ? 1 : ops.sp.slidesPerView,
      spaceBetween:     (ops.sp.spaceBetween === undefined) ? 0 : ops.sp.spaceBetween,
      centeredSlides:   (ops.sp.centeredSlides === undefined) ? true : ops.sp.centeredSlides,
      animationTime:    (ops.sp.animationTime === undefined) ? 400 : ops.sp.animationTime,
      animationEase:    (ops.animationEase === undefined) ? easeing.easeInOutQuad : ops.animationEase,
      autoPlay:         (ops.autoPlay === undefined) ? true : ops.autoPlay,
      autoPlayInterval: (ops.autoPlayInterval === undefined) ? 4 : ops.autoPlayInterval,
    };

    this.ops = this.opsPc;

    // カレントスライド
    this.currentIndex = this.ops.initialSlide;

    // スライドの横幅
    this.itemElmW = 0;

    // アニメーション中かどうかのflag
    this.isAnimation = false;

    // マウスイベント中かどうかのflag
    this.isMouseAnimation = false;

    // タッチイベント中かどうかのflag
    this.isTouchAnimation = false;


    // 自動再生の制御
    this.autoPlay = true;

    this.frame = 0;

    this.moveX = 0;

    this.mouseStartX = -1;
    this.mouseMoveX = -1;
    this.mouseMoveX0 = 0;

    this.touchStartX = -1;
    this.touchMoveX = -1;
    this.touchMoveX0 = 0;

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

    // スライドアイテムクラス
    this.slideItems = [];
    const itemElms = this.container.querySelectorAll('.js-flexslider-item');
    for (var i = 0; i < itemElms.length; i++) {
      this.slideItems[i] = new SlideItem(itemElms[i]);
    }

    // スライド数
    this.length = this.itemElm.length;

    // カレントスライド
    this.currentIndex = new CurrentIndex(0, this.length, this.ops.initialSlide);

    // スライド順序管理
    this.slideOrder = new SlideOrder(
      this.length, this.ops.centeredSlides, this.ops.slidesPerView
    );

    // スタイル初期化
    this.wrapElm.style.position = 'relative';

    // マウスオーバー中は自動再生させない
    if (window.UserAgent.pc) {
      this.wrapElm.addEventListener('mouseover', (e)=> {
        this.autoPlay = false;
      });
      this.wrapElm.addEventListener('mouseout', (e)=> {
        this.autoPlay = true;
      });
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

    // マウスイベント
    this.wrapElm.addEventListener('mousedown', (e)=> {

      e.preventDefault();

      this.isMouseAnimation = true;

      this.mouseStartX = e.clientX;

    }, false);

    this.wrapElm.addEventListener('mousemove', (e)=> {

      e.preventDefault();

      if (this.isMouseAnimation) {
        this.mouseMoveX = e.clientX;

        this.mouseMoveX0 = (this.mouseMoveX - this.mouseStartX) * 1.2;
      }

    }, false);

    this.wrapElm.addEventListener('mouseup', (e)=> {

      this.isMouseAnimation = false;

      if (this.mouseStartX != -1 && this.mouseMoveX != -1) {
        if (30 < this.mouseMoveX - this.mouseStartX) {
          this.prevItem();
        } else if (this.mouseMoveX - this.mouseStartX < -30) {
          this.nextItem();
        }
      }

      this.mouseStartX = -1;
      this.mouseMoveX = -1;
      this.mouseMoveX0 = 0;

    }, false);

    this.wrapElm.addEventListener('mouseout', (e)=> {

      this.isMouseAnimation = false;

      this.mouseStartX = -1;
      this.mouseMoveX = -1;
      this.mouseMoveX0 = 0;

    }, false);

    // タッチイベント
    if (window.UserAgent.sp) {
      this.wrapElm.addEventListener('touchstart', (e)=> {

        this.isTouchAnimation = true;

        this.touchStartX = e.touches[0].pageX;

      }, false);

      this.wrapElm.addEventListener('touchmove', (e)=> {

        this.touchMoveX = e.touches[0].pageX;

        const th = Math.abs(this.touchMoveX - this.touchStartX);
        if (7 <= th) {
          e.preventDefault();
        }

        this.touchMoveX0 = (this.touchMoveX - this.touchStartX) * 1.2;

      }, false);

      this.wrapElm.addEventListener('touchend', (e)=> {

        this.isTouchAnimation = false;

        if (this.touchStartX != -1 && this.touchMoveX != -1) {
          if (30 < this.touchMoveX - this.touchStartX) {
            this.prevItem();
          } else if (this.touchMoveX - this.touchStartX < -30) {
            this.nextItem();
          }
        }

        this.touchStartX = -1;
        this.touchMoveX = -1;
        this.touchMoveX0 = 0;

      }, false);
    }

    window.ResizeWatch.register(this);
    window.RenderWatch.register(this);

  }

  resize() {

    if (window.ResizeWatch.width <= this.opsSp.maxWidth) {
      this.ops = this.opsSp;
    } else {
      this.ops = this.opsPc;
    }

    if (!window.UserAgent.sp) {
      this.init();
    }

  }

  init() {

    this.containerBR = boundRect(this.container);

    // 表示内のマージン合計
    const spaceBetweenW = this.ops.spaceBetween * Math.ceil(this.ops.slidesPerView - 1);

    // スライド１つの横幅
    this.itemElmW = (this.containerBR.width - spaceBetweenW) / this.ops.slidesPerView;

    // 全体の横幅
    this.contentsWidth = (this.itemElmW * this.length) + (this.ops.spaceBetween * (this.length - 1));

    // スライド初期化
    for (var i = 0; i < this.length; i++) {
      const index = this.slideOrder.getList(i);
      let left = (this.itemElmW + this.ops.spaceBetween) * i;
      left -= this.contentsWidth * 0.5;
      left -= this.ops.spaceBetween * 0.5;
      if (this.ops.centeredSlides) {
        left += this.containerBR.width * 0.5;
        left -= this.itemElmW * 0.5;
      }
      this.slideItems[index].init(left, this.itemElmW);
    }

    this.moveX = 0;

    setTimeout(()=> {
      this.setHeight();
    }, 100)

    // ページネーション初期化
    if (this.isPagination) {
      const cIndex = this.currentIndex.getSlideVal();
      this.paginationItemElm[cIndex].classList.add('on');
    }

  }

  setHeight() {

    let maxH = 0;
    for (var i = 0; i < this.length; i++) {
      this.slideItems[i].setBr();
      const h = this.slideItems[i].getHeight();
      if (maxH < h) maxH = h;
    }
    this.wrapElm.style.height = `${ maxH }px`;

  }

  prevItem() {

    if (this.isAnimation == true) return;
    this.isAnimation = true;

    // 左端のスライドを右端に移動
    const leIndex = this.slideOrder.getLeftEdge();
    const reIndex = this.slideOrder.getRightEdge();
    const left = this.slideItems[leIndex].getLeft() - this.itemElmW - this.ops.spaceBetween;
    this.slideItems[reIndex].set(left);

    const moveX = this.itemElmW + this.ops.spaceBetween;
    this.animationStart('prev', moveX);

  }

  nextItem() {

    if (this.isAnimation == true) return;
    this.isAnimation = true;

    // 左端のスライドを右端に移動
    const leIndex = this.slideOrder.getLeftEdge();
    const reIndex = this.slideOrder.getRightEdge();
    const left = this.slideItems[reIndex].getLeft() + this.itemElmW + this.ops.spaceBetween;
    this.slideItems[leIndex].set(left);

    const moveX = -(this.itemElmW + this.ops.spaceBetween);
    this.animationStart('next', moveX);

  }

  paginationItem(index) {

  }

  animationStart(action, moveX) {

    this.frame = 0;

    this.moveElm.style.transitionDuration = `${ this.ops.animationTime }ms`;

    if (action == 'prev') {
      this.currentIndex.prev();
      this.slideOrder.prev();
    } else if (action == 'next') {
      this.currentIndex.next();
      this.slideOrder.next();
    }

    if (this.isPagination) {
      const pIndex = this.currentIndex.getPrevSlideVal();
      const cIndex = this.currentIndex.getSlideVal();
      this.chengePagination(pIndex, cIndex);
    }

    setTimeout(()=> {
      this.animation(moveX);
    }, 10);

  }

  animation(moveX) {

    this.moveX = this.moveX + moveX;
    this.moveElm.style.transform = `translate3d(${ this.moveX }px, 0, 0)`;

    setTimeout(()=> {
      this.animationEnd();
    }, this.ops.animationTime + 100);

  }

  animationEnd() {

    this.isAnimation = false;
    this.moveElm.style.transitionDuration = '0ms';

  }

  chengePagination(rmIndex, adIndex) {

    const pIndex = this.currentIndex.getPrevSlideVal();
    const cIndex = this.currentIndex.getSlideVal();

    if (pIndex != null) {
      this.paginationItemElm[pIndex].classList.remove('on');
    }
    this.paginationItemElm[cIndex].classList.add('on');

  }

  delete() {

  }

  render(frame) {

    if (!this.ops.autoPlay) return;

    const x = this.moveX + this.mouseMoveX0 + this.touchMoveX0;
    this.moveElm.style.transform = `translate3d(${ x }px, 0, 0)`;

    if (!this.autoPlay) return;
    if (this.isMouseAnimation) return;
    if (this.isTouchAnimation) return;

    if ((this.frame + 1) % (this.opsPc.autoPlayInterval * 60) == 0) {
      this.nextItem();
    }
    this.frame = this.frame + 1;

  }

}
