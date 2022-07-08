

// Data
const dataChartTooltipsFormattingExample = {
    type: 'line',
    data: {
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday '],
        datasets: [
            {
                label: 'Sales',
                data: [2112, 2343, 2545, 3423, 2365, 1985, 987],
            },
        ],
    },
};

// Options
const optionsChartTooltipsFormattingExample = {
    options: {
        tooltips: {
            callbacks: {
                label: function (tooltipItem, data) {
                    return '$ ' + tooltipItem.yLabel;
                },
            },
        },
    },
};

new mdb.Chart(
    document.getElementById('chart-tooltips-formatting-example'),
    dataChartTooltipsFormattingExample,
    optionsChartTooltipsFormattingExample
);

