let SCRIPT_CONFIG = {
  campaignId: 'EsmexBit App || 1 & EBA',
  language: 'TR',
  defaultCountry: 'TR',
  successMessage: 'Abone olduğunuz için teşekkür ederiz!',
  loadingMessage: 'Yükleniyor...',
  existingAccountMessage: 'Kayıt engellendi - hesap zaten var.',
  errorMessage: 'Beklenmedik bir hata oluştu, lütfen verilerinizi kaydedip daha sonra tekrar deneyin.',
  emptyFormMessage: 'Eksik form, lütfen boş alanları doldurun.'
}

const redirectMap = {
  TR: '/kaydoldugunuz.html',
  GB: '/thanks.html',
  US: '/thanks.html',
}

jQuery.noConflict()
jQuery(document).ready(function () {
  setUpConfig()
  setupIntlTelInput()
  initializeForm()
})

let iti;

function setupIntlTelInput() {
  const input = document.querySelector('#phone')
  if (!input) {
    console.error('Phone input element not found.');
    return;
  }

  iti = window.intlTelInput(input, {
    initialCountry: 'auto',
    autoHideDialCode: false,
    nationalMode: false,
    preferredCountries: [
      SCRIPT_CONFIG.defaultCountry,
      'us', 'gb', 'fr', 'it', 'tr'
    ],
    geoIpLookup: function (callback) {
      fetch('https://ipinfo.io/json')
        .then(response => response.json())
        .then((data) => {
          const countryCode = data.country ? data.country : SCRIPT_CONFIG.defaultCountry;
          callback(countryCode);
        })
        .catch(() => callback(SCRIPT_CONFIG.defaultCountry))
    },
    utilsScript:
      'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js'
  })
  input.addEventListener('input', function () { // phone input rules to accomodate platforms
    const dialCode = iti.getSelectedCountryData().dialCode;   
    const rawInput = input.value.replace(/[^\d]/g, '');   // just digits
    let withoutDialCode = rawInput.replace(dialCode, '');   

    if (rawInput.length < dialCode.length) {
      input.value = `+${dialCode}`; // Reset to just the country code if the user tries to delete it.
    }
    if (!input.value.startsWith(`+${dialCode}`)) {  
      input.value = `+${dialCode}${withoutDialCode}`;
    }
  });

  input.addEventListener('keypress', function (e) {
    const char = String.fromCharCode(e.which);
    if (!/[\d]/.test(char)) {
      e.preventDefault();
    }
  });

  // console.log('IntlTelInput initialized successfully.');

}

function initializeForm() {
  jQuery('#form-request').submit(function (event) {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoadingModal(true)
    const requestData = getFormData()
    if (!requestData) {
      setLoadingModal(false); // Hide loading modal if requestData is invalid
      return;
    }
    submitForm(requestData)
  })
}



function getFormData() {
  let phone = iti.isValidNumber() ? iti.getNumber() : '';
  if (!phone) {
    alert('Please enter a valid phone number.');
    return false;
  }
  
  const utm_p1 = localStorage.getItem('utm_p1') || new URLSearchParams(window.location.search).get('utm_p1') || '';
  const utm_p2 = localStorage.getItem('utm_p2') || new URLSearchParams(window.location.search).get('utm_p2') || '';
  // const adclid = localStorage.getItem('adclid') || new URLSearchParams(window.location.search).get('adclid') || '';
  const widget_id = localStorage.getItem('widget_id') || new URLSearchParams(window.location.search).get('widget_id') || '';

  return {
    firstName: jQuery('#firstName').val(),
    lastName: jQuery('#lastName').val(),
    email: jQuery('#email').val(),
    phone: phone,
    country: iti.getSelectedCountryData().iso2.toUpperCase(), //document.querySelector('.iti__selected-flag .iti__flag').classList[1].toUpperCase().slice(-2),
    campaign: SCRIPT_CONFIG.campaignId,
    language: SCRIPT_CONFIG.language,
    tag: utm_p1,
    tag1: utm_p2,
    tag2: widget_id,
    // affiliateTransactionId: adclid,
  }
}

