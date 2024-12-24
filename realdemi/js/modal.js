document.addEventListener("DOMContentLoaded", () => {
  const modalTriggers = document.querySelectorAll('.package-modalTrigger');

  document.addEventListener('click', (e) => {

    if (e.target.classList.contains('package-modalTrigger')) {
      const index = [...modalTriggers].indexOf(e.target);
      const modal = document.querySelectorAll('.modal')[index];
      modal.classList.add('active');
    }

    if (e.target.classList.contains('modal-close')) {
      const modal = e.target.closest('.modal');
      closeModal(modal);
    }

    if (e.target.classList.contains('modal')) {
      closeModal(e.target);
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal.active').forEach((modal) => {
        closeModal(modal);
      });
    }
  });

  function closeModal(modal) {
    modal.classList.remove('active');
  }
});




 