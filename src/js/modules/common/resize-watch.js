/****************************************************

  - Usage
  require('./modules/common/resize-watch');

  window.ResizeWatch.width -> window横幅
  window.ResizeWatch.height -> window縦幅
  window.ResizeWatch.aspect -> 横縦アスペクト比

  register(instance)
  リサイズ時に instance の resize が呼ばれる。

  eventOnlyPc
  resizeイベントがpc時だけ発生する

  eventAll
  resizeイベントが全てのデバイスで発生する

****************************************************/

const Mkai = require('./mkai');

class ResizeWatch {

  constructor() {

    this.eventOnlyPc = false;
    this.intervalTime = 100;

    this.instances = [];

    this.resize();

    window.onresize = () => {

      if (this.eventOnlyPc && !window.UserAgent.pc) return;

      clearTimeout(this.timer);

      this.timer = setTimeout(()=> {
        this.resize();
      }, this.intervalTime);

    };

  }


  resize() {

    this.width = document.body.clientWidth;
    this.height = window.innerHeight;
    this.aspect = Mkai.round(this.width / this.height, 0.0001);

    for(var i = 0; i < this.instances.length; i++) {
      this.instances[i].resize();
    }

  }


  register(instance) {

    this.instances.push(instance);
    instance.resize();

  }


  setEventOnlyPc() {

    this.eventOnlyPc = true;

  }


  setEventAll() {

    this.eventOnlyPc = false;

  }

}

window.ResizeWatch = new ResizeWatch();
