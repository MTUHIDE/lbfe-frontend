<template>
  <div class="calendar-popup">
    <!-- Modal Header -->
      <h5 class="modal-title">{{ title }}</h5>

    <div class="popup-inner">
      <form id="editForm" @submit.prevent="editForm">
        <div class="mb-3">
          <label for="editTitle" class="form-label">Title: </label>
          <input
            name="title"
            type="text"
            class="form-control"
            id="editTitle"
            v-model="oldTitle"
            required
          />
        </div>

        <div class="mb-3">
          <label for="editName" class="form-label">Elder: </label>
          <select
            id="editName"
            name="name"
            class="form-select"
            v-model="oldElderId"
            required
          >
            <option disabled>--Select an Elder--</option>
            <option
              v-for="addClientId in addClients"
              :key="addClientId.id"
              v-bind:value="addClientId.id"
            >
              {{ addClientId.client_name }}
            </option>
          </select>
        </div>

        <div class="mb-3">
          <label for="editDriver" class="form-label">Driver: </label>
          <select
            id="editDriver"
            name="driver"
            class="form-select"
            v-model="oldDriverId"
            required
          >
            <option disabled>--Select a Driver--</option>
            <option
              v-for="addDriverId in addDrivers"
              :key="addDriverId.id"
              v-bind:value="addDriverId.id"
            >
              {{ addDriverId.driver_name }}
            </option>
          </select>
        </div>

        <div class="mb-3">
          <label for="editDateTime" class="form-label"
            >Start Date and Time:
          </label>
          <input
            id="editDateTime"
            name="dateTime"
            class="form-control"
            type="datetime-local"
            v-model="oldAppDate"
            required
          />
        </div>
        <div class="mb-3">
          <label for="editEndDateTime" class="form-label"
            >End Date and Time:
          </label>
          <input
            id="editEndDateTime"
            name="dateTime"
            class="form-control"
            type="datetime-local"
            v-model="oldAppEndDate"
            required
          />
        </div>

        <div class="mb-3">
          <label for="editPickup" class="form-label">Pick up address: </label>
          <textarea
            id="editPickup"
            name="pickup"
            class="form-control"
            v-model="oldPickupAddress"
            required
          ></textarea>
        </div>

        <div class="mb-3">
          <label for="editDropoff" class="form-label">Drop off address: </label>
          <textarea
            id="editDropoff"
            name="dropoff"
            class="form-control"
            v-model="oldDropoffAddress"
            required
          ></textarea>
        </div>

        <div class="mb-3">
          <label for="editNotes" class="form-label">Appointment Notes: </label>
          <textarea
            id="editNotes"
            name="notes"
            class="form-control"
            v-model="oldClientNotes"
          ></textarea>
        </div>
      </form>
    </div>

    <!-- Close / Save Appointment Modal -->
    <div class="button-row">
      <button @click="callOnClose" class="btn btn-secondary custom-close-btn">
        Close
      </button>
      <button @click="callOnSave" class="btn btn-primary custom-save-btn">
        Save
      </button>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  props: {
    title: String,
    appointment: Object,
    driversList: Object,
    eldersList: Object,
    callOnSave: Function,
    callOnClose: Function,
  },
  emits: ["update:appointment"],

  data() {
    return {
      selectedAppointment: {},
      selectedDriver: {},
      selectedElder: {},
    };
  },

  mounted() {
    this.loadDefaults();
  },

  methods: {
    // Set default driver / elder on page load if we can
    loadDefaults() {
      this.selectedDriver = !!this.driversList ? this.driversList[0] : {};
      this.selectedElder = !!this.eldersList ? this.eldersList[0] : {};
    },
  },
};
</script>

<style lang="scss" scoped>
.add-edit-appointment-header {
  border-bottom: 2px;
  border-bottom-color: grey;
  width: 23.37em;
}

.modal-title {
  float: left;
  left: 0;
  width: 100%;
  background-color: yellow;
}

.popup-inner {
  margin-top: 10px;
  margin-bottom: 10px;
  min-width: 30%;
  min-height: 30%;
}

.button-row {
  background-color: green;
  justify-content: space-between;

  .custom-save-btn {
    float: right;
  }
  .custom-close-btn {
    float: left;
  }
}
</style>
