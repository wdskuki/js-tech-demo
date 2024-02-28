const obj = {
	hello: 1,
	get world() {
		return this.hello
	}
}

// const pObj = new Proxy(obj, {
//     get(target, key, receiver) {
//         console.log('Proxy key:', key)
//         return target[key]
//     }
// })

const pObj = new Proxy(obj, {
    get(target, key, receiver) {
        console.log('Proxy key:', key)

        return Reflect.get(target, key, receiver)
    }
})

pObj.world; // 读取代理对象的world属性
