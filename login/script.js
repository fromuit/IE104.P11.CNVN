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
  if (athenticatedInput.type === "password") {
    athenticatedInput.type = "text";
    toggleButton.textContent = "🙈";
  } else {
    athenticatedInput.type = "password";
    toggleButton.textContent = "👁️";
  }

  if (athenticatedInput.value !== passwordInput.value) {
    alert("Passwords do not match");
  }
}