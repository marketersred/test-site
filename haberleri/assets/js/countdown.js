document.addEventListener('DOMContentLoaded', function () {
  let initialCountdown = 78 // Initial countdown value
  let initialMoney = 3172798 // Initial money value

  function decreaseCountdown () {
    const countdownElement = document.getElementById('countdown')
    let currentCount = parseInt(countdownElement.textContent)
    if (currentCount > 1) {
      countdownElement.textContent = currentCount - 1
    } else {
      document.getElementById('countdownMessage').innerHTML =
        'Bu sayfadan çıkarsanız eğer kaydınız silinecektir. Sayfayı kapatmadan başvurunuzu oluşturun.'
    }
  }

  function increaseMoney () {
    const moneyElement = document.getElementById('money')
    let currentMoney = parseInt(moneyElement.textContent)
    moneyElement.textContent =
      currentMoney + Math.floor(Math.random() * 1000 + 500)
  }

  setInterval(decreaseCountdown, 1000) // Countdown every second
  setInterval(increaseMoney, 1000) // Increase money every second
})

// --------------------

// Sayfanın yüklenmesiyle birlikte çalışacak fonksiyon
document.addEventListener('DOMContentLoaded', function () {
  // Başlangıç değerlerini belirle
  let initialCountdown = 37 // Geri sayım için başlangıç değeri
  let initialMoney = 3172798 // Para miktarı için başlangıç değeri

  // Geri sayımın azaltılması
  function decreaseCountdown () {
    const countdownElement = document.getElementById('countdown')
    let currentCount = parseInt(countdownElement.textContent)
    if (currentCount > 1) {
      // 1 yerine 0 yaparak, sayımın 1'de durmasını sağlayın
      countdownElement.textContent = currentCount - 1
    }
  }

  // Para miktarının artırılması
  function increaseMoney () {
    const moneyElement = document.getElementById('money')
    let currentMoney = parseInt(moneyElement.textContent)
    moneyElement.textContent =
      currentMoney + Math.floor(Math.random() * 1000 + 500) // Rastgele miktar ekle
  }

  // Sayıların güncellenmesi
  function updateNumbers () {
    decreaseCountdown()
    increaseMoney()
  }

  // Belirli aralıklarla güncelleme fonksiyonu
  setInterval(updateNumbers, 1000) // 1 saniye aralıklarla güncelle
})
