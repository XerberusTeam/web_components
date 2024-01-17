/* 
The component presented below was initially crafted with a range of tools and a UI library. 
It has since been streamlined for enhanced adaptability. 
Please modify its appearance and style as needed and incorporate it into your frontend.
*/

import React, { useEffect, useState } from "react";
import HistoryGraph from "./historygraph";

const HistoryCard = ({ token, data, details, historyCardURL }) => {
  const cardStyle = {
    backgroundColor: "white",
    borderRadius: "10px",
    color: "black", // replace 'foregroundColor' with the actual color value
    border: "1px solid black", // replace 'border' with the actual border value
    marginTop: "2", // Adjust based on 'md' and 'base' values
    marginBottom: "1", // Adjust based on 'md' and 'base' values
    position: "relative",
    padding: "20px", // Adjust as needed
  };

  useEffect(() => {
    // Call the API here
  });

  return (
    <>
    {/* The API provides a link for this purpose. Insert the relevant variable from the API at this location. Do pass */}
      <div style={cardStyle} onClick={() => (window.location.href = `${historyCardURL}/${token}`)}>
        <HistoryGraph data={data} details={details} ticks={8} />
      </div>
    </>
  );
};

export default HistoryCard;
