<template>
  <div>
    <section class="section">
      <div class="container">
        <b-modal :active.sync="isCardModalActive" :width="640" scroll="keep">
          <div class="card">
            <div class="card-content">
              <div class="media">
                <div class="media-left">
                  <b-tag style="margin-left:0em" type="is-twitter">MREQ</b-tag>
                  <b-tag style="margin-left:0em" type="is-status">{{this.detailAttackReport.status}}</b-tag>
                  <span style="margin-left:0em" class="tag">
                    <font-awesome-icon icon="file-code" style="margin-right:0.25em"/>
                    {{this.detailAttackReport.hash}}
                  </span>
                </div>
              </div>
              <div class="media-content">
                <p class="title">
                  MITIGATION REQUEST
                  <small>{{moment(this.detailAttackReport.timestamp).format('hh:mm:ss a')}}</small>
                </p>
                <el-steps :active="1" finish-status="success" simple style="margin-top: 20px">
                  <el-step title="S1" description="T_REQUESTS"></el-step>
                  <el-step title="S2" description="M_APPROVES|M_ABORT"></el-step>
                  <el-step title="S3"></el-step>
                </el-steps>
                <p style="margin-top:1em; margin-bottom: 0.5em;" class="subtitle">TARGET</p>
                <p>IP: {{this.detailAttackReport.target}}</p>
                <p>REPUTATION:
                  <font-awesome-icon style="margin-right:.25em" icon="star-half-alt"/>65%
                  <el-progress :percentage="65" status="success"></el-progress>
                </p>
              </div>
              <div class="content">
                <p style="margin-bottom: 0.5em;margin-top:1em" class="subtitle">ATTACK DETAILS</p>
                <p>IPFS HASH: {{this.detailAttackReport.hash}}</p>
                <p>DEFENCE ACTION: {{this.detailAttackReport.action}}</p>
                <p>ATTACK ORIGIN SUBNETWORK: {{this.detailAttackReport.subnetwork}}</p>
                <p>ATTACK ORIGIN NODES: {{this.detailAttackReport.addresses}}</p>
                <el-button-group v-show="!(this.detailAttackReport.status==='M_APPROVED')">>
                  <el-button v-on:click="declineMREQ()" size="mini">
                    <font-awesome-icon icon="times" style="margin-right:0.25em"/>DECLINE
                  </el-button>
                  <el-button v-on:click="acceptMREQ()" size="mini">
                    <font-awesome-icon icon="check" style="margin-right:0.25em"/>ACCEPT
                  </el-button>
                </el-button-group>
              </div>
            </div>
          </div>
        </b-modal>
        <h1 class="title">BLOSS</h1>
        <h1 class="subtitle is-6">{{this.subtitle}}</h1>
        <el-tabs tab-position="top" style="height: 200px;">
          <el-tab-pane label="REQUESTS">
            <span slot="label">
              <font-awesome-icon icon="inbox" style="margin-right:0.25em"/>REQUESTS
            </span>
            <div class="columns">
              <div class="column">
                <p style="margin-top:0.5em" class="col-title">REQUESTS</p>
                <mitigation-request
                  @showRequestDetailsEvent="showDetails(mit._id)"
                  @declineMREQEvent="declineMREQ(mit._id)"
                  @acceptMREQEvent="acceptMREQ(mit._id)"
                  v-for="mit in newMitigationRequests"
                  v-bind:key="mit.key"
                  v-bind:hash="mit.hash"
                  v-bind:target="mit.target"
                  v-bind:timestamp="mit.timestamp"
                  v-bind:action="mit.action"
                  v-bind:subnetwork="mit.subnetwork"
                  v-bind:addresses="mit.addresses"
                  v-bind:status="mit.status"
                ></mitigation-request>
              </div>
              <div class="column">
                <p style="margin-top:0.5em" class="col-title">PROCESSING</p>
                <mitigation-request
                  @showRequestDetailsEvent="showDetails(mit._id)"
                  @declineMREQEvent="declineMREQ(mit._id)"
                  @acceptMREQEvent="acceptMREQ(mit._id)"
                  v-for="mit in acceptedMitigationRequests"
                  v-bind:key="mit._id"
                  v-bind:hash="mit.hash"
                  v-bind:target="mit.target"
                  v-bind:timestamp="mit.timestamp"
                  v-bind:action="mit.action"
                  v-bind:subnetwork="mit.subnetwork"
                  v-bind:addresses="mit.addresses"
                  v-bind:status="mit.status"
                ></mitigation-request>
              </div>
              <div class="column">
                <p style="margin-top:0.5em" class="col-title">LOG</p>
              </div>
              <div class="column">
                <p style="margin-top:0.5em"></p>
                <p class="col-title">SYSTEM STATUS</p>
                <article class="media">
                  <div class="media-content">
                    <div class="content">
                      <p>
                        <a-badge :status="isConnected ? 'success' : 'warning'"/>
                        <b-tooltip
                          :label="isConnected ? 'WSConn to bloss-node instance successful.' : 'Establishing connection...'"
                          position="is-top"
                          animated
                          :type="isConnected ? 'is-success' : 'is-warning'"
                        >
                          <b-tag
                            style="height:2.3em;margin-left:0em;"
                            class="tag"
                            :type="isConnected ? 'is-success' : 'is-warning'"
                          >WEBSOCKET</b-tag>
                        </b-tooltip>
                        <span>
                          <font-awesome-icon v-show="!isConnected" icon="spinner" pulse/>
                        </span>
                      </p>
                      <p>
                        <a-badge :status="isControllerAvailable ? 'success' : 'warning'"/>
                        <b-tag
                          style="height:2.3em;margin-left:0em;"
                          class="tag"
                          :type="isControllerAvailable ? 'is-success' : 'is-warning'"
                        >CONTROLLER</b-tag>
                        <span>
                          <font-awesome-icon v-show="!isControllerAvailable" icon="spinner" pulse/>
                        </span>
                      </p>
                      <div v-show="isControllerAvailable">
                        <div class="tile">
                          <a-badge :status="serviceStatusBloss ? 'success' : 'error'"/>
                          <b-tag
                            style="height:2.3em;margin-left:0em;"
                            class="tag"
                            :type="serviceStatusBloss ? 'is-success' : 'is-warning'"
                          >BLOSS
                            <font-awesome-icon
                              :icon="serviceStatusBloss ? 'check' : 'pause-circle'"
                              style="margin-right:0.25em"
                            />
                          </b-tag>
                          <el-button-group>
                            <el-button
                              v-on:click="startService('bloss')"
                              style="padding=0.25em"
                              size="mini"
                            >
                              <font-awesome-icon icon="play" style="margin-right:0.25em"/>
                            </el-button>
                            <el-button v-on:click="killService('bloss')" size="mini">
                              <font-awesome-icon icon="stop" style="margin-right:0.25em"/>
                            </el-button>
                          </el-button-group>
                        </div>
                        <a-badge :status="serviceStatusGeth ? 'success' : 'error'"/>
                        <b-tag
                          style="height:2.3em;margin-left:0em;"
                          class="tag"
                          :type="serviceStatusGeth ? 'is-success' : 'is-warning'"
                        >GETH
                          <font-awesome-icon
                            :icon="serviceStatusGeth ? 'check' : 'pause-circle'"
                            style="margin-right:0.25em"
                          />
                        </b-tag>
                        <el-button-group>
                          <el-button style="padding=0.25em" size="mini">
                            <font-awesome-icon
                              @click="startService('geth')"
                              icon="play"
                              style="margin-right:0.25em"
                            />
                          </el-button>
                          <el-button size="mini">
                            <font-awesome-icon
                              @click="killService('geth')"
                              icon="stop"
                              style="margin-right:0.25em"
                            />
                          </el-button>
                        </el-button-group>
                        <br>
                        <a-badge :status="serviceStatusIPFS ? 'success' : 'error'"/>
                        <b-tag
                          style="height:2.3em;margin-left:0em;"
                          class="tag"
                          :type="serviceStatusIPFS ? 'is-success' : 'is-warning'"
                        >IPFS
                          <font-awesome-icon
                            :icon="serviceStatusIPFS ? 'check' : 'pause-circle'"
                            style="margin-right:0.25em"
                          />
                        </b-tag>
                        <el-button-group>
                          <el-button style="padding=0.25em" size="mini">
                            <font-awesome-icon
                              @click="startService('ipfs')"
                              icon="play"
                              style="margin-right:0.25em"
                            />
                          </el-button>
                          <el-button @click.native="killService('ipfs')" size="mini">
                            <font-awesome-icon icon="stop" style="margin-right:0.25em"/>
                          </el-button>
                        </el-button-group>
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="ALARMS">
            <span slot="label">
              <font-awesome-icon icon="share-square" style="margin-right:0.25em"/>ALARMS
            </span>
            <div class="columns">
              <div class="column">
                <p style="margin-top:0.5em" class="col-title">ALARMS</p>
                <attack-alarm
                  @ignoreAlarmEvent="ignoreAlarm(reqMit._id)"
                  @requestMitigationEvent="requestMitigation(reqMit._id)"
                  v-for="reqMit in newAlarms"
                  v-bind:key="reqMit.key"
                  v-bind:hash="reqMit.hash"
                  v-bind:target="reqMit.target"
                  v-bind:timestamp="reqMit.timestamp"
                  v-bind:action="reqMit.action"
                  v-bind:subnetwork="reqMit.subnetwork"
                  v-bind:addresses="reqMit.addresses"
                  v-bind:status="reqMit.status"
                ></attack-alarm>
              </div>
              <div class="column">
                <p style="margin-top:0.5em" class="col-title">PROCESSING</p>
                <attack-alarm
                  @ignoreAlarmEvent="ignoreAlarm(reqMit._id)"
                  @requestMitigationEvent="requestMitigation(reqMit._id)"
                  v-for="reqMit in requestedRequestMitigations"
                  v-bind:key="reqMit.key"
                  v-bind:hash="reqMit.hash"
                  v-bind:target="reqMit.target"
                  v-bind:timestamp="reqMit.timestamp"
                  v-bind:action="reqMit.action"
                  v-bind:subnetwork="reqMit.subnetwork"
                  v-bind:addresses="reqMit.addresses"
                  v-bind:status="reqMit.status"
                ></attack-alarm>
              </div>
              <div class="column">
                <p style="margin-top:0.5em" class="col-title">LOG</p>
                <attack-alarm
                  @ignoreAlarmEvent="ignoreAlarm(reqMit._id)"
                  @requestMitigationEvent="requestMitigation(reqMit._id)"
                  v-for="reqMit in declinedAndSuccessfulRequestMitigations"
                  v-bind:key="reqMit.key"
                  v-bind:hash="reqMit.hash"
                  v-bind:target="reqMit.target"
                  v-bind:timestamp="reqMit.timestamp"
                  v-bind:action="reqMit.action"
                  v-bind:subnetwork="reqMit.subnetwork"
                  v-bind:addresses="reqMit.addresses"
                  v-bind:status="reqMit.status"
                ></attack-alarm>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="CONFIG">
            <span slot="label">
              <font-awesome-icon icon="cogs" style="margin-right:0.25em"/>CONFIG
            </span>
            <div class="column">
              <p style="margin-top:0.5em" class="col-title">SETTINGS</p>
              <section>
                <div class="field">
                  <b-switch v-model="autoAcceptRequests" type="is-success">AUTO-ACCEPT Requests</b-switch>
                </div>
                <div class="field">
                  <b-switch v-model="autoAcceptAlarms" type="is-success">AUTO-ACCEPT Alarms</b-switch>
                </div>
              </section>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src
