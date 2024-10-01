function togglePassword() {
  var passwordInput = document.getElementById("password");
  var toggleButton = document.getElementsByClassName("password-toggle");
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    
  } else {
    passwordInput.type = "password";
    toggleButton.classList.add("fa-eye");
    toggleButton.classList.remove("fa-eye-slash");
  }
}