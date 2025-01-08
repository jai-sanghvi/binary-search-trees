import { Tree } from "./bst.js";

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

const tree = new Tree([83, 14, 27, 56, 92, 71, 63, 36, 50, 49, 8, 72]);

prettyPrint(tree.root);

console.log( tree.isBalanced() );

const levelOrderArray = [];
tree.levelOrderIteration((el) => {
  levelOrderArray.push(el.data);
})
console.log(levelOrderArray);

const preOrderArray = [];
tree.preOrder((el) => {
  preOrderArray.push(el.data);
})
console.log(preOrderArray);

const postOrderArray = [];
tree.postOrder((el) => {
  postOrderArray.push(el.data);
})
console.log(postOrderArray);

const inOrderArray = [];
tree.inOrder((el) => {
  inOrderArray.push(el.data);
})
console.log(inOrderArray);

tree.insert(101);
tree.insert(131);
tree.insert(151);
tree.insert(171);
tree.insert(191);

console.log( tree.isBalanced() );

prettyPrint(tree.root);