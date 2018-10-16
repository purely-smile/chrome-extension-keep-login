import { storage } from './storage'
import { setBardge } from './set-bardge'

const getData = url => new Promise(async (resolve, reject) => {
  const data = await fetch(url).then(res => res.json())
  const { success, message } = data
  const fn = success ? resolve : reject
  fn(message)
})


export function login() {
  return new Promise(async (resolve, reject) => {
    console.log('开始模拟登录')
    const { nick, password } = await storage.get('config')
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
      await fetch('https://jyptfz.aibeike.com/home/goSysModule.action?moduleId=203&systemId=203', {
        redirect: 'follow',
      })
      console.log('登录成功')
      resolve('登录成功')
      setBardge('ok', 'cornflowerblue')
    } catch (error) {
      console.log('登录失败')
      reject(new Error('登录失败'))
      setBardge('err', 'coral')
    }
  })
}
