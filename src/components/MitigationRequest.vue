<template>
  <div style="margin-left:0.1em;margin-right:0.1em;margin-bottom:1em" class="box">
    <b-tag style="margin-left:0em" type="is-twitter">MREQ</b-tag>
    <b-tag style="margin-left:0em" type="is-status">{{this.status}}</b-tag>
    <span style="margin-left:0em" class="tag">
      <font-awesome-icon icon="file-code" style="margin-right:0.25em"/>
      {{this.hash}}
    </span>
    <b-tag style="margin-left:0em; margin-top:0.5em" class="tag" type="is-grey">
      <font-awesome-icon icon="clock" style="margin-right:0.25em"/>
      {{moment(this.timestamp).format('hh:mm:ss a')}}
    </b-tag>
    <hr>

    <p class="heading">TARGET</p>
    <p style="margin-bottom:0;padding-bottom:0;" class="subtitle">
      {{this.target}}
      <br>
      <span>
        <font-awesome-icon style="margin-right:.25em" :icon="['fab', 'ethereum']"/>0.0434 ETH
      </span>
      <span>
        <font-awesome-icon style="margin-right:.25em" icon="star-half-alt"/>65% Reputation
      </span>
    </p>
    <hr>
    <p class="heading">ATTACK ORIGIN</p>
    <p style="margin-bottom:0;padding-bottom:0;" class="subtitle">
      {{this.subnetwork}}
      <br>
      <span>
        <font-awesome-icon style="margin-right:.25em" icon="shield-alt"/>
        {{this.action}}
      </span>
      <br>
      <span>
        <font-awesome-icon style="margin-right:.25em" icon="bug"/>
        {{this.addresses.length}} Attackers
      </span>
    </p>
    <p>
    <el-button-group>
      <el-button v-on:click="declineMREQ()" size="mini">
        <font-awesome-icon icon="times" style="margin-right:0.25em"/>
      </el-button>
      <el-button v-on:click="acceptMREQ()" size="mini">
        <font-awesome-icon icon="check" style="margin-right:0.25em"/>
      </el-button>
      
      <el-button v-on:click="showDetails()" size="mini">Details
        <font-awesome-icon icon="search-plus" style="margin-right:0.25em"/>
      </el-button>
    </el-button-group>
    </p>
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
    addresses: {
      type: Array
    },
    status: String
  },
  methods: {
    showDetails(){
      this.$emit('showRequestDetailsEvent', this.$vnode.key);
      // Add this to component in Home.vue : @showRequestDetails="showDetails" and call function
    },
    declineMREQ(){
      this.$emit('declineMREQEvent', this.$vnode.key);
      // Add this to component in Home.vue : @showRequestDetails="showDetails" and call function
    },
    acceptMREQ(){
      this.$emit('acceptMREQEvent', this.$vnode.key);
      // Add this to component in Home.vue : @showRequestDetails="showDetails" and call function
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
span {
  margin-left: 0.5em;
  font-size: 12px;
  font-family: "Source Code Pro Regular";
}
hr {
  display: block;
  margin-top: 0.5em;
  margin-bottom: 0.5em;
  margin-left: auto;
  margin-right: auto;
  border-style: inset;
  border-width: 0.6px;
  color: #efefef;
}
p {
  margin:.5em 0 .5em 0
}
</style>
