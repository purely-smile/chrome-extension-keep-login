import { login } from '../libs/login'

login()

chrome.extension.onConnect.addListener((port) => {
  port.onMessage.addListener(({ action }) => {
    if (action === 'login') login()
  })
})

setInterval(() => {
  login()
}, 1000 * 60 * 5)

window.VUEX_DATA = {}
chrome.runtime.onConnectExternal.addListener((port) => {
  port.onMessage.addListener(({ mutation }, port1) => {
    const { id } = port1.sender.tab
    const data = {
      ...mutation,
      time: Date.now(),
    }
    if (window.VUEX_DATA[id]) {
      window.VUEX_DATA[id].push(data)
    } else {
      window.VUEX_DATA[id] = [data]
    }
  })
})
