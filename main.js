const url = 'http://localhost:3000';

function logout(){
    window.location.replace("index.html");
};

function change(){
    let newpwd = prompt('Enter new Password: ');
    fetch(url + '/change', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            pwd: newpwd
        })
    }).then(res => {
        return res.json();
    }).then(data => {
        if(data) window.location.replace("main.html");
        else{alert("Username or Password are incorrect. Please try again.");
        reset(); } 
    }).catch(() => console.log('ERROR LOGIN'))
};

function greet(){
    fetch(url + '/identify'
        ).then(res => {
            return res.json();
        }).then(data => document.getElementById('user_greeting').innerHTML = 'Welcome ' + JSON.stringify(data[0]["name"])
        ).catch(() => console.log('ERROR GREETING'))

};
greet();

function update(){
    fetch(url + '/update'
        ).then(res => {
            return res.json();
        }).then(data => {
            document.getElementById('time_in').innerHTML = data[0]["time_in"];
            console.log(data[0]["time_in"]);
            document.getElementById('time_out').innerHTML = data[0]["time_out"];
        }).catch(() => console.log('ERROR TIME'))
};
update();

function startTime() {
    let today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById("clock").innerHTML =
    h + ":" + m + ":" + s;
    let t = setTimeout(startTime, 500);
};

function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
};

function msToTime(millisec) {
    var seconds = (millisec / 1000).toFixed(0);
    var minutes = Math.floor(seconds / 60);
    var hours = "";
    if (minutes > 59) {
        hours = Math.floor(minutes / 60);
        hours = (hours >= 10) ? hours : "0" + hours;
        minutes = minutes - (hours * 60);
        minutes = (minutes >= 10) ? minutes : "0" + minutes;
    }

    seconds = Math.floor(seconds % 60);
    seconds = (seconds >= 10) ? seconds : "0" + seconds;
    if (hours != "") {
        return hours + ":" + minutes + ":" + seconds;
    }
    return minutes + ":" + seconds;
}


function showDate(x=0){
    let d = new Date();
    document.getElementById("currdate").innerHTML = d.toDateString();
    document.getElementById("currddate").innerHTML = d.toDateString();
    let old = new Date();
    old.setDate(d.getDate() - 5);    
    /*let inrep_start = document.getElementById('startDate').value;
    let inmiss_start = document.getElementById('starttDate').value;
    let report_start = document.getElementById('olddate');
    let missing_start = document.getElementById('oldddate');
    inrep_start != null ? report_start.innerHTML = inrep_start : report_start.innerHTML = date;
    inmiss_start != null ? missing_start.innerHTML = inmiss_start : missing_start.innerHTML = date; */
    document.getElementById("olddate").innerHTML = old.toDateString();
    document.getElementById("oldddate").innerHTML = old.toDateString();
};
showDate();

function chooseDate(){
    
};

let counter1 = 0;
function timeIn(){
    if(counter1 === 0){
        let d = new Date();
        let n = d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
        document.getElementById("time_in").innerHTML = n;
        console.log("in");
        counter1++;
        fetch(url + '/timein'
        ).then(res => {
            return res.json();
        }).then(data => console.log(data)
        ).catch(() => console.log('ERROR'))
    }
};

let counter2 = 0;
function timeOut(){
    let check = document.getElementById("overwrite");
    if(check.checked || counter2 === 0){
        let d = new Date();
        let n = d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
        document.getElementById("time_out").innerHTML = n;
        console.log("out");
        counter2++;
        fetch(url + '/timeout'
        ).then(res => {
            return res.json();
        }).then(data => console.log(data)
        ).catch(() => console.log('ERROR1'))
        fetch(url + '/workedtoday'
        ).then(res => {
            return res.json();
        }).then(data => console.log(data)
        ).catch(() => console.log('ERROR2'))
        updateHourDetails();
    }
};

function updateHourDetails(){
    fetch(url + '/hours'
    ).then(res => {
        return res.json();
    }).then(data => document.getElementById('hours-worked').innerHTML = msToTime(data[0]["SUM(time_diff)"])
    ).catch(() => console.log('ERROR3'))
    fetch(url + '/threshold'
    ).then(res => {
        return res.json();
    }).then(data => document.getElementById("threshold").innerHTML = data
    ).catch(() => console.log('ERROR4'))
    fetch(url + '/leaves'
    ).then(res => {
        return res.json();
    }).then(data => document.getElementById("leaves").innerHTML = data
    ).catch(() => console.log('ERROR5'))
};
updateHourDetails();

function violations() {
    let worked = document.getElementById('hours-worked').value;
    let threshold = document.getElementById('threshold').value;
    document.getElementById('violations') = threshold - worked;
};
violations();

function viewReport(){

};

function requestMissing(){

};