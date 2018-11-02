<template>
  <div class="box">
    <!-- <span class="tag is-twitter">{{moment(this.timestamp).format('hh:mm:ss a')}}</span> -->
    <font-awesome-icon icon="file-code"/>
    <span>{{this.hash}}</span>
    <br>
    <font-awesome-icon icon="clock"/>
    <span>{{this.timestamp}}</span>
    <br>
    <span>{{this.action}}</span>
    <br>
    <font-awesome-icon icon="layer-group"/>
    <span>{{this.subnetwork}}</span>
    <br>
    <font-awesome-icon icon="bug"/>
    <span>{{this.addresses}}</span>
    <br>
    <font-awesome-icon icon="shield-alt"/>
    <span>{{this.target}}</span>
    <br>
    <font-awesome-icon :icon="['fab', 'ethereum']"/>
    <span>TODO: Mock Payment / Incentive</span>
    <br>
    <font-awesome-icon icon="star-half-alt"/>
    <span>TODO: Mock Rating</span>
    <br>
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
span {
  margin-left: 0.5em;
  font-size: 12px;
  font-family: 'Source Code Pro Regular';
}
</style>
