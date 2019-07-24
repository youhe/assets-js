export default class Accordion {
  constructor(elm) {
    this.elm = elm;
    this.open = this.elm.querySelector('.js-accordion-open');
    this.contents = this.elm.querySelector('.js-accordion-contents');
    this.contentsWrap = this.elm.querySelector('.js-accordion-contents-wrap');

    this.contents.style.height = 0;
    this.contents.style.overflow = 'hidden';
    this.contents.style.transition = 'height .3s ease 0s';

    this.isOpened = false;
    this.isAnimate = false;

    this.on();
  }

  on() {
    this.open.addEventListener('click', () => {
      if(this.isAnimate) return;
      this.isAnimate = true;
      setTimeout(()=> {
        this.isAnimate = false;
      }, 400)
      this.toggle();
    }, false);
  }

  toggle() {
    if (this.contents.classList.contains('on')) {
      // off
      this.open.classList.remove('on');
      this.contents.classList.remove('on');
      this.contents.style.height = this.getContentsHeight();
      setTimeout(()=> {
        this.contents.style.willChange = 'height';
        this.contents.style.height = 0;
      }, 100)
      setTimeout(()=> {
        this.contents.style.willChange = '';
      }, 500)
    } else {
      // on
      this.open.classList.add('on');
      this.contents.classList.add('on');
      this.contents.style.willChange = 'height';
      this.contents.style.height = this.getContentsHeight();
      setTimeout(()=> {
        this.contents.style.height = 'auto';
        this.contents.style.willChange = '';
      }, 400)
    }
  }

  getContentsHeight() {
    const contentsHeight = this.contentsWrap.getBoundingClientRect().height;
    return contentsHeight + 'px';
  }
}
