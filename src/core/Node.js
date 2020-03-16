export class Node {
  constructor(letter) {
    this.letter = letter;
    this.children = {};
    this.endOfWord = false;
    this.frequency = 0;
    this.inDoc = [];
    this.index = {};
  }

  isWord() {
    return this.endOfWord;
  }

  setAsWord() {
    this.endOfWord = true;
  }

  increment() {
    this.frequency++;
  }

  addChild(child, node) {
    this.children[child] = node;
  }

  addIndex(position, filename) {
    if (filename in this.index) {
      this.index[filename].push(position);
    } else {
      this.index[filename] = [position];
    }
  }

  inDocument(id) {
    this.inDoc.push(id);
    let set = new Set(this.inDoc);
    this.inDoc = [...set];
  }

  getChildren() {
    return this.children;
  }

  getChild(child) {
    return this.children[child];
  }
}
