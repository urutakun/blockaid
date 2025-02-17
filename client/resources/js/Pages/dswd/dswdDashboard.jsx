import React from 'react'
import Nav from "../components/Nav";
import { Chart as ChartJS, ArcElement, CategoryScale, LineElement, PointElement, BarElement, LinearScale, Title, Tooltip, Legend } from "chart.js";
import { Bar, Doughnut, Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    LineElement,
    PointElement
  );


const dswdDashboard = () => {


    //* BAR GRAPH
      const barOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            }
        },
        scales: {
          x: {
            ticks: { color: "#333", font: { size: 14 } },
          },
          y: {
            ticks: { color: "#333", font: { size: 14 } },
            beginAtZero: true,
          },
        },
      };

    const barData = {
        labels: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025],
        datasets: [
            {
                data: [1200, 1900, 4000, 1500, 2200, 2000, 3000, 700],
                backgroundColor: "#B9EA84",
                borderWidth: 1,
            }
        ]
    }

    //* DOUGHNUT CHART
    const doughnutOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    padding: 40,
                }
            }
        }
    }
    const doughnutData = {
        labels: ["Success", "Discrepancies"],
        datasets: [
            {
                data: [7000, 200],
                backgroundColor: ["#B9EA84", "#101010"],
                borderWidth: 0
            }
        ]
    }

    //* LINE CHART
    const lineOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            }
        }
    }

    const lineData = {
        labels : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [{
            data: [33, 53, 35, 41, 44, 65, 42, 25, 41, 44, 65, 98],
            borderColor: '#A2DE62',
            tension: 0.3,
            borderWidth: 2,
            pointRadius: 6,
            pointHoverRadius: 10,
        }]
    }

  return (
    <div>
        <Nav />
            <div className="content__wrapper px-6 mt-6">
                <div className="grid grid-cols-3 gap-8 h-[300px]">
                    <div className="total__shipments col-span-3 lg:col-span-1 bg-cblack p-4 rounded-xl flex justify-center flex-col relative z-1">
                        <div className="header text-gray-300 text-base absolute top-4 left-4">
                            <p>Relief Goods Sent Count</p>
                        </div>
                        <div className="body text-cwhite my-10 text-center">
                            <div className="total__count text-6xl md:8xl lg:text-6xl font-bold text-center">
                                <p>999,999,999</p>
                            </div>
                            <p className='text-gray-500 mt-4'>Relief Goods Sent</p>
                        </div>
                    </div>
                    <div className="yearly__shipments col-span-3 lg:col-span-2 mt-6 lg:mt-0">
                        <div className="graph__title font-bold">
                            <p>Yearly Shipments</p>
                        </div>
                        <div className="h-[300px] mt-6">
                            <Bar data={barData} options={barOptions}/>
                        </div>
                    </div>
                    <div className="pie__chart col-span-3 lg:col-span-1 mt-6">
                        <div className="graph__title font-bold">
                            <p>Success & Discrepancies</p>
                        </div>
                        <div className="h-[300px] mt-6">
                            <Doughnut data={doughnutData} options={doughnutOptions}/>
                        </div>
                    </div>
                    <div className="line__chart col-span-3 lg:col-span-2 mt-6 py-6 lg:py-0">
                        <div className="graph__title font-bold">
                            <p>Shipment Trends</p>
                        </div>
                        <div className="h-[300px] mt-6">
                            <Line data={lineData} options={lineOptions}/>
                        </div>
                    </div>
                </div>
        </div>
    </div>
  )
}

export default dswdDashboard
