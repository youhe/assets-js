require("../modules/common/check-dev");

export default function() {
  // window.ResizeWatch.register(new Hoge);
  const elm = document.getElementById("js-dev");
  elm.innerHTML = window.CheckDev.status;
}
