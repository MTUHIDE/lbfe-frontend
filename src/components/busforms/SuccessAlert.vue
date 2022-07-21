<template>
  <div class="alert alert-success alert-dismissible fade show" role="alert">
    <strong>{{alertStrongText}}</strong> {{alertBodyText}}.
    <!-- <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> -->
  </div>
</template>

<script>
export default {
  name: "SuccessAlert",
  props: {
    alertStrongText: String,
    alertBodyText: String
  },
};
</script>

<style lang="scss" scoped>
.alert {
  position: fixed !important;
  margin-top: 8vh !important;
  top: 0 !important;
  // left: 0 !important;
  right: 0 !important;
  z-index: 10 !important;
}
</style>
