


var signup=function(){
  let password=document.querySelector(".password").value;
  let confirmPassword=document.querySelector(".confirm-password").value;
  if(password==confirmPassword){
    window.alert("Sign up successful!");
  }
  else{
    window.alert("Password and confirm password do not match!");
  }
}
