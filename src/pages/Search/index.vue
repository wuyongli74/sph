<template>
  <div>
    <div>params--{{ $route.params.keyword }}</div>
    <div>query--{{ $route.query.k }}</div>
    <div>{{ keyword }}--{{ a }}--{{ b }}--{{ k }}</div>
  </div>
</template>
<script>
export default {
  name: '',
  // 路由组件可以传递props
  props: ['keyword', 'a', 'b', 'k'],
}
</script>
<style lang="less" scoped></style>
