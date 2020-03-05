//https://www.encodedna.com/javascript/dynamically-add-remove-rows-to-html-table-using-javascript-and-save-data.htm


let arrHead = new Array();
arrHead = ['Day', 'Date', 'Time-in', 'Time-out', 'Hours worked', 'Total Hours', 'Threshold Hours', 'Leave'];

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
        // check the specifics of this line
        td.innerHTML = details[i];
        td = tr.insertCell(c);
    }
}

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
    let tr = report.insertRow(rowCnt);
    tr = report.insertRow(rowCnt);

};