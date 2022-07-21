<script>
export default {
  data() {
    return {
      prevUpdates: [
        {
          driver: 'Driver1',
          time: '12:45pm',
          client: 'Edna',
          status: 'Picked up',
        },
        {
          driver: 'Driver1',
          time: '12:55pm',
          client: 'Edna',
          status: 'Dropped off',
        },
        {
          driver: 'Driver1',
          time: '1:07pm',
          client: 'Bruce',
          status: 'Picked up',
        },
        {
          driver: 'Driver1',
          time: '1:13pm',
          client: 'Edith',
          status: 'Picked up',
        },
        {
          driver: 'Driver1',
          time: '3:45am',
          client: 'Edith',
          status: 'Dropped off',
        },
      ],
    };
  },
};
</script>

<template>
  <div>
    <h1>Previous Updates</h1>
    <!-- <b-table striped hover :items="prevUpdates"> -->
    <table class="table table-striped">
      <template>
        <b>
          <!-- {{ row.item.driver }} -->

        </b>
      </template>
    <!-- </b-table> -->
  </table>
    <router-link tag="button" to="/driver" class="btn btn-primary">Back</router-link>
    <!-- <b-button href="#" to="/driver" variant="primary">Back</b-button> -->
  </div>
</template>

<style lang="scss" scoped>
h1 {
  margin-top: 16px !important;
}
</style>
