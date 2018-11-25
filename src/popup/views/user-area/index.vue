<template>
  <div class="app-wrap">
    <alert :msg="msg"/>
    <group title="导航">
      <a
        v-for="item in linkList"
        target="_blank"
        :key="item.name"
        :href="item.url">{{ item.name }}</a>
    </group>
    <group
      v-for="item in btnList"
      :key="item.name"
      :title="item.name">
      <a-button
        v-for="val in item.list"
        class="nav-item"
        size="small"
        type="primary"
        ghost
        @click="handleBtnClick(val)"
        :key="val.name">{{ val.name }}</a-button>
    </group>
    <group title="控制面板">
      <a-button
        @click="handlePaperStateChange"
        size="small">
        {{ configData.importPaperState ? '关闭': '开启' }}paper无限导入
      </a-button>
    </group>
  </div>
</template>

<script>
import alert from 'src/libs/Alert'
import { getLocalUrl } from 'src/libs/get-local-url'
import { copyToClipboard } from 'src/libs/copy-to-clipboard'
import { getLoaclIp } from 'src/libs/get-local-ip'
import { login } from 'src/libs/login'
import { storage } from 'src/libs/storage'
import { btnList } from './config'
import group from '../../components/group'

export default {
  name: 'App',
  data() {
    return {
      msg: '',
      btnList,
      linkList: [
        {
          name: '模板管理',
          url: 'https://bookfz.aibeike.com/template/#/',
        },
        {
          name: '教研后台',
          url: 'https://jiaoyanfz.aibeike.com/haibian/#!/admin/ipsmodule',
        },
      ],
      configData: {},
    }
  },
  components: {
    group,
    alert,
  },
  async mounted() {
    this.bus = chrome.extension.connect({ name: 'keep-login' })
    this.configData = await storage.get()
    console.log(this.configData)
  },
  methods: {
    handleBtnClick({ fn }) {
      this[fn]()
    },
    async login() {
      try {
        this.msg = await login()
      } catch (error) {
        this.msg = error.message
      }
    },
    postMessage(info) {
      this.bus.postMessage(info)
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
    forceRefresh() {
      chrome.tabs.query({ active: true }, (tabs) => {
        const { id } = tabs[0]
        chrome.tabs.reload(id, {
          bypassCache: true,
        }, () => {
          this.msg = '刷新成功'
        })
      })
    },
    async createTemplate() {
      const date = new Date()
      const title = `测试用模板：${date.getFullYear()}-${date.getHours()}-${date.getMinutes()}`
      const { data, success, message } = await fetch('https://bookfz.aibeike.com/template/addTemplate', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          cityIds: '0512',
          years: '2019',
          semesters: '1',
          gradeIds: '0',
          subjectIds: '1',
          typeIds: '1',
          title,
        }),
      }).then(val => val.json())
      if (!success) {
        this.msg = message
      } else {
        const url = `https://bookfz.aibeike.com/layout/#/edit/${data}/0`
        window.open(url)
      }
    },
    copyTemplate() {
      chrome.tabs.query({ active: true }, async (tabs) => {
        console.log(tabs)
        const { url } = tabs[0]
        const matchs = url.match(/(\w{32})\/0/)
        const id = matchs && matchs[1]
        if (!id) {
          this.msg = '请选择模板页面'
          return
        }
        const { data, success, message } = await fetch('https://bookfz.aibeike.com/template/copyTemplate', {
          method: 'POST',
          body: JSON.stringify({ id }),
          headers: {
            'content-type': 'application/json',
          },
        }).then(val => val.json())
        if (!success) {
          this.msg = message
        } else {
          const herf = `https://bookfz.aibeike.com/layout/#/edit/${data}/0`
          window.open(herf)
        }
      })
    },
    // 切换paper导入无限状态
    handlePaperStateChange() {
      const { configData } = this
      this.$set(configData, 'importPaperState', !configData.importPaperState)
      storage.set(configData)
    },
  },
}
</script>
<style lang="scss" scoped>
.app-wrap{
  width: 100%;
  height: 400px;
}
#error-message{
    color:coral;
}
a{
  margin: 2px;
}
.nav-item{
  margin-right: 5px;
  margin-bottom: 5px;
}
</style>
