// function togglePassword() {
//   var passwordInput = document.getElementById("password");
//   var toggleButton = document.getElementsByClassName("password-toggle");
//   if (passwordInput.type === "password") {
//     passwordInput.type = "text";
    
//   } else {
//     passwordInput.type = "password";
//     toggleButton.classList.add("fa-eye");
//     toggleButton.classList.remove("fa-eye-slash");
//   }
// }
function togglePassword() {
  var toggleButton = document.querySelector(".password-toggle");
  var passwordInput = document.getElementById("password");
  var button = toggleButton.textContent;
  if (button === "👁️") {
    toggleButton.textContent = "🙈";
    passwordInput.type = "text";
  } else {
    toggleButton.textContent = "👁️";
    passwordInput.type = "password";
  }
} 

var content = togglePassword();
console.log(content);
