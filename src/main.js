/* eslint-disable */
import { createApp } from "vue"; 
import { createPinia } from "pinia";
import App from "./App.vue";
import Vuex from 'vuex';
import router from "./router";
import Emitter from 'tiny-emitter';
import '@fortawesome/fontawesome-free/js/all';

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

const pinia = createPinia();
const app = createApp(App);

app.config.globalProperties.$msalInstance = {};
// TODO: make the emitter a service
app.config.globalProperties.$emitter = new Emitter();

app
    .use(router)
    .use(pinia)
    .mount('#app');
