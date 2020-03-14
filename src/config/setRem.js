/**
 * set rem
 */
function setRem () {
  const htmlWidth = document.documentElement.clientWidth || document.body.clientWidth
  const htmlDom = document.getElementsByTagName('html')[0]
  const scale = htmlWidth / 1920
  window.htmlScale = scale
  htmlDom.style.fontSize = scale * 100 + 'px'
}

setRem()
