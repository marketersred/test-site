document
  .getElementById('investmentForm')
  .addEventListener('submit', function (event) {
    event.preventDefault()
    var investment = parseFloat(document.getElementById('investment').value)
    var earnings = investment * 28.5
    document.getElementById('result').innerText =
      'I tuoi guadagni saranno: €' + earnings.toFixed(2)
  })
