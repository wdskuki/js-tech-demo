Function.prototype.myCall = function(context, ...args) {
  if(typeof this !== 'function') {
    throw new Error(' not a function')
  }
  if(!context) {
    context = window
  }
  const key = Symbol('key')
  context[key] = this
  const ret = context[key](...args)
  delete context[key]
  return ret
}

Function.prototype.myApply = function(context, args) {
  if(typeof this !== 'function') {
    throw new Error(' not a function')
  }

  if(!context) {
    context = window
  }

  const key = Symbol('key')
  context[key] = this
  const ret = context[key](args)
  delete context[key]
  return ret
}

Function.prototype.bind = function(context, args) {
  if(typeof this !== 'function') {
    throw new Error(' not a function')
  }

  if(!context) {
    context = window
  }

  const _this = this

  return function(...args2) {
    return _this.apply(context, args.concat(args2))
  }
}