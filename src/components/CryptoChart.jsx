import React, { useEffect, useRef, useMemo } from "react";
import * as Plot from "@observablehq/plot";
import { Box } from "@mui/material";

const CryptoChart = ({ data }) => {
  // Create a reference to hold the plot DOM element
  const plotRef = useRef(null);

  // Convert the data from wide format to long format
  // Memoize the transformed data to prevent unnecessary recalculations on every render
  const transformedData = useMemo(() => {
    return data.flatMap((d) =>
      Object.keys(d)
        .filter((key) => key !== "Date")
        .map((crypto) => ({
          Date: new Date(d.Date),
          Price: d[crypto],
          Cryptocurrency: crypto,
        }))
    );
  }, [data]);

  // Sort transformedData to control the drawing order by cryptocurrency color
  const colorOrder = ["Ethereum", "Solana", "USDC", "Bitcoin"];
  transformedData.sort(
    (a, b) =>
      colorOrder.indexOf(a.Cryptocurrency) -
      colorOrder.indexOf(b.Cryptocurrency)
  );

  // useEffect is used to create and clean up the chart when data changes
  useEffect(() => {
    const plot = Plot.plot({
      style: {
        fontSize: 16,
        backgroundColor: "#1b1f2a",
        color: "#fff",
        fontWeight: "bold",
      },
      width: 1000,
      height: 600,
      marginBottom: 50,
      marginLeft: 90,
      marginRight: 20,
      marks: [
        Plot.areaY(transformedData, {
          x: "Date",
          y2: 0, // Start areas from y = 0 (baseline)
          y: "Price", // Height of areas corresponds to Price
          fill: "Cryptocurrency",
          fillOpacity: 0.6,
          z: "Cryptocurrency", // Group areas by Cryptocurrency
        }),
        Plot.lineY(transformedData, {
          x: "Date",
          y: "Price",
          stroke: "Cryptocurrency",
          curve: "linear",
          z: "Cryptocurrency", // Group by Cryptocurrency
        }),
        Plot.tip(
          transformedData,
          Plot.pointer({
            x: "Date",
            y: "Price",
            title: (d) =>
              `Date: ${d.Date.toLocaleDateString()}\n${
                d.Cryptocurrency
              }: $${d.Price.toFixed(2)}`,
            fill: "#000",
            textPadding: 8,
            fontSize: 14,
            stroke: "#fff",
          })
        ),

        // Add a baseline (y=0) for visual reference
        Plot.ruleY([0]),
      ],
      color: {
        domain: ["Bitcoin", "Ethereum", "Solana", "USDC"], // Control the order of the colors
        range: ["#FF9900", "#3C3CFF", "#00FFA2", "#FF00FF"], // Assign specific colors to each cryptocurrency
      },
      x: {
        type: "time", // Ensure that the x-axis is treated as a time scale
        ticks: 6,
        tickSize: 10,
        tickFormat: (d) =>
          d.toLocaleString("en-US", { month: "short", year: "numeric" }), // Format date as 'MMM YYYY'
      },
      y: {
        label: "DEX Volume", // Label for the y-axis
        labelAnchor: "center",
        labelOffset: 70,
        grid: true,
        ticks: 5,
        tickFormat: (d) => `$${(d / 1_000_000).toFixed(0)}M`, // Format y-axis tick marks in millions with a dollar sign
      },
    });

    plotRef.current.appendChild(plot);

    return () => {
      plot.remove(); // This prevents memory leaks and ensures that old plots are removed
    };
  }, [data]);

  return (
    <Box sx={{ marginTop: 3 }}>
      <div ref={plotRef} />
    </Box>
  );
};

export default CryptoChart;
