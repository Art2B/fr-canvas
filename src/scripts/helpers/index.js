/**
 * Map a value from an interval to another
 * @param  {number} value - Number to map
 * @param  {number} low1 - lowest value of the first interval
 * @param  {number} high1 - highest value of the first interval
 * @param  {number} low2 - lowest value of the second interval
 * @param  {number} high2 - Highest value of the second interval
 * @return {number} The mapped value
 */
export const mapRange = (value, low1, high1, low2, high2) => {
  return low2 + (high2 - low2) * (value - low1) / (high1 - low1)
}