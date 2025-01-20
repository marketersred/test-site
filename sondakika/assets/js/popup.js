// Modal: notification-popup
const popup = document.getElementById('notification-popup');
const allowButton = document.getElementById('popup-allow');
const closeButton = document.getElementById('popup-close');

function closeModal() {
    if (popup) {
        popup.style.display = 'none';
        document.cookie = "popupClosed=true; path=/; max-age=" + 7 * 24 * 60 * 60;
    }
}

function isPopupClosed() {
    return document.cookie.split('; ').some(cookie => cookie.startsWith('popupClosed=true'));
}

if (!isPopupClosed() && popup) {
    popup.style.display = 'block';
}

if (allowButton) allowButton.addEventListener('click', closeModal);
if (closeButton) closeButton.addEventListener('click', closeModal);

// Consent bar: cconsent-bar
const consentBar = document.getElementById('cconsent-bar');
const editButton = document.querySelector('.ccb__edit');
const giveButton = document.querySelector('.ccb__button');

function closeConsentBar() {
    if (consentBar) {
        consentBar.style.display = 'none';
        document.cookie = "consentGiven=true; path=/; max-age=" + 7 * 24 * 60 * 60;
    }
}

function isConsentGiven() {
    return document.cookie.split('; ').some(cookie => cookie.startsWith('consentGiven=true'));
}

if (!isConsentGiven() && consentBar) {
    consentBar.style.display = 'block';
}

if (giveButton) giveButton.addEventListener('click', closeConsentBar);
if (editButton) editButton.addEventListener('click', closeConsentBar);
