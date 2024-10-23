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

var login=function(){
  let email=document.querySelector(".email").value;
  let password=document.querySelector(".password").value;
  if(!email_check(email)){
    window.alert("Email is not valid!");
  }
  else if(password==confirmPassword){
    window.alert("Login successful!");
  }
}

