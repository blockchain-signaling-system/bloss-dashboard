<template>
  <div class="box">
    <!-- <span class="tag is-twitter">{{moment(this.timestamp).format('hh:mm:ss a')}}</span> -->
    <span>{{this.hash}}</span>
    <span>{{this.target}}</span>
    <span>{{this.timestamp}}</span>
    <span>{{this.action}}</span>
    <span>{{this.subnetwork}}</span>
    <span>{{this.addresses}}</span>
  </div>
</template>

<script>
export default {
  name: "mitigation-request",
  props: {
    hash: String,
    target: String,
    timestamp: String,
    action: String,
    subnetwork: String,
    addresses: [String]
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
