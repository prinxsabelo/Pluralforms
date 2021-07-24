import { Doughnut } from "react-chartjs-2";
const DoughnutChart = (props) => {
    const { content } = props;
    const labels = [];
    const percentages = [];

    for (let count in content) {
        const { label, percentage } = content[count];
        percentages.push(percentage);

        labels.push(label);
    }

    const data = {
        labels: labels,
        datasets: [{

            data: percentages,
            backgroundColor: [
                '#119541',
                '#0c519c',
                '#e00c1a',
                '#FFBF00',
                '#921e7f'
            ],
            hoverOffset: 4
        }]
    }
    const options = {
        responsive: true,
        legend: {
            display: false,
            position: 'top'
        }

    }
    return (
        <Doughnut

            data={data}
            options={options}

        />
    )
}
export default DoughnutChart