import { effect, myReactive } from './effect.js'

const data = {
  value: 1,
};

const obj = myReactive(data);

effect(
  () => {
    console.log(obj.value);
  },
  {
    scheduler(fn) {
      setTimeout(() => {
        fn();
      }, 3000);
    },
  }
);

obj.value++;

console.log("end");