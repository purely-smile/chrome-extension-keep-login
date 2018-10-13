<template>
  <div class="App-wrap">
    <div class="config-wrap">
      <h3>配置中心</h3>
      <alert :msg="msg"/>
      <input
        v-model="nick"
        type="text"
        placeholder="用户名">
      <input
        v-model="password"
        type="text"
        placeholder="密码">
      <button @click="save">保存</button>
    </div>
  </div>
</template>

<script>
import alert from '../../libs/Alert'

const saveData = data => chrome.storage.sync.set(data)
export default {
  name: 'App',
  data() {
    return {
      nick: '',
      password: '',
      msg: '',
    }
  },
  components: { alert },
  mounted() {
    const that = this
    chrome.storage.sync.get('nick', (val) => {
      that.nick = val.nick
    })

    chrome.storage.sync.get('password', (val) => {
      that.password = val.password
    })
  },
  methods: {
    save() {
      const { nick, password } = this
      if (![nick, password].every(Boolean)) {
        this.msg = '请输入用户名和密码'
        return
      }
      [{ nick }, { password }].forEach(val => saveData(val))
      this.msg = '保存成功'
    },
  },
}
</script>
<style lang="scss" scoped>
.config-wrap{
  width: 300px;
  margin: 0px auto;
  background: #ccc;
  padding: 10px;
  border-radius: 3px;
  height: 100vh;
}
.message-box{
  color:coral;
  margin-top: 1px;
  margin-bottom: 10px;
}
</style>
