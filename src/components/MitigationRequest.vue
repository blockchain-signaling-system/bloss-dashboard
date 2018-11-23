<template>
  <div style="margin-left:0.1em;margin-right:0.1em;margin-bottom:1em" class="box">
    <b-tag
      v-show="this.status==='NEW_MITIGATION_REQ'"
      style="margin-left:0em"
      type="is-new-mitigation-req"
    >{{this.status}}</b-tag>
    <b-tag
      v-show="this.status==='MITIGATION_REQ_ACCEPTED'"
      style="margin-left:0em"
      type="is-mitigation-req-accepted"
    >{{this.status}}</b-tag>
    <b-tag
      v-show="this.status==='MITIGATION_REQ_DECLINED'"
      style="margin-left:0em"
      type="is-mitigation-req-declined"
    >{{this.status}}</b-tag>
    <b-tag
      v-show="this.status==='MITIGATION_REQ_IN_PROGRESS'"
      style="margin-left:0em"
      type="is-mitigation-req-in-progress"
    >{{this.status}}</b-tag>
    <b-tag
      v-show="this.status==='MITIGATION_REQ_SUCCESSFUL'"
      style="margin-left:0em;"
      type="is-mitigation-req-successful"
    >{{this.status}}</b-tag>
    <!-- BEGIN this.status === MITIGATION_REQ_ACCEPTED -->
    <span
      v-show="(this.status==='MITIGATION_REQ_ACCEPTED' || this.status==='MITIGATION_REQ_DECLINED' ||this.status==='MITIGATION_REQ_SUCCESSFUL')"
    >
      <el-button
        v-on:click="showDetails()"
        style="float:right"
        size="mini"
        icon="el-icon-zoom-in"
        circle
      ></el-button>
    </span>
    <!-- END this.status === MITIGATION_REQ_ACCEPTED -->
    <span style="margin-left:0em" class="tag">
      <font-awesome-icon icon="file-code" style="margin-right:0.25em"/>
      {{this.hash}}
    </span>
    <b-tag style="margin-left:0em; margin-top:0.5em" class="tag" type="is-grey">
      <font-awesome-icon icon="clock" style="margin-right:0.25em"/>
      {{moment(this.timestamp).format('hh:mm:ss a')}}
    </b-tag>
    <hr>
    <!-- BEGIN this.status === MITIGATION_REQ_ACCEPTED -->
    <div v-show="(this.status==='MITIGATION_REQ_ACCEPTED')">
      <p class="heading">MREQ INFO</p>
      <span>
        <font-awesome-icon style="margin-right:.75em" icon="check"/>
        Accepted at {{moment(this.timestamp_accepted).format('hh:mm:ss a')}}
        <br>
        <font-awesome-icon
          style="margin-right:.75em"
          v-show="(this.status==='MITIGATION_REQ_ACCEPTED')"
          icon="spinner"
          pulse
        />Waiting for blocking
      </span>
    </div>
    <!-- END this.status === MITIGATION_REQ_ACCEPTED -->
    <!-- BEGIN this.status === MITIGATION_REQ_DECLINED -->
    <div v-show="(this.status==='MITIGATION_REQ_DECLINED')">
      <p class="heading">MREQ INFO</p>
      <span>
        <font-awesome-icon style="margin-right:.75em" icon="times"/>
        Declined at {{moment(this.timestamp_declined).format('hh:mm:ss a')}}
      </span>
    </div>
    <!-- END this.status === MITIGATION_REQ_DECLINED -->
    <!-- BEGIN this.status === MITIGATION_REQ_IN_PROGRESS -->
    <div v-show="(this.status==='MITIGATION_REQ_IN_PROGRESS')">
      <p class="heading">MREQ INFO</p>
      <span>
        <font-awesome-icon style="margin-right:.75em" icon="check"/>
        Accepted at {{moment(this.timestamp_accepted).format('hh:mm:ss a')}}
        <br>
        <font-awesome-icon style="margin-right:.75em" icon="check"/>
        Blocking at {{moment(this.timestamp_in_progress).format('hh:mm:ss a')}}
        <br>
        <font-awesome-icon
          style="margin-right:.75em"
          v-show="(this.status==='MITIGATION_REQ_IN_PROGRESS')"
          icon="spinner"
          pulse
        />Blocking ...
      </span>
    </div>
    <!-- END this.status === MITIGATION_REQ_IN_PROGRESS -->
    <!-- BEGIN this.status === MITIGATION_REQ_SUCCESSFUL -->
    <div v-show="(this.status==='MITIGATION_REQ_SUCCESSFUL')">
      <p class="heading">MREQ INFO</p>
      <span>
        <font-awesome-icon style="margin-right:.75em" icon="check"/>
        Accepted at {{moment(this.timestamp_accepted).format('hh:mm:ss a')}}
        <br>
        <font-awesome-icon style="margin-right:.75em" icon="check"/>
        Blocking at {{moment(this.timestamp_in_progress).format('hh:mm:ss a')}}
        <br>
        <font-awesome-icon style="margin-right:.75em" icon="check"/>
        Finished at {{moment(this.timestamp_succesful).format('hh:mm:ss a')}}
      </span>
    </div>
    <!-- END this.status === MITIGATION_REQ_SUCCESSFUL -->
    <!-- BEGIN this.status === NEW_MITIGATION_REQ -->
    <div v-show="(this.status==='NEW_MITIGATION_REQ')">
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
      <el-button-group v-show="!(this.status==='MITIGATION_REQ_ACCEPTED')">
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
    <!-- END this.status === NEW_MITIGATION_REQ -->
  </div>
</template>

<script>
import constants from "@/constants";

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
    timestamp_requested: String,
    timestamp_accepted: String,
    timestamp_declined: String,
    timestamp_in_progress: String,
    timestamp_succesful: String,
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
</style>
