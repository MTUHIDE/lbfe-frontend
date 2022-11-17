<template>
  <div class="calendar-popup">
    <!-- Modal Header -->
    <h5 class="modal-title">{{ modalTitle }}</h5>
    
    <div class="popup-inner">
      <form id="editForm" @submit.prevent="editForm">
        <div class="mb-3">
          <label for="editTitle" class="form-label">Title: </label>
          <input
            name="title"
            type="text"
            class="form-control"
            id="editTitle"
            :value="title"
            v-on:change="$emit('update:title', $event.target.value)"
            required
          />
        </div>

        <!-- Elder Select - Defaults to given clientId -->
        <div class="mb-3">
          <label for="editName" class="form-label">Elder: </label>
          <select
            id="editName"
            name="name"
            class="form-select"
            :value="clientId"
            @change="$emit('update:clientId', $event.target.value)"
            required
          >
            <option disabled>--Select an Elder--</option>
            <option
              v-for="elder in eldersList"
              :key="elder.id"
              v-bind:value="elder.clientId"
            >
              {{ elder.fullName }}
            </option>
          </select>
        </div>

        <!-- Driver Select - Defaults to given driverId -->
        <div class="mb-3">
          <label for="editDriver" class="form-label">Driver: </label>
          <select
            id="editDriver"
            name="driver"
            class="form-select"
            :value="driverId"
            @change="$emit('update:driverId', $event.target.value)"
            required
          >
            <option disabled>--Select a Driver--</option>
            <option
              v-for="driver in driversList"
              :key="driver.driverId"
              v-bind:value="driver.driverId"
            >
              {{ driver.fullName }}
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
            :value="startDate"
            @change="$emit('update:startDate', $event.target.value)"
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
            :value="endDate"
            @change="$emit('update:endDate', $event.target.value)"
            required
          />
        </div>

        <div class="mb-3">
          <label for="editPickup" class="form-label">Pick up Address: </label>
          <textarea
            id="editPickup"
            name="pickup"
            class="form-control"
            :value="pickupAddress"
            @change="$emit('update:pickupAddress', $event.target.value)"
            required
          ></textarea>
        </div>

        <div class="mb-3">
          <label for="editDropoff" class="form-label"
            >Destination Address:
          </label>
          <textarea
            id="editDropoff"
            name="dropoff"
            class="form-control"
            :value="destinationAddress"
            @change="$emit('update:destinationAddress', $event.target.value)"
            required
          ></textarea>
        </div>

        <div class="mb-3">
          <label for="editNotes" class="form-label">Appointment Notes: </label>
          <textarea
            id="editNotes"
            name="notes"
            class="form-control"
            :value="notes"
            @change="$emit('update', $event.target.value)"
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
export default {
  props: {
    modalTitle: String,
    driversList: Object,
    eldersList: Object,
    callOnSave: Function,
    callOnClose: Function,

    // Manually define our object cause vue hates mutating objects bound to a parent
    appointmentId: Number,
    title: String,
    clientId: Number,
    driverId: Number,
    startDate: String,
    endDate: String,
    pickupAddress: String,
    destinationAddress: String,
    notes: String,
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
