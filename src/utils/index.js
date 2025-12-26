/**
 * @param {number|string} num
 * @returns {string} formatted number
 */
export function formatNumber(num) {
  if (!num) return "0";

  // If it's a string with commas, convert to number
  let number = typeof num === "string" ? Number(num.replace(/,/g, "")) : num;

  if (number >= 1_000_000_000) {
    return (number / 1_000_000_000).toFixed(1).replace(/\.0$/, "") + "B";
  } else if (number >= 1_000_000) {
    return (number / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  } else if (number >= 1_000) {
    return (number / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
  } else {
    return number.toString();
  }
}

/**
 * @param {string} runtime
 * @returns {string} formatted duration
 */
export function formatDuration(runtime) {
  if (!runtime) return "0m";

  const totalMinutes = Number(runtime.replace(" min", "").trim());

  if (isNaN(totalMinutes)) return "0m";

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
}