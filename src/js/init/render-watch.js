require("../modules/common/render-watch");
window.RenderWatch.setDev("right");

export default function() {
  class Hoge {
    render(frame) {
      console.log(`render ${frame}`);
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

  const btn1 = document.getElementById("js-btn1");
  const btn2 = document.getElementById("js-btn2");
  const btn3 = document.getElementById("js-btn3");
  const btn4 = document.getElementById("js-btn4");
  const btn5 = document.getElementById("js-btn5");

  btn1.addEventListener(
    "click",
    () => {
      console.log("setFps 10");
      window.RenderWatch.setFps(10);
    },
    false
  );

  btn2.addEventListener(
    "click",
    () => {
      console.log("setFps 30");
      window.RenderWatch.setFps(30);
    },
    false
  );

  btn3.addEventListener(
    "click",
    () => {
      console.log("setFps 60");
      window.RenderWatch.setFps(60);
    },
    false
  );

  btn4.addEventListener(
    "click",
    () => {
      hoge.start();
    },
    false
  );

  btn5.addEventListener(
    "click",
    () => {
      hoge.stop();
    },
    false
  );
}
