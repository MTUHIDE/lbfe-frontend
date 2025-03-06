<script>
import DriverForm from './DriverForm.vue';

export default {
  name: "DriverFormButton",
  components: {
    DriverForm,
  },
  data() {
    return {
      showForm: false,
    };
  },
  methods: {
    toggleForm() {
      this.showForm = !this.showForm;
    },
    handleFormSubmit(formData) {
      // Handle the submitted form data here
      console.log("Received form data:", formData);
      // Optionally, hide the form after submission
      this.showForm = false;
    }
  }
};
</script>

<template>
  <div>
    <div>
    <!-- Button to toggle the form display -->
    <button @click="toggleForm">
      {{ showForm ? "Hide Form" : "Show Form" }}
    </button>

    <!-- Conditionally render the FormComponent -->
    <DriverForm v-if="showForm" @formSubmitted="handleFormSubmit" />
  </div>

  </div>
</template>
