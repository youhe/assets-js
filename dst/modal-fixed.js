/****************************************************
****************************************************/

export default class ModalFixed {
  constructor(modal, open, close) {
    this.windowPageY = 0;

    this.body = document.body;
    this.modal = modal;

    this.init();

    for (var i = 0; i < open.length; i++) {
      open[i].addEventListener('click', (e)=> {
        this.open();
      }, false);
    }
    for (var i = 0; i < close.length; i++) {
      close[i].addEventListener('click', (e)=> {
        this.close();
      }, false);
    }
  }

  init() {
    this.modal.style.position = 'fixed';
    this.modal.style.left = 0;
    this.modal.style.top = 0;
    this.modal.style.width = '100%';
    this.modal.style.height = '100vh';
  }

  open() {
    this.windowPageY = window.pageYOffset;
    this.modal.classList.add('on');
    this.body.style.position = 'fixed';
    this.body.style.overflow = 'hidden';
    this.body.style.top = 0;
    this.body.style.left = 0;
    this.body.style.bottom = 0;
    this.body.style.right = 0;
    this.body.style.marginTop = this.windowPageY * -1 + 'px';
  }

  close() {
    this.modal.classList.remove('on');
    setTimeout(()=> {
      this.body.style.position = 'static';
      this.body.style.overflow = '';
      this.body.style.top = 'auto';
      this.body.style.left = 'auto';
      this.body.style.bottom = 'auto';
      this.body.style.right = 'auto';
      this.body.style.marginTop = 0;
      scrollTo(0, this.windowPageY);
    }, 100);
  }
}
