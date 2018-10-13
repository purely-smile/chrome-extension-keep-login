<template>
  <div class="app-wrap">
    <alert :msg="msg"/>
    <group title="操作">
      <button
        v-for="val in btnList"
        @click="handleBtnClick(val)"
        :key="val.name">{{ val.name }}</button>
    </group>
  </div>
</template>

<script>
import alert from 'src/libs/Alert'
import { getLocalUrl } from 'src/libs/get-local-url'
import { copyToClipboard } from 'src/libs/copy-to-clipboard'
import { getLoaclIp } from 'src/libs/get-local-ip'
import group from './group'

export default {
  name: 'App',
  data() {
    return {
      msg: '',
      btnList: [
        {
          name: '设置',
          fn: 'openConfig',
        },
        {
          name: '刷新',
          fn: 'login',
        },
        {
          name: '复制url',
          fn: 'copyUrl',
        },
        {
          name: '访问开发地址',
          fn: 'openLocalUrl',
        },
        {
          name: '访问仿真地址',
          fn: 'openOnlineUrl',
        },
        {
          name: '4s 调试',
          fn: 'fireDebug',
        },
        {
          name: '清空缓存',
          fn: 'clearCache',
        },
      ],
    }
  },
  components: {
    group,
    alert,
  },
  mounted() {
    this.bus = chrome.extension.connect({ name: 'keep-login' })
  },
  methods: {
    handleBtnClick({ fn }) {
      this[fn]()
    },
    login() {
      this.postMessage({
        action: 'login',
      })
    },
    postMessage(info) {
      this.bus.postMessage(info)
    },
    openConfig() {
      if (chrome.runtime.openOptionsPage) {
        chrome.runtime.openOptionsPage()
      }
    },
    async copyUrl() {
      let msg = '复制成功'
      try {
        const url = await getLocalUrl()
        copyToClipboard(url)
      } catch (error) {
        msg = error.message
      }
      this.msg = msg
    },
    async openLocalUrl() {
      const prefix = 'https://bookfz.aibeike.com/layout'
      chrome.tabs.query({ active: true }, async (tabs) => {
        const list = tabs.map(tab => tab.url).filter(url => url.startsWith(prefix))
        if (list.length === 0) {
          this.msg = '请切换到模板仿真标签页'
        } else {
          const localIp = await getLoaclIp()
          const url = list[0].replace(prefix, `http://${localIp}:8080`)
          window.open(url)
        }
      })
    },
    async openOnlineUrl() {
      const url = await getLocalUrl()
      const localIp = await getLoaclIp()
      const onlineUrl = url.replace(
        `http://${localIp}:8080`,
        'https://bookfz.aibeike.com/layout',
      )
      window.open(onlineUrl)
    },
    fireDebug() {
      chrome.tabs.query({ active: true }, (tabs) => {
        const { url, id } = tabs[0]
        if (url === 'chrome://extensions/') {
          this.msg = '当前页无法使用'
          return
        }
        chrome.tabs.executeScript(id, {
          code: `setTimeout(() => {
                debugger
            }, 4000)`,
        })
      })
    },
    clearCache() {
      this.msg = '处理中...'
      chrome.browsingData.removeCache({ since: 0 }, () => {
        this.msg = '清除成功'
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.app-wrap{
  width: 300px;
  height: 400px;
}
button{
    margin: 2px;
    cursor: pointer;
}
#error-message{
    color:coral;
}
</style>
