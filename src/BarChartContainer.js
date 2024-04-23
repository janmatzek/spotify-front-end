import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { Heading } from "@chakra-ui/react";
import { Chart } from "chart.js/auto"; // Import Chart directly
import LoadingIndicator from "./LoadingIndicator"; // Import LoadingIndicator component

const BarChartContainer = () => {
  const period = "last_24";
  const periodName = "Last 24 hours";
  const [barChartData, setBarChartData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [timezoneOffset, setTimezoneOffset] = useState("");

  useEffect(() => {
    const userTimezoneOffset = new Date().getTimezoneOffset() / 60;
    setTimezoneOffset(userTimezoneOffset);
  }, []);

  useEffect(() => {
    // Fetch bar chart data only when timezone offset is available
    if (timezoneOffset !== "") {
      fetchBarChartData();
    }
  }, [timezoneOffset]); // Add timezoneOffset as a dependency

  const fetchBarChartData = async () => {
    try {
      // Fetch data from your API endpoint
      const response = await fetch(process.env.REACT_APP_BARS_URL + period);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();

      // Process the data for the bar chart
      const labels = data.map((item) => item.hour - timezoneOffset);
      // const labels = data.map((item) => item.hour);
      const counts = data.map((item) => item.count);

      // Set the state with the formatted data
      setBarChartData({
        labels: labels,
        datasets: [
          {
            label: "Track Count",
            backgroundColor: "rgba(237, 110, 133, 0.2)",
            borderColor: "rgba(237, 110, 133, 1)",
            borderWidth: 1,
            hoverBackgroundColor: "rgba(237, 110, 133, 0.4)",
            hoverBorderColor: "rgba(237, 110, 133, 1)",
            data: counts,
          },
        ],
      });

      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: "category", // Use 'category' scale for categorical data
        title: {
          display: true,
          text: "Hour Played At",
        },
        maxTicksLimit: 24, // Set the maximum number of ticks to display
      },
      y: {
        title: {
          display: true,
          text: "Track Count",
        },
      },
    },
  };

  const headingStyles = {
    as: "h2",
    size: "sm",
    paddingTop: "1vh",
    paddingBottom: "2vh",
  };

  return (
    <div className="bar-chart-container">
      <Heading {...headingStyles}>LISTENING TIME ({periodName})</Heading>
      {loading && <LoadingIndicator />}
      {error && <div>Error: {error.message}</div>}
      {!loading && !error && (
        <React.Fragment>
          <Bar data={barChartData} options={options} />
        </React.Fragment>
      )}
    </div>
  );
};

export default BarChartContainer;
