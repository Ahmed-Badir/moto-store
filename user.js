let userInfo = document.querySelector("#user_info");
let userData = document.querySelector("#user");
let links = document.querySelector("#links");
let usernameDisplay = document.querySelector("#username-display");

if (localStorage.getItem("username")) {
    if(links) links.remove();
    if(userInfo) userInfo.style.display = "flex";
    if(usernameDisplay) {
        usernameDisplay.innerHTML = localStorage.getItem("username");
    }
}

let logOutBtn = document.querySelector("#logout");
if(logOutBtn) {
    logOutBtn.addEventListener("click", function(e){
        e.preventDefault();
        localStorage.clear();
        setTimeout(() => {
            window.location = "login.html";
        }, 1000);
    });
}