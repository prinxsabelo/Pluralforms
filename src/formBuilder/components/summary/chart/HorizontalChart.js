import { HorizontalBar } from 'react-chartjs-2';
import 'chartjs-plugin-datalabels';

const HorizontalChart = (props) => {

    const { content } = props;
    const labels = [];
    const percentages = [];
    // console.log(content);
    for (let count in content) {
        const { label, percentage } = content[count];
        percentages.push(percentage);
        labels.push(label);
    }
    // console.log(labels);
    const data = {
        labels: labels,

        datasets: [

            {
                label: "Percentage ",
                data: percentages,

                backgroundColor: 'rgb(116, 202, 254)',
                categoryPercentage: 1.0,
                barPercentage: 0.9,

            },

        ],

    }
    const options = {
        tooltips: { enabled: false },
        layout: {
            padding: {
                left: 50,
                right: 10,
                top: 0,
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
                align: 'start',
                anchor: 'start',
                clamp: true,
                position: 'right',
                font: {
                    size: "14",
                }

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
                    display: false,
                    ticks: {

                        beginAtZero: true,
                        min: 0,
                        max: 100,
                        stepSize: 20,

                    },
                    scaleLabel: {
                        display: false
                    },
                    gridLines: {
                        display: false,
                    },

                },

            ],
            yAxes: [{

                stacked: true,
                ticks: {
                    mirror: true,
                    padding: -5,
                    fontColor: 'black',

                    z: 1000,
                    fontSize: 14
                },
                gridLines: {
                    display: false,
                    offsetGridLines: false,
                },
            }]
        },
    }

    return (
        <div className="bg-gray-100" >
            <div style={{ position: 'relative', width: '100%' }} className="hidden md:flex">
                <HorizontalBar
                    width={50} height={6 * content.length}
                    data={data}
                    options={options}
                />
            </div >
            <div style={{ position: 'relative', width: '100%' }} className="md:hidden ">
                <HorizontalBar

                    height={45 * content.length}
                    data={data}
                    options={options}
                />
            </div >
        </div>
    );
}
export default HorizontalChart