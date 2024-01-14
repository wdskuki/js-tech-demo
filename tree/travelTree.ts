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
 * 中序遍历递归
 * @param root 
 */
function middleTravel(root: TreeNode | null): number[] {
  if(root) {
    return [...middleTravel(root.left), root.val, ...middleTravel(root.right)]
  }else {
    return []
  }
}

/**
 * 前序遍历递归实现
 * @param root 
 */
function preTravel(root: TreeNode | null) : void {
  if(root) {
    console.log(root.val)
    preTravel(root.left)
    preTravel(root.right)
  }
}

/**
 * 后续遍历递归实现
 * @param root 
 */
function postTravel(root: TreeNode | null) : void {
  if(root) {
    postTravel(root.left)
    postTravel(root.right)
    console.log(root.val)
  }
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
  console.log(middleTravel(root))
  // preTravel(root)
  // postTravel(root)
})()