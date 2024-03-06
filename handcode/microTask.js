async function p1() {
  return "p1";
}

async function p11() {
  return await "p11"
}

p11().then(res => console.log(res));
p1().then(res => console.log(res));






// function p4() {
//   console.log("start p4");
//   return Promise.resolve("p4");
// }

// async function p2() {
//   console.log("start p2");
//   return Promise.resolve("p2");
// }

// // async function p22() {
// //   console.log("start p22");
// //   return Promise.resolve(Promise.resolve("p22"));
// // }

// function p4() {
//   console.log("start p4");
//   return Promise.resolve("p4");
// }

// async function p3() {
//   console.log("start p3");
//   return await Promise.resolve("p3");
// }

// console.log("start");
// // p22().then(res => console.log(res));
// p1().then(res => console.log(res));
// p2().then(res => console.log(res));
// p3().then(res => console.log(res));
// p4().then(res => console.log(res));
// console.log("end");


// // Promise.resolve("p4").then(res => console.log(res));