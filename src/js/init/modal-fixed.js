import ModalFixed from '../modules/common/modal-fixed.js';

export default function() {

  const open = document.querySelectorAll('.js-modal-open');
  const close = document.querySelectorAll('.js-modal-close');
  const modal = document.getElementById('js-modal');
  new ModalFixed(modal, open, close);

};
