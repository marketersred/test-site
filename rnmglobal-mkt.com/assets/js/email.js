emailjs.init("a3X6rggayM0ukJUMV");

  const form = document.getElementById("form-request");
  const modal = document.getElementById("contact-modal");
  const modalText = document.getElementById("modal-text");
  const closeModal = document.querySelector(".close");

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    document.body.style.overflow = "hidden";
    modal.style.display = "flex";
    modalText.textContent = "Sending...";

    const serviceID = "service_h5tjqvo";
    const templateID = "template_7m80339";

    const params = {
      name: document.getElementById("firstName").value,
      lastName: document.getElementById("lastName").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
      message: document.getElementById("message").value
    };

    emailjs.send(serviceID, templateID, params)
      .then(() => {
        modalText.textContent = "Mail sent successfully!";
        form.reset();
      })
      .catch((error) => {
        modalText.textContent = "Error sending message. Please try again.";
        console.error("Error sending:", error);
      })
      .finally(() => {
        setTimeout(() => {
          modal.style.display = "none";
          document.body.style.overflow = "auto";
        }, 5000);
      });
  });

  closeModal.onclick = function () {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  };

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
      document.body.style.overflow = "auto";
    }
  };