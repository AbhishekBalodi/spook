import Chart from 'chart.js';  // Assuming you're using an ES6 module bundler like Webpack

export function initializeCharts() {
    // Data for charts
    const data = {
        labels: ["2013", "2014", "2014", "2015", "2016", "2017"],
        datasets: [{
            label: '# of Votes',
            data: [10, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 66, 15, 0.7)',
                'rgba(0, 187, 221, 0.7)',
                'rgba(255, 193, 7, 0.7)',
                'rgba(0, 182, 122, 0.7)',
                'rgba(153, 102, 255, 0.7)',
                'rgba(255, 159, 64, 0.7)'
            ],
            borderColor: [
                'rgba(255, 66, 15, 1)',
                'rgba(0, 187, 221, 1)',
                'rgba(255, 193, 7, 1)',
                'rgba(0, 182, 122, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1,
            fill: false
        }]
    };

    const multiLineData = {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [{
            label: 'Dataset 1',
            data: [12, 19, 3, 5, 2, 3],
            borderColor: ['#587ce4'],
            borderWidth: 2,
            fill: false
        },
        {
            label: 'Dataset 2',
            data: [5, 23, 7, 12, 42, 23],
            borderColor: ['#ede190'],
            borderWidth: 2,
            fill: false
        },
        {
            label: 'Dataset 3',
            data: [15, 10, 21, 32, 12, 33],
            borderColor: ['#f44252'],
            borderWidth: 2,
            fill: false
        }]
    };

    const options = {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        },
        legend: {
            display: false
        },
        elements: {
            point: {
                radius: 0
            }
        }
    };

    // Function to create a chart
    const createChart = (chartId, chartType, chartData, chartOptions) => {
        const chartCanvas = document.getElementById(chartId);
        if (chartCanvas) {
            const ctx = chartCanvas.getContext('2d');
            new Chart(ctx, {
                type: chartType,
                data: chartData,
                options: chartOptions
            });
        }
    };

    // Initialize Charts
    createChart('barChart', 'bar', data, options);
    createChart('lineChart', 'line', data, options);
    createChart('linechart-multi', 'line', multiLineData, options);
    // Add other charts as needed, like doughnut, pie, scatter, etc.
}
