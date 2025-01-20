let SCRIPT_CONFIG = {
  campaignId: 'prodemi',
  language: 'EN',
  defaultCountry: 'US',
  successMessage: 'Thank you for subscribing!',
  loadingMessage: 'Loading...',
  existingAccountMessage: 'Registration blocked - account already exists.',
  errorMessage:
    'An unexpected error occurred, please save your data and try again later.',
  emptyFormMessage: 'Incomplete form, please fill in the empty fields.'
}

const redirectMap = {
  GB: '/thanks.html',
  US: '/thanks.html',
  TR: '/kaydoldugunuz.html'
}

jQuery.noConflict()
jQuery(document).ready(function () {
  setupIntlTelInput()
  setUpConfig()
  // validateTerms() not using it
  initializeForm()
})

let iti

function setupIntlTelInput () {
  const input = document.querySelector('#phone')
  if (!input) {
    console.error('Phone input element not found.')
    return
  }

  iti = window.intlTelInput(input, {
    initialCountry: 'auto',
    autoHideDialCode: false,
    nationalMode: false,
    preferredCountries: [
      SCRIPT_CONFIG.defaultCountry,
      'us',
      'gb',
      'de',
      'fr',
      'it',
      'tr'
    ],
    geoIpLookup: function (callback) {
      fetch('https://ipinfo.io/json')
        .then(response => response.json())
        .then(data => {
          const countryCode = data.country
            ? data.country
            : SCRIPT_CONFIG.defaultCountry
          callback(countryCode)
        })
        .catch(() => callback(SCRIPT_CONFIG.defaultCountry))
    },
    utilsScript:
      'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js'
  })
  input.addEventListener('input', function () {
    // phone input rules to accomodate platforms
    const dialCode = iti.getSelectedCountryData().dialCode
    const rawInput = input.value.replace(/[^\d]/g, '') // just digits
    let withoutDialCode = rawInput.replace(dialCode, '')

    if (rawInput.length < dialCode.length) {
      input.value = `+${dialCode}` // Reset to just the country code if the user tries to delete it.
    }
    if (!input.value.startsWith(`+${dialCode}`)) {
      input.value = `+${dialCode}${withoutDialCode}`
    }
  })

  input.addEventListener('keypress', function (e) {
    const char = String.fromCharCode(e.which)
    if (!/[\d]/.test(char)) {
      e.preventDefault()
    }
  })

  // console.log('IntlTelInput initialized successfully.');
}

function initializeForm () {
  jQuery('#form-request').submit(function (event) {
    console.log('Form submission prevented.')
    event.preventDefault()
    if (!validateForm()) {
      return
    }

    setLoadingModal(true)
    const requestData = getFormData()
    submitForm(requestData)
  })
}

function getFormData () {
  let phone = iti.isValidNumber() ? iti.getNumber() : ''
  if (!phone) {
    alert('Please enter a valid phone number.')
    return false
  }

  const utm_p1 =
    localStorage.getItem('utm_p1') ||
    new URLSearchParams(window.location.search).get('utm_p1') ||
    ''
  const utm_p2 =
    localStorage.getItem('utm_p2') ||
    new URLSearchParams(window.location.search).get('utm_p2') ||
    ''
  const adclid =
    localStorage.getItem('adclid') ||
    new URLSearchParams(window.location.search).get('adclid') ||
    ''

  return {
    firstName: jQuery('#firstName').val(),
    lastName: jQuery('#lastName').val(),
    email: jQuery('#email').val(),
    phone: phone, // jQuery('#phone').val(),
    country: document
      .querySelector('.iti__selected-flag .iti__flag')
      .classList[1].toUpperCase()
      .slice(-2),
    campaign: SCRIPT_CONFIG.campaignId,
    language: SCRIPT_CONFIG.language,
    tag: utm_p1,
    tag1: utm_p2,
    affiliateTransactionId: adclid,
    subAffiliate: jQuery('#message').val(),
  }
}

