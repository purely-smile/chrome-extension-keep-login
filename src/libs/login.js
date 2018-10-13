import { storage } from './storage'

const getData = url => new Promise(async (resolve, reject) => {
  const data = await fetch(url).then(res => res.json())
  const { success, message } = data
  const fn = success ? resolve : reject
  fn(message)
})

export async function login() {
  console.log('开始模拟登录')
  const nick = await storage.get('nick')
  const password = await storage.get('password')
  if (![nick, password].every(Boolean)) {
    console.log('没有账号密码')
    return
  }
  console.log(nick, password)
  const userInfo = (`email=${encodeURIComponent(nick)}&password=${encodeURIComponent(password)}`)
  try {
    await Promise.all([
      `https://ziyuankufz.aibeike.com/login/login.action?${userInfo}`,
      `https://jyptfz.aibeike.com//login/login.action?${userInfo}&code=`,
    ].map(url => getData(url)))
    await fetch('https://jyptfz.aibeike.com/home/goSysModule.action?moduleId=203&systemId=203')
    console.log('登录成功')
    chrome.browserAction.setBadgeBackgroundColor({ color: 'cornflowerblue' })
    chrome.browserAction.setBadgeText({ text: 'ok' })
  } catch (error) {
    console.log('登录失败')
    chrome.browserAction.setBadgeBackgroundColor({ color: 'coral' })
    chrome.browserAction.setBadgeText({ text: 'err' })
  }
}
