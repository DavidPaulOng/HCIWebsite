var isNavOpen = true;
var originalbuttonmargin = 0;

function padorupadoru(){
  alert('PADORU PADORU');
}

function navtoggle() {
  var navside = document.getElementById("navside");
  var main = document.getElementById("main");
  var buttontoggle = document.getElementById("navtogglebutton");
  buttontoggle.style.transform = "rotate(" + 180 * isNavOpen + "deg)";
  


  if (isNavOpen) {
    // If navigation is open, close it
    navside.style.width = "0px";
    buttontoggle.style.marginLeft = originalbuttonmargin;
    // document.body.style.backgroundColor = "white";
    main.style.marginLeft = "0";
  } else {
    // If navigation is closed, open it
    originalbuttonmargin = buttontoggle.style.marginLeft;
    navside.style.width = "140px";
    buttontoggle.style.marginLeft = "105px";
    // document.body.style.backgroundColor = "rgba(0,0,0,0.2)";
    main.style.marginLeft = "140px";

  }
  // Toggle the boolean value
  isNavOpen = !isNavOpen;

}



var listItems = document.getElementById("days").getElementsByTagName("li");
var selectedspanid = 0;

async function initialize_charts(){
  await getData();

  chartabsencetable();
  chartstatustable();
  chartoccupiedtable();
  listItems[0].querySelector("span").style.backgroundColor = "#1abc9c"; 
  listItems[0].style.color = "white";
}

initialize_charts();

  for (var i = 0; i < listItems.length; i++) {
    listItems[i].addEventListener("click", function() {
      // Reset color for all spans in list items
      for (var j = 0; j < listItems.length; j++) {
        var span = listItems[j].querySelector("span");
        if (span) {
          span.style.backgroundColor = "";
          listItems[j].style.color = "#777";
        }
      }

      // Change color of the clicked span
      var clickedSpan = this.querySelector("span");
      if (clickedSpan) {
        clickedSpan.style.backgroundColor = "#1abc9c"; // You can set the desired color
        this.style.color = "white";
        selectedspanid = parseInt(clickedSpan.innerHTML) - 1;
        console.log(selectedspanid);
        
        chartabsencetable();
        chartstatustable();
        chartoccupiedtable();

      }
    });
  }





let absencetable = [];
let statustable = [];
let occupiedtable = [];
let occupiedtablelabel = [];


async function getData(){
  const response = await fetch('/csv/absence.csv');
  const data = await response.text();
  const table = data.split('\r\n').slice(1);
  table.forEach(element => {
    const temp = element.split(';');
    absencetable.push(temp.slice(1));
  })

  const response2 = await fetch('/csv/status.csv');
  const data2 = await response2.text();
  const table2 = data2.split('\r\n').slice(1);
  table2.forEach(element => {
    const temp = element.split(';');
    statustable.push(temp.slice(1));
  })

  const response3 = await fetch('/csv/occupied.csv');
  const data3 = await response3.text();
  const label3 = data3.split('\r\n')[0];
  const labeltemp = label3.split(';');
  occupiedtablelabel = occupiedtablelabel.concat(labeltemp.slice(1));
  console.log(occupiedtablelabel);

  const table3 = data3.split('\r\n').slice(1);
  table3.forEach(element => {
    const temp = element.split(';');

    occupiedtable.push(temp.slice(1));
  })

}


Chart.defaults.backgroundColor = '#36A2EB';


const ctx = document.getElementById('status');
const ctxabsence = document.getElementById('absencepiechart');
const ctxoccupied = document.getElementById('occupiedamount');

let absencechart = null;
let statuschart = null;
let occupiedchart = null;


async function chartstatustable(){
  if(statuschart != null){
    statuschart.destroy();
  };

  statuschart = new Chart(ctx, {
    maintainAspectRatio: false,
    type: 'bar',
    data: {
      labels: ['Unwell', 'Fine', 'Great'],
      datasets: [{
        label: 'Doctor Status',
        data: statustable[selectedspanid],
        borderWidth: 1,
        backgroundColor: ['#0984e3', "#000", "#55efc4"]
      }]
    },
    options: {
      aspectRatio: 1.8,
      responsive: true,
      plugins: {
        legend: {
          display: false
        },
        title:{
          display:true,
          text: "Doctor Self-Reported Condition",
          font:{
            size: 10
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}



async function chartabsencetable(){
  
  if(absencechart != null){
    absencechart.destroy();
  };
  
  absencechart = new Chart(ctxabsence, {
    maintainAspectRatio: false,
    type: 'pie',
    data: {
      labels: ['Present', 'Absent'],
      datasets: [{
        data: absencetable[selectedspanid],
        borderWidth: 1,
        backgroundColor: ['#0984e3', "#000", "#55efc4"]
      }]
    },
    options: {
      aspectRatio: 1.8,
      responsive: true,
      plugins: {
        legend: {
          position: 'top'
        }
      },
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });

  
}




async function chartoccupiedtable(){
  
  if(occupiedchart != null){
    occupiedchart.destroy();
  };
  console.log(occupiedtablelabel);

  occupiedchart = new Chart(ctxoccupied, {
    maintainAspectRatio: false,
    type: 'line',
    data: {
      labels: occupiedtablelabel,
      datasets: [{
        data: occupiedtable[selectedspanid],
        borderWidth: 1,
        backgroundColor: ['#0984e3', "#000", "#55efc4"]
      }]
    },
    options: {
      aspectRatio: 2,
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: 'Occupied Doctors',
          font: {
            size: 10
          }
        },
        legend:{
          display: false
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          suggestedMin: 0,
          suggestedMax: 40,
        },
        x: {
          beginAtZero:true
        },
      }
    }
  });
}


