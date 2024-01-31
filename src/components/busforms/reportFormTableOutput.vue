<script>
import NavBar from "./components/navbar/Navbar.vue"
require("./css/main-style.css");

export default {
  name: "App",
  components: { NavBar },
};
</script>

<template>
        <div class="modal-inner" id="app">
            <NavBar v-if="!$route.meta.hideNavbar"/>
            <router-link to="/ReportForm.vue" class="btn btn-primary generateButton" id="reportSubmit"> back <i class="fas fa-clipboard-list"></i></router-link>

            <div>
                <h1> "Test" </h1>
            </div>
        </div>
</template>

<style scoped>

.generateButton {
        max-width: 350px;
        padding: 0.75em;
        margin-bottom: 10px;
        transition: all 0.3s;
        background: lightgrey;
        color: rgb(39, 39, 39);
        border: none;
    }

</style>