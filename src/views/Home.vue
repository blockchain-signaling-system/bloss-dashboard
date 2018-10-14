<template>
  <div>
    <a-alert
      message="Websocket connection lost"
      description="Trying to reconnect."
      type="warning"
      showIcon
      v-if="!isConnected"
    />
    <el-container v-loading="!isConnected">
      <el-header></el-header>
      <el-main>
        <div>
          <el-card class="box-card" shadow="hover" >
            <div slot="header" class="clearfix">
              <span>Status</span>
              <!-- <el-button style="float: right; padding: 3px 0" type="text">Operation button</el-button> -->
              <el-switch
                style="float:right;padding:3px 0"
                v-model="statusPollingActive"
                active-text="Polling Status"
                inactive-text="Idle"
              ></el-switch>
            </div>
            <div>
              <a-badge :status="isConnected ? 'success' : 'error'"/>
              <el-tag :type="isConnected ? 'success' : 'danger'" size="mini">WEBSOCKET</el-tag>
              <br>
              <a-badge :status="isControllerAvailable ? 'success' : 'error'"/>
              <el-tag :type="isControllerAvailable ? 'success' : 'danger'" size="mini">CONTROLLER</el-tag>
              <br>
              <a-badge :status="serviceStatusBloss ? 'success' : 'error'"/>
              <el-tag :type="serviceStatusBloss ? 'success' : 'danger'" size="mini">BLOSS</el-tag>
              <el-button
                style="background-color: #212936; border-color: #4D5766; color: #AFBDD1;"
                @click="killService('bloss')"
                size="mini"
                round
              >Stop</el-button>
              <el-button
                style="background-color: #212936; border-color: #4D5766; color: #AFBDD1;"
                @click="startService('bloss')"
                size="mini"
                round
              >Start</el-button>
              <br>
              <a-badge :status="serviceStatusGeth ? 'success' : 'error'"/>
              <el-tag :type="serviceStatusGeth ? 'success' : 'danger'" size="mini">GETH</el-tag>
              <el-button
                style="background-color: #212936; border-color: #4D5766; color: #AFBDD1;"
                @click="killService('geth')"
                size="mini"
                round
              >Stop</el-button>
              <el-button
                style="background-color: #212936; border-color: #4D5766; color: #AFBDD1;"
                @click="startService('geth')"
                size="mini"
                round
              >Start</el-button>
              <br>
              <a-badge :status="serviceStatusIPFS ? 'success' : 'error'"/>
              <el-tag :type="serviceStatusIPFS ? 'success' : 'danger'" size="mini">IPFS</el-tag>
              <el-button
                style="background-color: #212936; border-color: #4D5766; color: #AFBDD1;"
                @click="killService('ipfs')"
                size="mini"
                round
              >Stop</el-button>
              <el-button
                style="background-color: #212936; border-color: #4D5766; color: #AFBDD1;"
                @click="startService('ipfs')"
                size="mini"
                round
              >Start</el-button>
              <br>
              <a-badge :status="serviceStatusInfluxDB ? 'success' : 'error'"/>
              <el-tag :type="serviceStatusInfluxDB ? 'success' : 'danger'" size="mini">INFLUXDB</el-tag>
              <el-button
                style="background-color: #212936; border-color: #4D5766; color: #AFBDD1;"
                @click="killService('influxdb')"
                size="mini"
                round
              >Stop</el-button>
              <el-button
                style="background-color: #212936; border-color: #4D5766; color: #AFBDD1;"
                @click="startService('influxdb')"
                size="mini"
                round
              >Start</el-button>
              <br>
            </div>
            <!-- <div v-for="o in 4" :key="o" class="text item">{{'List item ' + o }}</div> -->
          </el-card>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

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
      serviceStatusInfluxDB: false
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
    HelloWorld
  }
};
//#
</script>

<style>
.el-header,
.el-footer {
  background-color: #2b3648;
}

.el-main {
  background-color: #212936;
}

.dark-button {
  background-color: #212936;
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