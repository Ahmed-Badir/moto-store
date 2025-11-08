let username = document.querySelector("#username");
let email = document.querySelector("#email");
let password = document.querySelector("#password");
let regesterBtn = document.querySelector("#sign_up");

regesterBtn.addEventListener("click", function(e){
    e.preventDefault();
    
    if(username.value === "" || email.value === "" || password.value === ""){
        alert("⚠️ Please fill in all fields");
    } else {
        localStorage.setItem("username", username.value);
        localStorage.setItem("email", email.value);
        localStorage.setItem("password", password.value);
        
        alert("✓ Registration successful! Redirecting to login...");
        
        setTimeout(() => {
            window.location = "login.html";
        }, 1000);
    }
});