import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import LoadingIndicator from "./LoadingIndicator"; // Import LoadingIndicator component
import { Heading } from "@chakra-ui/react";

const PieChartsContainer = () => {
  const period = "last_24";

  const [pieChartData1, setPieChartData1] = useState([]);
  const [pieChartData2, setPieChartData2] = useState([]);
  const [pieChartData3, setPieChartData3] = useState([]);
  const [loading1, setLoading1] = useState(true);
  const [loading2, setLoading2] = useState(true);
  const [loading3, setLoading3] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setError(null); // Clear error state before initiating async requests

    Promise.all([
      fetchPieChartDataFromAPI(process.env.REACT_APP_PIE_CONTEXT_URL + period),
      fetchPieChartDataFromAPI(process.env.REACT_APP_PIE_ARISTS_URL + period),
      fetchPieChartDataFromAPI(
        process.env.REACT_APP_PIE_RELEASE_YEARS_URL + period
      ),
    ])
      .then(([contextData, artistsData, releaseYearsData]) => {
        setPieChartData1(contextData);
        setPieChartData2(artistsData);
        setPieChartData3(releaseYearsData);
        setLoading1(false);
        setLoading2(false);
        setLoading3(false);
      })
      .catch((error) => {
        setError(error);
        setLoading1(false);
        setLoading2(false);
        setLoading3(false);
      });
  }, []);

  const fetchPieChartData = async (chartNumber, setChartData, setLoading) => {
    try {
      setLoading(true);
      const data = await fetchPieChartDataFromAPI(chartNumber);
      setChartData(data);
      setLoading(false);
      setError(null);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const fetchPieChartDataFromAPI = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();

      return data;
    } catch (error) {
      throw new Error(`Error fetching data: ${error.message}`);
    }
  };

  useEffect(() => {
    setError(null);

    fetchPieChartDataFromAPI(process.env.REACT_APP_PIE_CONTEXT_URL + period)
      .then((data) => {
        setPieChartData1(data);
        setLoading1(false);
        setError(null);
      })
      .catch((error) => {
        setError(error);
        setLoading1(false);
      });

    fetchPieChartDataFromAPI(process.env.REACT_APP_PIE_ARISTS_URL + period)
      .then((data) => {
        setPieChartData2(data);
        setLoading2(false);
        setError(null);
      })
      .catch((error) => {
        setError(error);
        setLoading2(false);
      });

    fetchPieChartDataFromAPI(
      process.env.REACT_APP_PIE_RELEASE_YEARS_URL + period
    )
      .then((data) => {
        setPieChartData3(data);
        setLoading3(false);
        setError(null);
      })
      .catch((error) => {
        setError(error);
        setLoading3(false);
      });
  }, []);

  const options = {
    plugins: {
      legend: {
        display: false, // Hide the legend
      },
    },
  };

  const headingStyles = {
    as: "h2",
    size: "sm",
    paddingTop: "10px",
    paddingBottom: "35px",
  };

  return (
    <div className="doughnut-charts-container">
      {/* Doughnut Chart 1 */}
      <div className={`doughnut-chart ${loading1 ? "loading" : ""}`}>
        <Heading {...headingStyles}>CONTEXT</Heading>
        {loading1 ? (
          <LoadingIndicator />
        ) : (
          <Doughnut
            data={{
              labels: pieChartData1.map((item) => item.category),
              datasets: [
                {
                  data: pieChartData1.map((item) => item.value),
                  backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
                  hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
                },
              ],
            }}
            options={options}
          />
        )}
      </div>
      {/* Doughnut Chart 2 */}
      <div className={`doughnut-chart ${loading2 ? "loading" : ""}`}>
        <Heading {...headingStyles}>ARTISTS</Heading>
        {loading2 ? (
          <LoadingIndicator />
        ) : (
          <Doughnut
            data={{
              labels: pieChartData2.map((item) => item.category),
              datasets: [
                {
                  data: pieChartData2.map((item) => item.value),
                  backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
                  hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
                },
              ],
            }}
            options={options}
          />
        )}
      </div>
      {/* Doughnut Chart 3 */}
      <div className={`doughnut-chart ${loading3 ? "loading" : ""}`}>
        <Heading {...headingStyles}>RELEASE YEARS</Heading>
        {loading3 ? (
          <LoadingIndicator />
        ) : (
          <Doughnut
            data={{
              labels: pieChartData3.map((item) => item.category),
              datasets: [
                {
                  data: pieChartData3.map((item) => item.value),
                  backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
                  hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
                },
              ],
            }}
            options={options}
          />
        )}
      </div>
      {error && <div>Error fetching pie charts: {error.message}</div>}
    </div>
  );
};

export default PieChartsContainer;
