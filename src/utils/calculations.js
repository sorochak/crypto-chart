/**
 * Calculates the average volume for a specific cryptocurrency within a given date range.
 *
 * @param {Array} data - The dataset, an array of objects, where each object represents a daily record.
 * @param {String} crypto - The key representing the cryptocurrency (e.g., 'Bitcoin', 'Ethereum') whose volume you want to average.
 * @param {String|Date} startDate - The start date of the desired range (inclusive). Can be a string or Date object.
 * @param {String|Date} endDate - The end date of the desired range (inclusive). Can be a string or Date object.
 *
 * @returns {Number} - The average volume of the specified cryptocurrency within the given date range. Returns 0 if no data is available in the date range.
 */
export const calculateAvgVolume = (data, crypto, startDate, endDate) => {
  // Filter the data based on the date range and the availability of the cryptocurrency data
  const filteredData = data.filter(
    (d) =>
      // Ensure the date falls within the start and end date range
      new Date(d.Date) >= new Date(startDate) &&
      new Date(d.Date) <= new Date(endDate) &&
      d[crypto] !== undefined
  );

  if (filteredData.length === 0) {
    return 0; // Return 0 if no data is available in the date range
  }

  // Sum the volumes of the specified cryptocurrency across the filtered dataset.
  // 'reduce' iterates over all elements in 'filteredData' and adds the value of 'd[crypto]' to 'sum'.
  const totalVolume = filteredData.reduce((sum, d) => sum + d[crypto], 0);

  // Calculate the average volume by dividing the total volume by the number of filtered entries.
  return totalVolume / filteredData.length;
};

/**
 * Calculates the quarter-over-quarter (QoQ) change for a given cryptocurrency's average volume.
 *
 * @param {Array} data - The dataset containing the cryptocurrency data.
 * @param {String} crypto - The name of the cryptocurrency (e.g., "Bitcoin").
 * @param {String|Date} currentStartDate - The start date of the current quarter.
 * @param {String|Date} currentEndDate - The end date of the current quarter.
 * @param {String|Date} previousStartDate - The start date of the previous quarter.
 * @param {String|Date} previousEndDate - The end date of the previous quarter.
 *
 * @returns {String|Number} - The QoQ change as a percentage, or "N/A" if previous data is not available.
 */
export const calculateQoQChange = (
  data,
  crypto,
  currentStartDate,
  currentEndDate,
  previousStartDate,
  previousEndDate
) => {
  // Calculate current quarter average volume
  const currentVolume = calculateAvgVolume(
    data,
    crypto,
    currentStartDate,
    currentEndDate
  );

  // Calculate previous quarter average volume
  const previousVolume = calculateAvgVolume(
    data,
    crypto,
    previousStartDate,
    previousEndDate
  );

  // Calculate QoQ change if previous data exists
  if (
    previousVolume !== 0 &&
    previousVolume !== undefined &&
    previousVolume !== null
  ) {
    const qoQChange = ((currentVolume - previousVolume) / previousVolume) * 100;
    return qoQChange.toFixed(2); // Returning QoQ change as a percentage
  }

  // If previous data is not available, return "N/A"
  return "N/A";
};
