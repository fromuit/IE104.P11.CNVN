function togglePassword() {
  var passwordInput = document.getElementById("password");
  var athenticatedInput = document.getElementById("athenticated");
  var toggleButton = document.querySelector(".toggle-password");
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    toggleButton.textContent = "🙈";
  } else {
    passwordInput.type = "password";
    toggleButton.textContent = "👁️";
  }

}