<template>
  <div class="nav-list-wrap">
    <span
      class="nav-item"
      :class="{active:$route.name === item.value}"
      v-for="item in navs"
      :key="item.value"
      @click="handleClick(item)">
      {{ item.name }}
    </span>
  </div>
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
      ],
    }
  },
  methods: {
    handleClick(item) {
      const { value } = item
      this.$router.push({ name: value })
    },
  },
}
</script>
<style lang="scss" scoped>
.nav-list-wrap{
  width: 100%;
  height: 20px;
  background: cornflowerblue;
  color:#fff;
  font-weight: bold;
  .nav-item{
    height: 100%;
    display: inline-block;
    text-align: center;
    width: 50%;
    &.active{
      background: rgb(28, 98, 228);
    }
  }
}
</style>
