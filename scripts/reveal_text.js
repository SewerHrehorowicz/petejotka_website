const letterDelay = 20;
const revealDelay = 50;

function typeText(element, html) {
  const parts = html.split(/<br\s*\/?>/i);
  element.innerHTML = '';

  let partIndex = 0;

  function typePart() {
    if (partIndex >= parts.length) return;

    const text = parts[partIndex];
    let charIndex = 0;

    const span = document.createElement('span');
    element.appendChild(span);

    const interval = setInterval(() => {
      span.textContent += text[charIndex] || '';
      charIndex++;

      if (charIndex >= text.length) {
        clearInterval(interval);

        partIndex++;

        if (partIndex < parts.length) {
          element.appendChild(document.createElement('br'));
        }

        setTimeout(typePart, revealDelay);
      }
    }, letterDelay);
  }

  typePart();
}

function countChars(html) {
  // usuwa <br> i liczy tylko znaki
  return html.replace(/<br\s*\/?>/gi, '').length;
}

function initRevealTexts() {
  const inlineButtons = document.querySelectorAll('.inline-button');

  inlineButtons.forEach(button => {
    const textElement = button.nextElementSibling;
    if (!textElement) return;

    const originalHTML = textElement.innerHTML;
    const charCount = countChars(originalHTML);
    const delay = charCount * letterDelay + revealDelay;

    const nextButton = textElement.nextElementSibling;
    const hasNextButton = nextButton && nextButton.classList.contains('inline-button');

    if (hasNextButton) {
      nextButton.style.display = 'none';
    }

    textElement.style.display = 'none';
    textElement.innerHTML = '';

    const handler = () => {
      textElement.style.display = 'inline-block';
      button.classList.add('hidden');
      button.style.display = 'none';

      typeText(textElement, originalHTML);

      if (hasNextButton) {
        setTimeout(() => {
          nextButton.style.display = 'inline-block';
        }, delay);
      }

      button.removeEventListener('click', handler);
    };

    button.addEventListener('click', handler);
  });
}

document.addEventListener('DOMContentLoaded', initRevealTexts);