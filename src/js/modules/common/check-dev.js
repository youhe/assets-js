/****************************************************

  - Usage
  require('./modules/common/check-dev');

****************************************************/
class CheckDev {
  constructor() {
    this.status = false;

    // クエリストリング 取得
    let str = "";
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split("=");
      if (pair[0] == "dev") {
        str = pair[1];
      }
    }

    // クエリストリング 判定
    if (str == "on") {
      this.status = true;
      document.body.classList.add("checkDev");
    }
  }
}

window.CheckDev = new CheckDev();
