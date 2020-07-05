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
    key: "AIzaSyAkSLLF8r0s-5agohii5xz_nHJ2vwK8YyU",
  },
});

new Vue({
  render: (h) => h(App),
}).$mount("#app");
