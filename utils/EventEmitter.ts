class EventEmitter {
  private list: Map<string, Function[]> = new Map()
  constructor() {

  }
  on(event: string, listener: Function) {
    if(this.list.has(event)) {
      this.list.get(event)?.push(listener)
    }else {
      this.list.set(event, [listener])
    }
  }
  emit(event: string, ...args: any[]) {
    if(this.list.has(event)) {
      this.list.get(event)?.forEach(item => {{
        item(event, ...args)
      }})
    }
  }
  off(event: string, listener: Function) {
    if(this.list.has(event)) {
      const index = this.list.get(event)?.indexOf(listener) as number
      if(index > -1) {
        this.list.get(event)?.splice(index, 1)
      }
    }
  }
  once(event: string, listener: Function) {
    const _wrapCallback = (...args: any[]) => {
      listener(event, ...args)
      this.off(event, _wrapCallback)
    }
    this.on(event, _wrapCallback)
  }
}

const myEmitter = new EventEmitter()

function callback1(e: string) {
  console.log(`callback1 ${e}`)
}

function callback2(e: string) {
  console.log(`callback2 ${e}`)
}

myEmitter.on('event1', callback1)
myEmitter.on('event2', callback2)

myEmitter.emit('event1')
