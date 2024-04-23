import React from "react";
import "./App.css"; // Import your CSS file for styling
import PieChartsContainer from "./PieChartsContainer"; // Import PieChartsContainer component
import BarChartContainer from "./BarChartContainer"; // Import BarChartContainer component
import ScorecardContainer from "./ScorecardContainer"; // Import ScorecardContainer component
import DataTable from "./DataTable"; // Import DataTable component

function App() {
  return (
    <div className="app-container">
      {/* Horizontal container for scorecards */}
      <div className="scorecard-container">
        <ScorecardContainer />
      </div>
      {/* Left column containing doughnuts and bar chart */}
      <div className="left-column">
        {/* Two containers in one row */}
        <div className="row-container">
          {/* Vertical containers */}
          <div className="column-container">
            {/* Pie charts */}
            <PieChartsContainer />
          </div>
          <div className="column-container">
            {/* Bar chart */}
            <BarChartContainer />
          </div>
        </div>
      </div>

      {/* Right column containing the table */}
      <div className="right-column">
        <div className="table-container">
          <DataTable />
        </div>
      </div>
    </div>
  );
}

export default App;
