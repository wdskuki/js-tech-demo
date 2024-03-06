import { createRenderer } from "./utils.js";


// const oldVNode = {
//   type: "h1",
//   props: {
//     // onClick: () => {
//     //   console.log('click')
//     // },
//     // onMousemove: () => {
//     //   console.log('mouse move');
//     // }
//     onmouseup: () => {
//       console.log('mouse up')
//     },
//     onmousedown: () => {
//       console.log('mouse down')
//     },
//   },
//   children: "hello",
// }

// const newVNode = {
//   type: "h2",
//   children: "hello world",
// }

const oldVNode = {
  type: "div",
  props: {
    onClick: () => {
      console.log('div click')
    },
  },
  children: [
    {
      type: 'p',
      props: {
        onClick: () => {
          console.log('p click')
        }
      },
      children: "hello"
    }
  ]
}

const renderer = createRenderer();
const root = document.getElementById('app');
renderer.render(oldVNode, root); // 首次渲染
// renderer.render(newVNode, root); // 渲染更新
// renderer.render(null, root); // 卸载
