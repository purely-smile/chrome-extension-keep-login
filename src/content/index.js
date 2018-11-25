
const listen = () => {
  window.__KEEP_LOGIN___ = {
    emit(val) {
      console.log(val)
      if (!chrome.runtime) return
      const port = chrome.runtime.connect('jonnbocgonjbdefphknlnhogckmnajof')
      port.postMessage(val)
      // chrome.runtime.sendMessage('keep-login', val)
    },
  }
}
const source = `;(${listen.toString()})()`
const script = document.createElement('script')
script.textContent = source
document.documentElement.appendChild(script)
