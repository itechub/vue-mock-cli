<template>
  <div id="app">
    {{msg}}
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: 'index'
    }
  }
}
</script>

<style scoped lang='less'>
</style>
