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
              v-bind:hash="mit.hash"
              v-bind:target="mit.target"
              v-bind:timestamp="mit.timestamp"
              v-bind:action="mit.action"
              v-bind:subnetwork="mit.subnetwork"
              v-bind:addresses="mit.addresses"
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
      this.serviceStatusInfluxDB = status.influxdb;
    },
    getUptime() {
      // Send the "pingServer" event to the server.
      this.$socket.emit("getUptime", "uptime");
    },
    getDate() {
      return new Date();
    },
    fetchControllerStatus() {
      this.$socket.emit("isControllerAvailableRequest", "toggle");
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