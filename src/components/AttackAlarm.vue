<template>
    <div>
        <div style="margin-left:0.1em;margin-right:0.1em;margin-bottom:1em" class="box">
            <!-- BEGIN this.status === NEW_ALARM -->
            <span v-show="(this.status==='NEW_ALARM')">
                <el-button
                    v-on:click="ignoreAlarm()"
                    style="float:right"
                    size="mini"
                    icon="el-icon-delete"
                    circle
                ></el-button>
            </span>
            <el-button
                v-on:click="showAlarmDetails()"
                style="float:right"
                size="mini"
                icon="el-icon-zoom-in"
                circle
            ></el-button>
            <!-- END this.status === NEW_ALARM -->
            <b-tag
                v-show="this.status==='NEW_ALARM'"
                style="margin-left:0em"
                type="is-new-alarm"
            >{{this.status}}</b-tag>
            <b-tag
                v-show="this.status==='ALARM_IGNORED'"
                style="margin-left:0em"
                type="is-alarm-ignored"
            >{{this.status}}</b-tag>
            <b-tag
                v-show="this.status==='REQ_MITIGATION_REQUESTED'"
                style="margin-left:0em"
                type="is-req-mitigation-requested"
            >{{this.status}}</b-tag>
            <b-tag
                v-show="this.status==='REQ_MITIGATION_DECLINED'"
                style="margin-left:0em"
                type="is-req-mitigation-declined"
            >{{this.status}}</b-tag>
            <b-tag
                v-show="this.status==='REQ_MITIGATION_ACCEPTED'"
                style="margin-left:0em"
                type="is-req-mitigation-accepted"
            >{{this.status}}</b-tag>
            <b-tag
                v-show="this.status==='REQ_MITIGATION_IN_PROGRESS'"
                style="margin-left:0em"
                type="is-req-mitigation-in-progress"
            >{{this.status}}</b-tag>
            <b-tag
                v-show="this.status==='REQ_MITIGATION_SUCCESSFUL'"
                style="margin-left:0em;"
                type="is-req-mitigation-successful"
            >{{this.status}}</b-tag>
            <span class="tag">
                <font-awesome-icon icon="file-code" style="margin-right:0.25em"/>
                {{this.hash}}
            </span>
            <b-tag style="margin-left:0em; margin-top:0.5em" class="tag" type="is-grey">
                <font-awesome-icon icon="clock" style="margin-right:0.25em"/>
                {{moment(this.timestamp).format('hh:mm:ss a')}}
            </b-tag>
            <hr v-show="this.status!=='ALARM_IGNORED'">
            <!-- BEGIN this.status === REQ_MITIGATION_REQUESTED -->
            <div v-show="(this.status==='REQ_MITIGATION_REQUESTED')">
                <p class="heading">MREQ INFO</p>
                <span>
                    <font-awesome-icon style="margin-right:.75em" icon="check"/>
                    Alarmed at {{moment(this.timestamp).format('hh:mm:ss a')}}
                    <br>
                    <font-awesome-icon style="margin-right:.75em" icon="check"/>
                    Requested at {{moment(this.timestamp_requested).format('hh:mm:ss a')}}
                    <br>
                    <font-awesome-icon
                        style="margin-right:.75em"
                        v-show="(this.status==='REQ_MITIGATION_REQUESTED')"
                        icon="spinner"
                        pulse
                    />Waiting for reaction ...
                </span>
            </div>
            <!-- END this.status === REQ_MITIGATION_REQUESTED -->
            <!-- BEGIN this.status === REQ_MITIGATION_ACCEPTED -->
            <div v-show="(this.status==='REQ_MITIGATION_ACCEPTED')">
                <p class="heading">MREQ INFO</p>
                <span>
                    <font-awesome-icon style="margin-right:.75em" icon="check"/>
                    Requested at {{moment(this.timestamp_requested).format('hh:mm:ss a')}}
                    <br>
                    <font-awesome-icon style="margin-right:.75em" icon="check"/>
                    Accepted at {{moment(this.timestamp_accepted).format('hh:mm:ss a')}}
                    <br>
                    <font-awesome-icon
                        style="margin-right:.75em"
                        v-show="(this.status==='REQ_MITIGATION_ACCEPTED')"
                        icon="spinner"
                        pulse
                    />Waiting for blocking ...
                </span>
            </div>
            <!-- END this.status === REQ_MITIGATION_ACCEPTED -->
            <!-- BEGIN this.status === REQ_MITIGATION_IN_PROGRESS -->
            <div v-show="(this.status==='REQ_MITIGATION_IN_PROGRESS')">
                <p class="heading">MREQ INFO</p>
                <span>
                    <font-awesome-icon style="margin-right:.75em" icon="check"/>
                    Requested at {{moment(this.timestamp_requested).format('hh:mm:ss a')}}
                    <br>
                    <font-awesome-icon style="margin-right:.75em" icon="check"/>
                    Accepted at {{moment(this.timestamp_accepted).format('hh:mm:ss a')}}
                    <br>
                    <font-awesome-icon style="margin-right:.75em" icon="check"/>
                    Blocking at {{moment(this.timestamp_in_progress).format('hh:mm:ss a')}}
                    <br>
                    <font-awesome-icon
                        style="margin-right:.75em"
                        v-show="(this.status==='REQ_MITIGATION_IN_PROGRESS')"
                        icon="spinner"
                        pulse
                    />Blocking ...
                </span>
            </div>
            <!-- END this.status === REQ_MITIGATION_ACCEPTED -->
            <!-- BEGIN this.status === REQ_MITIGATION_DECLINED -->
            <div v-show="(this.status==='REQ_MITIGATION_DECLINED')">
                <p class="heading">MREQ INFO</p>
                <span>
                    <font-awesome-icon style="margin-right:.75em" icon="check"/>
                    Requested at {{moment(this.timestamp_requested).format('hh:mm:ss a')}}
                    <br>
                    <font-awesome-icon style="margin-right:.75em" icon="check"/>
                    Declined at {{moment(this.timestamp_declined).format('hh:mm:ss a')}}
                    <br>
                </span>
            </div>
            <!-- END this.status === REQ_MITIGATION_DECLINED -->
            <!-- BEGIN this.status === REQ_MITIGATION_SUCCESSFUL -->
            <div v-show="(this.status==='REQ_MITIGATION_SUCCESSFUL')">
                <p class="heading">MREQ INFO</p>
                <span>
                    <font-awesome-icon style="margin-right:.75em" icon="check"/>
                    Requested at {{moment(this.timestamp_requested).format('hh:mm:ss a')}}
                    <br>
                    <font-awesome-icon style="margin-right:.75em" icon="check"/>
                    Accepted at {{moment(this.timestamp_accepted).format('hh:mm:ss a')}}
                    <br>
                    <font-awesome-icon style="margin-right:.75em" icon="check"/>
                    Blocking at {{moment(this.timestamp_in_progress).format('hh:mm:ss a')}}
                    <br>
                    <font-awesome-icon style="margin-right:.75em" icon="check"/>
                    Finished at {{moment(this.timestamp_succesful).format('hh:mm:ss a')}}
                    <br>
                </span>
            </div>
            <!-- END this.status === REQ_MITIGATION_SUCCESSFUL -->
            <!-- BEGIN this.status === NEW_ALARM -->
            <div v-show="(this.status==='NEW_ALARM')">
                <p class="heading">TARGET</p>
                <p style="margin-bottom:0;padding-bottom:0;" class="subtitle">
                    {{this.target}}
                    <br>
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
                <el-button-group>
                    <el-button v-on:click="requestMitigation()" size="mini">
                        <font-awesome-icon icon="hands-helping" style="margin-right:0.25em"/>Request Help
                    </el-button>
                </el-button-group>
            </div>
            <!-- END this.status === NEW_ALARM -->
        </div>
    </div>
</template>

<script>
export default {
  data: function() {
    return {};
  },
  name: "attack-alarm",
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
    showAlarmDetails() {
      this.$emit("showAlarmDetailsEvent", this.$vnode.key);
    },
    ignoreAlarm() {
      this.$emit("ignoreAlarmEvent", this.$vnode.key);
    },
    requestMitigation() {
      this.$emit("requestMitigationEvent", this.$vnode.key);
    }
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
