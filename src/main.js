/* eslint-disable */
import { createApp } from "vue"; 

import App from "./App.vue";
import Vuex from 'vuex';
import router from "./router";
// import createStore from "./store"; // TODO: Fix once Pinia is installed and working
import Emitter from 'tiny-emitter';
// import "mutationobserver-shim";
import '@fortawesome/fontawesome-free/js/all';
import axios from 'axios';
import VueAxios from 'vue-axios';
import axios2 from 'axios'

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

const app = createApp(App);

const store = new Vuex.Store({
    state: {
      app: null
    },
    mutations: {
      app (state, app) {
        state.app = app
      }
    },
    modules: {}
  });

app.config.globalProperties.$msalInstance = {};
// TODO: make the emitter a service
app.config.globalProperties.$emitter = new Emitter();

app.use(router).use(Vuex).use(store).use(VueAxios, { $axios: axios, axios2: axios2 }).mount('#app');
