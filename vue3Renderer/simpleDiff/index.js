import { render } from "./utils.js";

const oldVNode = {
  type: "div",
  children: [
    {type: "p", children: "1", key: 1},
    {type: "p", children: "2", key: 2},
    {type: "p", children: "hello", key: 3},
    {type: "div", children: [
      {type: "p", children: "222"},
      {type: "p", children: "3333"},
    ]}
  ]
}

const newVNode = {
  type: "div",
  children: [
    {type: "p", children: "world", key: 2},
    {type: "p", children: "1", key: 1},
    {type: "p", children: "3", key: 3},
  ]
}

const root = document.getElementById('app');
render(oldVNode, root); // 首次渲染