<template>
  <div>
    <section class="section">
      <div class="container">
        <h1 class="title">BLOSS</h1>
        <el-tabs tab-position="top" style="height: 200px;">
          <el-tab-pane label="INCOMING">
            <span slot="label">
              <font-awesome-icon icon="inbox" style="margin-right:0.25em"/>INCOMING
            </span>
            <div class="columns">
              <div class="column">
                <p class="col-title">REQUESTS</p>
                <mitigation-request
                  v-for="mit in mitigationRequests"
                  v-bind:key="mit.key"
                  v-bind:hash="mit.hash"
                  v-bind:target="mit.target"
                  v-bind:timestamp="mit.timestamp"
                  v-bind:action="mit.action"
                  v-bind:subnetwork="mit.subnetwork"
                  v-bind:addresses="mit.addresses"
                ></mitigation-request>
              </div>
              <div class="column">
                <p class="col-title">PROCESSING</p>
              </div>
              <div class="column">
                <p class="col-title">LOG</p>
              </div>
              <div class="column">
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
                            <el-button style="padding=0.25em" size="mini">
                              <font-awesome-icon
                                @click="startService('bloss')"
                                icon="play"
                                style="margin-right:0.25em"
                              />
                            </el-button>
                            <el-button size="mini">
                              <font-awesome-icon
                                @click="killService('bloss')"
                                icon="stop"
                                style="margin-right:0.25em"
                              />
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
                          <el-button size="mini">
                            <font-awesome-icon
                              @click="killService('ipfs')"
                              icon="stop"
                              style="margin-right:0.25em"
                            />
                          </el-button>
                        </el-button-group>
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="OUTGOING">
            TODO
            <span slot="label">
              <font-awesome-icon icon="share-square" style="margin-right:0.25em"/>OUTGOING
            </span>
          </el-tab-pane>
          <el-tab-pane label="CONFIG">
            TODO
            <span slot="label">
              <font-awesome-icon icon="cogs" style="margin-right:0.25em"/>CONFIG
            </span>
          </el-tab-pane>
        </el-tabs>
      </div>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src
import MitigationRequest from "@/components/MitigationRequest.vue";

export default {
  data() {
    return {
      isConnected: false,
      isControllerAvailable: false,
      socketMessage: "",
      statusMessage: "",
      serviceStatusBloss: false,
      serviceStatusGeth: false,
      serviceStatusIPFS: false,
      serviceStatusInfluxDB: false,
      mitigationRequests: []
    };
  },
  computed: {
    buttonClasses: function() {
      return {
        success: this.isConnected,
        danger: !this.isConnected
      };
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
      console.log(data);
      // Add new reports to the array "MitigationRequests"
      console.log(JSON.stringify(data, null, 2));

      var attack_report = {
        key: data.data._id,
        hash: data.data.hash,
        target: data.data.target,
        timestamp: data.data.timestamp,
        action: data.data.action,
        subnetwork: data.data.subnetwork,
        addresses: data.data.addresses
      };

      this.mitigationRequests.push(attack_report);
      console.log(attack_report);
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
    getUptime() {
      // Send the "pingServer" event to the server.
      this.$socket.emit("getUptime", "uptime");
    },
    getDate() {
      return new Date();
    },
    getStatus() {
      // Send the "pingServer" event to the server.
      this.$socket.emit("getStatus", "status");
    },
    startService(servicename) {
      this.$socket.emit("serviceCtl", { cmd: "start", service: servicename });
    },
    killService(servicename) {
      this.$socket.emit("serviceCtl", { cmd: "stop", service: servicename });
    }
  },
  name: "home",
  components: {
    MitigationRequest
  }
};
//#
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
