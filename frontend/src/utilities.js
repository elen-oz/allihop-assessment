const formatNumber = (num) => {
  let result;
  if (num < 1000) {
    result = num.toString();
  } else if (num >= 1000 && num < 1000000) {
    result = `${(num / 1000).toFixed(1)}K`;
  } else if (num >= 1000000) {
    result = `${(num / 1000000).toFixed(1)}M`;
  }

  return result;
};

export default formatNumber;
