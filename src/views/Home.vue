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
      <el-main>

          <div>
            <el-tag :type="isConnected ? 'success' : 'danger'">Websocket</el-tag>
            <a-badge :status="isConnected ? 'success' : 'error'" text="WEBSOCKET" />  
            <br />
            <a-badge :status="serviceStatusBloss ? 'success' : 'error'" text="BLOSS" />  
            <el-tag  :type="serviceStatusBloss ? 'success' : 'danger'" size="small">BLOSS</el-tag>
            <el-button @click="killService('bloss')" size="mini" round >Stop</el-button>
            <el-button @click="startService('bloss')" size="mini" round>Start</el-button>
            <br />
            <a-badge :status="serviceStatusGeth ? 'success' : 'error'" text="GETH" />
            <el-tag  :type="serviceStatusGeth ? 'success' : 'danger'" size="small">GETH</el-tag>
            <el-button @click="killService('geth')" size="mini" round >Stop</el-button>
            <el-button @click="startService('geth')" size="mini" round>Start</el-button>
            <br />
            <a-badge :status="serviceStatusIPFS ? 'success' : 'error'" text="IPFS" />
            <el-tag  :type="serviceStatusIPFS ? 'success' : 'danger'" size="small">IPFS</el-tag>
            <el-button @click="killService('ipfs')" size="mini" round >Stop</el-button>
            <el-button @click="startService('ipfs')" size="mini" round>Start</el-button>
            <br />
            <a-badge :status="serviceStatusInfluxDB ? 'success' : 'error'"/>
            <el-tag  :type="serviceStatusInfluxDB ? 'success' : 'danger'" size="small">INFLUXDB</el-tag>
            <el-button @click="killService('influxdb')" size="mini" round >Stop</el-button>
            <el-button @click="startService('influxdb')" size="mini" round>Start</el-button>
            <br />
          </div>
    
        <div>
    <a-button type="primary" ghost>Primary</a-button>
    <a-button ghost>Default</a-button>
    <a-button type="dashed" ghost>Dashed</a-button>
    <a-button type="danger" ghost>danger</a-button>
  </div>
        <el-row>
        <el-button :type="serviceStatusBloss ? 'success' : 'danger'" size="mini" >BLOSS</el-button>
        <el-button :type="serviceStatusGeth ? 'success' : 'danger'" size="mini" >GETH</el-button>
        <el-button :type="serviceStatusIPFS ? 'success' : 'danger'" size="mini" >IPFS</el-button>
        <el-button :type="serviceStatusInfluxDB ? 'success' : 'danger'" size="mini" >INFLUXDB</el-button>
        </el-row>

        <el-row>
        <p v-if="isConnected">We're connected to the server!</p>
        <p v-else>We're NOT connected to the server!</p>
        <p>Message from server: "{{socketMessage}}"</p>
        <p>Message from server: "{{statusMessage}}"</p>
        <button @click="getUptime()">Get Uptime</button>
        <button @click="getStatus()">Get Status</button>
        </el-row>
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
      socketMessage: "",
      statusMessage: "",
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
    messageChannel(data) {
      console.log(data);
      this.socketMessage = data;
    },
    statusChannel(data) {
      if (data.geth != null) { 
        if(data.geth === "active")
          this.updateStatus("geth", true);
        if(data.geth === "inactive")
          this.updateStatus("geth",false);
      }
      if (data.ipfs != null) { 
        if(data.ipfs === "active")
          this.updateStatus("ipfs", true);
        if(data.ipfs === "inactive")
          this.updateStatus("ipfs",false);
      }
      if (data.bloss != null) { 
        if(data.bloss === "active")
          this.updateStatus("bloss", true);
        if(data.bloss === "inactive")
          this.updateStatus("bloss",false);
      }

      console.log(data); 
      this.statusMessage = data;

    }
  },
  methods: {
    updateStatus(service, status) {
      switch (service) {
        case 'geth':
          this.serviceStatusGeth = status;    
          break;
        case 'ipfs':
          this.serviceStatusIPFS = status;    
          break;
        case 'bloss':
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
    HelloWorld
  }
};
</script>

<style>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 20px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>