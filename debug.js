function foo(n) {
  const max = 2 * n - 1;
  for (let i = 1; i <= n; i++) {
    let sideSpace = n - i;
    let starCount = 2 * i - 1;
    let sideStr = new Array(sideSpace).fill(' ').join('');
    let starStr = new Array(starCount).fill('*').join('');
    console.log(`${sideStr}${starStr}`)
  }
}

foo(4)