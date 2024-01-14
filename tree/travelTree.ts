/**
 * 节点数据结构
 */
class TreeNode {
  val: number
  left: TreeNode | null
  right: TreeNode | null
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = (val === undefined ? 0 : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)
  }
}

/**
 * 中序遍历递归实现
 * @param root 
 */
function inOrderTraversal(root: TreeNode | null): number[] {
  if(root) {
    return [...inOrderTraversal(root.left), root.val, ...inOrderTraversal(root.right)]
  }else {
    return []
  }
}

/**
 * 中序递归迭代实现
 * @param root 
 */

function inOrderTraversalIterate(root: TreeNode | null): number[] {

  // if(root === null) return []
  // const ret = []
  // const stack: TreeNode[] = []
  // stack.push(root)
  // while(stack.length) {
  //   let node: TreeNode = stack[stack.length - 1]
  //   while(node.left) {
  //     stack.push(node.left)
  //     node = node.left
  //   }
  //   node = stack.pop() as TreeNode
  //   ret.push(node.val)
  //   if(node.right) {
  //     stack.push(node.right)
  //   }else {
  //     node = stack.pop() as TreeNode
  //     ret.push(node.val)
  //   }
  // }
  // return ret

  if(root === null) return []
  const ret = []
  const stack: TreeNode[] = []
  let node: TreeNode | null = root

  while(stack.length || node) {
    while(node) {
      stack.push(node)
      node = node.left
    }
    node = stack.pop() as TreeNode
    ret.push(node.val)
    node = node.right
  }
  return ret
}

/**
 * 前序遍历递归实现
 * @param root 
 */
function preOrderTraversal(root: TreeNode | null) : number[] {
  if(root) {
    return [root.val, ...preOrderTraversal(root.left), ...preOrderTraversal(root.right)]
  }else {
    return []
  }
}

/**
 * 前序遍历的非递归过程
 * @param root 
 */
function preOrderTraversalIterate(root: TreeNode | null) : number[] {
  if(root === null) return []
  const stack: TreeNode[] = []
  const ret = []
  // stack.push(root)
  let node: TreeNode | null = root
  while(stack.length || node) {
    while(node) {
      ret.push(node.val)
      stack.push(node)
      node = node.left
    }
    node = stack.pop() as TreeNode
    node = node.right
  }
  return ret
}

/**
 * 后续遍历递归实现
 * @param root 
 */
function postOrderTraversal(root: TreeNode | null) : number[] {
  if(root) {
    return [...postOrderTraversal(root.left), ...postOrderTraversal(root.right), root.val]
  }else {
    return []
  }
}

/**
 * 后序遍历的非递归实现
 * @param root 
 */
function postOrderTraversalIterate(root: TreeNode | null): number[] {
  if (root === null) return [];

  const ret: number[] = [];
  const stack: TreeNode[] = [];
  let prev: TreeNode | null = null;
  let node: TreeNode | null = root;
  while (node || stack.length) {
    while (node) {
      stack.push(node);
      root = node.left;
    }

    node = stack.pop() as TreeNode;

    // 检查右子树是否存在或者是否已经访问过
    if (!node.right || node.right === prev) {
      ret.push(node.val);
      prev = node;
      node = null; // 置空root，以便下一次弹出栈顶元素
    } else {
      // 将当前节点重新入栈，处理右子树
      stack.push(node);
      node = node.right;
    }
  }

  return ret;
}


(() => {
  const root = new TreeNode(1, 
    new TreeNode(2, 
      new TreeNode(4, null, null), 
      new TreeNode(5, null, null)), 
    new TreeNode(3, 
      new TreeNode(6, null, null), 
      new TreeNode(7, null, null))
  )
  console.log(postOrderTraversal(root))
  console.log(postOrderTraversalIterate(root))
})()