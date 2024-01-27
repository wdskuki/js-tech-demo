// 数组乱序输出 (如何证明随机性)
function shuffle(arr) {
  for(let i = 0; i < arr.length; i++) {
    const j = Math.floor(Math.random() * arr.length);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr
}

function shuffle2(arr) {
  for(let i = arr.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * i);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr
}
// console.log(shuffle2([1,2,3,4,5,6,7,8,9,10]))

// 数组扁平化
function flatten(arr) {
  let ret = [];
  for(let i = 0; i < arr.length; i++) {
    if(!Array.isArray(arr[i])) {
      ret.push(arr[i])
    }else {
      ret = ret.concat(flatten(arr[i]))
    }
  }
  return ret;
}

function flatten2(arr) {
  return arr.reduce((acc, val) => {
    if(Array.isArray(val)) {
      return acc.concat(flatten2(val))
    }else {
      return acc.concat(val)
    }
  }, [])
}
// console.log(flatten2([1,2,3,[4,5], [6,7,[8,9,[10]]]]))

// 下划线转驼峰
function camelCase(str) {
  const arr = str.split('_')
  let ret = arr[0]
  for(let i = 1; i < arr.length; i++) {
    arr[i][0] = 
    ret += `${arr[i][0].toUpperCase()}${arr[i].slice(1)}`
  }
  return ret
}
// console.log( camelCase('hello_world_sss'))

// 数组转树
function array2Tree(list) {
  const map = new Map()
  for(let i = 0; i < list.length; i++) {
    map.set(list[i].id, list[i])
  }
  for(let i = 0; i < list.length; i++) {
    if(map.has(list[i].parent_id)) {
      const p = map.get(list[i].parent_id)
      if(!p.children) {
        p.children = [list[i]]
      }else {
        p.children.push(list[i])
      }
    }
  }
  // console.log(map)
  return map.get(1)
}

const list = [
  { "id": 12, "parent_id": 1, "name": "朝阳区" },
  { "id": 241, "parent_id": 24, "name": "田林街道" },
  { "id": 31, "parent_id": 3, "name": "广州市" },
  { "id": 13, "parent_id": 1, "name": "昌平区" },
  { "id": 2421, "parent_id": 242, "name": "上海科技绿洲" },
  { "id": 21, "parent_id": 2, "name": "静安区" },
  { "id": 242, "parent_id": 24, "name": "漕河泾街道" },
  { "id": 22, "parent_id": 2, "name": "黄浦区" },
  { "id": 11, "parent_id": 1, "name": "顺义区" },
  { "id": 2, "parent_id": 0, "name": "上海市" },
  { "id": 24, "parent_id": 2, "name": "徐汇区" },
  { "id": 1, "parent_id": 0, "name": "北京市" },
  { "id": 2422, "parent_id": 242, "name": "漕河泾开发区" },
  { "id": 32, "parent_id": 3, "name": "深圳市" },
  { "id": 33, "parent_id": 3, "name": "东莞市" },
  { "id": 3, "parent_id": 0, "name": "广东省" },
]

console.log(array2Tree(list))