// Node class
class Node {
    constructor(data) {
      this.data = data;
      this.children = [];
    }
  
    add(node) {
      this.children.push(node);
    }
  
    remove(data) {
      this.children = this.children.filter((node) => {
        return node.data !== data;
      });
    }
}
  
  // Tree class
class Tree {
    constructor() {
      this.root = null;
    }
  
    traverseBF(fn) {
      const arr = [this.root];
      while (arr.length) {
        const node = arr.shift();
  
        arr.push(...node.children);
        fn(node);
      }
    }
  
    traverseDF(fn) {
      const arr = [this.root];
      while (arr.length) {
        const node = arr.shift();
  
        arr.unshift(...node.children);
        fn(node);
      }
    }
}



module.exports.createTreeCategory = (categories) => {
    const root = new Node('0');
    const tree = new Tree();
    tree.root = root;
    const len = categories.length;

    function createTree(node, categories, len) {
        for (var i = 0; i< len; i++) {
            const ele = categories[i];
            let id = JSON.stringify(node.data._id);
            let parentId = JSON.stringify(ele.parent);
            if (id == parentId) {
                const nodeChild = new Node(ele);
                node.add(nodeChild);
                createTree(nodeChild, categories, len);
            }
        }
        return ;
    }

    for (var i = 0; i< len; i++) {
        const ele = categories[i];
        if (ele.parent == '') {
            const nodeChild = new Node(ele);
            root.add(nodeChild);
            createTree(nodeChild, categories, len);
        }
    }
    return tree;
}