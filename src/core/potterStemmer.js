const potter_rules = {
  sses: "ss",
  ies: "i",
  ss: "ss",
  s: "",
  ing: "",
  ed: "",
  ion: "",
  ational: "ate",
  izer: "ize",
  ator: "ate",
  al: "",
  able: "",
  ate: ""
};

export function stemmer(word) {
  const length = word.length;
  let i = length - 1;
  let temp = "";
  while (i >= 0) {
    temp += word.charAt(i);
    if (temp in potter_rules) {
    }
    i--;
  }
}
