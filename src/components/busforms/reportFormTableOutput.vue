<script>
export default {
  name: "reportFormTableOutput",
};
</script>

<template>
        <div class="container" id="reportFormTableOutput">
            <router-link to="/reports" class="btn btn-primary generateButton" id="reportSubmit"> back <i class="fas fa-clipboard-list"></i></router-link>
        </div>

        <div>
                <h1> "Test" </h1>
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