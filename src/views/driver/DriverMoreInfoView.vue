<script>
export default {
  data() {
    return {
      items: [
        { Driver: 'Driver1', time: '2:40', home_addr: '123 Street Avenue', dest_addr: '345 Road Street', mobility: 'wheelchair', notes: 'Deaf, need to wave through front window' },
      ],
    };
  },
};
</script>

<template>
  <div class="d-flex justify-content-center">
    <div class="card justify-center" style="max-width: 20rem; background-color: red">
      <h5 class="card-title">Driver More Info</h5>
      <table class="table drivetbl" stacked selectable @select="selected" hover sticky-header :items="items">
      <!-- <b-table class="drivetbl" stacked selectable @select="selected" hover sticky-header :items="items">
      </b-table> -->
    </table>
      <router-link to="/driver"  class="btn btn-secondary btn-lg" >Back</router-link>
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
