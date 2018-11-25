export const storage = {
  get() {
    return new Promise((resolve, reject) => {
      chrome.storage.sync.get('config', (val) => {
        if (typeof val.config !== 'object') {
          reject(new Error('未获取配置信息'))
          return
        }
        resolve(val.config)
      })
    })
  },
  set(data) {
    chrome.storage.sync.set({ config: data })
  },
}
