function togglePassword1() {
  var passwordInput = document.getElementById("password");
  var toggleButton = document.querySelector(".toggle-password1");
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    toggleButton.textContent = "🙈";
  } else {
    passwordInput.type = "password";
    toggleButton.textContent = "👁️";
  }

}