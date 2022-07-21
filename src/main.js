import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Emitter from 'tiny-emitter';
// import "mutationobserver-shim";
import '@fortawesome/fontawesome-free/js/all';
import axios from 'axios';
import VueAxios from 'vue-axios';
import axios2 from 'axios'

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

const app = createApp(App);

app.config.globalProperties.$msalInstance = {};
// TODO: make the emitter a service
app.config.globalProperties.$emitter = new Emitter();

app.use(router).use(store).use(VueAxios, { $axios: axios, axios2: axios2 }).mount('#app');
