<template>
  <div class="App-wrap">
    <div class="config-wrap">
      <h3 class="config-title">配置中心</h3>
      <a-alert
        v-if="msg"
        :message="msg"/>
      <input
        v-model="nick"
        type="text"
        placeholder="用户名">
      <input
        v-model="password"
        type="text"
        placeholder="密码">
      <a-button
        type="primary"
        @click="save">保存</a-button>
    </div>
  </div>
</template>

<script>
import { storage } from 'src/libs/storage'

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
  async mounted() {
    const data = await storage.get()
    Object.assign(this, data)
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
      storage.set(config)
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
</style>
