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
            label: 'Количество новых случаев COVID-19 в день',
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
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
};
  
  

  data.data.labels = x;
  data.data.datasets[0].data = y;
 

  var myChart = new Chart(ctx, data); 
  
}
