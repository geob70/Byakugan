import { Trie } from "./Trie";
import { isStopWord } from "./stopword";
import { stemmer } from "./porterStemmer";

const fs = window.require("fs");

export function byakugan(query, trie) {
  console.log(trie);
  if (trie !== null) {
    let curr = trie.root[query.charAt(0)];
    if (curr === null || curr === undefined) {
      return null;
    } else {
      for (let i = 1; i < query.length; i++) {
        if (query.charAt(i) in curr.getChildren()) {
          curr = curr.getChild(query.charAt(i));
        } else {
          return null;
        }
      }
    }
    return curr;
  }
  return "no file to search\nUpload a file to search";
}

export function Tokenize(path, filename, trie) {
  let doc;
  let obj;
  obj = fs.readFileSync(path);
  obj = convertToArray(obj.toString());
  obj = removeNewline(obj);
  doc = obj;
  obj = removeStopWord(obj);
  obj = createTrie(obj, trie, filename);
  return { obj, doc };
}

function convertToArray(buffer) {
  const array = buffer.split(" ");
  return array;
}

function removeNewline(doc) {
  let array = [];
  for (let word of doc) {
    word.replace(/(\r\n|\n|\r)/gm, "");
    if (/\r|\n/.exec(word)) {
      let temp = word.split(/(\r\n|\n|\r)/gm);
      for (let i of temp) {
        if (!/(\r\n|\n|\r)/.exec(i)) {
          array.push(i);
        }
      }
    } else {
      array.push(word);
    }
  }
  return array;
}

function removeStopWord(doc) {
  let list = [];
  for (const word of doc) {
    if (isStopWord(word)) {
      list.push("");
    } else {
      // Stemming happening here
      list.push(stemmer(word));
    }
  }
  return list;
}

function createTrie(doc, trie, filename) {
  if (trie == null) {
    trie = new Trie();
  }
  trie.insert(doc, filename);
  return trie;
}
