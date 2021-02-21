module.exports = function makeId(length) {
  var resultLetters = '';
  var letters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var resultNumbers = '';
  var numbers = '0123456789';
  var lettersLength = letters.length;
  var numbersLength = numbers.length;
  for (var i = 0; i < length - 2; i++) {
    resultLetters += letters.charAt(Math.floor(Math.random() * lettersLength));
  }
  for (var i = 0; i < 2; i++) {
    resultNumbers += numbers.charAt(Math.floor(Math.random() * numbersLength));
  }
  console.log(resultLetters.concat(resultNumbers));
  return resultLetters.concat(resultNumbers);
};
