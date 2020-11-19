require("../modules/common/devmode");

export default function() {
  DevMode.addVal('hoge');
  DevMode.addVal('fuga');
  
  const elm = document.getElementById("js-dev");
  elm.innerHTML = DevMode.state;

  const elmPrm = document.getElementById("js-dev-prm");
  for (const prop in DevMode.vals) {
    elmPrm.innerHTML += `${prop}: ${DevMode.vals[prop]} ,`;
  }
}
