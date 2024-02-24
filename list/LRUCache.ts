class LRUNode {
  key: number;
  value: number;
  next: LRUNode | null;
  prev: LRUNode | null;
  constructor(key: number, value: number) {
    this.key = key;
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}
class LRUCache {
  capacity: number;
  cache: Map<number, LRUNode>;
  head: LRUNode | null;
  tail: LRUNode | null;
  constructor(capacity: number) {
    this.capacity = capacity;
    this.cache = new Map<number, LRUNode>();
    this.head = this.tail = null;
  }

  get(key: number): number {
    if (this.cache.has(key)) {
      // 存在对应的key
      const node: LRUNode = this.cache.get(key)!;
      this._moveToTail(node);
      return node.value;
    } else {
      // 不存在对应的key
      return -1;
    }
  }

  put(key: number, value: number): void {
    if (this.cache.has(key)) {
      /**
       * 存在对应的key
       * 1. 更新对应节点的value
       * 2. 将节点移动到链表尾部
       */
      const node: LRUNode = this.cache.get(key)!;
      node.value = value;
      this._moveToTail(node);
    } else {
      const node: LRUNode = new LRUNode(key, value);
      if (this.cache.size < this.capacity) {
        /**
         * 容量没有超过capacity
         * 直接将新节点添加到链表尾部
         */
        this._addToTail(node);
      } else {
        /**
         * 容量操作capacity
         * 1. 删除头部节点
         * 2. 将新节点添加到链表尾部
         * 3. 删除cache中对应的key
         */
        const headNode = this.head!;
        this._remove(headNode);
        this._addToTail(node);
        this.cache.delete(headNode.key);
      }
      this.cache.set(key, node);
    }
  }
  // 删除节点
  _remove(node: LRUNode): void {
    const preNode = node.prev;
    const nextNode = node.next;
    if (preNode) {
      preNode.next = nextNode;
    }
    if (nextNode) {
      nextNode.prev = preNode;
    }

    if (node === this.head) {
      this.head = node.next;
      this.head && (this.head.prev = null);
    }
    if (node === this.tail) {
      this.tail = node.prev;
      this.tail && (this.tail.next = null);
    }
  }
  // 添加节点到尾部
  _addToTail(node: LRUNode): void {
    if (!this.tail) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      node.prev = this.tail;
      this.tail = node;
      this.tail.next = null;
    }
  }
  // 移动节点到尾部
  _moveToTail(node: LRUNode): void {
    this._remove(node);
    this._addToTail(node);
  }
}
