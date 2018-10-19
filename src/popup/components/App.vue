<template>
  <div class="app-wrap">
    <nav-list/>
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
import navList from './nav-list'

export default {
  components: {
    navList,
  },
}
</script>

<style lang="scss" scoped>
.container{
  padding: 5px;
}
</style>
