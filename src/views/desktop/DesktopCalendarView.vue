<script>
import CalendarComponent from "@/components/calendar/CalendarComponent.vue";

export default {
  props: {},
  components: { CalendarComponent },
  setup() {
    return {

    };
  },
};
</script>

<template>
  <div class="text-center">
      <CalendarComponent />
  </div>
</template>

<style scoped>
::-webkit-scrollbar {
  width: 0px;
}
</style>
