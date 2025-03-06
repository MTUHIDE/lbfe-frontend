<template lang="">
  <form @submit.prevent="handleSubmit">
    <div>
      <label for="firstName">First Name:</label>
      <input
        type="text"
        id="firstName"
        v-model="form.firstName"
        required
      />
    </div>

    <div>
      <label for="lastName">Last Name:</label>
      <input
        type="text"
        id="lastName"
        v-model="form.lastName"
        required
      />
    </div>

    <div>
      <label for="insuranceId">Insurance Id:</label>
      <input
        type="text"
        id="insuranceId"
        v-model="form.insuranceId"
        required
      />
    </div>

    <div>
      <label for="notes">Notes:</label>
      <textarea id="notes" v-model="form.notes"></textarea>
    </div>

    <button type="submit">Submit</button>
  </form>
</template>

<script>
export default {
  name: "DriverForm",
  data() {
    return {
      form: {
        firstName: "",
        lastName: "",
        insuranceId: "",
        notes: ""
      }
    };
  },
  methods: {
    handleSubmit() {
      // Check required fields
      if (!this.form.firstName || !this.form.lastName || !this.form.insuranceId) {
        alert("Please fill in all required fields.");
        return;
      }
      // Process form data (for example, you could send the data to an API)
      console.log("Form submitted:", this.form);
      // Optionally emit the form data to a parent component
      this.$emit("formSubmitted", { ...this.form });

      // Reset the form (optional)
      this.form.firstName = "";
      this.form.lastName = "";
      this.form.insuranceId = "";
      this.form.notes = "";
    }
  }
};
</script>

<style scoped>
form {
  max-width: 400px;
  margin: 0 auto;
}

div {
  margin-bottom: 1em;
}

label {
  display: block;
  margin-bottom: 0.5em;
}

input,
textarea {
  width: 100%;
  padding: 0.5em;
  box-sizing: border-box;
}
</style>
