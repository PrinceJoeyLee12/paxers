export const formatToCurrency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'PHP',

  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

export const convertToTimeFormat = timeToConvert => {
  let sec_num = parseInt(timeToConvert); // don't forget the second param
  let hours = Math.floor(sec_num / 3600);
  let minutes = Math.floor((sec_num - hours * 3600) / 60);
  let seconds = sec_num - hours * 3600 - minutes * 60;

  if (minutes < 10) {
    minutes = '0' + minutes;
  }
  if (seconds < 10) {
    seconds = '0' + seconds;
  }

  hours = hours.toString();
  minutes = minutes.toString();
  seconds = seconds.toString();

  if (hours === '0' && minutes === '00') return seconds + 'sec';
  else if (hours === '0' && minutes.split('')[0] === '0')
    return minutes.split('').slice(1) + ':' + seconds;
  else if (hours === '0') return minutes + ':' + seconds;
  else return hours + ':' + minutes + ':' + seconds;
};
