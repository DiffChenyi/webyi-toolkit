import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Plugins from "./utils/plugins.js";
Vue.use(Plugins);
Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
