function togglePassword2() {
  var passwordInput = document.getElementById("authenticated");
  var toggleButton = document.querySelector(".toggle-password2");
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    toggleButton.textContent = "🙈";
  } else {
    passwordInput.type = "password";
    toggleButton.textContent = "👁️";
  }

}