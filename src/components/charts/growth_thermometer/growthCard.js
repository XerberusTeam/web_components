/* 
The component presented below was initially crafted with a range of tools and a UI library. 
It has since been streamlined for enhanced adaptability. 
Please modify its appearance and style as needed and incorporate it into your frontend.
*/

import React, { useEffect } from "react";
import ratingColor from "@/utils/ratingColor";
import ThermometerGraph from "./thermometergraph";
import Tagline from "@/components/tagline/tagline";

const GrowthCard = ({ token, growth_score, growthCardURL }) => {
  // Card style with responsive width and padding adjustments
  const cardStyle = {
    backgroundColor: "white",
    border: "1px solid black",
    borderRadius: "10px",
    color: "black",
    width: "100%", // Set to 100% for responsive design
    maxWidth: "500px", // Maximum width for larger screens
    margin: "auto", // Center the card
    position: "relative", // Relative positioning for the logo
    padding: "20px", // Increased padding for better spacing
  };

  // Flexbox layout for the main content
  const flexStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row", // Keep as row for a side-by-side layout
  };

  // Box style for textual content
  const boxStyle = {
    width: "50%",
    paddingTop: "6px",
  };

  // Link style adjustments
  const linkStyle = {
    fontWeight: "medium",
    textDecoration: "none",
    color: "inherit",
  };

  // Hover effect for links
  const hoverStyle = {
    ":hover": {
      color: "blue.300",
      transform: "scale(1.05)",
      transition: "transform 0.2s",
    },
  };

  return (
    <>
      {/* The API provides a link for this purpose. Insert the relevant variable from the API at this location */}
      <div
        style={cardStyle}
        onClick={() => (window.location.href = `${growthCardURL}${token}`)}
      >
        <div style={flexStyle}>
          <div style={boxStyle}>
            <div style={{ marginBottom: "5px" }}>
              <h3>Growth</h3>
            </div>

            <div>
              <div style={{ marginBottom: "20px" }}>
                <div style={{ ...linkStyle, ...hoverStyle }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      flexDirection: "column",
                      width: "100%",
                    }}
                  >
                    <h4>Growth Score</h4>
                    {/* Replace with an appropriate arrow icon */}
                    <span
                      style={{
                        fontSize: "0.8em",
                        color: ratingColor(growth_score),
                      }}
                    >
                      {growth_score}
                    </span>
                  </div>
                </div>
              </div>

              {/* Additional content goes here */}
            </div>
          </div>

          <div
            style={{
              width: "100%",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "5px",
                right: "5px",
                cursor: "pointer",
                color: "blue.500",
                ...hoverStyle,
              }}
              onClick={(event) => {
                event.stopPropagation();
                window.open(
                  "https://documentation.xerberus.io/xerberus-app/token-explorer/growth-thermometer",
                  "_blank"
                );
              }}
            >
              {/* Replace with an appropriate info icon */}
            </div>
            {/* ThermometerGraph component */}
            <ThermometerGraph data={growth_score} />
          </div>
        </div>
        <br />
        <br />
        <hr />
        <br />

        <Tagline />
      </div>
    </>
  );
};

export default GrowthCard;
