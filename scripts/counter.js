function createElement(tag, className, textContent, parent) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (textContent) element.textContent = textContent;
  if (parent) parent.appendChild(element);
  return element;
}

// make two digits by padding with zero if needed
// create structure once
function initCounter() {
  const countdownElement = document.getElementById('countdown');
  const timeUnits = ['Dni', 'Godziny', 'Minuty', 'Sekundy'];
  timeUnits.forEach(unit => {
    const section = document.createElement('span');
    section.className = 'counter-section';

    createElement('span', 'counter-label', unit, section);
    createElement('span', 'counter-digit one', '0', section);
    createElement('span', 'counter-digit two', '0', section);
    countdownElement.appendChild(section);
  });
}

// just update created counter
function updateCountdown() {
  const targetDate = new Date('2026-05-10T12:00:00').getTime();
  const now = new Date().getTime();
  const difference = targetDate - now;

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((difference / 1000 / 60) % 60);
  const seconds = Math.floor((difference / 1000) % 60);

  const countdownElement = document.getElementById('countdown');
  const sections = countdownElement.querySelectorAll('.counter-section');

  const values = [days, hours, minutes, seconds];
  sections.forEach((section, index) => {
    const digitOne = section.querySelector('.one');
    const digitTwo = section.querySelector('.two');
    const digits = String(values[index]).padStart(2, '0').split(''); // fix it to split into two digits
    digitOne.textContent = digits[0];
    digitTwo.textContent = digits[1];
  });
}

document.addEventListener('DOMContentLoaded', function() {
  initCounter();
  updateCountdown();
  setInterval(updateCountdown, 1000);
});