<script>
import moment from 'moment';

export default {
  props: {
    appointmentNotes: String,
    appointmentId: String,
    clientName: String,
    driverName: String,
    eventStart: String,
    eventEnd: String,
    pickupAddress: String,
    destinationAddress: String,
    appointmentTitle: String,
    mobility: String,
  },
  data() {
    return {
      editing: false,
      oldTitle: "",
      oldAppDate: "",
      oldAppEndDate: "",
      oldPickupAddress: "",
      oldDropoffAddress: "",
      oldClientNotes: "",
      oldElderId: "",
      oldDriverId: "",
      addDrivers: [],
      addClients: [],
      selectedDriver:{
          addDriverId:""
      },
      selectedClient:{
        addClientId: ""
      },
    }
  },
  mounted() {
      this.getDrivers();
      this.getClients();
  },
  methods: {
    setEditingMode() {
      this.oldTitle = "";
      this.oldAppDate = "";
      this.oldAppEndDate = "";
      this.oldPickupAddress = "";
      this.oldDropoffAddress = "";
      this.oldElderId = "";
      this.oldDriverId = "";
      this.addDriverId = "";
      this.addClientId = "";
      this.editing = true;
    },
    setViewingMode() {
      this.editing = false;
    },
    getPreviousValues() { // this function gets the values for a particular appointment
        this.$axios.get('/api/appointment/' + this.appointmentId)
        .then((appointmentData) => {
          
            this.oldTitle = appointmentData.data['0'].appointment_title;
            let formattedDate = moment(appointmentData.data['0'].start).format('YYYY-MM-DDTHH:mm'); // use moment.js to format date to datetime-local format standard
            this.oldAppDate = formattedDate;
            let formattedEndDate = moment(appointmentData.data['0'].end).format('YYYY-MM-DDTHH:mm'); // use moment.js to format date to datetime-local format standard
            this.oldAppEndDate = formattedEndDate;
            this.oldPickupAddress = appointmentData.data['0'].pickup_address;
            this.oldDropoffAddress = appointmentData.data['0'].destination_address;
            this.oldClientNotes = appointmentData.data['0'].appointment_notes;
            this.oldElderId = appointmentData.data['0'].elder_id;
            this.oldDriverId = appointmentData.data['0'].driver_id;
        }).catch((error) => {
            console.log(error)
        })
    },
    getDrivers() {
      this.$axios.get('/api/drivers')
        .then((driversdata) => {
            this.addDrivers = driversdata.data;
        }).catch((error) => {
            console.log(error)
        })
    },
    getClients() {
      this.$axios.get('/api/clients')
        .then((clientdata) => {
            this.addClients = clientdata.data;
        }).catch((error) => {
            console.log(error)
        })
      },
      editForm() {
        this.$axios.put('/api/appointment/' + this.appointmentId, {
            driverId: this.oldDriverId,
            clientId: this.oldElderId,
            title: this.oldTitle,
            appDate: this.oldAppDate,
            appEndDate: this.oldAppEndDate,
            pickupAddress: this.oldPickupAddress,
            dropoffAddress: this.oldDropoffAddress,
            clientNotes: this.oldClientNotes,
        }).then(response => {
          this.$emit('success-alert'); // emit success to parent which will catch it and hide modal/show alert
        })
        .catch((error) => {
          console.error(error.response.data);
        })
      },
      emitDelete() {
        this.$emit('delete-clicked')// emit that delete button was clicked to parent
      }
  }
}
</script>

