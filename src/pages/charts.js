import React, { useEffect, useState } from "react";
import GrowthCard from "@/components/charts/growth_thermometer/growthCard";
import HistoryCard from "@/components/charts/history/historyCard";
import RadarCard from "@/components/charts/radar/radarCard";

const Charts = () => {
  const sampleDataForRadarChart = {
    overallRiskScore: "AAA",
    liquidity_score: "AA",
    network_score: "A",
    price_score: "AAA",
  };

  const sampleDataForHistoryChart = {
    dataArray: [
      { line1: "AAA", line2: "AAA", date: "2023-12-24" },
      { line1: "AAA", line2: "AAA", date: "2023-12-25" },
      { line1: "AAA", line2: "AAA", date: "2023-12-26" },
      { line1: "AAA", line2: "AAA", date: "2023-12-27" },
      { line1: "AAA", line2: "AAA", date: "2023-12-28" },
      { line1: "AAA", line2: "AAA", date: "2023-12-29" },
      { line1: "AAA", line2: "AAA", date: "2023-12-30" },
      { line1: "AAA", line2: "AAA", date: "2023-12-31" },
      { line1: "AAA", line2: "AAA", date: "2024-01-01" },
      { line1: "AAA", line2: "AAA", date: "2024-01-02" },
      { line1: "AAA", line2: "AAA", date: "2024-01-03" },
      { line1: "AAA", line2: "AAA", date: "2024-01-04" },
      { line1: "AAA", line2: "AAA", date: "2024-01-05" },
      { line1: "AAA", line2: "AAA", date: "2024-01-06" },
      { line1: "AAA", line2: "AAA", date: "2024-01-07" },
      { line1: "AAA", line2: "AAA", date: "2024-01-08" },
      { line1: "AAA", line2: "AAA", date: "2024-01-09" },
      { line1: "AAA", line2: "AAA", date: "2024-01-10" },
      { line1: "AAA", line2: "AAA", date: "2024-01-11" },
      { line1: "AAA", line2: "AAA", date: "2024-01-12" },
      { line1: "AAA", line2: "AAA", date: "2024-01-13" },
      { line1: "AAA", line2: "AAA", date: "2024-01-14" },
      { line1: "AAA", line2: "AAA", date: "2024-01-15" },
    ],
    details: {
      title: "Risk Rating History",
      rating: "AAA",
      y_axis: "Score",
      x_axis: "Date",
      name1: "Risk Score",
      name2: "7 Day Moving Average",
      description:
        "This Risk Rating Chart is an aggregation of Price Risk, Network, and Liquidity Risk over time. A consistently high and stable Risk Rating indicates a well-performing token, whereas a token with a volatile overall ranking is still in its formative phase. Volatility can be favorable for speculating on the price, while a stable rating signifies reliability as an asset.",
    },
  };

  useEffect(() => {
    // call token info API
  });
  return (
    <>
      {/* Replace the following sample data with actual data from the API when integrating into your application */}
      <GrowthCard token={"WMT"} growth_score={"Moderate"} />
      <br />
      <RadarCard token={"WMT"} scoresData={sampleDataForRadarChart} />
      <br />
      <HistoryCard
        token={"WMT"}
        data={sampleDataForHistoryChart.dataArray}
        details={sampleDataForHistoryChart.details}
      />
    </>
  );
};

export default Charts;
