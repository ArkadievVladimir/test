var x = [], 
    y = [];


//var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var coronaData,
corona = new XMLHttpRequest(),
src = 'https://api.covid19api.com/dayone/country/belarus/status/confirmed';

corona.open('GET', src);
corona.onload = getData;
//corona.responseType = 'json';
corona.send();


function getData () {
let getData;
let index;

  coronaData = JSON.parse(this.responseText);
  
  for (let i = 1; i < 22; i = i + 1) {
    index = coronaData.length - i
    getData = coronaData[index].Date
    getData = getData.split('-').join('T').split('T')
    x.push(`${getData[2]}.${getData[1]}`);
    y.push(coronaData[index].Cases - coronaData[index - 1].Cases);
  }
  x = x.reverse();
  y = y.reverse();

var ctx = document.getElementById('myChart').getContext('2d');
var data = {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'В день',
            pointHoverBorderWidth: 3,
            pointHitRadius: 10,
            pointHoverBackgroundColor: 'rgba(255, 99, 132, 1)',
            data: [],
            backgroundColor: 'rgba(255, 255, 132, 0)',
            pointRadius: 0,
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 3
        }]
    },
    options: {
        legend: {
            display: false
        },
        title: {
            display: true,
            text: 'Количество новых случаев заражения COVID-19 в день',
            fontStyle: 'bold',
            fontSize: 15
        },
        scales: {
            display: false,
            yAxes: [{
                scaleLabel: {
					display: false,
					fontSize: 15,
					labelString: "Заражений в день"
				},
                ticks: {
                    beginAtZero: true
                },
                gridLines: {
                    color: 'rgba(0, 0, 0, 0.05)',
                    zeroLineColor: 'rgba(0, 0, 0, 0.5)',
                    zeroLineWidth: 2
                    
                }
            }],
            xAxes: [{
                scaleLabel: {
					display: false,
					fontSize: 15,
					labelString: "Дата"
				},
                gridLines: {
                    color: 'rgba(0, 0, 0, 0.05)',
                    zeroLineColor: 'rgba(0, 0, 0, 0.5)',
                    zeroLineWidth: 2
                }
            }]
            
        },

    }
};
  
  

  data.data.labels = x;
  data.data.datasets[0].data = y;
 

  var myChart = new Chart(ctx, data); 
  
}

window.addEventListener('resize', () => {
    // We execute the same script as before
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  });