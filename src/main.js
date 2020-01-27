import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";

(function() {
  if (typeof NodeList.prototype.forEach === "function") return false;
  NodeList.prototype.forEach = Array.prototype.forEach;
})();

(function() {
  if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector;
  }
})();
// eslint-disable-next-line no-undef
NProgress.configure({ showSpinner: false });

Vue.config.productionTip = false;
Vue.config.silent = true;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
