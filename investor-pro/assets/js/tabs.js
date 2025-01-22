// Controls the FAQ accordion
document.querySelectorAll('[id^="question"]').forEach(function (button, index) {
  button.addEventListener('click', function () {
    var answer = document.getElementById('answer' + (index + 1))
    var arrow = document.getElementById('arrow' + (index + 1))

    if (answer.style.display === 'none' || answer.style.display === '') {
      // Hide all other answers
      document.querySelectorAll('[id^="answer"]').forEach(function (a) {
        a.style.display = 'none'
      })

      // Reset all arrows
      document.querySelectorAll('[id^="arrow"]').forEach(function (a) {
        a.style.transform = 'rotate(-180deg)'
      })

      // Show the clicked answer and rotate the corresponding arrow
      answer.style.display = 'block'
      arrow.style.transform = 'rotate(0deg)'
    } else {
      // Hide the answer and reset the arrow
      answer.style.display = 'none'
      arrow.style.transform = 'rotate(-180deg)'
    }
  })
})
