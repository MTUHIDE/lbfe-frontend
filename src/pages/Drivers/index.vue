<template>
  <div class="drivers-page">
    <h1>Drivers Page</h1>
    <!-- Include the ParentComponent here -->
    <DriverFormButton />
  </div>
</template>

<script>
import DriverFormButton from '@/components/Layout/DriversLayout/DriverFormButton.vue'

export default {
  name: "Drivers",
  components: {
    DriverFormButton,
  },
};
</script>

<style scoped>
/* Add styles for your Drivers page if needed */
.drivers-page {
  padding: 1em;
}
</style>
