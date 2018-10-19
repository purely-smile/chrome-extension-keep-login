<template>
  <div class="history-wrap">
    <Alert :msg="msg"/>
    <table>
      <tbody>
        <tr
          class="history-item"
          v-for="(item, index) in list"
          :key="index">
          <td class="name">{{ `${index}：${item.name}` }}</td>
          <td class="describe">{{ item.describe }}</td>
          <td class="time">{{ item.time }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import getCurrentTab from 'src/libs/get-current-tab'
import Alert from 'src/libs/Alert'
import formatData from './format-data'

export default {
  name: 'History',
  data() {
    return {
      list: [],
      msg: '',
    }
  },
  components: {
    Alert,
  },
  async mounted() {
    const { id } = await getCurrentTab()
    const bkg = chrome.extension.getBackgroundPage()
    const data = bkg.VUEX_DATA[id]
    if (!data) {
      this.msg = '当前页面未记录数据'
    } else {
      this.list = formatData(data)
    }
  },
}
</script>
<style lang="scss" scoped>
.history-wrap{
  min-height: 400px;
  width: 500px;
}
table{
  width: 100%;
}
.history-item{
  height: 15px;
  line-height: 15px;
  width: 100%;
  border-bottom: 1px solid #ccc;
  color: #8d3e92;
  background: #fff;
  padding-top: 3px;
  padding-bottom: 3px;
  &:hover{
    background: #e5f2ff
  }
  .name{
    width:30%;
  }
  .describe{
    width: 45%;
  }
  .time{
    width: 20%
  }
}
</style>
