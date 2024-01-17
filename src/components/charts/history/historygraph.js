/* 
The component presented below was initially crafted with a range of tools and a UI library. 
It has since been streamlined for enhanced adaptability. 
Please modify its appearance and style as needed and incorporate it into your frontend.
*/


import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import ratingColor from "@/utils/ratingColor";
import styles from '../../../styles/chart.module.css'

const customOrder = ["AAA", "AA", "A", "BBB", "BB", "B", "CCC", "CC", "C", "D"];

const HistoryGraph = ({ details, ticks }) => {
  const svgRef = useRef(null);
  const tooltipRef = useRef(null);

  useEffect(() => {
    const color = colorMode === "dark" ? "#FFF" : "black";
    const bg = colorMode === "dark" ? "#1A202C" : "white";

    const svg = d3.select(svgRef.current);
    const margin = { top: 60, right: 30, bottom: 0, left: 60 };

    const drawChart = () => {
      const container = svg.node().parentNode;
      const width = container.clientWidth;
      const height = 400 - margin.top - margin.bottom;
      const word = details.title.split(" ");
      const tooltipWord = word[0];

      // X scale
      const x = d3
        .scaleBand()
        .domain(filteredData.map((d) => d.date))
        .range([margin.left, width - margin.right])
        .padding(0.1);

      // Y scale (reversed)
      const y = d3
        .scalePoint()
        .domain(customOrder)
        .range([margin.top, height - margin.bottom]); // Non-reversed range

      // Line generator for graph
      const line = d3
        .line()
        .x((d) => x(d.date) + x.bandwidth() / 2)
        .y((d) => y(d.line1))
        // .curve(d3.curveStepAfter); // Use stepAfter curve for step graph
        .curve(d3.curveMonotoneX); // Smoothing curve

      const secondaryLine = d3
        .line()
        .x((d) => x(d.date) + x.bandwidth() / 2)
        .y((d) => y(d.line2))
        .curve(d3.curveMonotoneX); // Smoothing curve

      // Remove existing chart elements
      svg.selectAll(".axis").remove();
      svg.selectAll(".line").remove();
      svg.selectAll(".dot").remove();
      svg.selectAll("*").remove();

      // Calculate the step size for the x-axis labels
      const stepSize = Math.max(1, Math.ceil(filteredData.length / ticks));

      // Draw X and Y axes
      svg
        .append("g")
        .attr("class", "axis")
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(
          d3
            .axisBottom(x)
            .tickValues(
              filteredData
                .map((d, i) => (i % stepSize === 0 ? d.date : null))
                .filter((d) => d !== null)
            )
            .tickSizeOuter(0)
        ); // Custom tick format to show only 1 month every 6 months

      svg
        .append("g")
        .attr("class", "axis")
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y));

      // Create a tooltip container
      tooltipRef.current = d3
        .select("body")
        .append("div")
        .attr("class", "tooltip")
        .style("opacity", 0)
        .style("position", "absolute")
        .style("pointer-events", "none")
        .style("background-color", bg)
        .style("padding", "10px")
        .style("border", "1px solid #ccc");

      // Draw the step graph for "value" data
      svg
        .append("path")
        .datum(filteredData)
        .attr("fill", "none")
        .attr("class", "line") // Add class attribute for CSS styling
        .attr("stroke", color)
        .attr("stroke-width", 1)
        .attr("d", line);

      // Draw the line with smoothened curve for "ma" data
      svg
        .append("path")
        .datum(filteredData)
        .attr("fill", "none")
        .attr("class", "line") // Add class attribute for CSS styling
        .attr("stroke", "red")
        .attr("stroke-width", 1)
        .attr("d", secondaryLine);

      // Draw the dashed line initially hidden
      const dashedLine = svg
        .append("line")
        .attr("class", "dashed-line")
        .attr("stroke", "gray")
        .attr("stroke-width", 1)
        .attr("stroke-dasharray", "3,3")
        .style("opacity", 0); // Initially hidden

      // Create a group for the dots and append it after the line's group
      const dotsGroup = svg.append("g");

      // Draw dots at data points with custom colors and create overlay rectangles
      const dots = dotsGroup
        .selectAll(".dot")
        .data(filteredData)
        .enter()
        .append("circle")
        .attr("class", "dot")
        .attr("cx", (d) => x(d.date) + x.bandwidth() / 2)
        .attr("cy", (d) => y(d.line1))
        .attr("r", 6)
        .attr("fill", (d) => ratingColor(d.line1))
        .style("fill", (d) => ratingColor(d.line1))
        .style("stroke", (d) => color); // Apply custom colors directly

      // Update the overlay rectangle height and y position to cover the full vertical space
      dotsGroup
        .selectAll(".dot-overlay")
        .data(filteredData)
        .enter()
        .append("rect")
        .attr("class", "dot-overlay")
        .attr("x", (d) => x(d.date))
        .attr("y", margin.top) // Set y position to the top of the chart area
        .attr("width", x.bandwidth())
        .attr("height", height - margin.top - margin.bottom) // Set height to cover the full vertical space
        .attr("opacity", 0) // Make the overlay rectangle invisible
        .on("mouseover", (event, d) => {
          // Show the tooltip and dashed line when mouseover event occurs on the overlay rectangle
          tooltipRef.current.transition().duration(200).style("opacity", 0.9);
          dashedLine
            .attr("x1", x(d.date) + x.bandwidth() / 2)
            .attr("y1", y(d.line1))
            .attr("x2", x(d.date) + x.bandwidth() / 2)
            .attr("y2", height - margin.bottom)
            .style("opacity", 1); // Make the dashed line visible
          tooltipRef.current
            .html(
              `${tooltipWord} Score: ${d.line1}<br/><span class=${styles.matext}>Moving Avg : ${d.line2}</span><br/><br/>${d.date}`
            ) // Customize the content of the tooltip as needed
            .style("left", event.pageX + "px")
            .style("top", event.pageY + "px");
        })
        .on("mouseout", () => {
          // Hide the tooltip and dashed line when mouseout event occurs on the overlay rectangle
          tooltipRef.current.transition().duration(200).style("opacity", 0);
          dashedLine.style("opacity", 0); // Hide the dashed line
        });

      svg
        .append("svg:text")
        .attr("text-anchor", "middle")
        .style("font-size", "18px")
        .style("fill", color)
        .attr("x", width / 2)
        .attr("y", height / 7)
        .text(details.title);

      // Rotate the y-axis title
      svg
        .append("g")
        .append("text")
        .attr("transform", "rotate(-90)") // Rotate text 90 degrees counterclockwise
        .attr("x", -height / 1.7) // Adjust the position if needed
        .attr("y", margin.left - 40) // Adjust the position if needed
        .style("text-anchor", "middle")
        .style("font-size", "14px")
        .style("fill", color)
        .text(details.y_axis);

      svg
        .append("text")
        .attr("text-anchor", "middle")
        .style("font-size", "14px")
        .style("fill", color)
        .attr("x", width / 2)
        .attr("y", height + margin.top - 15)
        .text(details.x_axis); // Use details.x_axis for the title text
    };

    drawChart();

    // Update chart on window resize
    const resizeListener = () => {
      drawChart();
    };
    window.addEventListener("resize", resizeListener);

    return () => {
      tooltipRef.current.remove();
      window.removeEventListener("resize", resizeListener);
    };
  }, [colorMode, filteredData, details]);

  return (
    <>
      <svg ref={svgRef} width="100%" height="400"></svg>
      <div className="responsive-container">
        {details.description && (
          <div className="info-box">
            <h1>
              {details.title}
              <span className="badge" style={{ backgroundColor: ratingColor(details.rating) }}>
                {details.rating}
              </span>
            </h1>
            <p>{details.description}</p>
          </div>
        )}
        {details.name1 && (
          <div className="legend-box">
            <div className="legend-item">
              <span className={styles.whiteLine}></span>
              <p>{details.name1}</p>
            </div>
            {details.name2 && (
              <div className="legend-item">
                <span className={styles.redLine}></span>
                <p>{details.name2}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );

};

export default HistoryGraph;