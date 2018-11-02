import VueSocketIO from 'vue-socket.io';
import socketio from 'socket.io-client';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/store';
import ElementUI from 'element-ui';
import Buefy from 'buefy';
import moment from 'moment';
import 'element-ui/lib/theme-chalk/index.css';
import { Card, Badge, Alert, Switch, Button } from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { faEthereum } from '@fortawesome/free-brands-svg-icons';
//import  fas  from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
 
library.add(fas);
library.add(faEthereum);

Vue.prototype.moment = moment;

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.component(Badge.name, Badge);
Vue.component(Card.name, Card);
Vue.component(Alert.name, Alert);
Vue.component(Switch.name, Switch);
Vue.component(Button.name, Button);

export const SocketInstance = socketio('http://localhost:3001');

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
