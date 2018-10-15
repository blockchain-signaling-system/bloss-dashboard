<template>
    <div class="box">
        <span class="tag is-twitter">{{moment(this.incomingDate).format('hh:mm:ss a')}}</span>    
        <span>{{this.requestorHostname}}</span>
        <span>{{this.requestorIP}}</span>
        <span>{{this.requestorReputation}}</span>
        <span>{{this.attackAttackers}}</span>
        <span>{{this.attackDomains}}</span>
        <span>{{this.mitigationPrice}}</span>
    </div>
</template>

<script>
export default {
  name: "mitigation-request",
  props: {
    incomingDate: Date,
    requestType: String,
    requestorHostname: String,
    requestorReputation: Number,
    requestorIP: String,
    attackAttackers: Number,
    attackDomains: Number,
    mitigationPrice: Number
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
