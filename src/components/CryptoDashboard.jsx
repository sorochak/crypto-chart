import CryptoChart from "./CryptoChart";
import { Box, Typography, Container } from "@mui/material";
import data from "../data/data.json";

const CryptoDashboard = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4, textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>
          Cryptocurrency Volume Visualization
        </Typography>

        {/* Area Chart */}
        <CryptoChart data={data} />

        {/* Legend */}
        {/* <Legend data={data} /> */}
      </Box>
    </Container>
  );
};

export default CryptoDashboard;
