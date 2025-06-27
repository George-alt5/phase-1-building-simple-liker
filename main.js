// Add event listener after DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  const errorModal = document.getElementById("modal");
  errorModal.classList.add("hidden"); // Hide the error modal on page load

  const hearts = document.querySelectorAll(".like-glyph");

  hearts.forEach((heart) => {
    heart.addEventListener("click", () => {
      mimicServerCall()
        .then(() => {
          if (heart.textContent === "♡") {
            heart.textContent = "♥";
            heart.classList.add("activated-heart");
          } else {
            heart.textContent = "♡";
            heart.classList.remove("activated-heart");
          }
        })
        .catch((error) => {
          // Show error modal
          const errorMessage = document.getElementById("modal-message");
          errorMessage.textContent = error;
          errorModal.classList.remove("hidden");

          // Hide modal after 3 seconds
          setTimeout(() => {
            errorModal.classList.add("hidden");
          }, 3000);
        });
    });
  });
});

// Provided mock server function
function mimicServerCall(url = "http://mimicServer.example.com", config = {}) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      let isRandomFailure = Math.random() < 0.2;
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
