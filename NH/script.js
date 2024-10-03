let signupBtn=document.getElementById("signupBtn");
let loginBtn=document.getElementById("loginBtn");
let nameField=document.getElementById("nameField");
let title=document.getElementById("title");
let signupForm=document.getElementById("signupForm");

loginBtn.onclick=function(){
  nameField.style.maxHeight="0";
  title.innerHTML="Log in";
  signupBtn.classList.add("disable");
  loginBtn.classList.remove("disable");
}

signupBtn.onclick=function(){
  nameField.style.maxHeight="60px";
  title.innerHTML="Sign up";
  signupBtn.classList.remove("disable");
  loginBtn.classList.add("disable");
}

signupForm.onsubmit = function(event){
  event.preventDefault(); // Ngăn chặn hành động gửi mặc định
  if (title.innerHTML === "Sign Up") {
    // Xử lý đăng ký
    let name = nameField.querySelector("input").value;
    let email = nameField.nextElementSibling.querySelector("input").value;
    let password = nameField.nextElementSibling.nextElementSibling.querySelector("input").value;

    // Thêm logic xử lý đăng ký ở đây
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Password:", password);
    alert("Sign up successful!");
    signupForm.reset();
  } else {
    // Xử lý đăng nhập
    let email = nameField.nextElementSibling.querySelector("input").value;
    let password = nameField.nextElementSibling.nextElementSibling.querySelector("input").value;

    // Thêm logic xử lý đăng nhập ở đây
    console.log("Email:", email);
    console.log("Password:", password);
                
    // Giả sử có một điều kiện kiểm tra thông tin đăng nhập
    if (email === "test@example.com" && password === "password") {
      alert("Log in successful!");
    } else {
      alert("Invalid email or password!");
    }
    signupForm.reset();
  }
}