//https://www.encodedna.com/javascript/dynamically-add-remove-rows-to-html-table-using-javascript-and-save-data.htm


let arrHead = new Array();
arrHead = ['Day', 'Date', 'Time-in', 'Time-out', 'Hours worked', 'Threshold Hours', 'Leave'];
let db_fields = new Array();
db_fields = ['date', 'time-in', 'time-out', 'hours_worked', 'leaves'];
let weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function createTable(){
    let report = document.createElement('table');
    report.setAttribute('id', 'report');
    report.setAttribute('style', 'border: 2px solid black; width: 70%; margin-top: 30px;');

    let tr = report.insertRow(-1);
    

    for (let i = 0; i < arrHead.length; i++){
        let th = document.createElement('th');
        th.setAttribute('style', 'border:1px solid black;');
        th.innerHTML = arrHead[i];
        tr.appendChild(th);
    }

    let div = document.getElementById('cont');
    div.appendChild(report);
};

createTable();

function addRow(details) {
    let report = document.getElementById('report');

    let rowCnt = report.rows.length;
    let tr = report.insertRow(rowCnt);
    tr = report.insertRow(rowCnt);

    for(let i = 0; i < arrHead.length; i++){
        let td = document.createElement('td');
        td.setAttribute('style', 'border:1px solid black;');
        if(i === 0){
            td.innerHTML = weekday[details[0]['date'].getDay()];
        }
        else if(i === 5){
            td.innerHTML = '9:00';
        }
        else{
            td.innerHTML = details[0][db_fields[i]];
        }
        td = tr.insertCell(c);
    }
    tableFooter();
};

function retrieveData(date){
    fetch(url + '/report', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            date: date
        })
    }).then(res => {
        return res.json();
    }).then(data => addRow(data)
        ).catch(() => console.log('ERROR FETCHING DATA'))
};

function tableFooter(){
    let report = document.getElementById('report');
    let rowCnt = report.rows.length;
    report.insertRow(rowCnt);

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

  let startDate = document.getElementById('olddate');
  let endDate = document.getElementById('currdate');

  let main_dates = getDates(startDate, endDate);

  for(let i = 0; i < main_dates.length; i++) {
      retrieveData(main_dates[i]);
  }