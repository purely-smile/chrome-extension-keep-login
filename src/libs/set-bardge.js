export const setBardge = (text, color) => {
  chrome.browserAction.setBadgeBackgroundColor({ color })
  chrome.browserAction.setBadgeText({ text })
}
