<template>
  <div class="group-wrap">
    <div class="title">{{ title }}</div>
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'Group',
  props: {
    title: {
      type: String,
      required: true,
    },
  },
}
</script>
<style lang="scss" scoped>
.group-wrap{
  margin-bottom: 10px
}
.title{
    margin-bottom: 5px;
    font-weight: bold;
}
</style>
