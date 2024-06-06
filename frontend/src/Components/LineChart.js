import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import axios from "axios";
import "./lineChart.css";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

// LineChart component
const LineChart = () => {
    const [chartData, setChartData] = useState({});
    const [error, setError] = useState(null);
    const [cryptoData, setCryptoData] = useState([]);
    const [isReloading, setIsReloading] = useState(false);
    const [timer, setTimer] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            await fetchGraphCryptoData();
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (timer > 0) {
            const timerId = setTimeout(() => setTimer(timer - 1), 1000);
            return () => clearTimeout(timerId);
        }

        if (timer === 0 && isReloading) {
            setIsReloading(false);
        }
    }, [timer, isReloading]);

    useEffect(() => {
        const fetchData = async () => {
            if ([4, 6, 10].includes(timer)) {
                await fetchLiveCryptoData();
            } else if (timer === 1) {
                await fetchGraphCryptoData();
            }
        };

        if (timer > 0) {
            fetchData();
        }
    }, [timer]);

    // Fetch live crypto data
    const fetchLiveCryptoData = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_BASE_URL}/dashboard/fetch-crypto-live-data`
            );
            if (response.status !== 200) {
                throw new Error(`Error: ${response.statusText}`);
            }
            const data = response?.data?.data;
            setCryptoData(data);
        } catch (error) {
            console.error("Error fetching live crypto data:", error);
            setError(error.message);
        }
    };

    // Fetch graph crypto data
    const fetchGraphCryptoData = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_BASE_URL}/dashboard/get-crypto-graph-data`
            );
            if (response.status !== 200) {
                throw new Error(`Error: ${response.statusText}`);
            }
            const data = response?.data?.data;
            console.log(data);
            const lastPrice = data?.map((item) => parseFloat(item.last));
            const datesNew = data?.map((item) =>
                new Date(item.date).toLocaleString()
            );

            setChartData({
                labels: datesNew,
                datasets: [
                    {
                        label: "BTC Prices",
                        data: lastPrice,
                        borderColor: "rgba(75, 192, 192, 1)",
                        backgroundColor: "rgba(75, 192, 192, 0.2)",
                        borderWidth: 1,
                        fill: true,
                        pointRadius: 2,
                    },
                ],
            });
        } catch (error) {
            console.error("Error fetching graph crypto data:", error);
            setError(error.message);
        }
    };

    console.log(chartData);

    // Handle reload
    const handleReload = () => {
        setIsReloading(true);
        setTimer(10);
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: "BTC Prices in USD",
            },
        },
        scales: {
            y: {
                beginAtZero: false,
            },
        },
    };

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
                height: "100vh",
            }}>
            <div
                style={{
                    width: "75%",
                    height: "75%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                <div style={{ textAlign: "right", alignSelf: "flex-end" }}>
                    <button
                        onClick={handleReload}
                        disabled={isReloading}
                        className={`reload-button ${
                            isReloading
                                ? "reload-button-disabled"
                                : "reload-button-enabled"
                        }`}>
                        {isReloading ? `${timer}s` : "Reload Data"}
                    </button>
                </div>
                {error ? (
                    <div>Error: {error}</div>
                ) : (
                    chartData?.labels && (
                        <Line data={chartData} options={options} />
                    )
                )}
            </div>
        </div>
    );
};

export default LineChart;
