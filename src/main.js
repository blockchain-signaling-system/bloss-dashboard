import VueSocketIO from 'vue-socket.io';
import socketio from 'socket.io-client';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/store';
import ElementUI from 'element-ui';
import './element-variables.scss'
import Buefy from 'buefy';
import moment from 'moment';
import { Card, Badge, Alert, Switch, Button, Steps } from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { faEthereum } from '@fortawesome/free-brands-svg-icons';
//import  fas  from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
 
library.add(fas);
library.add(faEthereum);

var VUE_APP_WEBSOCKET_PORT;
if (!VUE_APP_WEBSOCKET_PORT) {
  switch (process.env.VUE_APP_CONTROLLER) {
      case 'CONTROLLER400':
          console.info("Loading config for Controller400");
          VUE_APP_WEBSOCKET_PORT = process.env.VUE_APP_C400_WS_PORT;
          break;
      case 'CONTROLLER500':
          console.info("Loading config for Controller500");
          VUE_APP_WEBSOCKET_PORT = process.env.VUE_APP_C500_WS_PORT;
          break;
      case 'CONTROLLER600':
          console.info("Loading config for Controller600");
          VUE_APP_WEBSOCKET_PORT = process.env.VUE_APP_C500_WS_PORT;
          break;
      default:
          console.error('Initializing .env failed');
          break;
  }
}

Vue.prototype.moment = moment;

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.component(Badge.name, Badge);
Vue.component(Card.name, Card);
Vue.component(Alert.name, Alert);
Vue.component(Switch.name, Switch);
Vue.component(Button.name, Button);
Vue.component(Steps.name, Steps);

export const SocketInstance = socketio('http://localhost:'+VUE_APP_WEBSOCKET_PORT);

Vue.config.productionTip = false;

Vue.use(VueSocketIO, SocketInstance);
Vue.use(ElementUI);
Vue.use(Buefy, {
  defaultIconPack: 'fas'
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
