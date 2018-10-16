<template>
  <div class="App-wrap">
    <div class="config-wrap">
      <h3 class="config-title">配置中心</h3>
      <alert :msg="msg"/>
      <input
        v-model="nick"
        type="text"
        placeholder="用户名">
      <input
        v-model="password"
        type="text"
        placeholder="密码">
      <input
        type="number"
        min="1"
        max="20"
        v-model="time"
        placeholder="更新频率（分）">
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
      time: '2',
    }
  },
  components: { alert },
  mounted() {
    const that = this
    chrome.storage.sync.get('config', (val) => {
      if (typeof val.config !== 'object') return
      Object.assign(that, val.config)
    })
  },
  methods: {
    save() {
      const { nick, password, time } = this
      if (![nick, password].every(Boolean)) {
        this.msg = '请输入用户名和密码'
        return
      }
      if (!time) {
        this.msg = '请设置更新频率'
        return
      }
      const config = {
        nick,
        password,
        time,
      }
      saveData({ config })
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
.config-title{
  text-align: center;
  margin-bottom: 10px;
}
.message-box{
  color:coral;
  margin-top: 1px;
  margin-bottom: 10px;
}
input {
    width: 290px;
    display: block;
    border-radius: 3px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    padding: 5px;
}
button{
    margin-top: 20px;
    width: 100px;
    text-align: center;
    padding: 5px;
    color: #fff;
    background: #44acb6;
    border: none;
    border-radius: 3px;
  &:hover{
    background: #54c8cb;
  }
}
</style>
