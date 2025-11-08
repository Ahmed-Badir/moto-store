let username = document.querySelector("#username");
let password = document.querySelector("#password");
let loginBtn = document.querySelector("#sign_in");

let getUsername = localStorage.getItem("username");
let getpassword = localStorage.getItem("password");

loginBtn.addEventListener("click", function(e){
    e.preventDefault();
    
    if(username.value === "" || password.value === ""){
        alert("⚠️ Please fill in all fields");
    } else {
        if(getUsername && getUsername.trim() === username.value.trim() && getpassword && getpassword.trim() === password.value.trim()){
            alert("✓ Login successful! Welcome back!");
            setTimeout(() => {
                window.location = "index.html"; 
            }, 1000);
        } else {
            alert("❌ Username or password is incorrect");
        }
    }
});