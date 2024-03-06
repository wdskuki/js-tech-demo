// 创建渲染器
export function createRenderer() {

  // 挂载
  function mountElement(vnode, container) {
    console.log(`mountElement, ${vnode}, ${container}`);
    const el = vnode.el = document.createElement(vnode.type);


    // patchProps(el, vnode.props)
    if(vnode.props) {
      for(const key in vnode.props) {
        patchProps(el, key, null, vnode.props[key])
      }
    }
    // if(vnode.props) {
    //   for(const key in vnode.props) {
    //     if(key in el) {
    //       if(typeof el[key] === boolean && vnode.props[key] === '') {
    //         el[key] = true;
    //       }else {
    //         el[key] = vnode.props[key];
    //       }
    //     }else {
    //       el.setAttribute(key, vnode.props[key])
    //     }
    //   }
    // }

    if(typeof vnode.children === 'string') {
      el.textContent = vnode.children;
    }else if(Array.isArray(vnode.children)) {
      // 如果子节点数组，遍历每个节点并进行patch挂载
      vnode.children.forEach(child => {
        patch(null, child, el);
      });
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

  // 绑定属性和事件
  function patchProps(el, key, prevValue, nextValue) {
    console.log(`patchProps ${key}`)
    if(/^on/.test(key)) {
      let invokers = el._vei || (el._vei = {}); 
      let invoker = invokers[key];     
      const name = key.slice(2).toLowerCase();
      if(!invoker) {
        invoker = el._vei[key] = (e) => {
          invoker.value(e)
        }
        invoker.value = nextValue
        const startTime = performance.now();
        console.time('addEventListener operation');
        // for(let i = 0; i < 10000; i++) {
          // let a = 1;
          // document.getElementById('app');
          el.addEventListener(name, invoker);
        // }
        console.timeEnd('addEventListener operation');
        const endTime = performance.now();
        console.log(`addEventListener ${name} ${endTime - startTime}ms`);
      }else {
        invoker.value = nextValue
      }
      
      // prevValue && el.removeEventListener(name, prevValue);
      // el.addEventListener(name, nextValue);
    }
  }


  // 渲染
  function render(vnode, container) {
    if(vnode) {
      // 挂载or更新
      patch(container._vnode, vnode, container)
    }else {
      // 卸载
      if(container._vnode) {
        unmount(container._vnode);
      }
    }
    // 将虚拟节点关联到DOM属性_vnode
    container._vnode = vnode
  }

  // 打补丁
  function patch(n1, n2, container) {
    // 卸载
    if(!n1) {
      mountElement(n2, container);
      return
    }

    if(n1.type !== n2.type) {
      // 类型不同
      unmount(n1);
      mountElement(n2, container);
    }else {
      // 类型相同
      if(n2.type === 'string') {
        n1.children = n2.children
      }
    }
  }

  return {
    render
  }
}


