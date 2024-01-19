function handleUserInfo(id, name, age) {
  console.log(id, name, age)
}

const callbackName = `jsonp_${Date.now()}_${Math.floor(Math.random() * 100000000000000)}`
window[callbackName] = handleUserInfo

url = '/hello/id'
params = 1

const script = document.createElement('script')
script.src = `${url}/${params}`
document.body.appendChild(script)

script.onload = () => {
  document.body.removeChild(script)
  delete window[callbackName]
}