function submitForm(requestData) {
  console.log("Final postData for AJAX request:", requestData);

  const postData = new URLSearchParams({
    firstName: requestData.firstName,
    lastName: requestData.lastName,
    email: requestData.email,
    phone: requestData.phone,
    country: requestData.country,
    campaign: requestData.campaign,
    language: requestData.language,
    tag: requestData.tag,
    tag1: requestData.tag1,
    tag2: requestData.tag2,
    // affiliateTransactionId: requestData.affiliateTransactionId,
  });
 

  jQuery.ajax({
    // url: 'https://post-tb-us.developer76543.workers.dev', // /request.php
    url:  'https://post-tb-ownggl.devmaltay01.workers.dev',
    type: 'POST',
    contentType: 'application/x-www-form-urlencoded charset=UTF-8',
    data: postData.toString(),
    dataType: 'json',
    success: function (response) {
      console.log('API Response:', response);

      if (response.status === 'success') {
        const redirectObject = response.result?.addonData?.data;
        const redirectUrl = redirectObject?.loginURL;
    
        const defaultUrl = redirectMap[requestData.country] || '/kaydoldugunuz2.html';
    
        if (redirectUrl) {
       //   console.log('Passing redirect URL via query parameter:', redirectUrl);
        
          window.location.href = `${defaultUrl}?redirect=${encodeURIComponent(redirectUrl)}`;
        } else {   
          window.location.href = defaultUrl;
        }
      } else {
        finalMessage(response.result);
      }
    },
    error: function (error) {
      console.log(error)
      finalMessage(error.result || 'An error occurred')
      setLoadingModal(false)
    },
    complete: function () {
      setLoadingModal(false)
    }
  })
}

function validateForm(formId, phoneId) {
  let firstName, lastName, email, phone;

  if (formId === '#form-request') {
    firstName = jQuery('#firstName').val()?.trim();
    lastName = jQuery('#lastName').val()?.trim();
    email = jQuery('#email').val()?.trim();
    phone = jQuery(phoneId).val()?.trim();

    console.log({
      firstName,
      lastName,
      email,
      phone,
      phoneValid: iti.isValidNumber()
    });

    if (!firstName || !lastName || !email || !phone || !iti.isValidNumber()) {
      alert(SCRIPT_CONFIG.emptyFormMessage);
      return false;
    }
    if (!phone || !iti.isValidNumber()) {
      alert('Please enter a valid phone number .');
      return false; 
    }
  } 
  return true;
}


function finalMessage(responseText) {
  const modal = jQuery('#modal')
  const message = jQuery('#modal-message')
  const body = jQuery('body')

  let label = SCRIPT_CONFIG.errorMessage + `  (${responseText})`
  if (responseText === undefined) {
    label = SCRIPT_CONFIG.successMessage
  } else if (responseText.toLowerCase().includes('account already exists')) {
    label = SCRIPT_CONFIG.existingAccountMessage + ' (' + responseText + ')'
  } else {
    label = SCRIPT_CONFIG.errorMessage + ' (' + responseText + ')'
  }

  message.text(label)
  modal.css('display', 'flex')
  body.addClass('on-modal')

  setTimeout(function () {
    modal.css('display', 'none')
    body.removeClass('on-modal')
  }, 2000)
}

function setLoadingModal(newValue) {
  const modal = jQuery('#modal2')
  const message = jQuery('#modal2-message')
  const body = jQuery('body')

  if (newValue) {
    message.text(SCRIPT_CONFIG.loadingMessage)
    modal.css('display', 'flex')
    body.addClass('on-modal')
  } else {
    modal.css('display', 'none')
    body.removeClass('on-modal')
  }
}

function scrollToSection() {
  const section = document.getElementById('form-request')
  const rect = section.getBoundingClientRect()
  const offset =
    rect.top + window.pageYOffset - window.innerHeight / 2 + rect.height / 2 - 100
  window.scrollTo({
    top: offset,
    behavior: 'smooth'
  })
} 

function setUpConfig() {
  const userLang = window.location.pathname.split('/')[1]

  const EN = {
    language: 'EN',
    defaultCountry: 'EN',
    successMessage: 'Thank you for subscribing!',
    loadingMessage: 'Loading...',
    existingAccountMessage: 'Registration blocked - account already exists.',
    errorMessage: 'An unexpected error occurred, please save your data and try again later.',
    emptyFormMessage: 'Incomplete form, please fill in the empty fields.'

  }

  const FR = {
    language: 'FR',
    defaultCountry: 'FR',
    successMessage: "Merci de vous être abonné !",
    loadingMessage: 'Chargement...',
    existingAccountMessage: 'Inscription bloquée - le compte existe déjà.',
    errorMessage: "Une erreur inattendue s'est produite, veuillez enregistrer vos données et réessayer plus tard.",
    emptyFormMessage: 'Formulaire incomplet, veuillez remplir les champs vides.'
  }

  const IT = {
    language: 'IT',
    defaultCountry: 'IT',
    successMessage: 'Grazie per esserti iscritto!',
    loadingMessage: 'Caricamento...',
    existingAccountMessage: "Registrazione bloccata - l'account esiste già.",
    errorMessage: 'Si è verificato un errore imprevisto, per favore salva i tuoi dati e riprova più tardi.',
    emptyFormMessage: 'Modulo incompleto, per favore riempi i campi vuoti.'
  }

  const languageLabels = {
    'en': EN,
    'fr': FR,
    'it': IT
  }

  SCRIPT_CONFIG = { ...SCRIPT_CONFIG, ...languageLabels[userLang] }
}

