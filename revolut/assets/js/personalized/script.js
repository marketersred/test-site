setInterval(() => {
  document.querySelectorAll("a:not(.terms):not(.privacy)").forEach(a => a.href = "#form-request");
}, 1000);


  window.addEventListener("load", () => {
        const section = document.getElementById("27a4b0fb-ab96-486d-b6a4-41c83883a4de");
        if (section) {
            const newElement = document.createElement("div");
            newElement.innerHTML = `
              <form id="form-request">
                <input class="input" required type="text" id="firstName" placeholder="Isim" />
                <input class="input" required type="text" id="lastName" placeholder="Soyad" />
                <input class="input" required type="email" id="email" placeholder="E-posta" />
                <input class="input" required type="tel" id="phone" placeholder="Posta" />
                <div class="form-group input-wrapper">
                  <div class="terms-div">
                  <input type="checkbox" id="termsCheckbox" checked required />
                    <p>Application <a class="terms" href="./terms.html" target="_blank"><u>terms and conditions</u></a> 
                    and <a class="privacy" href="./privacy.html" target="_blank"><u>privacy policy</u></a> 
                    ave been read and accepted by me.</p>
                  </div>
                </div>
                <button type="submit" id="submit-request">Submit</button>
              </form>
            `;
            section.appendChild(newElement);
        }
});


