import { getLoaclIp } from './get-local-ip'

export const getLocalUrl = () => new Promise((resolve, reject) => {
  chrome.tabs.query({}, async (tabs) => {
    const localIp = await getLoaclIp()
    const list = tabs
      .sort((a, b) => b.active - a.active)
      .map(tab => tab.url)
      .filter(url => ['localhost', localIp].some(val => url.includes(`${val}:8080`)))
    if (list.length === 0) {
      reject(new Error('未找到开发地址'))
    } else {
      const url = list[0].replace('localhost', localIp)
      resolve(url)
    }
  })
})
