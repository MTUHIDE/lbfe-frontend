<script>
export default {
  data() {
    return {
      clientName: '',
      status: '',
      statusOptions: ['Picked Up', 'Dropped Off', 'On My Way']
    }
  },
  computed: {
    driverName: {
      get() {
        return this.$store.state.driverName;
      },
      set(val) {
        this.$store.commit('updateDriverName', val);
      },
    },
  },
};
</script>

<template>
  <div class="driver-update">
    <h1>Update</h1>
    <div class="form-grid">
      <label for="driverName">Driver Name</label>
      <input type="text" class="form-control" v-model="driverName" id="driverName">
      <!-- <b-form-input v-model="driverName" id="driverName" /> -->
      <label for="clientName">Elder Name</label>
      <input type="text" class="form-control" v-model="clientName" id="clientName">
      <!-- <b-form-input v-model="clientName" id="clientName" /> -->
      <label for="status">Status Update</label>
      <select class="form-select" v-model="status" :options="statusOptions" id="status">
        <option selected>Example option</option>
      </select>
      <!-- <b-form-select v-model="status" :options="statusOptions" id="status" /> -->
    </div>
    <div class="btn-grid">
      <button type="button" class="btn btn-primary"
         v-for="(option, i) of statusOptions"
        :variant="status === option ? 'primary' : 'outline-primary'"
        @click="status = option"
        :key="'a' + i">
        <b-button>
        {{ option }}
        </b-button>
      </button>
    </div>
    <div class="save-btn-area">
      <router-link class="btn btn-secondary" to="/driver">Back</router-link>
      <!-- <b-button variant="secondary" to="/driver">Back</b-button> -->
      <button type="button" class="btn btn-primary">Save</button>
      <!-- <b-button variant="primary">Save</b-button> -->
    </div>
  </div>
</template>

<style scoped>
h1 {
  margin-top: 16px !important;
  margin-bottom: 32px !important;
}

.form-grid,
.btn-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  width: 80%;
  max-width: 600px;
  margin: 0 auto;
  margin-bottom: 48px;
  gap: 16px;
  justify-content: center;
}
.form-grid label {
  height: 24px;
  margin: 0;
}

.form-grid {
  grid-template-columns: auto 1fr;
  max-width: 400px;
}
.form-grid span {
  justify-self: right;
}
.form-grid .custom-select {
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 10%), 0 1px 2px 0 rgb(0 0 0 / 6%);
}

.btn-grid {
  grid-auto-rows: 64px;
}
.btn-grid button {
  height: 100%;
}
.btn-grid button:last-child:nth-last-child(odd) {
  grid-column: auto / span 2;
}

.btn-grid button:first-child:nth-last-child(even),
.btn-grid button:first-child:nth-last-child(even) ~ .box {
  grid-column: auto / span 1;
}

.save-btn-area {
  width: 90%;
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
}
</style>
