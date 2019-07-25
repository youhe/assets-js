require('../modules/common/render-watch');

export default function() {

  class Hoge {
    render() {
      console.log(window.RenderWatch.frame);
    }
    start() {
      this.RenderWatchWorking = true;
    }
    stop() {
      this.RenderWatchWorking = false;
    }
  }

  const hoge = new Hoge();
  window.RenderWatch.register(hoge);

  const btn1 = document.getElementById('js-btn1');
  btn1.addEventListener('click', ()=> {
    window.RenderWatch.setFps30();
  }, false);

  const btn2 = document.getElementById('js-btn2');
  btn2.addEventListener('click', ()=> {
    window.RenderWatch.setFps60();
  }, false);

  const btn3 = document.getElementById('js-btn3');
  btn3.addEventListener('click', ()=> {
    hoge.start();
  }, false);

  const btn4 = document.getElementById('js-btn4');
  btn4.addEventListener('click', ()=> {
    hoge.stop();
  }, false);

};
