function email_check(email){
  const email_pattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return email_pattern.test(email);
}


var signup=function(){
  let password=document.querySelector(".password").value;
  let confirmPassword=document.querySelector(".confirm-password").value;
  let email_check=document.querySelector(".email").value;
  if(!email_check){
    window.alert("Email is not valid!");
  }
  else if(password==confirmPassword){
    window.alert("Sign up successful!");
    return;
  }
  else{
    window.alert("Password and confirm password do not match!");
  }
}

// NH/script.js
var login = function(event){
  event.preventDefault(); // Ngăn chặn hành vi mặc định của form khi submit
  let email = document.querySelector(".email").value;
  let password = document.querySelector(".password").value;
  if(!email_check(email)){
    window.alert("Email is not valid!");
  }
  else {
    window.alert("Login successful!");
  }
}

