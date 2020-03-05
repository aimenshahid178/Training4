function updateDates(){
    let d = new Date();
    document.getElementById('l7').innerHTML = d.toDateString();
    d.setDate(d.getDate() - 1);
    document.getElementById('l6').innerHTML = d.toDateString();
    d.setDate(d.getDate() - 1);
    document.getElementById('l5').innerHTML = d.toDateString();
    d.setDate(d.getDate() - 1);
    document.getElementById('l4').innerHTML = d.toDateString();
    d.setDate(d.getDate() - 1);
    document.getElementById('l3').innerHTML = d.toDateString();
    d.setDate(d.getDate() - 1);
    document.getElementById('l2').innerHTML = d.toDateString();
    d.setDate(d.getDate() - 1);
    document.getElementById('l1').innerHTML = d.toDateString();
};

function sendDates(){
    fetch(url + '/missing', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            date1: document.getElementById('l1'),
            timein1: document.getElementById('in1'),
            timeout1: document.getElementById('out1'),
            date2: document.getElementById('l21'),
            timein2: document.getElementById('in2'),
            timeout2: document.getElementById('out2'),
            date3: document.getElementById('l3'),
            timein3: document.getElementById('in3'),
            timeout3: document.getElementById('out3'),
            date4: document.getElementById('l4'),
            timein4: document.getElementById('in4'),
            timeout4: document.getElementById('out4'),
            date5: document.getElementById('l5'),
            timein5: document.getElementById('in5'),
            timeout5: document.getElementById('out5'),
            date6: document.getElementById('l6'),
            timein6: document.getElementById('in6'),
            timeout6: document.getElementById('out6'),
            date7: document.getElementById('l7'),
            timein7: document.getElementById('in7'),
            timeout7: document.getElementById('out7'),
        })
    }).then(res => {
        return res.json();
    }).then(data => alert("Changes saved.")
    ).catch(() => console.log('ERROR MISSING DATE TIMES'))
};