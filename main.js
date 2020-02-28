
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

function showDate(x=0){
    let d = new Date();
    let months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    let date = months[d.getMonth()] + ' '+ d.getDate() + ', ' + d.getFullYear();
    document.getElementById("currdate").innerHTML = date;
    document.getElementById("currddate").innerHTML = date;
    let old = new Date();
    old.setDate(d.getDate() - 5);
    date = months[old.getMonth()] + ' '+ old.getDate() + ', ' + old.getFullYear();
    document.getElementById("olddate").innerHTML = date;
    document.getElementById("oldddate").innerHTML = date;
};
showDate();

let counter1 = 0;
function timeIn(){
    if(counter1 === 0){
        let d = new Date();
        let n = d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
        document.getElementById("time_in").innerHTML = n;
        console.log("in");
        counter1++;
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
    }
};

function viewReport(){

};

function requestMissing(){

};