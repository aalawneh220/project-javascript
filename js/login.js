let storedEmail = localStorage.getItem("allUsers");
let storedEm = JSON.parse(storedEmail);
let email = document.getElementById("email");
let passphrase = document.getElementById("passphrase");

let form = document.getElementById("logForm");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (email.value && passphrase.value) {
    storedEm.forEach((element) => {
      if (
        email.value == element.email &&
        passphrase.value == element.password
      ) {
        setTimeout(() => {
          window.location.href = "dashboard.html";
        }, 500);
      } else {
        setTimeout(() => {
          alert("Incorrect email or Password.");
        }, 1000);
      }
    });
  }
});
