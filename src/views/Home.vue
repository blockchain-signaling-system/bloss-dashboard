<template>
  <div>
    <a-alert
      message="Websocket connection lost"
      description="Trying to reconnect."
      type="warning"
      showIcon
      v-if="!isConnected"
    />
    <section class="section">
      <div class="container">
        <h1 class="title">BLOSS</h1>
        <div class="columns">
          <div class="column">
            <mitigation-request
              v-for="mit in mitigationRequests"
              v-bind:key="mit.key"
              v-bind:requestType="mit.requestType"
              v-bind:requestorHostname="mit.requestorHostname"
              v-bind:requestorReputation="mit.requestorReputation"
              v-bind:requestorIP="mit.requestorIP"
              v-bind:attackAttackers="mit.attackAttackers"
              v-bind:attackDomains="mit.attackDomains"
              v-bind:incomingDate="getDate()"
            ></mitigation-request>
          </div>
          <div class="column">Second Column</div>
          <div class="column">Third Column</div>
          <div class="column">
            <el-container v-loading="!isConnected">
              <div class="box">
                
                <article class="media">
                  <div class="media-content">
                    <div class="media-title">System Status</div>
                    <br>
                    <div class="field">
                      <b-switch
                        v-model="statusPollingActive"
                        :disabled="(isConnected) ? false:true"
                        size="is-small"
                      >Status Polling</b-switch>
                    </div>
                    <div class="content">
                      <p>
                        <a-badge :status="isConnected ? 'success' : 'error'"/>
                        <el-tag :type="isConnected ? 'success' : 'danger'" size="mini">WEBSOCKET</el-tag>
                        <br>
                      </p>
                      <hr>
                      <div v-show="isConnected">
                        <div class="tile">
                          <a-badge :status="serviceStatusBloss ? 'success' : 'error'"/>
                          <el-tag
                            :type="serviceStatusBloss ? 'success' : 'danger'"
                            size="mini"
                          >BLOSS</el-tag>
                          <el-button @click="killService('bloss')" size="mini" round>Stop</el-button>
                          <el-button @click="startService('bloss')" size="mini" round>Start</el-button>
                          <br>
                        </div>
                        <a-badge :status="serviceStatusGeth ? 'success' : 'error'"/>
                        <el-tag :type="serviceStatusGeth ? 'success' : 'danger'" size="mini">GETH</el-tag>
                        <el-button @click="killService('geth')" size="mini" round>Stop</el-button>
                        <el-button @click="startService('geth')" size="mini" round>Start</el-button>
                        <br>
                        <a-badge :status="serviceStatusIPFS ? 'success' : 'error'"/>
                        <el-tag :type="serviceStatusIPFS ? 'success' : 'danger'" size="mini">IPFS</el-tag>
                        <el-button @click="killService('ipfs')" size="mini" round>Stop</el-button>
                        <el-button @click="startService('ipfs')" size="mini" round>Start</el-button>
                        <br>
                        <a-badge :status="serviceStatusInfluxDB ? 'success' : 'error'"/>
                        <el-tag
                          :type="serviceStatusInfluxDB ? 'success' : 'danger'"
                          size="mini"
                        >INFLUXDB</el-tag>
                        <el-button @click="killService('influxdb')" size="mini" round>Stop</el-button>
                        <el-button @click="startService('influxdb')" size="mini" round>Start</el-button>
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            </el-container>
          </div>
        </div>
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
      statusPollingActive: false,
      serviceStatusBloss: false,
      serviceStatusGeth: false,
      serviceStatusIPFS: false,
      serviceStatusInfluxDB: false,
      mitigationRequests: [
        {
          key: "123",
          requestType: "MITIGATION REQUEST",
          requestorHostname: "NODE 001",
          requestorReputation: 3234,
          requestorIP: "192.168.10.2",
          attackAttackers: 33,
          attackDomains: 233
        },
        {
          key: "123",
          requestType: "MITIGATION REQUEST",
          requestorHostname: "NODE 001",
          requestorReputation: 3234,
          requestorIP: "192.168.10.2",
          attackAttackers: 33,
          attackDomains: 233
        }
      ]
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
      this.isControllerAvailable = data.isControllerAvailable;
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
      this.serviceStatusInfluxDB = status.influxdb;
    },
    getUptime() {
      // Send the "pingServer" event to the server.
      this.$socket.emit("getUptime", "uptime");
    },
    getDate() {
      return new Date();
    },
    toggleStatusPolling() {
      this.$socket.emit("statusPolling", "toggle");
    },
    fetchControllerStatus() {
      this.$socket.emit("isControllerAvailable", "toggle");
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
  watch: {
    statusPollingActive: function() {
      this.toggleStatusPolling();
    },
    isConnected: function() {
      this.fetchControllerStatus();
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
  font-size: 14px;
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