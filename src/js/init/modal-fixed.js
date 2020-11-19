import ModalFixed from '../modules/common/modal-fixed.js';

export default function() {
  const open = document.querySelectorAll('.js-modal-open');
  const close = document.querySelectorAll('.js-modal-close');
  const modalElm = document.getElementById('js-modal');
  const modalInnerElm = document.getElementById('js-modal-inner');
  const opt = {
    modalInner: modalInnerElm,
    closeTime: 100
  };
  new ModalFixed(modalElm, open, close, opt);
};
