
// 挂载子节点
function mountChildren(children, container) {
  children.forEach(vnode => {
    patch(null, vnode, container);
  })
}

// 打补丁
function patch(n1, n2, container) {
  // 挂载
  if(!n1) {
    mountElement(n2, container);
    return;
  }

  // if(n1.type !== n2.type) {
  //   // 类型不同，先卸载old，再挂在new
  //   unmount(n1);
  //   mountElement(n2, container);
  // }else {
  //   // 类型相同
  //   // TODO


  // }
}
// 挂载
function mountElement(vnode, container) {
  console.log(`mountElement, ${vnode}, ${container}`);
  const el = vnode.el = document.createElement(vnode.type);

  if(typeof vnode.children === 'string') {
    el.textContent = vnode.children;
  }else if(Array.isArray(vnode.children)) {
    // 如果子节点数组，遍历每个节点并进行patch挂载
    mountChildren(vnode.children, el);
  }
  container.appendChild(el);
}

// 卸载
function unmount(vnode) {
  console.log(`umount, ${vnode}`);
  const parent = vnode.el.parentNode;
  if(parent) {
    parent.removeChild(vnode.el);
  }
}


export function render(vnode, container) {
  patch(container._vnode, vnode, container)
}