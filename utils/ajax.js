const xhr = new XMLHttpRequest()

xhr.open('GET', '/hello/id/1', true)
xhr.onload = () => {
  if(xhr.status === 200) {
    console.log(xhr.responseText)
  }else {
    console.error('Error')
  }
}
xhr.onerror = (err) => {
  console.error(err)
}

xhr.send()