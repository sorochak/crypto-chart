import CryptoChart from "./CryptoChart";
import { Box, Typography, Container } from "@mui/material";
import { calculateAvgVolume, calculateQoQChange } from "../utils/calculations";
import Legend from "./Legend";
import data from "../data/data.json";

const CryptoDashboard = () => {
  // Define the date range for Q2 average volume calculation
  const startDateQ2 = "2023-04-01";
  const endDateQ2 = "2023-06-30";

  // Define the date range for Q1 to compare with Q2 (QoQ: Quarter over Quarter)
  const startDateQ1 = "2023-01-01";
  const endDateQ1 = "2023-03-31";

  // Calculate the average volume and QoQ change for each cryptocurrency
  // This creates an object with average volume and QoQ change data for each cryptocurrency
  const avgQ2Data = {
    Bitcoin: {
      volume: calculateAvgVolume(data, "Bitcoin", startDateQ2, endDateQ2),
      qoQChange: calculateQoQChange(
        data,
        "Bitcoin",
        startDateQ2,
        endDateQ2,
        startDateQ1,
        endDateQ1
      ),
    },
    Ethereum: {
      volume: calculateAvgVolume(data, "Ethereum", startDateQ2, endDateQ2),
      qoQChange: calculateQoQChange(
        data,
        "Ethereum",
        startDateQ2,
        endDateQ2,
        startDateQ1,
        endDateQ1
      ),
    },
    Solana: {
      volume: calculateAvgVolume(data, "Solana", startDateQ2, endDateQ2),
      qoQChange: calculateQoQChange(
        data,
        "Solana",
        startDateQ2,
        endDateQ2,
        startDateQ1,
        endDateQ1
      ),
    },
    USDC: {
      volume: calculateAvgVolume(data, "USDC", startDateQ2, endDateQ2),
      qoQChange: calculateQoQChange(
        data,
        "USDC",
        startDateQ2,
        endDateQ2,
        startDateQ1,
        endDateQ1
      ),
    },
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4, textAlign: "center" }}>
        {/* Page Header */}
        <Typography variant="h4" gutterBottom>
          Cryptocurrency Volume Visualization
        </Typography>

        <Box
          sx={{
            display: "flex",
            backgroundColor: "#1b1f2a",
            alignItems: "center",
            marginTop: 4,
          }}
        >
          {/* Area Chart */}
          <CryptoChart data={data} />

          {/* Legend */}
          <Legend avgVolumes={avgQ2Data} />
        </Box>
      </Box>
    </Container>
  );
};

export default CryptoDashboard;
