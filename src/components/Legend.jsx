import React from "react";
import { Box, Typography, Divider } from "@mui/material";

const Legend = ({ avgVolumes }) => {
  // Define an array of cryptocurrency information, including name, color, volume, and QoQ change
  const cryptos = [
    {
      name: "Bitcoin",
      color: "#FF9900",
      volume: avgVolumes.Bitcoin.volume,
      qoQChange: avgVolumes.Bitcoin.qoQChange,
    },
    {
      name: "Ethereum",
      color: "#3C3CFF",
      volume: avgVolumes.Ethereum.volume,
      qoQChange: avgVolumes.Ethereum.qoQChange,
    },
    {
      name: "Solana",
      color: "#00FFA2",
      volume: avgVolumes.Solana.volume,
      qoQChange: avgVolumes.Solana.qoQChange,
    },
    {
      name: "USDC",
      color: "#FF00FF",
      volume: avgVolumes.USDC.volume,
      qoQChange: avgVolumes.USDC.qoQChange,
    },
  ];

  return (
    <Box
      sx={{
        color: "#ffffff",
        backgroundColor: "#1b1f2a",
        pr: "12px",
        borderRadius: "8px",
        minWidth: "200px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Title of the legend section */}
      <Typography
        variant="h6"
        sx={{
          fontWeight: "bold",
          marginBottom: "-6px",
        }}
      >
        Avg Q2'23 Volume
      </Typography>
      <Divider
        sx={{
          width: "100%",
          backgroundColor: "#a9a9a9",
          marginBottom: "16px",
        }}
      />
      {/* Map over the cryptos array to display each cryptocurrency in the legend */}
      {cryptos.map((crypto, index) => (
        <Box
          key={index}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 1,
          }}
        >
          {/* Display cryptocurrency name and legend marker */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Wrapper for the cryptocurrency color marker and name */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {/* Cryptocurrency color marker */}
              <Box
                sx={{
                  width: "12px",
                  height: "24px",
                  backgroundColor: crypto.color,
                  borderRadius: "12px",
                  marginRight: "8px",
                  mb: "-8px",
                }}
              />
              {/* Display the cryptocurrency name */}
              <Typography sx={{ color: "#ffffff", fontWeight: "bold" }}>
                {crypto.name}
              </Typography>
            </Box>
            {/* Subtitle for QoQ change */}
            <Typography
              sx={{
                color: "#a9a9a9",
                fontSize: "12px",
                marginLeft: "20px", // Adjusted for consistent padding
              }}
            >
              QoQ Change
            </Typography>
          </Box>
          {/* Display cryptocurrency average volume and QoQ change */}
          <Box>
            {/* Display the average volume, formatted in millions */}
            <Typography
              sx={{
                color: "#ffffff",
                textAlign: "right",
                fontWeight: "bold",
              }}
            >
              ${(crypto.volume / 1_000_000).toFixed(2)}M
            </Typography>
            {/* Display the quarter-over-quarter change percentage */}
            <Typography
              sx={{
                color: "#a9a9a9",
                textAlign: "right",
                fontSize: "12px",
              }}
            >
              {crypto.qoQChange !== "N/A" ? `${crypto.qoQChange}%` : "N/A"}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

// Wrap the component with React.memo to prevent unnecessary re-renders
export default React.memo(Legend);
