<template>
  <div
    v-if="msg"
    class="Alert-wrap">{{ msg }}</div>
</template>

<script>
export default {
  name: 'Alert',
  props: {
    msg: {
      type: String,
      required: true,
    },
  },
}
</script>
<style lang="scss" scoped>
.Alert-wrap{
  color:coral;
  margin-top: 1px;
  margin-bottom: 10px;
}
</style>
