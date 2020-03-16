const fs = window.require("fs");

export function readFile(path) {
  let doc;
  doc = fs.readFileSync(path);
  doc = convertToArray(doc.toString());
  return doc;
}

function convertToArray(buffer) {
  const array = buffer.split(" ");
  return array;
}
