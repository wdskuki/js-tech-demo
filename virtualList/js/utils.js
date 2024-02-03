const MAX_LENGTH = Infinity; // 最大消息个数
const MSG_TYPE_COUNT = 4; // 消息类型个数

/**
 * 生成一条消息对象
 * @param {*} value 
 * @returns 类型：{id: string, value: any, type: number}
 */
function createMsg(value) {
  return {
    id: `p2p_${Date.now()}_${Math.floor(Math.random() * 1000)}_${Math.floor(Math.random() * 100000000000)}`,
    value,
    type: Math.floor(Math.random() * MSG_TYPE_COUNT),
  }
}

/**
 * 模拟获取分页消息
 * @param {*} page 
 * @param {*} size 
 * @returns 
 */
export function fetchData(page, size) {
  return new Promise((resolve, reject) => {
    if (page * size >= MAX_LENGTH) {
      console.log("无法加载更多数据了");
      reject();
    } else {
      console.log("加载数据中...");
      setTimeout(() => {
        const ret = [];
        for (let i = 0; i < size; i++) {
          ret.push(createMsg(page * size + i))
        }
        resolve(ret);
        console.log("数据加载完成", page, size, ret);
      }, Math.random() * 500); // 随机0～500ms
    }
  });
}

/**
 * 自定义消息类型高度
 * @param {*} type 
 * @returns 高度值（px）
 */
function getMsgHeight(type) {
  let ret = 0;
  switch (type) {
    case 0: // 文字
      ret = 50;
      break;
    case 1: // 图片
      ret = 150;
      break;
    case 2: // 视频
      ret = 48;
      break;
    case 3: // 音频
      ret = 80;
      break;
    default: // 其他
      ret = 43;
      break;
  }
  return ret;
}

// 
/**
 * 渲染数据到页面
 * @param {*} element: 列表容器节点
 * @param {*} list: 消息列表数据
 */
export function render(element, list) {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < list.length; i++) {
    const node = document.createElement("div");
    const height = getMsgHeight(list[i].type);
    node.style.height = height + "px";
    node.style.border = `1px solid green`;
    node.id = list[i].id
    node.innerText = list[i].value;
    fragment.appendChild(node);
  }
  element.appendChild(fragment);
}

/**
 * 判断是否滑动到底部了
 * @param {*} outerElement: 外层容器节点
 * @param {*} bottom: 滑动到离底部距离
 * @returns 
 */
export function isScrollToBottom(outerElement, bottom = 10) {
  if (outerElement.scrollTop + outerElement.clientHeight + bottom >= outerElement.scrollHeight) {
    return true;
  } else {
    return false;
  }
}


// // 模拟发送消息

// export function sendMsg(loadedList) {
//   const msg = createMsg('custom_send_msg');
//   loadedList.unshift(msg);
//   // render()
//   // innerElement.appendChild(msg);
//   // render(innerElement, )
// }

// 模拟接收消息