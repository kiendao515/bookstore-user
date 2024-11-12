import bigDecimal from 'js-big-decimal';
import numeral from 'numeral';

export const getPriceWithPercent = (price: string | number | undefined, percent: number) => {
  return formatNumber(new bigDecimal(price || 0).multiply(new bigDecimal(percent)).getValue());
};

export const formatNumber = (num: any, scale = 8) => {
  if (Number(num) === 0) return '0.00';
  // Avoid scientist format
  if (Number(num) < 0.00001 || String(num).includes('e')) {
    return fixed(num, scale || 8);
  }

  let formatString = `0,0`;
  if (scale) {
    formatString += `.[${`0`.repeat(scale)}]`;
  }

  return numeral(num || 0).format(formatString, Math.floor);
};

export const formatNumberFixed = (num: any, scale = 8) => {
  // Avoid scientist format
  if (Number(num) < 1) return fixed(num, scale);

  let formatString = `0,0`;
  if (scale) {
    formatString += `[.]${`0`.repeat(scale)}`;
  }
  return numeral(num).format(formatString, Math.floor);
};

export const fixed = (value: string, scale: number) => {
  const result = new bigDecimal(value).round(scale, bigDecimal.RoundingModes.FLOOR).getValue();
  return result;
};
