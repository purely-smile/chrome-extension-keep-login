import getCurrentTab from 'src/libs/get-current-tab'

export const getStoreData = async () => {
  const { id } = await getCurrentTab()
  const bkg = chrome.extension.getBackgroundPage()
  console.log('bkg', bkg, id)
  return bkg.VUEX_DATA[id]
}
