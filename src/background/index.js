import { storage } from 'src/libs/storage'
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
  port.onMessage.addListener(({ mutation, state }, port1) => {
    const { id } = port1.sender.tab
    const data = {
      ...mutation,
      time: Date.now(),
    }
    if (window.VUEX_DATA[id]) {
      window.VUEX_DATA[id].history.push(data)
      window.VUEX_DATA[id].state = state
    } else {
      window.VUEX_DATA[id] = {
        history: [data],
        state,
      }
    }
  })
})

storage.get()
  .then(({ importPaperState }) => {
    chrome.webRequest.onBeforeSendHeaders.addListener(
      (details) => {
        const { url } = details
        const cancel = importPaperState === true && url.indexOf('updatePaperIdStateByBookId') !== -1
        return {
          cancel,
        }
      },
      { urls: ['<all_urls>'] },
      ['blocking'],
    )
  })
