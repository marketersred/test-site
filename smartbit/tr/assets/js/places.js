let count = 26;

function decrement() {
  if (count > 8) {
    count--;
    document.getElementById("qntyPlaces").textContent = count;
    
  }
}

setInterval(decrement, 8000);
