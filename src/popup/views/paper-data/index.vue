<template>
  <div class="paper-data-wrap">
    <a-alert
      v-if="msg"
      :message="msg"/>
    <h3>选择要解析的paper</h3>
    <div v-if="paperData">
      <a :href="hrefData">右键选择在新窗口展示paper数据</a>
    </div>
    <a-select
      style="width:250px;"
      v-model="selectedPaper"
      default-value=''
    >
      <a-select-option
        v-for="item in list"
        :key="item.id"
        :value="item.id">{{ item.name }}</a-select-option>
    </a-select>
    <div
      v-if="paperData"
      class="json-preview">
      <vue-json-pretty
        :data="paperData"
        :deep="4"
        :show-length="true"
        selectable-type="tree"/>
    </div>
  </div>
</template>

<script>
import VueJsonPretty from 'vue-json-pretty'
import { getStoreData } from '../../utils/get-store-data'

export default {
  name: 'PaperData',
  data() {
    return {
      list: null,
      selectedPaper: null,
      paperData: null,
      hrefData: '',
    }
  },
  components: {
    VueJsonPretty,
  },
  computed() {
    const { list } = this
    if (!list) {
      return '当前页面未记录数据'
    } if (list.length === 0) {
      return '当前页面没有paper数据'
    }
    return ''
  },
  async mounted() {
    const data = await getStoreData()
    if (data && data.state && data.state.papers) {
      this.list = data.state.papers
    }
  },
  watch: {
    selectedPaper: {
      handler(paperId) {
        this.getPaperData(paperId)
      },
    },
  },
  methods: {
    getPaperData(paperId) {
      this.paperData = null
      this.msg = '加载中...'
      return fetch('https://bookfz.aibeike.com/book/queryPaperById', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          paperId,
        }),
      })
        .then(val => val.json())
        .then((data) => {
          this.paperData = data
          this.msg = '加载完毕'
          this.hrefData = `data:text/json;charset=utf-8,${JSON.stringify(data, null, 2)}`
        })
        .catch((error) => {
          this.msg = error.message
        })
    },
  },
}
</script>
<style lang="scss" scoped>
.paper-data-wrap{
  width: 100%;
  min-height: 400px;
}
</style>
