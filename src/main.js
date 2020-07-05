import "@babel/polyfill";
import "mutationobserver-shim";
import Vue from "vue";
import "./plugins/bootstrap-vue";
import App from "./App.vue";
import * as VueGoogleMaps from "vue2-google-maps";

Vue.config.productionTip = false;

export const eventBus = new Vue();

Vue.use(VueGoogleMaps, {
  load: {
    key: [APIKEY],
  },
});

new Vue({
  render: (h) => h(App),
}).$mount("#app");
