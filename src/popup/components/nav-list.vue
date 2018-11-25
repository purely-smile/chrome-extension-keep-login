<template>
  <a-tabs
    class="nav-list-wrap"
    default-active-key="user-area"
    @change="handleClick">
    <a-tab-pane
      :key="item.value"
      :tab="item.name"
      v-for="item in navs"/>
    <div
      slot="tabBarExtraContent"
      title="设置中心"
      class="config-icon"
      @click="openConfig">
      <a-icon
        size="28"
        type="setting" />
    </div>
  </a-tabs>
</template>

<script>
export default {
  name: 'NavList',
  data() {
    return {
      navs: [
        {
          name: '操作',
          value: 'user-area',
        },
        {
          name: '历史',
          value: 'history',
        },
        {
          name: 'paper数据',
          value: 'paper-data',
        },
      ],
    }
  },
  methods: {
    handleClick(value) {
      this.$router.push({ name: value })
    },
    openConfig() {
      if (chrome.runtime.openOptionsPage) {
        chrome.runtime.openOptionsPage()
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.nav-list-wrap{
  width: 100%;
}
.config-icon{
  margin-right: 20px;
  font-size: 20px;
  &:hover{
    i{
      color: #1890ff;
    }
  }
}
</style>
