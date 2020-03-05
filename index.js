
const url = 'http://localhost:3000';

let input = document.getElementById("pwd");

input.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      document.getElementById("login").click();
    }
  });

function login(user, password) {
    fetch(url + '/auth', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: user,
            pwd: password
        })
    }).then(res => {
        return res.json();
    }).then(data => {
        if(data) window.location.replace("main.html");
        else{alert("Username or Password are incorrect. Please try again.");
        reset(); } 
    }).catch(() => console.log('ERROR LOGIN'))
    

};

function reset(){
    document.getElementById("user").value = "";
    document.getElementById("pwd").value = "";
};