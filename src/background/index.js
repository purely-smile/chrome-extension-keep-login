import { login } from '../libs/login'

login()

chrome.extension.onConnect.addListener((port) => {
  port.onMessage.addListener(({ action }) => {
    if (action === 'login') login()
  })
})
