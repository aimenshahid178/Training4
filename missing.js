let intimes = [];
let outtimes = [];
let labels = [];


function updateDates(){
    let d = new Date();
    for(let i = labels.length - 1; i >= 0; i--){
        document.getElementById(labels[i]).innerHTML = d.toDateString();
        d.setDate(d.getDate() - 1);
    }
};

function sendDates(){
    let datesToUpdate = [];
    for (let i = 0; i <labels.length; i++) {
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

function getDates(startDate, endDate) {
    let dates = [],
        currentDate = startDate,
        addDays = function(days) {
          let date = new Date(this.valueOf());
          date.setDate(date.getDate() + days);
          return date;
        };
    while (currentDate <= endDate) {
      dates.push(currentDate);
      currentDate = addDays.call(currentDate, 1);
    }
    return dates;
  };

function createForm(){
    let startDate = document.getElementById('oldddate');
    let endDate = document.getElementById('currddate');
    let main_dates = getDates(startDate, endDate);
    for (let i =0; i < main_dates.length; i++){
        let newDiv = document.createElement('div');
        let name = document.createElement('label');
        let chkbox = document.createElement('input');
        chkbox.type = 'checkbox';
        let intime = document.createElement('input');
        intime.type = 'text';
        let outtime = document.createElement('input');
        outtime.type = 'text';

        newDiv.setAttribute('id',i);
        name.setAttribute('id','l'+i);
        chkbox.setAttribute('id', i);
        intime.setAttribute('id', 'in'+i);
        outtime.setAttribute('id', 'out'+i);

        labels.push('l'+i);
        intimes.push('in'+i);
        outtimes.push('out'+i);

        newDiv.appendChild(name);
        newDiv.appendChild(chkbox);
        newDiv.appendChild(intime);
        newDiv.appendChild(outtime);
    }
};


createForm();