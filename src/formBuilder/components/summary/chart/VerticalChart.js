import { Bar } from 'react-chartjs-2';
import 'chartjs-plugin-datalabels';

const VerticalChart = (props) => {
    const { content } = props;
    const labels = [];
    const percentages = [];
    for (let count in content) {
        const { label, percentage } = content[count];
        percentages.push(percentage);
        labels.push(`${label} Rating`);
    }
    // alert(Math.max(...percentages));
    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Rainfall',
                backgroundColor: 'rgb(116, 202, 254)',
                borderColor: 'rgba(0,0,0,1)',

                data: percentages,

            },

        ]
    }
    const options = {
        tooltips: { enabled: false },
        layout: {
            padding: {
                left: 5,
                right: 10,
                top: 40,
                bottom: 0
            }
        },
        plugins: {
            datalabels: {
                formatter: function (value, context) {
                    return value + '%';
                },
                display: true,
                color: 'black',
                align: 'top',
                anchor: 'end',
                clamp: true,
                position: 'top',
                font: {
                    size: "14",
                },
                // padding: '-2'
            }
        },
        legend: {
            display: false,
            responsive: true,
            maintainAspectRatio: false,

        },
        scales: {
            xAxes: [
                {
                    display: true,
                    ticks: {

                        mirror: true,
                        beginAtZero: true,
                        min: 0,
                        max: 100,
                        stepSize: 20,
                        fontStyle: 'bold'
                    },
                    scaleLabel: {
                        display: false
                    },


                },

            ],
            yAxes: [
                {
                    display: false,
                    ticks: {

                        mirror: true,
                        beginAtZero: true,
                        min: 0,
                        max: 100,

                    },
                },
            ]
        }
    }
    return (
        <>
            <div className="bg-gray-100 hidden md:flex">

                <Bar height={110}
                    data={data}
                    options={options}
                />
            </div >
            <div className="bg-gray-100 md:hidden " style={{ position: 'relative', width: '100%' }} >

                <Bar
                    data={data}
                    options={options}
                />
            </div >
        </>
    )
}
export default VerticalChart;