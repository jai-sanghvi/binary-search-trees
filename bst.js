import { Node } from './node.js';

export class Tree {
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
    this.root = Tree.buildTree(modifiedArr);
  }

  static buildTree(arr) {
    let start = 0;
    let end = arr.length - 1;
    if (start > end) return null;
  
    let mid = Math.floor( (start + end) / 2 );
    let root = new Node(arr[mid]);
  
    root.left = Tree.buildTree(arr.slice(0, mid));
    root.right = Tree.buildTree(arr.slice(mid + 1));
  
    return root;
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
      if (currentNode === null) return null;
      if (currentNode.data === value) return currentNode;

      if (value < currentNode.data) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
    }
  }

  levelOrderIteration(callback) {
    if (callback === undefined) throw new Error("A callback function is required");
    if (this.root === null) throw new Error("Tree is empty");

    let queue = [this.root];

    while (queue.length > 0) {
      let currentNode = queue.shift();

      callback(currentNode);

      if (currentNode.left !== null) queue.push(currentNode.left);
      if (currentNode.right !== null) queue.push(currentNode.right);
    }

  }

  levelOrderRecursion(callback) {
    if (callback === undefined) throw new Error("A callback function is required");

    if (this.root === null) return;

    let queue = [this.root];

    function traverseTree(node) {
      callback(node);
      if (node.left !== null) queue.push(node.left);
      if (node.right !== null) queue.push(node.right);

      if (queue.length < 1) return;
      traverseTree(queue.shift());
    }

    traverseTree( queue.shift() );
  }

  preOrder(callback) {
    if (callback === undefined) throw new Error("A callback function is required");

    function traverseTree(root) {
      if (root === null) return;

      callback(root);
      traverseTree(root.left);
      traverseTree(root.right);
    }

    traverseTree(this.root);
  }

  inOrder(callback) {
    if (callback === undefined) throw new Error("A callback function is required");

    function traverseTree(root) {
      if (root === null) return;

      traverseTree(root.left);
      callback(root);
      traverseTree(root.right);
    }

    traverseTree(this.root);
  }

  postOrder(callback) {
    if (callback === undefined) throw new Error("A callback function is required");

    function traverseTree(root) {
      if (root === null) return;

      traverseTree(root.left);
      traverseTree(root.right);
      callback(root);
    }

    traverseTree(this.root);
  }

  height(node) {
    if (node === null) return 0;

    const leftHeight = (node.left === null) ? 0 : (1 + this.height(node.left));
    const rightHeight = (node.right === null) ? 0 : (1 + this.height(node.right));

    return (leftHeight > rightHeight) ? leftHeight : rightHeight;
  }

  depth(node) {
    if (this.find(node) === null) throw new Error("Node not found");

    let currentNode = this.root;
    let depth = 0;

    while (currentNode.data !== node) {

      if (node < currentNode.data) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }

      depth++;
    }

    return depth;
  }

  isBalanced() {
    let isBalanced = true;

    this.preOrder((root) => {
      const leftHeight = this.height(root.left);
      const rightHeight = this.height(root.right);

      const heightDifference = leftHeight - rightHeight;


      if ( (heightDifference < -1) || (heightDifference > 1) ) {
        isBalanced = false;
      }
    })

    return isBalanced;
  }

  reBalance() {
    const sortedArray = [];
    this.inOrder( (root) => sortedArray.push(root.data) );
    this.root = Tree.buildTree(sortedArray);
  }

}