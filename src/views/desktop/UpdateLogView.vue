<script>
// TODO - build the form, remove this comment when it is done
import UpdateForm from "../../components/busforms/UpdateForm.vue";
import ProgressBar from "../../components/progress/ProgressBar.vue";

export default {
  components: { UpdateForm, ProgressBar },
  
};
</script>

<template>
  <div class="update">
    <ProgressBar />
    <UpdateForm />
  </div>
</template>

<style scoped>
</style>