function submitForm (requestData) {
  console.log('Final postData for AJAX request:', requestData)

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
    affiliateTransactionId: requestData.affiliateTransactionId,
    subAffiliate: requestData.subAffiliate, //document.getElementById('answersQuiz').value,
  })

    console.log(postData.toString());

  jQuery.ajax({
    // url: 'https://post-tb-bm.developer76543.workers.dev', // '/request.php',  // replaced the cf wrkr - check php for prev add
    url: 'https://post-tb-us.developer76543.workers.dev',
    type: 'POST',
    contentType: 'application/x-www-form-urlencoded',
    data: postData.toString(), //JSON.stringfy
    dataType: 'json',
    success: function (response) {
      console.log('API Response:', response)

      if (response.status === 'success') {
        const redirectObject = response.result?.addonData?.data
        const redirectUrl = redirectObject?.loginURL

        const defaultUrl = redirectMap[requestData.country] || '/thanks.html'

        if (redirectUrl) {
       // normaly uncommented   
       //    console.log('Passing redirect URL via query parameter:', redirectUrl);
       //   window.location.href = `${defaultUrl}?redirect=${encodeURIComponent( redirectUrl )}`
       // } else {
          window.location.href = defaultUrl
        }
      } else {
        finalMessage(response.result)
      }
    }
  })
}

function validateForm (formId, phoneId) {
  let firstName, lastName, email, phone

  if (formId === '#form-request') {
    firstName = jQuery(`${formId} #firstName`).val()?.trim()
    lastName = jQuery(`${formId} #lastName`).val()?.trim()
    email = jQuery(`${formId} #email`).val()?.trim()
    phone = jQuery(phoneId).val()?.trim()

    if (!firstName || !lastName || !email || !phone || !iti.isValidNumber()) {
      alert(SCRIPT_CONFIG.emptyFormMessage)
      return false
    }
  }
  return true
}

function validateTerms() {
  const checkbox = document.getElementById('termsCheckbox')
  const submitButton = document.getElementById('submit-request')

  submitButton.disabled = !checkbox.checked
  submitButton.classList.toggle('enabled', checkbox.checked)

  checkbox.addEventListener('change', function () {
    submitButton.disabled = !this.checked
    submitButton.classList.toggle('enabled', checkbox.checked)
  })
}

function finalMessage (responseText) {
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

  message
    .contents()
    .filter(function () {
      return this.nodeType === 3
    })
    .remove()
  message.prepend(document.createTextNode(label))

  modal.css('display', 'flex')
  body.addClass('on-modal')

  setTimeout(function () {
    modal.css('display', 'none')
    body.removeClass('modal-message')
  }, 2000)
}

function setLoadingModal (newValue) {
  const modal = jQuery('#modal2')
  const message = jQuery('#modal2-message')
  const body = jQuery('body')

  if (newValue) {
        message.text(SCRIPT_CONFIG.loadingMessage)
    message
      .contents()
      .filter(function () {
        return this.nodeType === 3 // Select only text nodes
      })
      .remove()
    message.prepend(document.createTextNode(SCRIPT_CONFIG.loadingMessage))

    modal.css('display', 'flex')
    body.addClass('modal-message')
  } else {
    modal.css('display', 'none')
    body.removeClass('modal-message')
  }
}

function scrollToSection () {
  const section = document.getElementById('form-request')
  const rect = section.getBoundingClientRect()
  const offset =
    rect.top +
    window.pageYOffset -
    window.innerHeight / 2 +
    rect.height / 2 -
    100
  window.scrollTo({
    top: offset,
    behavior: 'smooth'
  })
}

function setUpConfig () {
  const userLang = window.location.pathname.split('/')[1]

  const EN = {
    language: 'EN',
    defaultCountry: 'US',
    successMessage: 'Thank you for subscribing!',
    loadingMessage: 'Loading...',
    existingAccountMessage: 'Registration blocked - account already exists.',
    errorMessage:
      'An unexpected error occurred, please save your data and try again later.',
    emptyFormMessage: 'Incomplete form, please fill in the empty fields.'
  }

  const FR = {
    language: 'FR',
    defaultCountry: 'FR',
    successMessage: 'Merci de vous être abonné !',
    loadingMessage: 'Chargement...',
    existingAccountMessage: 'Inscription bloquée - le compte existe déjà.',
    errorMessage:
      "Une erreur inattendue s'est produite, veuillez enregistrer vos données et réessayer plus tard.",
    emptyFormMessage: 'Formulaire incomplet, veuillez remplir les champs vides.'
  }

  const IT = {
    language: 'IT',
    defaultCountry: 'IT',
    successMessage: 'Grazie per esserti iscritto!',
    loadingMessage: 'Caricamento...',
    existingAccountMessage: "Registrazione bloccata - l'account esiste già.",
    errorMessage:
      'Si è verificato un errore imprevisto, per favore salva i tuoi dati e riprova più tardi.',
    emptyFormMessage: 'Modulo incompleto, per favore riempi i campi vuoti.'
  }

  const languageLabels = {
    en: EN,
    fr: FR,
    it: IT
  }

  SCRIPT_CONFIG = { ...SCRIPT_CONFIG, ...languageLabels[userLang] }
}
