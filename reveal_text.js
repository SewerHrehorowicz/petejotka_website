const letterDelay = 20; // Delay in milliseconds between each letter
const revealDelay = 50; // Delay before starting to reveal text

function typeText(element, text) {
  let index = 0;
  element.textContent = '';
  
  const interval = setInterval(() => {
    element.textContent += text[index];
    index++;
    if (index >= text.length) {
      clearInterval(interval);
    }
  }, letterDelay);
}

function initRevealTexts() {
  const inlineButtons = document.querySelectorAll('.inline-button');

  inlineButtons.forEach(button => {
    const textElement = button.nextElementSibling;
    if (!textElement) return;

    const delay = textElement.textContent.length * letterDelay + revealDelay;
    const nextButton = textElement.nextElementSibling;
    if (nextButton && nextButton.classList.contains('inline-button')) {
      nextButton.style.display = 'none';
      nextButton.classList.add('hidden');
    }
      
    const originalText = textElement.textContent;
    textElement.textContent = '';
    
    button.addEventListener('click', () => {
      typeText(textElement, originalText);
      button.removeEventListener('click', arguments.callee);
      const width = button.offsetWidth;
      button.style.marginRight = -width + 'px';
      
      button.classList.add('hidden');
      if (nextButton && nextButton.classList.contains('hidden')) {
        setTimeout(() => {
          nextButton.style.display = 'inline-block'; // Show next button after text is revealed
          nextButton.classList.remove('hidden');
        }, delay);
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', function() {
  initRevealTexts();
});