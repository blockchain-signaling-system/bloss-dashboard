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
    <span>
      <el-button
        style="margin-left:0em;margin-top:0.5em"
        v-show="(this.status==='M_APPROVED')"
        v-on:click="showDetails()"
        size="mini"
      >
        <font-awesome-icon icon="search-plus" style="margin-right:0.25em"/>Details
      </el-button>
    </span>
    <hr>
    <!-- this.status === M_APPROVED -->
    <div v-show="(this.status==='M_APPROVED')">
      {{progressCounter}} %
      <el-progress :status="(progressCounter === 100) ? 'success' : '#8e71c7'" :percentage="progressCounter"></el-progress>
    </div>
    <!-- this.status === T_REQUESTS -->
    <div v-show="!(this.status==='M_APPROVED')">
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
      <br>
      <el-button-group v-show="!(this.status==='M_APPROVED')">
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
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      progressCounter: 0,
      intervalid1: ""
    };
  },
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
    todo() {
      console.log("mounted()");
      this.intervalid1 = setInterval(() => {
        this.changes += 10;
        // console.log(this.changes);
        if (this.changes === 100) {
          clearInterval(this.intervalid1);
        }
      }, 1000);
    },
    showDetails() {
      this.$emit("showRequestDetailsEvent", this.$vnode.key);
      // Add this to component in Home.vue : @showRequestDetails="showDetails" and call function
    },
    declineMREQ() {
      this.$emit("declineMREQEvent", this.$vnode.key);
      // Add this to component in Home.vue : @showRequestDetails="showDetails" and call function
    },
    acceptMREQ() {
      this.$emit("acceptMREQEvent", this.$vnode.key);
      // Add this to component in Home.vue : @showRequestDetails="showDetails" and call function
    }
  },
  computed: {
    changes: {
      get: function() {
        return this.progressCounter;
      },
      set: function(v) {
        this.progressCounter = v;
      }
    }
  },
  mounted() {
    this.todo();
  },
  beforeDestroy() {
    clearInterval(this.intervalid1);
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
  margin: 0.5em 0 0.5em 0;
}
</style>
