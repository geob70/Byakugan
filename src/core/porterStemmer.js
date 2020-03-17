const stem = require("stemmer");

export function stemmer(word) {
  return stem(word);
}
