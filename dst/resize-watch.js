/*
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

class ResizeWatch {
  constructor() {
    this.eventOnlyPc = false;

    this.instances = [];

    this.resize();

    window.onresize = () => {
      if (this.eventOnlyPc && !window.UserAgent.pc) return;
      if(this.instances.length === 0) return;

      this.resize();
      for(var i = 0; i < this.instances.length; i++) {
        this.instances[i].resize();
      }
    };
  }

  resize() {
    this.width = document.body.clientWidth;
    this.height = window.innerHeight;
    this.aspect = Mkai.round(this.width / this.height, 0.0001);
  }

  register(instance) {
    this.instances.push(instance);
    instance.resize();
  }

  eventonlypc() {
    this.eventOnlyPc = true;
  }

  eventAll() {
    this.eventOnlyPc = false;
  }
}

window.ResizeWatch = new ResizeWatch();
