let x = [];
let y = [];
let rem;

function getCovidData() {


  
var coronaData,
corona = new XMLHttpRequest(),
src = 'https://api.covid19api.com/dayone/country/belarus/status/confirmed';
corona.open('GET', src);
corona.onload = getData;

corona.send();

function getData () {
let getData,

index;
coronaData = JSON.parse(this.responseText);


for (let i = 1; i < daysToShowCount + 2; i++) {
index = coronaData.length - i
getData = coronaData[index].Date
getData = getData.split('-').join('T').split('T')
x.push(`${getData[2]}.${getData[1]}`);
y.push(coronaData[index].Cases - coronaData[index - 1].Cases);
}

x = x.reverse();
y = y.reverse();
renderGraph(
  x.filter((el, ind) => ind > x.length - 22), 
  y.filter((el, ind) => ind > y.length - 22)
  )
}
}

var daysToShowCount = 220;
var showMinData = true;
getCovidData()

window.addEventListener('resize', () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);

})

var graph = document.querySelector("#myChart");
graph.addEventListener('click', () => {
  if (showMinData) {
    showMinData = false;
    data.data.labels = x;
    data.data.datasets[0].data = y;
    myChart.update();
  } else {
    showMinData = true;
    data.data.labels = x.filter((el, ind) => ind > x.length - 22);
    data.data.datasets[0].data = y.filter((el, ind) => ind > y.length - 22);
    myChart.update();
  }
})


var ctx = document.getElementById('myChart').getContext('2d'); 
var data;
var myChart = new Chart(ctx, data); 
function renderGraph(x, y) {

data = {
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
            fontSize: 30,
            padding: 30
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
                    beginAtZero: true,
                    padding: 10
                },
                gridLines: {
                    color: 'rgba(0, 0, 0, 0.05)',
                    zeroLineColor: 'rgba(0, 0, 0, 0.5)',
                    zeroLineWidth: 1.5,
                    drawTicks: false
                    
                }
            }],
            xAxes: [{
                scaleLabel: {
					display: false,
					fontSize: 15,
					labelString: "Дата"
				},
        ticks: {
            beginAtZero: true,
            padding: 10
        },
                gridLines: {
                    color: 'rgba(0, 0, 0, 0.05)',
                    zeroLineColor: 'rgba(0, 0, 0, 0.5)',
                    zeroLineWidth: 1.5,
                    drawTicks: false
                }
            }]
            
        },

    }
};
Chart.defaults.global.defaultFontSize = 18;

data.data.labels = x;
data.data.datasets[0].data = y;

myChart = new Chart(ctx, data); 

}

