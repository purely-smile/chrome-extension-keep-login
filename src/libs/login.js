import { storage } from './storage'
import { setBardge } from './set-bardge'

const getData = url => new Promise(async (resolve, reject) => {
  const data = await fetch(url).then(res => res.json())
  const { success, message } = data
  const fn = success ? resolve : reject
  fn(message)
})

const http = {
  get(url) {
    fetch(url, {
      redirect: 'follow',
    })
  },
  post(url, data) {
    fetch(url, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(data),
    })
  },
}

export function login() {
  setBardge('login...', 'blue')
  return new Promise(async (resolve, reject) => {
    console.log('开始模拟登录')
    const { nick, password } = await storage.get('config')
    if (![nick, password].every(Boolean)) {
      console.log('没有账号密码')
      return
    }
    const userInfo = (`email=${encodeURIComponent(nick)}&password=${encodeURIComponent(password)}`)
    try {
      await getData(`https://ziyuankufz.aibeike.com/login/login.action?${userInfo}`)
      await http.post('https://jyptfz.aibeike.com/login/login.action', {
        code: '',
        email: nick,
        password: btoa(password),
      })
      await http.get('https://jyptfz.aibeike.com/#/home')
      await http.get('https://ziyuankufz.aibeike.com/#/HomePage')
      await http.get('https://jyptfz.aibeike.com/home/goSysModule.action?moduleId=203&systemId=203')
      await http.get('https://jyptfz.aibeike.com/home/goSysModule.action?moduleId=21&systemId=3')

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
