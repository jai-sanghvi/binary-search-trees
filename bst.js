class Node {
  constructor(data) {
      this.data = data;
      this.left = null;
      this.right = null;
  }
}

class Tree {
  constructor(arr) {
    let modifiedArr = [];
    let sortedArr = arr.sort( (a,b) => a - b );
    sortedArr.filter( (el) => {
      if (!modifiedArr.includes(el)) {
        modifiedArr.push(el);
        return true;
      }

      return false;
    } );
    this.root = buildTree(modifiedArr);
  }

  insert(value) {
    let currentNode = this.root;

    while (true) {
      if (value === currentNode.data) return;
      else if (value < currentNode.data) {
        if (currentNode.left === null) {
          currentNode.left = new Node(value);
          return;
        }
        currentNode = currentNode.left;
      }
      else {
        if (currentNode.right === null) {
          currentNode.right = new Node(value);
          return;
        }
        currentNode = currentNode.right;
      }
    }
  }

  deleteItem(value) {
    let targetNode = null;
    let parentNode = null;
    let targetDirection = null;
    let isTargetRoot = false;

    let currentNode = this.root;

    // check if target is BST's root
    if (currentNode.data === value) {
      isTargetRoot = true;
      targetNode = currentNode;
    }

    // if not, find targetNode and it's parentNode
    if (!isTargetRoot) {
      while(true) {
        if (value < currentNode.data) {
          
          if (currentNode.left === null) break;

          if (currentNode.left.data === value) {
            parentNode = currentNode;
            targetDirection = "left";
            targetNode = currentNode.left;
            break;
          }

          currentNode = currentNode.left;

        } else {

          if (currentNode.right === null) break;

          if (currentNode.right.data === value) {
            parentNode = currentNode;
            targetDirection = "right";
            targetNode = currentNode.right;
            break;
          }

          currentNode = currentNode.right;

        }
      } 
    }

    // if targetNode exists, delete it
    if (targetNode !== null) {
      if ( (targetNode.left === null) && (targetNode.right === null) ) {

        if (isTargetRoot) {
          this.root = null;
          return;
        } else {
          if (targetDirection === 'left') {
            parentNode.left = null;
          } else {
            parentNode.right = null;
          }
        }
      } else if ( (targetNode.left === null) && (targetNode.right !== null) ) {

        if (isTargetRoot) {
          this.root = targetNode.right;
        } else {
          if (targetDirection === 'left') {
            parentNode.left = targetNode.right;
          } else {
            parentNode.right = targetNode.right;
          }
        }

      } else if ( (targetNode.right === null) && (targetNode.left !== null) ) {

        if (isTargetRoot) {
          this.root = targetNode.left;
        } else {
          if (targetDirection === 'left') {
            parentNode.left = targetNode.left;
          } else {
            parentNode.right = targetNode.left;
          }
        }

      } else {
        // find successor node
        let successorNode = targetNode.right;
        let successorParentNode = null;

        while (successorNode.left !== null) {
          successorParentNode = successorNode;
          successorNode = successorNode.left;
        }

        if (isTargetRoot) {
          this.root.data = successorNode.data;
          
          if (successorNode.right !== null && successorParentNode !== null) {
            successorParentNode.left = successorNode.right;
          } else if ( successorNode.right !== null && successorParentNode === null ) {
            this.root.right = successorNode.right;
          }
        } else {
          if (targetDirection === 'left') {
            parentNode.left.data = successorNode.data;
            
            if (successorNode.right !== null && successorParentNode !== null) {
              successorParentNode.left = successorNode.right;
            } else if ( successorNode.right !== null && successorParentNode === null ) {
              parentNode.left.right = successorNode.right;
            }
          } else {
            parentNode.right.data = successorNode.data;

            if (successorNode.right !== null && successorParentNode !== null) {
              successorParentNode.left = successorNode.right;
            } else if ( successorNode.right !== null && successorParentNode === null ) {
              parentNode.right.right = successorNode.right;
            }
          }
        }

      }
    }

  }

  find(value) {
    let currentNode = this.root;

    while (true) {
      if (currentNode.data === value) return currentNode;

      if (value < currentNode.data) {
        if (currentNode.left === null) return null;
        currentNode = currentNode.left;
      } else {
        if (currentNode.right === null) return null;
        currentNode = currentNode.right;
      }
    }
  }
}

function buildTree(arr) {
  let start = 0;
  let end = arr.length - 1;
  if (start > end) return null;

  let mid = Math.floor( (start + end) / 2 );
  let root = new Node(arr[mid]);

  root.left = buildTree(arr.slice(0, mid));
  root.right = buildTree(arr.slice(mid + 1));

  return root;
}

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

let tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
prettyPrint(tree.root);
tree.deleteItem(8);
prettyPrint(tree.root);