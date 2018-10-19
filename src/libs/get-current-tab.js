export default () => new Promise((resolve) => {
  chrome.tabs.query({ active: true }, (tabs) => {
    resolve(tabs[0])
  })
})
