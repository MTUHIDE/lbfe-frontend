<script>
  import Calendar from '../../components/driverCalendar/CalendarDriver.vue';

  export default {
  props: {},
  components: { Calendar },
  setup() {
    return { }
  }
}
</script>

<template>
  <div class="text-center">
    <Calendar/>
  </div>
</template>

<style scoped>

::-webkit-scrollbar {
  width: 0px;
}

</style>
