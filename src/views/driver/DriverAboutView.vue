<script>
export default {
  data() {
    return {
      message:
        "This app is meant to help Little Brothers track driver tasks and locations in real time and record data. \n If you have any questions, contact Little Brother's help desk at",
      contact: "906-123-4567",
    };
  },
};
</script>

<template>
  <div class="d-flex justify-content-center">
    <div class="card" style="max-width: 20rem">
      <div class="card-body">
        <h5 class="card-title">About</h5>
        <p class="card-text">{{ message }}</p>
        <p class="card-text">{{ contact }}</p>
        <router-link to="/driver" class="btn btn-primary"
          >Back</router-link
        >
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
table thead th {
  background-color: #a9a9a9;
}
h1 {
  margin-top: 16px !important;
}
.drivetbl {
  height: calc(100vh - 245px);
  max-height: unset;
}
.drivetbl table {
  margin-top: 0;
}
</style>
