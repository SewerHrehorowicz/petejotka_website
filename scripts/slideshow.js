const imagesCycleInterval = 2000;

function initCycleImages() {
  document.querySelectorAll('.images-cycle').forEach(container => {
    const images = container.querySelectorAll('img');
    if (images.length === 0) return;
    
    const interval = parseInt(container.dataset.interval);
    if (isNaN(interval)) interval = imagesCycleInterval;
    
    let index = 0;

    images[0].classList.add('active');

    setInterval(() => {
      images[index].classList.remove('active');
      index = (index + 1) % images.length;
      images[index].classList.add('active');
    }, interval);
  });
}

document.addEventListener('DOMContentLoaded', function () {
  initCycleImages();
});