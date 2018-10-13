export const storage = {
  get(name) {
    return new Promise((resolve) => {
      chrome.storage.sync.get(name, (val) => {
        resolve(val[name])
      })
    })
  },
  set() {},
}
