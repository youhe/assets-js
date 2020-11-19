/****************************************************

  - Usage
  require('./modules/common/devmode');

  add URL
  ?devmode=on

****************************************************/
class DevMode {
  constructor() {
    this.state = false;
    this.vals = {};

    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split("=");
      if (pair[0] === "devmode" && pair[1] === "on") {
        this.state = true;
        document.body.classList.add("devmode");
      }
    }
  }

  /**
   * 
   * @param {string} prm 追加するパラメータ
   */
  addVal(prm) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split("=");
      if (pair[0] === prm) {
        this.vals[prm] = pair[1];
      }
    }
  }
}

window.DevMode = new DevMode();
