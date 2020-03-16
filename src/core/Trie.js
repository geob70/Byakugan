import { Node } from "./Node";

export class Trie {
  constructor() {
    this.root = {};
  }

  insert(array, filename) {
    let i = 0;
    for (const words of array) {
      if (words !== "") {
        this.insertNode(words.toLowerCase(), i, filename);
      }
      i++;
    }
  }

  insertNode(word, index, filename) {
    if (!(word.charAt(0) in this.root)) {
      let node = new Node(word.charAt(0));
      node.increment();
      node.addIndex(index, filename);
      node.inDocument(filename);
      this.root[word.charAt(0)] = node;
      this._insert(word, 1, node, index, filename);
    } else {
      this.root[word.charAt(0)].increment();
      this.root[word.charAt(0)].addIndex(index, filename);
      this.root[word.charAt(0)].inDocument(filename);
      this._insert(word, 1, this.root[word.charAt(0)], index, filename);
    }
  }

  _insert(word, i, parent, index, filename) {
    if (i < word.length) {
      let node;
      let j = i + 1;
      if (word.charAt(i) in parent.children) {
        node = parent.children[word.charAt(i)];
        node.increment();
        node.addIndex(index, filename);
        node.inDocument(filename);
      } else {
        let child = new Node(word.charAt(i));
        child.increment();
        child.addIndex(index, filename);
        child.inDocument(filename);
        parent.addChild(word.charAt(i), child);
        node = parent.children[word.charAt(i)];
      }
      if (i === word.length - 1) {
        node.setAsWord();
        return;
      }
      return this._insert(word, j, node, index, filename);
    }
  }

  console() {
    console.log(this.root);
  }
}
