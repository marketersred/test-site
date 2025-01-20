document.querySelectorAll('#cookie-button, #cookie-button1').forEach(button => {
    button.addEventListener('click', function() {
        const cookiePopup = document.querySelector('#cookie-popup');
        if (cookiePopup) {
            cookiePopup.style.display = 'none';
        }
    });
});