import MitigationRequest from "@/components/MitigationRequest.vue";
import AttackAlarm from "@/components/AttackAlarm.vue";
import constants from "@/constants";

export default {
  data() {
    return {
      subtitle: process.env.VUE_APP_CONTROLLER,
      isConnected: false,
      isControllerAvailable: false,
      socketMessage: "",
      statusMessage: "",
      serviceStatusBloss: false,
      serviceStatusGeth: false,
      serviceStatusIPFS: false,
      serviceStatusInfluxDB: false,
      mitigationRequests: [],
      requestMitigations: [],
      isImageModalActive: false,
      isCardModalActive: false,
      detailAttackReportIndex: -1,
      detailAttackReport: {},
      autoAcceptRequests: false,
      autoAcceptAlarms: false
    };
  },
  computed: {
    newMitigationRequests: function() {
      return this.mitigationRequests.filter(function(mitigationRequest) {
        return mitigationRequest.status == constants.NEW_MITIGATION_REQ;
      });
    },
    acceptedMitigationRequests: function() {
      return this.mitigationRequests.filter(function(mitigationRequest) {
        return mitigationRequest.status == constants.MITIGATION_REQ_ACCEPTED;
      });
    },
    newAlarms: function() {
      return this.requestMitigations.filter(function(alarm) {
        return alarm.status == constants.NEW_ALARM;
      });
    },
    requestedRequestMitigations: function() {
      return this.requestMitigations.filter(function(requestMitigation) {
        return (
          requestMitigation.status == constants.REQ_MITIGATION_REQUESTED ||
          requestMitigation.status == constants.REQ_MITIGATION_IN_PROGRESS
        );
      });
    },
    acceptedRequestMitigations: function() {
      return this.requestMitigations.filter(function(requestMitigation) {
        return requestMitigation.status == constants.REQ_MITIGATION_ACCEPTED;
      });
    },
    processingRequestMitigations: function() {
      return this.requestMitigations.filter(function(requestMitigation) {
        return requestMitigation.status == constants.REQ_MITIGATION_IN_PROGRESS;
      });
    },
    declinedAndSuccessfulRequestMitigations: function() {
      return this.requestMitigations.filter(function(requestMitigation) {
        return (
          requestMitigation.status == constants.REQ_MITIGATION_DECLINED ||
          requestMitigation.status == constants.REQ_MITIGATION_SUCCESSFUL
        );
      });
    }
  },
  sockets: {
    connect() {
      // Fired when the socket connects.
      this.isConnected = true;
    },
    disconnect() {
      this.isConnected = false;
    },
    // Fired when the server sends something on the "messageChannel" channel.
    isControllerAvailable(data) {
      console.log("got isControllerAvailable from backend", data);
      console.log("autoAcceptRequests" + this.autoAcceptRequests);
      console.log("autoAcceptAlarms" + this.autoAcceptAlarms);
      this.isControllerAvailable = data.controllerAvailability;
    },
    statusChannel(data) {
      if (data.geth != null) {
        if (data.geth === "active") this.updateStatus("geth", true);
        if (data.geth === "inactive") this.updateStatus("geth", false);
      }
      if (data.ipfs != null) {
        if (data.ipfs === "active") this.updateStatus("ipfs", true);
        if (data.ipfs === "inactive") this.updateStatus("ipfs", false);
      }
      if (data.bloss != null) {
        if (data.bloss === "active") this.updateStatus("bloss", true);
        if (data.bloss === "inactive") this.updateStatus("bloss", false);
      }
      console.log(data);
      this.statusMessage = data;
    },
    reportChannel(data) {
      // console.log(data);
      // Add new reports to the array "MitigationRequests"
      console.log(JSON.stringify(data, null, 2));

      var attack_report = {
        _id: data.data._id,
        hash: data.data.hash,
        target: data.data.target,
        timestamp: data.data.timestamp,
        action: data.data.action,
        subnetwork: data.data.subnetwork,
        addresses: data.data.addresses,
        status: data.data.status
      };

      this.mitigationRequests.push(attack_report);
      // console.log(attack_report);
    },
    alarmChannel(data) {
      // console.log(data);
      // Add new reports to the array "MitigationRequests"
      console.log(JSON.stringify(data, null, 2));

      if (data.data.status == constants.NEW_ALARM) {
        this.displayToast(data.data.status, 3000, "is-alarm");
      }

      // IFF there is already a report with
      // status: NEW_ALARM
      // timestamp: not newer, but not a lot older
      // subnetwork: EQUAL
      // target: EQUAL
      // addresses: EQUAL content but might be different order
      // THEN
      // we shall replace the current object in the array with the new report
      // this will happen every second until we decide to request mitigation.

      var indexOfCurrentReport = this.requestMitigations.findIndex(
        item =>
          item.status == data.data.status &&
          item.target == data.data.target &&
          item.subnetwork == data.data.subnetwork
      );

      console.log('indexOfCurrentReport'+indexOfCurrentReport);

      var alarm_report = {
        _id: data.data._id,
        hash: data.data.hash,
        target: data.data.target,
        timestamp: data.data.timestamp,
        action: data.data.action,
        subnetwork: data.data.subnetwork,
        addresses: data.data.addresses,
        status: data.data.status
      };

      // if (indexOfCurrentReport > -1) {
      //   console.log('Replacing report at '+indexOfCurrentReport+' with new report.'+data.data.timestamp);
      //   this.requestMitigations.splice(indexOfCurrentReport, 1, alarm_report);
      //   // this.requestMitigations[indexOfCurrentReport] = alarm_report;
      // } else {
        this.requestMitigations.push(alarm_report);
      // }
    }
  },
  methods: {
    updateStatus(service, status) {
      switch (service) {
        case "geth":
          this.serviceStatusGeth = status;
          break;
        case "ipfs":
          this.serviceStatusIPFS = status;
          break;
        case "bloss":
          this.serviceStatusBloss = status;
          break;
        default:
          console.log("no match");
          break;
      }
    },
    changeStatus(status) {
      this.serviceStatusBloss = status.bloss;
      this.serviceStatusGeth = status.geth;
      this.serviceStatusIPFS = status.ipfs;
    },
    getDate() {
      return new Date();
    },
    startService(servicename) {
      // console.log('Starting '+servicename);
      this.$socket.emit("serviceControlRequest", {
        cmd: "start",
        service: servicename
      });
    },
    killService(servicename) {
      // console.log('Killing '+servicename);
      this.$socket.emit("serviceControlRequest", {
        cmd: "stop",
        service: servicename
      });
    },
    showDetails(attackReportId) {
      console.log("ShowDetails for _id " + attackReportId + " called");
      this.detailAttackReportIndex = this.mitigationRequests.findIndex(
        item => item._id === attackReportId
      );
      // console.log("detailAttackReportIndex" + this.detailAttackReportIndex);
      this.detailAttackReport = this.mitigationRequests[
        this.detailAttackReportIndex
      ];
      // console.log("detailAttackReport" + this.detailAttackReport);
      // console.log("ShowDetails for key:" + attackReportId);
      // console.log("detailAttackReportIndex" + this.detailAttackReportIndex);
      this.isCardModalActive = true;
    },
    acceptMREQ(attackReportId) {
      if (this.isCardModalActive) {
        // Coming from detail overview
        console.log("Accepting MREQ:" + this.detailAttackReport._id);
        this.$socket.emit("responseMREQ", {
          action: constants.MITIGATION_REQ_ACCEPTED,
          _id: this.detailAttackReport._id
        });
        this.isCardModalActive = false;
        // Remove the MREQ from the local array
        var currentMREQIndexDetail = this.mitigationRequests.findIndex(
          item => item._id === attackReportId
        );
        if (currentMREQIndexDetail > -1) {
          this.mitigationRequests.splice(currentMREQIndexDetail, 1);
        }
        // We receive the new MREQ when it's updated on server side
      } else {
        // Coming from Home screen
        console.log("Accepting MREQ:" + attackReportId);
        this.$socket.emit("responseMREQ", {
          action: constants.MITIGATION_REQ_ACCEPTED,
          _id: attackReportId
        });
        // Remove the MREQ from the local array
        var currentMREQIndex = this.mitigationRequests.findIndex(
          item => item._id === attackReportId
        );
        if (currentMREQIndex > -1) {
          this.mitigationRequests.splice(currentMREQIndex, 1);
        }
        // We receive the new MREQ when it's updated on server side
      }
    },
    declineMREQ(attackReportId) {
      if (this.isCardModalActive) {
        // Coming from detail overview
        console.log("Declining MREQ:" + this.detailAttackReport._id);
        this.$socket.emit("responseMREQ", {
          action: constants.MITIGATION_REQ_DECLINED,
          _id: this.detailAttackReport._id
        });
        this.isCardModalActive = false;
        // Remove the MREQ from the local array
        var currentMREQIndexDetail = this.mitigationRequests.findIndex(
          item => item._id === attackReportId
        );
        if (currentMREQIndexDetail > -1) {
          this.mitigationRequests.splice(currentMREQIndexDetail, 1);
        }
      } else {
        // Coming from Home screen
        console.log("Declining MREQ:" + attackReportId);
        this.$socket.emit("responseMREQ", {
          action: constants.MITIGATION_REQ_DECLINED,
          _id: attackReportId
        });
        // Remove the MREQ from the local array
        var currentMREQIndex = this.mitigationRequests.findIndex(
          item => item._id === attackReportId
        );
        if (currentMREQIndex > -1) {
          this.mitigationRequests.splice(currentMREQIndex, 1);
        }
        // We receive the new MREQ when it's updated on server side
      }
    },
    ignoreAlarm(alarmId) {
      // Coming from Home screen
      console.log("Ignoring Alarm:" + alarmId);
      this.$socket.emit("alarmResponse", {
        action: constants.ALARM_IGNORED,
        _id: alarmId
      });
      // Remove the MREQ from the local array
      var currentAlarmIndex = this.requestMitigations.findIndex(
        item => item._id === alarmId
      );
      if (currentAlarmIndex > -1) {
        this.requestMitigations.splice(currentAlarmIndex, 1);
      }
    },
    requestMitigation(alarmId) {
      // Coming from Home screen
      console.log("Requesting Mitigation Alarm:" + alarmId);
      this.$socket.emit("alarmResponse", {
        action: constants.REQ_MITIGATION_REQUESTED,
        _id: alarmId
      });
      // Remove the MREQ from the local array
      var currentAlarmIndex = this.requestMitigations.findIndex(
        item => item._id === alarmId
      );
      if (currentAlarmIndex > -1) {
        this.requestMitigations.splice(currentAlarmIndex, 1);
      }
    },
    displayToast(status, duration, style) {
      this.$toast.open({
        duration: duration,
        message: status,
        position: "is-top",
        type: style
      });
    },
    attackNotificationArrived() {
      this.$toast.open({
        duration: 2000,
        message: `A node is under attack`,
        position: "is-top",
        type: "is-alarm"
      });
    }
  },
  name: "home",
  components: {
    "mitigation-request": MitigationRequest,
    "attack-alarm": AttackAlarm
  }
};
</script>

<style>
.col-title {
  font-family: "Source Code Pro Bold";
  font-size: 1rem;
}
.section {
  font-family: "Source Code Pro Regular";
}

.el-container {
  padding: 0.1em;
}

.el-header,
.el-footer {
  background-color: #e0e0e0;
}

.el-main {
  background-color: #f5f5f5;
}

.dark-button {
  background-color: #e0e0e0;
}

.text {
  font-size: 10px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 480px;
}
</style>
<style lang="scss">
@import "../style/style";

span {
  margin-left: 0.25em;
  margin-right: 0.25em;
}
</style>
