document.addEventListener('DOMContentLoaded', function () {
  const burgerButton = document.getElementById('burger-button'); 
  const mobileNav = document.querySelector('.mobile-nav');

  //console.log(burgerButton, mobileNav)

  if (!burgerButton || !mobileNav) {
    console.error('Error: Elements not in DOM.');
    return;
  }

  burgerButton.addEventListener('click', function () {
    mobileNav.classList.toggle('active');
  });
});