<template>
    <div class="modal fade"
         id="appointmentModal"
         tabindex="-1"
         role="dialog"
         aria-labelledby="exampleModalLabel"
         aria-hidden="true"
    >
        <div id="modal-1" class="modal-dialog modal-dialog-scrollable modal-fullscreen-md-down">
            <div class="modal-content">
                <div class="modal-header" style="{ border: none }">
                  <div v-if="editing" class="iconTitleflex">
                    <button type="button" @click="this.setViewingMode()" class="btn btn-secondary me-1" aria-label="View">
                      Back
                    </button> 
                    <h5 class="modal-title">Edit appointment</h5>

                  </div>
                  <div v-else>
                    <button type="button" @click="this.setEditingMode(); this.getPreviousValues()" class="btn btn-primary me-1" aria-label="Edit">
                      <i class="fas fa-edit"></i> Edit
                  </button>
                  <button type="button"  @click="this.emitDelete()" class="btn btn-danger" aria-label="Delete">
                      <i class="icon fas fa-solid fa-trash"/> Delete
                  </button>
                  </div>
                  
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"/>
                </div>
                <div v-if="editing" class="modal-body">
                  <form v-if="editing" id="editForm" @submit.prevent="editForm">
                    

                    <div class="mb-3">
                      <label for="editTitle" class="form-label">Title: </label>
                      <input name="title" type="text" class="form-control" id="editTitle" v-model="oldTitle" required>
                    </div>

                    <div class="mb-3">
                      <label for="editName" class="form-label">Elder: </label>
                      <select id="editName" name="name" class="form-select" v-model="oldElderId" required>
                        <option disabled>--Select an Elder--</option>
                        <option v-for="addClientId in addClients" :key="addClientId.id" v-bind:value="addClientId.id">
                            {{ addClientId.client_name }}
                        </option>
                      </select>
                    </div>

                    <div class="mb-3">
                      <label for="editDriver" class="form-label" >Driver: </label>
                      <select id="editDriver" name="driver" class="form-select" v-model="oldDriverId" required>
                          <option disabled>--Select a Driver--</option>
                          <option v-for="addDriverId in addDrivers" :key="addDriverId.id" v-bind:value="addDriverId.id">
                              {{ addDriverId.driver_name }}
                          </option>
                      </select>
                    </div>

                    <div class="mb-3">
                     <label for="editDateTime" class="form-label">Start Date and Time: </label>
                      <input id="editDateTime" name="dateTime" class="form-control" type="datetime-local" v-model="oldAppDate" required>
                    </div>
                    <div class="mb-3">
                     <label for="editEndDateTime" class="form-label">End Date and Time: </label>
                      <input id="editEndDateTime" name="dateTime" class="form-control" type="datetime-local" v-model="oldAppEndDate" required>
                    </div>

                    <div class="mb-3">
                      <label for="editPickup" class="form-label">Pick up address: </label>
                      <textarea id="editPickup" name="pickup" class="form-control" v-model="oldPickupAddress" required></textarea>
                    </div>

                    <div class="mb-3">
                      <label for="editDropoff" class="form-label">Drop off address: </label>
                      <textarea id="editDropoff" name="dropoff" class="form-control" v-model="oldDropoffAddress" required></textarea>
                    </div>

                    <div class="mb-3">
                      <label for="editNotes" class="form-label">Appointment Notes: </label>
                      <textarea id="editNotes" name="notes" class="form-control" v-model="oldClientNotes"></textarea>
                    </div>

                  </form>
                </div>
                <div v-else class="modal-body">
                  <div class="iconTitleflex fw-bold"><span class="iconWrap"><i class="fas fa-clock"></i></span>Title:</div><p>{{ appointmentTitle }}</p>
                    <div class="iconTitleflex fw-bold"><span class="iconWrap"><i class="fas fa-calendar"></i></span>Date/Time:</div><p>{{ eventStart }} <strong>until</strong> {{ eventEnd }}</p>
                    <div class="iconTitleflex fw-bold"><span class="iconWrap"><i class="fas fa-home"></i></span>Pickup Address:</div><p>{{ pickupAddress }}</p>
                    <div class="iconTitleflex fw-bold"><span class="iconWrap"><i class="fas fa-map-marker-alt"></i></span>Destination Address:</div><p>{{ destinationAddress }}</p>
                    <div class="iconTitleflex fw-bold"><span class="iconWrap"><i class="fas fa-clipboard"></i></span>Appointment Notes:</div><p>{{ appointmentNotes }}</p>
                    <div class="iconTitleflex fw-bold"><span class="iconWrap"><i class="fas fa-wheelchair"></i></span>Mobility:</div><p>{{ mobility }}</p>
                    <div class="iconTitleflex fw-bold"><span class="iconWrap"><i class="fas fa-user"></i></span>Elder Name:</div><p>{{ clientName }}</p>
                    <div class="iconTitleflex fw-bold"><span class="iconWrap"><i class="fas fa-shuttle-van"></i></span>Driver Name:</div><p>{{ driverName }}</p>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button v-if="editing" type="submit" form="editForm" class="btn btn-primary">Save changes </button>
                </div>

            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.CalendarPopup {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 99;
	background-color: rgba(0, 0, 0, 0.2);

	display: flex;
	align-items: center;
	justify-content: center;
	.popup-inner {
        border-radius: 16px;
		background: #FFF;
		padding: 10px;
        min-width: 30%;
        min-height: 30%;
	}
}

.modal-body {
  text-align: left !important;
}

.iconWrap {
  width: 1.5rem;
  margin-right: 1rem;
  text-align: center !important;
}

p {
  margin-left: 2.5rem;
}
.iconTitleflex {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
</style>
