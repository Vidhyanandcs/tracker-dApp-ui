import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import axios from "axios";
import VueAxios from "vue-axios";

//requiring css files
require("./assets/css/main.css");

createApp(App)
  .use(store)
  .use(router)
  .use(VueAxios, axios)
  .mount("#app");

//Update your server base URL here
axios.defaults.baseURL = process.env.VUE_APP_baseURL;
