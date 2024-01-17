/* 
The component presented below was initially crafted with a range of tools and a UI library. 
It has since been streamlined for enhanced adaptability. 
Please modify its appearance and style as needed and incorporate it into your frontend.
*/

import React, { useEffect } from "react";
import ratingColor from "@/utils/ratingColor";
import Tagline from "@/components/tagline/tagline";
import RadarChart from "./radarchart";

const RadarCard = ({ token, scoresData, radarCardURL }) => {
  const cardStyle = {
    backgroundColor: "white",
    border: "1px solid black",
    borderRadius: "10px",
    color: "black",
    width: "100%",
    maxWidth: "500px",
    margin: "auto",
    position: "relative",
    padding: "20px",
  };

  const contentStyle = {
    display: "flex",
    flexDirection: "row",
    alignItems: "start",
    justifyContent: "space-between",
  };

  const riskStyle = {
    marginBottom: "5px",
    width: "100%",
  };

  const scoreStyle = {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    width: "100%",
  };

  const scoreTextStyle = {
    margin: "5px",
    fontSize: "1.2em",
  };

  const radarStyle = {
    width: "100%",
    display: "flex",
    justifyContent: "start",
    alignItems: "center",
  };

  const scoreSectionStyle = {
    marginBottom: "10px", // Space between each risk section
  };

  const riskLabelStyle = {
    fontWeight: "bold", // Makes the label stand out
    fontSize: "1em", // Adjust the font size as needed
  };

  const riskScoreStyle = {
    fontSize: "1.2em", // Slightly larger font size for the score
    color: "inherit", // Inherits color from parent, can be overridden
  };

  return (
    <>
      {/* The API provides a link for this purpose. Insert the relevant variable from the API at this location */}
      <div style={cardStyle} onClick={() => (window.location.href = `${radarCardURL}${token}`)}>
        <div style={contentStyle}>
          <div style={{ width: "40%" }}>
            <div style={riskStyle}>
              <h3>
                Risk Rating:{" "}
                <span
                  style={{
                    ...scoreTextStyle,
                    color: ratingColor(scoresData.overallRiskScore),
                  }}
                >
                  {scoresData.overallRiskScore}
                </span>
              </h3>
            </div>

            {/* Score sections: Price, Network, and Liquidity Risk */}
            {["Price", "Network", "Liquidity"].map((riskType, index) => (
              <div style={scoreSectionStyle} key={index}>
                <div style={{ ...riskLabelStyle }}>{riskType} Risk</div>
                <span
                  style={{
                    ...riskScoreStyle,
                    color: ratingColor(
                      scoresData[`${riskType.toLowerCase()}_score`]
                    ),
                  }}
                >
                  {scoresData[`${riskType.toLowerCase()}_score`]}
                </span>
              </div>
            ))}
          </div>

          <div style={radarStyle}>
            <RadarChart
              rawData={[
                scoresData.price_score,
                scoresData.network_score,
                scoresData.liquidity_score,
              ]}
              labels={["Price", "Network", "Liquidity"]}
              color={ratingColor(scoresData.overallRiskScore)}
            />
          </div>
        </div>
        <br />
        <hr />
        <br />
        <Tagline />
      </div>
    </>
  );
};

export default RadarCard;
