import VueSocketIO from 'vue-socket.io';
import socketio from 'socket.io-client';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/store';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import { Badge, Alert, Switch, Button } from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css'; 

Vue.component(Badge.name, Badge);
Vue.component(Alert.name, Alert);
Vue.component(Switch.name, Switch);
Vue.component(Button.name, Button);

export const SocketInstance = socketio('http://localhost:3001');

Vue.config.productionTip = false;

Vue.use(VueSocketIO, SocketInstance);
Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
