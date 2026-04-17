const letterDelay = 20;
const revealDelay = 50;

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

    const originalText = textElement.textContent;
    const delay = textElement.textContent.length * letterDelay + revealDelay;
    const nextButton = textElement.nextElementSibling;
    const hasNextButton = nextButton && nextButton.classList.contains('inline-button');
    
    if (hasNextButton) {
      nextButton.style.display = 'none';
      nextButton.classList.add('hidden');
    }
    textElement.textContent = '';
    
    button.addEventListener('click', () => {
      const width = button.offsetWidth;
      const height = button.offsetHeight;
      
      button.classList.add('hidden');
      button.removeEventListener('click', arguments.callee);
      button.style.marginRight = -width + 'px';
      textElement.style.marginTop = -height + 'px';
      typeText(textElement, originalText);
      
      if (hasNextButton) {
        setTimeout(() => {
          nextButton.style.display = 'inline-block';
          nextButton.classList.remove('hidden');
        }, delay);
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', function() {
  initRevealTexts();
});