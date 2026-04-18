const revealSection = {
  buttonSelector: '[data-reveal-section]',
  map: new Map(),

  hide(elem) {
    elem.classList.add('hidden');
  },

  show(elem) {
    elem.classList.remove('hidden');
  },

  buttonClick(event) {
    const button = event.currentTarget;
    const section = revealSection.map.get(button);
    if (!section) return;

    revealSection.show(section);
    revealSection.hide(button);
  },

  init() {
    const buttons = document.querySelectorAll(this.buttonSelector);

    buttons.forEach(button => {
      const section = document.getElementById(button.dataset.revealSection);
      if (!section) return;

      this.map.set(button, section);
      this.hide(section);

      button.addEventListener('click', this.buttonClick);
    });
  }
};

document.addEventListener('DOMContentLoaded', () => {
  revealSection.init();
});