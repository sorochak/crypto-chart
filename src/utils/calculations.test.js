import { calculateAvgVolume, calculateQoQChange } from "./calculations";

// Sample data for testing
const sampleData = [
  { Date: "2023-01-15", Bitcoin: 1000, Ethereum: 500 },
  { Date: "2023-01-16", Bitcoin: 1500, Ethereum: 600 },
  { Date: "2023-04-01", Bitcoin: 2000, Ethereum: 700 },
  { Date: "2023-04-02", Bitcoin: 2500, Ethereum: 800 },
];

describe("calculateAvgVolume", () => {
  it("calculates the average volume correctly within the date range", () => {
    const startDate = "2023-01-15";
    const endDate = "2023-01-16";
    const crypto = "Bitcoin";

    const result = calculateAvgVolume(sampleData, crypto, startDate, endDate);

    expect(result).toBe(1250); // (1000 + 1500) / 2 = 1250
  });

  it("returns 0 if no data is available in the date range", () => {
    const startDate = "2023-01-17";
    const endDate = "2023-01-18";
    const crypto = "Bitcoin";

    const result = calculateAvgVolume(sampleData, crypto, startDate, endDate);

    expect(result).toBe(0);
  });

  it("returns 0 if the cryptocurrency data is undefined", () => {
    const startDate = "2023-01-15";
    const endDate = "2023-01-16";
    const crypto = "Solana";

    const result = calculateAvgVolume(sampleData, crypto, startDate, endDate);

    expect(result).toBe(0);
  });

  it("handles date objects correctly", () => {
    const startDate = new Date("2023-01-15");
    const endDate = new Date("2023-01-16");
    const crypto = "Bitcoin";

    const result = calculateAvgVolume(sampleData, crypto, startDate, endDate);

    expect(result).toBe(1250);
  });

  it("handles zero volumes correctly", () => {
    const zeroData = [
      { Date: "2023-01-15", Bitcoin: 0 },
      { Date: "2023-01-16", Bitcoin: 0 },
    ];
    const result = calculateAvgVolume(
      zeroData,
      "Bitcoin",
      "2023-01-01",
      "2023-01-31"
    );
    expect(result).toBe(0);
  });
});

describe("calculateQoQChange", () => {
  it("calculates the quarter-over-quarter change correctly for valid data", () => {
    const currentStartDate = "2023-04-01";
    const currentEndDate = "2023-06-30";
    const previousStartDate = "2023-01-01";
    const previousEndDate = "2023-03-31";
    const crypto = "Bitcoin";

    const result = calculateQoQChange(
      sampleData,
      crypto,
      currentStartDate,
      currentEndDate,
      previousStartDate,
      previousEndDate
    );

    //((Q2 Average - Q1 Average) / Q1 Average) * 100
    expect(result).toBe("80.00"); // ((2250 - 1250) / 1250) * 100 = 80%
  });

  it("returns 'N/A' when no data for previous quarter", () => {
    const currentStartDate = "2023-04-01";
    const currentEndDate = "2023-06-30";
    const previousStartDate = "2022-01-01";
    const previousEndDate = "2022-03-31";
    const crypto = "Bitcoin";

    const result = calculateQoQChange(
      sampleData,
      crypto,
      currentStartDate,
      currentEndDate,
      previousStartDate,
      previousEndDate
    );

    expect(result).toBe("N/A");
  });

  it("handles zero volumes correctly", () => {
    const zeroData = [
      { Date: "2023-01-15", Bitcoin: 0 },
      { Date: "2023-01-16", Bitcoin: 0 },
    ];
    const result = calculateQoQChange(
      zeroData,
      "Bitcoin",
      "2023-04-01",
      "2023-06-30",
      "2023-01-01",
      "2023-03-31"
    );
    expect(result).toBe("N/A");
  });

  it("returns 0.00 when volumes are equal between quarters", () => {
    const equalData = [
      { Date: "2023-01-15", Bitcoin: 1000 },
      { Date: "2023-04-15", Bitcoin: 1000 },
    ];
    const result = calculateQoQChange(
      equalData,
      "Bitcoin",
      "2023-04-01",
      "2023-06-30",
      "2023-01-01",
      "2023-03-31"
    );
    expect(result).toBe("0.00");
  });

  it("handles negative QoQ changes", () => {
    const decreasingData = [
      { Date: "2023-01-15", Bitcoin: 1000 },
      { Date: "2023-04-15", Bitcoin: 500 },
    ];
    const result = calculateQoQChange(
      decreasingData,
      "Bitcoin",
      "2023-04-01",
      "2023-06-30",
      "2023-01-01",
      "2023-03-31"
    );
    expect(result).toBe("-50.00");
  });

  it("handles missing or invalid data gracefully", () => {
    const invalidData = [{ Date: "2023-01-15", Bitcoin: null }];

    const result = calculateQoQChange(
      invalidData,
      "Bitcoin",
      "2023-04-01",
      "2023-06-30",
      "2023-01-01",
      "2023-03-31"
    );
    expect(result).toBe("N/A");
  });
});
