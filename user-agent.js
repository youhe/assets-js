/*
  // JS
  window.UserAgent.xxx -> 各UserAgent判定

  // html
  document.body に各UserAgent判定クラスを追加
  true  -> xxx
  false -> no-xxx
 */

class UserAgent {

  /*
    @param {boolean} isLog - console.logを出力するか
   */
  constructor() {
    this.isLog = true;

    this.ua = window.navigator.userAgent.toLowerCase();
    this.av = window.navigator.appVersion.toLowerCase();

    // device
    this.pc = false;
    this.tablet = false;
    this.mobile = false;

    // OS
    this.mac = false;
    this.windows = false;
    this.linux = false;
    this.ios = false;
    this.android = false;

    // browser
    this.edge = false;
    this.ie11 = false;
    this.ie10 = false;
    this.ie9 = false;
    this.safari = false;
    this.chrome = false;
    this.firefox = false;
    this.opera = false;
    this.webview = false;

    this.checkDevice();
    this.checkOs();
    this.checkBrowser();

    this.addBodyClass();
    if (this.isLog) this.displayLog();
  }

  checkDevice() {
    if ((this.ua.indexOf('android') > 0
    && this.ua.indexOf('mobile') == -1)
    || this.ua.indexOf('a1_07') > 0
    || this.ua.indexOf('sc-01c') > 0
    || this.ua.indexOf('ipad') > 0)
      this.tablet = true;
    else if ((this.ua.indexOf('iphone') > 0
    && this.ua.indexOf('ipad') == -1)
    || this.ua.indexOf('ipod') > 0
    || (this.ua.indexOf('android') > 0
    && this.ua.indexOf('mobile') > 0))
      this.mobile = true;
    else
      this.pc = true;
  }

  checkOs() {
    if (this.ua.match(/win(dows )?/)) {
      this.windows = true;
    } else if (this.ua.match(/iphone|ipad/)) {
      this.ios = true;
    } else if (this.ua.match(/mac|ppc/)) {
      this.mac = true;
    } else if (this.ua.match(/android ([\.\d]+)/)) {
      this.android = true;
    } else if (this.ua.match(/linux/)) {
      this.linux = true;
    }
  }

  checkBrowser() {
    if(this.ua.indexOf('msie') != -1
    || this.ua.indexOf('trident') != -1) {
      if (this.av.indexOf("msie 9.") > -1){
        this.ie9 = true;
      }else if (this.av.indexOf("msie 10.") > -1){
        this.ie10 = true;
      }else{
        this.ie11 = true;
      }
    } else if(this.ua.indexOf('edge') != -1) {
      this.edge = true;
    } else if(this.ua.indexOf('chrome') != -1) {
      this.chrome = true;
    } else if(this.ua.indexOf('safari') != -1) {
      this.safari = true;
    } else if(this.ua.indexOf('firefox') != -1) {
      this.firefox = true;
    } else if(this.ua.indexOf('opera') != -1) {
      this.opera = true;
    } else {
      this.webview = true;
    }
  }

  addBodyClass() {
    var body = document.body;
    (this.pc) ? body.classList.add('pc') : body.classList.add('no-pc');
    (this.tablet) ? body.classList.add('tablet') : body.classList.add('no-tablet');
    (this.mobile) ? body.classList.add('mobile') : body.classList.add('no-mobile');

    (this.mac) ? body.classList.add('mac') : body.classList.add('no-mac');
    (this.linux) ? body.classList.add('linux') : body.classList.add('no-linux');
    (this.ios) ? body.classList.add('ios') : body.classList.add('no-ios');
    (this.android) ? body.classList.add('android') : body.classList.add('no-android');

    (this.edge) ? body.classList.add('edge') : body.classList.add('no-edge');
    (this.ie11) ? body.classList.add('ie11') : body.classList.add('no-ie11');
    (this.ie10) ? body.classList.add('ie10') : body.classList.add('no-ie10');
    (this.ie9) ? body.classList.add('ie9') : body.classList.add('no-ie9');
    (this.safari) ? body.classList.add('safari') : body.classList.add('no-safari');
    (this.chrome) ? body.classList.add('chrome') : body.classList.add('no-chrome');
    (this.firefox) ? body.classList.add('firefox') : body.classList.add('no-firefox');
    (this.opera) ? body.classList.add('opera') : body.classList.add('no-opera');
    (this.webview) ? body.classList.add('webview') : body.classList.add('no-webview');
  }

  displayLog() {
    console.log(
      'userAgent ' + this.ua
    );

    var logText;

    logText = '';
    logText += 'device  ';
    logText += (this.pc)     ? '%cpc%c' : 'pc';
    logText += (this.tablet) ? ', %ctablet%c' : ', tablet';
    logText += (this.mobile) ? ', %cmobile%c' : ', mobile';
    console.log(logText, 'color: red', '');

    logText = '';
    logText += 'OS      ';
    logText += (this.mac)     ? '%cmac%c' : 'mac';
    logText += (this.windows) ? ', %cwindows%c' : ', windows';
    logText += (this.linux)   ? ', %clinux%c' : ', linux';
    logText += (this.ios)     ? ', %cios%c' : ', ios';
    logText += (this.android) ? ', %candroid%c' : ', android';
    console.log(logText, 'color: red', '');

    logText = '';
    logText += 'browser ';
    logText += (this.edge)    ? '%cedge%c' : 'edge';
    logText += (this.ie11)    ? ', %cie11%c' : ', ie11';
    logText += (this.ie10)    ? ', %cie10%c' : ', ie10';
    logText += (this.ie9)     ? ', %cie9%c' : ', ie9';
    logText += (this.safari)  ? ', %csafari%c' : ', safari';
    logText += (this.chrome)  ? ', %cchrome%c' : ', chrome';
    logText += (this.firefox) ? ', %cfirefox%c' : ', firefox';
    logText += (this.opera)   ? ', %copera%c' : ', opera';
    logText += (this.webview) ? ', %cwebview%c' : ', webview';
    console.log(logText, 'color: red', '');
  }
}

window.UserAgent = new UserAgent();
