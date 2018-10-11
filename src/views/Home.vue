/* eslint-disable */
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
  <el-main><div>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
  <div>
<el-row>
<el-row>
  <el-tag :type="isConnected ? 'success' : 'danger'">Websocket</el-tag>
</el-row>
  <el-button :type="serviceStatusBloss ? 'success' : 'danger'" size="mini" >BLOSS</el-button>
  <el-button :type="serviceStatusGeth ? 'success' : 'danger'" size="mini" >GETH</el-button>
  <el-button :type="serviceStatusIPFS ? 'success' : 'danger'" size="mini" >IPFS</el-button>
  <el-button :type="serviceStatusInfluxDB ? 'success' : 'danger'" size="mini" >INFLUXDB</el-button>
</el-row>


    <p v-if="isConnected">We're connected to the server!</p>
    <p v-else>We're NOT connected to the server!</p>
    <p>Message from server: "{{socketMessage}}"</p>
    <p>Message from server: "{{statusMessage}}"</p>
    <button @click="getUptime()">Get Uptime</button>
    <button @click="getStatus()">Get Status</button>
  </div>
  </div></el-main>
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
      this.socketMessage = data;
    },
    statusChannel(data) {
      this.statusMessage = data;
    }
  },

  methods: {
    getUptime() {
      // Send the "pingServer" event to the server.
      this.$socket.emit("getUptime", "uptime");
    },
    getStatus() {
      // Send the "pingServer" event to the server.
      this.$socket.emit("getStatus", "status");
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