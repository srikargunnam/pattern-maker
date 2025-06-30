// cm to inches converter
const cmToInches = (cm: number) => {
  if (!cm) return 0;
  return Math.round(cm * 0.393701 * 100) / 100;
};

// inches to cm converter
const inchesToCm = (inches: number) => {
  if (!inches) return 0;
  return Math.round(inches * 2.54 * 100) / 100;
};

export { cmToInches, inchesToCm };
