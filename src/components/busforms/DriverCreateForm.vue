<template>
  <div class="form-container">
    <h2>Driver Form</h2>
    
    <!-- Form with validation -->
    <form @submit.prevent="submitForm">
      <!-- Name field -->
      <div class="form-group">
        <label for="First Name">First Name:</label>
        <input 
          type="text" 
          id="name" 
          v-model="formData.firstName" 
          :class="{ 'input-error': errors.firstName }"
        />
        <div v-if="errors.firstName" class="error-message">{{ errors.firstName }}</div>
      </div>
      
      <!-- Email field -->
      <div class="form-group">
        <label for="Last Name">Last Name:</label>
        <input 
          type="email" 
          id="email" 
          v-model="formData.lastName"
          :class="{ 'input-error': errors.lastName }"
        />
        <div v-if="errors.lastName" class="error-message">{{ errors.lastName }}</div>
      </div>
      
      <!-- Message field -->
      <div class="form-group">
        <label for="insuranceID">Insurance ID:</label>
        <input 
          type="email" 
          id="email" 
          v-model="formData.insuranceID"
          :class="{ 'input-error': errors.insuranceID }"
        />
        <div v-if="errors.insuranceID" class="error-message">{{ errors.insuranceID }}</div>
      </div>

      <div class="form-group">
        <label for="Home Address">Home Address:</label>
          <textarea
            id="editAddress"
            name="address"
            class="form-control"
          ></textarea>
      </div>


      <div class="form-group">
        <label for="Notes">Driver Notes:</label>
          <textarea
            id="editAddress"
            name="address"
            class="form-control"
          ></textarea>
      </div>


      
      <!-- Overall form error message -->
      <div v-if="formError" class="form-error-message">
        <div class="error-icon">!</div>
        <div>{{ formError }}</div>
      </div>
      
      <button type="back">Back</button>
      <button type="submit">Create</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        firstName: '',
        lastName: '',
        insuranceID: ''
      },
      errors: {
        firstName: '',
        lastName: '',
        insuranceID: ''
      },
      formError: '',
      formSubmitted: false
    }
  },
  methods: {
    validateForm() {
      // Reset errors
      this.errors = {
        firstName: '',
        lastName: '',
        insuranceID: ''
      };
      this.formError = '';
      
      let isValid = true;
      
      // Validate name
      if (!this.formData.firstName.trim()) {
        this.errors.firstName = 'First Name is required';
        isValid = false;
      }
      
      // Validate email
      if (!this.formData.lastName.trim()) {
        this.errors.lastName = 'Last Name is required';
        isValid = false;
      } 
      
     // Validate email
     if (!this.formData.insuranceID.trim()) {
        this.errors.insuranceID = 'Insurance ID is required';
        isValid = false;
      }
      
      // Set general form error if validation fails
      if (!isValid) {
        this.formError = 'Please correct the errors in the form before submitting.';
      }
      
      return isValid;
    },
    submitForm() {
      if (this.validateForm()) {
        // Form is valid, proceed with submission
        console.log('Form submitted successfully:', this.formData);
        // Here you would typically send the data to your backend
        alert('Form submitted successfully!');
        
        // Reset form after successful submission
        this.formData = {
          firstName: '',
          lastName: '',
          insuranceID: ''
        };
      } else {
        console.log('Form validation failed');
      }
    }
  }
}
</script>

<style scoped>
.form-container {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input, textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

textarea {
  height: 100px;
}

.input-error {
  border-color: #ff4d4f;
}

.error-message {
  color: #ff4d4f;
  font-size: 0.8rem;
  margin-top: 5px;
}

.form-error-message {
  display: flex;
  align-items: center;
  background-color: #fff2f0;
  border: 1px solid #ffccc7;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 15px;
  color: #ff4d4f;
}

.error-icon {
  font-weight: bold;
  font-size: 16px;
  margin-right: 10px;
  background-color: #ff4d4f;
  color: white;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

button {
  background-color: #1890ff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

button:hover {
  background-color: #40a9ff;
}
</style>
