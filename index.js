let users = ['aimen'];
let passwords = ['123'];

var input = document.getElementById("pwd");

input.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      document.getElementById("login").click();
    }
  });

function login(user, password){
    let found = false;
    for(let i = 0; i < users.length; i++){
        if(users[i] === user || passwords[i] === password){
            window.location.replace("main.html");
            found = true;
        }
    }
    if(!found){
        alert("Username or Password are incorrect. Please try again.");
        reset();
    }

};

function reset(){
    document.getElementById("user").value = "";
    document.getElementById("pwd").value = "";
};