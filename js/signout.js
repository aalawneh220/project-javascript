function removeUser() {
  alert("You have logged out");

  localStorage.setItem("auth", false);
  window.location.href = "./login.html";
}
