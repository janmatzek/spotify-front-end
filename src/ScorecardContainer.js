import React, { useState, useEffect } from "react";
import LoadingIndicator from "./LoadingIndicator"; // Import LoadingIndicator component
import { Heading, Flex, Wrap, WrapItem } from "@chakra-ui/react";

const ScorecardContainer = ({ timeframe }) => {
  // State for scorecard data
  const [scorecardData, setScorecardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  function formatDuration(milliseconds) {
    // Convert milliseconds to seconds
    let totalSeconds = Math.floor(milliseconds / 1000);

    // Calculate hours, minutes, and seconds
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;

    // Format the result as "hh:mm:ss"
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }

  const fetchScorecardDataFromAPI = async () => {
    try {
      const apiUrl = process.env.REACT_APP_SCORECARDS_URL + timeframe;
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const responseData = await response.json();
      const chartData = [
        { id: 1, title: "TRACKS 🎧", value: responseData.count_tracks },
        { id: 2, title: "UNIQUE 🎵", value: responseData.distinct_tracks },
        { id: 3, title: "ARTISTS 🎤", value: responseData.count_artists },
        {
          id: 4,
          title: "LISTENING 🕜",
          value: formatDuration(responseData.total_duration_ms),
        },
        {
          id: 5,
          title: "BB INDEX 🎉",
          value: Math.round(responseData.avg_popularity),
        },
      ];
      return chartData;
    } catch (error) {
      // Handle errors
      console.error("There was a problem with the fetch operation:", error);
      throw error; // Re-throw the error to propagate it
    }
  };

  useEffect(() => {
    // Fetch scorecard data asynchronously
    const fetchScorecardData = async () => {
      setLoading(true);
      try {
        // Call the fetch function
        const data = await fetchScorecardDataFromAPI();
        setScorecardData(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    // Call the fetchScorecardData function
    fetchScorecardData();
  }, [timeframe]);

  const headingStyles = {
    as: "h2",
    size: "sm",
    paddingTop: "10px",
  };

  const valueStyles = {
    as: "h3",
    size: "xs",
    paddingTop: "10px",
    color: "gray",
  };

  // Render loading state, error state, or scorecard data
  return (
    <Flex justify="center" padding="20px" className="scorecard-container">
      {loading ? ( // If loading, render the loading indicator
        <LoadingIndicator />
      ) : (
        // If not loading, render the scorecards
        <>
          {error && <div>Error fetching scorecards: {error.responseData}</div>}
          <Wrap spacing="20px" justify="center">
            {scorecardData.map((scorecard) => (
              <WrapItem key={scorecard.id}>
                <Flex className="scorecard">
                  <Heading {...headingStyles}>{scorecard.title}</Heading>
                  <Heading {...valueStyles}>{scorecard.value}</Heading>
                </Flex>
              </WrapItem>
            ))}
          </Wrap>
        </>
      )}
    </Flex>
  );
};

export default ScorecardContainer;
