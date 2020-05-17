const trafficCanvas = document.getElementById('traffic').getContext('2d')
const trafficLIs = document.getElementsByClassName('traffic-nav-link')
const dailyCanvas = document.getElementById('daily-traffic').getContext('2d')
const mobileCanvas = document.getElementById('mobile-users').getContext('2d')
const alertBanner = document.getElementById('alert')

displayAlert()

function displayAlert() {
    alertBanner.innerHTML = 
    `
    <div class="alert-banner">
        <p class="alert-message"><strong>ALERT:</strong> You have <strong>7</strong> unread messages.</p>
        <p class="alert-close">X</p>
    </div>
    `
}

alertBanner.addEventListener('click', e => {
    const close = e.target
    if (close.classList.contains('alert-close')) {
        console.log(close)
        alertBanner.style.display = 'none'
    }
})







const trafficChartData = [
    {"points": [125, 240, 200, 170, 195, 160, 185],
     "labels": ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"]},
    {"points": [14, 19, 28, 26, 31, 25, 22, 19],
     "labels": ["12-1", "1-2", "2-3", "3-4", "4-5", "5-6", "6-7", "7-8"]},
    {"points": [750, 1250, 1000, 1500, 2000, 1500, 1750, 1250, 1750, 2250, 1750],
     "labels": ["16-22", "23-29", "30-5", "6-12", "13-19", "20-26", "27-3", "4-10", "11-17", "18-24", "25-31"]},
    {"points": [3350, 4250, 4700, 5100, 4950, 4800, 5250, 5000, 4750, 4550, 4800, 5150],
     "labels": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]} 
]

let trafficData = {
    labels: trafficChartData[2].labels,
    datasets: [{
        data: trafficChartData[2].points,
        backgroundColor: 'rgba(116, 119, 191, .3)',
        borderColor: '#A9ACE5',
        borderWidth: 2,
        lineTension: 0,
        pointBackgroundColor: '#FFFFFF',
        pointBorderColor: '#7477BF',
        pointBorderWidth: 2,
        pointRadius: 4
    }]
}

let trafficOptions = {
    aspectRatio: 2.5,
    animation: {
        duration: 1000
    },
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero:true
            }
        }]
    },
    legend : {
        display: false
    }
}

let trafficChart = new Chart(trafficCanvas, {
    type: 'line',
    data: trafficData,
    options: trafficOptions
})

function addData(chart, label, data) {
    chart.data.labels = []
    chart.data.datasets.data = []
    chart.data.datasets.forEach((dataset) => {
        dataset.data = data
    })
    label.forEach((lab) => {
        chart.data.labels.push(lab)
    })
    chart.update()
}

for (let i = 0; i < trafficLIs.length; i += 1) {
    trafficLIs[i].addEventListener('click', function (event) {
        const active = document.querySelector(".active");
        active.className = event.target.className.replace(" active", "");
        this.className += " active";
        addData(trafficChart, trafficChartData[i].labels, trafficChartData[i].points);
    });
}

let dailyData = {
    labels: ["S", "M", "T", "W", "T", "F", "S"],
    datasets: [{
        data: [50, 75, 150, 100, 200, 175, 75],
        backgroundColor: '#9774bf',
        borderColor: '#9774bf',
        barPercentage: .5,
    }]
}

let dailyOptions = {
    aspectRatio: 2.5,
    animation: {
        duration: 1000
    },
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero:true
            }
        }]
    },
    legend : {
        display: false
    }
}

let dailyChart = new Chart(dailyCanvas, {
    type: 'bar',
    data: dailyData,
    options: dailyOptions
})

let mobileData = {
    labels: ["Phones", "Tablets", "Desktop"],
    datasets: [{
        data: [1402, 1879, 6834],
        backgroundColor: ['#40b7bf', '#0fcc6e', '#9774bf'],
        borderWidth: 0
    }]
}

let mobileOptions = {
    legend: {
        position: 'right',
        align: 'center',
        padding: 50,
        labels: {
            boxWidth: 40,
            fontStyle: 'bold',
            fontSize: 25
        }
    }
}

let mobileChart = new Chart(mobileCanvas, {
    type: 'doughnut',
    data: mobileData,
    options: mobileOptions
})