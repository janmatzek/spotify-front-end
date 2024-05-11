import React, { useState } from "react";
import "./App.css"; // Import your CSS file for styling
import PieChartsContainer from "./PieChartsContainer"; // Import PieChartsContainer component
import BarChartContainer from "./BarChartContainer"; // Import BarChartContainer component
import ScorecardContainer from "./ScorecardContainer"; // Import ScorecardContainer component
import DataTable from "./DataTable"; // Import DataTable component
import FavoriteArtists from "./FavoriteArtists";
import GenresBarChart from "./GenresBar";
import { Select } from "@chakra-ui/react";

function App() {
  const [dropdownValue, setDropdownValue] = useState("last_24");
  const handleSelectChange = (event) => {
    setDropdownValue(event.target.value);
  };

  return (
    <div className="app-container">
      <div className="periodSelector">
        <Select value={dropdownValue} onChange={handleSelectChange}>
          <option value="last_24">Last 24 hours</option>
          <option value="all_time">All time average</option>
          <option value="artists">Artists & genres</option>
        </Select>
      </div>
      {/* Horizontal container for scorecards */}
      {dropdownValue !== "artists" ? (
        <div className="scorecard-container">
          <ScorecardContainer timeframe={dropdownValue} />
        </div>
      ) : null}
      {/* Left column containing doughnuts and bar chart */}
      {dropdownValue !== "artists" ? (
        <div className="left-column">
          {/* Two containers in one row */}
          <div className="row-container">
            {/* Vertical containers */}
            <div className="column-container">
              {/* Pie charts */}
              <PieChartsContainer timeframe={dropdownValue} />
            </div>
            <div className="column-container">
              {/* Bar chart */}
              <BarChartContainer timeframe={dropdownValue} />
            </div>
          </div>
        </div>
      ) : null}

      {/* Right column containing the table */}
      {dropdownValue !== "artists" ? (
        <div className="right-column">
          <div className="table-container">
            <DataTable timeframe={dropdownValue} />
          </div>
        </div>
      ) : null}
      {dropdownValue === "artists" ? (
        <div className="artists-genre-page">
          <div className="artists-table-column">
            {/* Favourite artists */}
            <FavoriteArtists />
          </div>
          <div className="genres-doughnut-column">
            {/* Favourite genres */}
            <GenresBarChart />
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default App;
