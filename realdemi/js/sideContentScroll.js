/* 
document.addEventListener("DOMContentLoaded", () => {
  let currentIndex = 0;
  const articles = document.querySelectorAll('.educationArticle');
  const scrollUpButton = document.getElementById('scroll-up');
  const scrollDownButton = document.getElementById('scroll-down');

  const updateActiveContent = () => {
    articles.forEach((article, index) => {
      article.classList.toggle('active', index === currentIndex);
    });
  };

  scrollUpButton.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateActiveContent();
    }
  });

  scrollDownButton.addEventListener('click', () => {
    if (currentIndex < articles.length - 1) {
      currentIndex++;
      updateActiveContent();
    }
  });

  updateActiveContent();
}); */

document.addEventListener("DOMContentLoaded", () => {
  let currentIndex = 0;
  const articles = [...document.querySelectorAll('.educationArticle')];
  const scrollUpButton = document.getElementById('scroll-up');
  const scrollDownButton = document.getElementById('scroll-down');

  const updateActiveContent = () => {
    articles.forEach((article, index) => {
      article.classList.toggle('active', index === currentIndex);
      article.setAttribute('aria-hidden', index !== currentIndex);
    });
  };

  const scrollHandler = (direction) => {
    if (direction === 'up' && currentIndex > 0) currentIndex--;
    if (direction === 'down' && currentIndex < articles.length - 1) currentIndex++;
    updateActiveContent();
  };

  scrollUpButton.addEventListener('click', () => scrollHandler('up'));
  scrollDownButton.addEventListener('click', () => scrollHandler('down'));

  updateActiveContent();
});