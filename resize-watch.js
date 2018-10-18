/*
  window.ResizeWatch.width -> window横幅
  window.ResizeWatch.height -> window縦幅
  window.ResizeWatch.aspect -> 横縦アスペクト比

  register で instances にインスタンスを追加すると
  リサイズ時にそのインスタンスの resize が呼ばれる。
****************************************************/

class ResizeWatch {
  constructor() {
    this.instances = [];

    this.width = this._width = document.body.clientWidth;
    this.height = this._height = window.innerHeight;
    this.aspect = this.width / this.height;

    window.onresize = () => {
      if(this.instances.length === 0) return;

      this.width = document.body.clientWidth;
      this.height = window.innerHeight;
      this.aspect = this.width / this.height;

      for(var i = 0; i < this.instances.length; i++) {
        this.instances[i].resize();
      }
    };
  }

  register(instance) {
    this.instances.push(instance);
  }
}

window.ResizeWatch = new ResizeWatch();
