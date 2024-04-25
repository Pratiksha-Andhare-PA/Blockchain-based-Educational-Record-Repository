$(document).ready(function() {
    // Bar Chart
    var barCtx = document.getElementById('bargraph');
    if (barCtx) {
        var barChart = new Chart(barCtx.getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Dataset 1',
                    backgroundColor: 'rgba(0, 158, 251, 0.5)',
                    borderColor: 'rgba(0, 158, 251, 1)',
                    borderWidth: 1,
                    data: [35, 59, 80, 81, 56, 55, 40]
                }, {
                    label: 'Dataset 2',
                    backgroundColor: 'rgba(255, 188, 53, 0.5)',
                    borderColor: 'rgba(255, 188, 53, 1)',
                    borderWidth: 1,
                    data: [28, 48, 40, 19, 86, 27, 90]
                }]
            },
            options: {
                responsive: true,
                legend: {
                    display: false,
                }
            }
        });
    }

    // Line Chart
    var lineCtx = document.getElementById('linegraph');
    if (lineCtx) {
        var lineChart = new Chart(lineCtx.getContext('2d'), {
            type: 'line',
            data: {
                labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                datasets: [{
                    label: "My First dataset",
                    backgroundColor: "rgba(0, 158, 251, 0.5)",
                    data: [100, 70, 20, 100, 120, 50, 70, 50, 50, 100, 50, 90]
                }, {
                    label: "My Second dataset",
                    backgroundColor: "rgba(255, 188, 53, 0.5)",
                    fill: true,
                    data: [28, 48, 40, 19, 86, 27, 20, 90, 50, 20, 90, 20]
                }]
            },
            options: {
                responsive: true,
                legend: {
                    display: false,
                },
                tooltips: {
                    mode: 'index',
                    intersect: false,
                }
            }
        });
    }
});
