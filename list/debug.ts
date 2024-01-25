class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}


function foo(root: ListNode | null): void {
  // print(root)
  let pOdd = new ListNode(-1)
  let pEven = new ListNode (-2)
  let curOdd = pOdd
  let curEven = pEven
  let count = 1
  while(root) {
    if(count % 2 === 1) {
      curOdd.next = root
      curOdd = curOdd.next
      root = root.next
    }else {
      curEven.next = root
      curEven = curEven.next
      root = root.next
    }
    count++
  }
  curOdd.next = null
  curEven.next = null

  const newHead = merge(pOdd.next, reverse(pEven.next))

  print(newHead)
}


function reverse(r: ListNode | null): ListNode | null {
  if(r === null || r.next === null) {
    return r
  }

  const newHead = reverse(r.next)
  r.next.next = r
  r.next = null
  return newHead
}

function merge(r1: ListNode | null, r2: ListNode | null) : ListNode | null {
  const p = new ListNode(-1)
  let cur = p
  while(r1 && r2) {
    if(r1.val <  r2.val) {
      cur.next = r1
      cur = cur.next
      r1 = r1.next
    }else {
      cur.next = r2
      cur = cur.next
      r2 = r2.next
    }
  }
  if(r1) {
    cur.next = r1
  }else if(r2) {
    cur.next = r2
  }
  return p.next
}

let a = [
  new ListNode(1),
  new ListNode(8),
  new ListNode(3),
  new ListNode(6),
  new ListNode(5),
  new ListNode(4),
  new ListNode(7),
  new ListNode(2),
]
a[0].next = a[1]
a[1].next = a[2]
a[2].next = a[3]
a[3].next = a[4]
a[4].next = a[5]
a[5].next = a[6]
a[6].next = a[7]

const root = a[0]

foo(root)

function print(root: ListNode | null) {
  let p = root
  while(p) {
    console.log(p.val)
    p = p.next
  }
}


