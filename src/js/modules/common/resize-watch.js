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

const Mkai = require("./mkai");

class ResizeWatch {
  constructor() {
    this._eventOnlyPc = false;
    this._intervalTime = 100;

    this._instances = [];

    this._resize();

    window.onresize = () => {
      if (this._eventOnlyPc && !window.UserAgent.pc) return;

      clearTimeout(this._timer);

      this._timer = setTimeout(() => {
        this._resize();
      }, this._intervalTime);
    };
  }

  _resize() {
    this.width = document.body.clientWidth;
    this.height = window.innerHeight;
    this.aspect = Mkai.round(this.width / this.height, 0.0001);

    for (var i = 0; i < this._instances.length; i++) {
      this._instances[i].resize();
    }
  }

  register(instance) {
    this._instances.push(instance);
    instance.resize();
  }

  setEventOnlyPc() {
    this._eventOnlyPc = true;
  }

  setEventAll() {
    this._eventOnlyPc = false;
  }
}

window.ResizeWatch = new ResizeWatch();
