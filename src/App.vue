<script>
import Navbar from "./components/navbar/Navbar.vue";
require("./css/main-style.css");
import store from "./store";

export default {
  name: "App",
  store,
  components: { Navbar },
};
</script>

<template>
  <div id="app">
    <Navbar v-if="!$route.meta.hideNavbar"/>
    <div class="main-content">
      <router-view />
    </div>
    <footer>Brought to you by HIDE (MTU)</footer>
  </div>
</template>

<style>
html,
body {
  min-height: 100vh;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

label {
  float: left;
}

.main-content {
  min-height: 100%;
  margin-top: 100px;
  margin-bottom: -32px;
}

.main-content:after {
  content: "";
  display: block;
}

footer,
.main-content:after {
  height: 32px;
}

.modal-backdrop.show:nth-of-type(odd) {
    z-index: 1061 !important;
}
</style>
