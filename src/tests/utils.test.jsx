import { formatNumber, formatDuration } from "../utils";

describe("formatNumber", () => {
  test("return '0' when input is falsy", () => {
    expect(formatNumber(null)).toBe("0");
    expect(formatNumber(undefined)).toBe("0");
    expect(formatNumber(0)).toBe("0");
  });

  test("format billions correctly", () => {
    expect(formatNumber(1_000_000_000)).toBe("1B");
    expect(formatNumber(1_500_000_000)).toBe("1.5B");
  });

  test("format millions correctly", () => {
    expect(formatNumber(1_000_000)).toBe("1M");
    expect(formatNumber(2_500_000)).toBe("2.5M");
  });

  test("format thousands correctly", () => {
    expect(formatNumber(1_000)).toBe("1K");
    expect(formatNumber(12_500)).toBe("12.5K");
  });

  test("format numbers below thousand", () => {
    expect(formatNumber(999)).toBe("999");
    expect(formatNumber(10)).toBe("10");
  });

  test("handle string numbers with commas", () => {
    expect(formatNumber("1,000")).toBe("1K");
    expect(formatNumber("1,500,000")).toBe("1.5M");
  });
});

describe("formatDuration", () => {
  test("return '0m' when runtime is falsy", () => {
    expect(formatDuration(null)).toBe("0m");
    expect(formatDuration(undefined)).toBe("0m");
    expect(formatDuration("")).toBe("0m");
  });

  test("return '0m' when runtime is not a number", () => {
    expect(formatDuration("abc")).toBe("0m");
    expect(formatDuration("test min")).toBe("0m");
  });

  test("format minutes less than 60", () => {
    expect(formatDuration("45 min")).toBe("45m");
    expect(formatDuration("10 min")).toBe("10m");
  });

  test("format hours and minutes correctly", () => {
    expect(formatDuration("60 min")).toBe("1h 0m");
    expect(formatDuration("125 min")).toBe("2h 5m");
  });
});
