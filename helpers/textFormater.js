exports.charReplacer = (urlToChange, charToFind, charToReplace) => {
  const changedUrl = urlToChange.replace(
    new RegExp(charToFind, 'g'),
    charToReplace,
  );
  return changedUrl;
};

exports.toCamelCase = textToChange => {
  textToChange = textToChange.replace(/[-_\s.]+(.)?/g, (_, c) =>
    c ? c.toUpperCase() : '',
  );
  return textToChange.substr(0, 1).toLowerCase() + textToChange.substr(1);
};
exports.toSentenceFormat = textToChange => {
  textToChange = textToChange.replace(/([A-Z])/g, ' $1');
  return textToChange.charAt(0).toUpperCase() + textToChange.slice(1);
};
