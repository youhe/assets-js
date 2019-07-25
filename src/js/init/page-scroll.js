const PageScroll = require('../modules/common/page-scroll').default;

export default function() {

  const elm = document.getElementById('js-pagetop');
  elm.addEventListener('click', ()=> {
    PageScroll(window.pageYOffset, 0);
  }, false);

};
