/* eslint-disable no-else-return */
const formatNumber = (num) => {
  if (num < 1000) {
    return num.toString();
  } else if (num >= 1000 && num < 1000000) {
    return `${(num / 1000).toFixed(1)}K`;
  } else if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  }
};

export default formatNumber;
