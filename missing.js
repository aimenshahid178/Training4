let intimes = ['in1', 'in2', 'in3', 'in4', 'in5', 'in6', 'in7'];
let outtimes = ['out1', 'out2', 'out3', 'out4', 'out5', 'out6', 'out7'];
let labels = ['l1', 'l2', 'l3', 'l4', 'l5', 'l6', 'l7'];


function updateDates(){
    let d = new Date();
    for(let i = labels.length - 1; i >= 0; i--){
        document.getElementById(labels[i]).innerHTML = d.toDateString();
        d.setDate(d.getDate() - 1);
    }
};

function sendDates(){
    let datesToUpdate = [];
    for (let i = 1; i <8; i++) {
         if(document.getElementById(i).checked == true) {
            let x = document.getElementById('l'+i);
            let y = document.getElementById('in'+i);
            let z = document.getElementById('out'+i);
            datesToUpdate.push([x,y,z]);
        }
    }   
    for (let i =0; i < datesToUpdate.length; i++) {
        fetch(url + '/missing', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                date: datesToUpdate[i][0],
                time_in: datesToUpdate[i][1],
                time_out: datesToUpdate[i][2]
            })
        }).then(res => {
            return res.json();
        }).then(data => console.log(data)
        ).catch(() => console.log('ERROR MISSING'))
    }
};

function createForm(){
    
}