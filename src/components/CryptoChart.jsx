import React, { useEffect, useRef } from "react";
import * as Plot from "@observablehq/plot";
import { Box } from "@mui/material";

const CryptoChart = ({ data }) => {
  const plotRef = useRef(null);

  useEffect(() => {
    const transformedData = data.map((d) => ({
      date: new Date(d.Date),
      Bitcoin: d.Bitcoin,
      Ethereum: d.Ethereum,
      Solana: d.Solana,
      USDC: d.USDC,
    }));

    const plot = Plot.plot({
      style: {
        fontSize: 16,
        backgroundColor: "#1b1f2a", // Dark background for the chart
        color: "#fff", // General text color
        fontWeight: "bold",
      },
      width: 1000,
      height: 600,
      marginBottom: 50,
      marginLeft: 90,
      marginRight: 20,
      marks: [
        // Ethereum area and line chart with separate tip
        Plot.areaY(transformedData, {
          x: "date",
          y: "Ethereum",
          fill: "rgba(15, 200, 246, 0.6)", // Semi-transparent green
          curve: "linear",
        }),
        Plot.lineY(transformedData, {
          x: "date",
          y: "Ethereum",
          stroke: "rgba(15, 200, 246, 1)",
          curve: "linear",
        }),
        Plot.tip(
          transformedData,
          Plot.pointer({
            x: "date",
            y: "Ethereum",
            title: (d) =>
              `Date: ${d.date.toLocaleDateString()}\nEthereum: $${d.Ethereum.toFixed(
                2
              )}`,
            fill: "#000", // Tooltip background color (black)
            textPadding: 8,
            fontSize: 14,
            stroke: "#fff", // Text color for the tooltip
          })
        ),

        // Solana area and line chart with separate tip
        Plot.areaY(transformedData, {
          x: "date",
          y: "Solana",
          fill: "rgba(135, 25, 235, 0.6)",
          curve: "linear",
        }),
        Plot.lineY(transformedData, {
          x: "date",
          y: "Solana",
          stroke: "rgba(135, 25, 235, 1)",
          curve: "linear",
        }),
        Plot.tip(
          transformedData,
          Plot.pointer({
            x: "date",
            y: "Solana",
            title: (d) =>
              `Date: ${d.date.toLocaleDateString()}\nSolana: $${d.Solana.toFixed(
                2
              )}`,
            fill: "#000", // Tooltip background color (black)
            textPadding: 8,
            fontSize: 14,
            stroke: "#fff", // Text color for the tooltip
          })
        ),

        // USDC area and line chart with separate tip
        Plot.areaY(transformedData, {
          x: "date",
          y: "USDC",
          fill: "rgba(200, 90, 245, 0.6)",
          curve: "linear",
        }),
        Plot.lineY(transformedData, {
          x: "date",
          y: "USDC",
          stroke: "rgba(200, 90, 245, 1)",
          curve: "linear",
        }),
        Plot.tip(
          transformedData,
          Plot.pointer({
            x: "date",
            y: "USDC",
            title: (d) =>
              `Date: ${d.date.toLocaleDateString()}\nUSDC: $${d.USDC.toFixed(
                2
              )}`,
            fill: "#000", // Tooltip background color (black)
            textPadding: 8,
            fontSize: 14,
            stroke: "#fff", // Text color for the tooltip
          })
        ),

        // Bitcoin area and line chart with separate tip
        Plot.areaY(transformedData, {
          x: "date",
          y: "Bitcoin",
          fill: "rgba(25, 195, 105, 0.6)",
          curve: "linear",
        }),
        Plot.lineY(transformedData, {
          x: "date",
          y: "Bitcoin",
          stroke: "rgba(25, 195, 105, 1)",
          curve: "linear",
        }),
        Plot.tip(
          transformedData,
          Plot.pointer({
            x: "date",
            y: "Bitcoin",
            title: (d) =>
              `Date: ${d.date.toLocaleDateString()}\nBitcoin: $${d.Bitcoin.toFixed(
                2
              )}`,
            fill: "#000", // Tooltip background color (black)
            textPadding: 8,
            fontSize: 14,
            stroke: "#fff", // Text color for the tooltip
          })
        ),

        // Add a baseline (y=0) for visual reference
        Plot.ruleY([0]),
      ],
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
        tickFormat: (d) => `$${(d / 1_000_000).toFixed(0)}M`, // Format numbers in millions with "$M"
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
