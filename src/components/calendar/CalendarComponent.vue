

<template>
  <!--
    Plase comment on this file 
  -->
  <div>
    <div class="widget-wrapper calendar-header-widget">
      <h1><i class="icon fas fa-calendar-alt" /> Appointments</h1>
    </div>

    <!-- below is what I added, as well as causing calendar-
    modal to float right, and created style for sidebar to
    float left
    <div class = "sidebar">
      <div class = "search">
        <input
          name="query"
          type="text"
          class="form-control"
          id="search"
          placeholder = "Search"
        />
      </div>

      <div class = "search" >
        <select class="form-select" v-model="filter" :options="filterOptions" id="filter">
          <option selected>Example Option</option>
        </select>
      </div>

      <div class = "search">
        <textarea
          id="currFilters"
          name="currFilters"
          class="form-control"
          placeholder = "Current Filters"
        ></textarea>
      </div>
      
      <div class = "search">
        <textarea
          id="recentAppt"
          name="recentAppt"
          class="form-control"
          placeholder = "Recently Updated Appointments"
        ></textarea>
      </div>
    </div>
    -->

    <!-- Begin Modal -->

    <modal-component @close="toggleModal" :modalActive="modalActive">
      <div class="modal-inner calendar-modal">
        <div class="calendar-popup">
          <!-- Modal Header -->
          <h5 v-show="isAddingAppointment" class="modal-title">
            Add Appointment
          </h5>
          <h5 v-show="isEditingAppointment" class="modal-title">
            Edit Appointment
          </h5>

          <div class="popup-inner">
            <form id="editForm" @submit.prevent="editForm">

              <div class = "left-side">

              <div class="mb-3">
                <label for="editTitle" class="form-label">Title: </label>
                <input
                  name="title"
                  type="text"
                  class="form-control"
                  id="editTitle"
                  v-model="cachedAppointment.title"
                  required
                />
              </div>

              <div class="edit-pickup-time">
                <label for="editPickupDateTime" class="form-label"
                  >Pickup Date and Time:
                </label>
                <input
                  id="editPickupDateTime"
                  name="dateTime"
                  class="form-control"
                  type="datetime-local"
                  v-model="cachedAppointment.startDate"
                  required
                />
              </div>

              <div class="edit-end-time">
                <label for="editEndDateTime" class="form-label"
                  >End Date and Time:
                </label>
                <input
                  id="editEndDateTime"
                  name="dateTime"
                  class="form-control"
                  type="datetime-local"
                  v-model="cachedAppointment.endDate"
                  required
                />
              </div>

              <div class="mb-3">
                <label for="editPickup" class="form-label"
                  >Pick up Address:
                </label>
                <textarea
                  id="editPickup"
                  name="pickup"
                  class="form-control"
                  v-model="cachedAppointment.pickupAddress"
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
                  v-model="cachedAppointment.destinationAddress"
                  required
                ></textarea>
              </div>

              <div class="mb-3">
                <label for="editMobility" class="form-label"
                  >Mobility Notes: 
                </label>
                <textarea
                  id="editMobility"
                  name="mobility"
                  class="form-control"
                  v-model="cachedAppointment.mobility"
                  placeholder = "Will autofill once elder is selected"
                  required
                ></textarea>
              </div>
              </div>   
              
              
              <div class = "right-side">
                                 
              <div class="edit-elder-phone">
                <label for="editElderPhone" class="form-label"
                  >Elder Phone Number: 
                </label>
                <textarea
                  id="editElderPhone"
                  name="elderPhone"
                  class="form-control"
                  v-model="cachedAppointment.elderPhone"
                  placeholder = "Will autofill once elder is selected"
                  required
                >
          
              </textarea>
              
              <!-- <option
            
                    v-for="elder in eldersList"
                    :key="elder.id"
                    v-bind:value="elder.id.elderPhone"
                  >
                    {{elder.id }}
                  </option> -->
              </div>

              <!-- Elder Select - Defaults to given elderId -->
              <div class="edit-elder-name">
                <label for="editName" class="form-label">Elder: </label>
                <select
                  id="editName"
                  name="name"
                  class="form-select"
                  v-model="cachedAppointment.elderId"
                  required
                >
                  <option disabled>--Select an Elder--</option>
                  <option
                    v-for="elder in eldersList"
                    :key="elder.id"
                    v-bind:value="elder.elderId"
                  >
                    {{ elder.fullName }}
                  </option>
                </select>
              </div>

              <!-- Driver Select - Defaults to given driverId -->
              <div class="edit-driver-name">
                <label for="editDriver" class="form-label">Driver: </label>
                <select
                  id="editDriver"
                  name="driver"
                  class="form-select"
                  v-model="cachedAppointment.driverId"
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

              <div class="edit-driver-phone">
                <label for="editDriverPhone" class="form-label"
                  >Driver Phone Number: 
                </label>
                <textarea
                  id="editDriverPhone"
                  name="driverPhone"
                  class="form-control"
                  placeholder = "Will autofill once driver is selected"
                  required
                ></textarea>
              </div>

              <div class="edit-vehicle">
                <label class="form-label">Needs LBFE Vehicle: </label>
                <input type="checkbox" v-model="cachedAppointment.needsLBFEVehicle" :options="vehicleOptions" id="vehicle">
              </div>                 

              <div class="edit-baraga">
                <label  class="form-label">Baraga: </label>
                <input type="checkbox" v-model="cachedAppointment.baraga" :options="baragaOptions" id="baraga">
              </div>         

              <div class="edit-confirmed">
                <label class="form-label">Confirmed By Driver: </label>
                <input type="checkbox" v-model="cachedAppointment.confirmed" :options="confirmedOptions" id="confirmed">
              </div>

              <div class="edit-marquette">
                <label  class="form-label">Marquette: </label>
                <input type="checkbox" v-model="cachedAppointment.marquette" :options="marquetteOptions" id="marquette">
              </div>

              <div class="edit-status">
                <label class="form-label">Status: </label>
                <select class="form-select" v-model="cachedAppointment.statusBar" :options="statusBar" id="status">
                  <option selected>On the way</option>
                  <option selected>Picked Up</option>
                  <option selected>Dropped Off</option>
                </select>
              </div>

              </div>
            </form>
          </div>
          <!-- Close / Save Appointment Modal -->
          <div class="button-row">
            <button
              @click="hideModal"
              class="btn btn-secondary custom-close-btn"
            >
              Close
            </button>
            <button
              @click="saveAppointment"
              class="btn btn-primary custom-save-btn"
            >
              Save
            </button>
            <button
              v-show="!isAddingAppointment"
              @click="deleteAppointment"
              class="btn btn-danger custom-del-btn"
            >
              Delete
            </button>
          </div>
        </div>

        <!-- End Modal Body -->
      </div>
    </modal-component>

    <!-- End Modal -->

    <div class="widget-wrapper full-calendar-widget">
      <!-- What to show while loading -->
      <div v-show="isLoading">
        <h3>Loading Events...</h3>
      </div>

      <!-- What to show on load -->
      <div v-show="!isLoading">
        <full-calendar ref="fullCalendar" :options="calendarOptions" />
        <p class="count-header">Showing {{ count }} Appointments</p>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getAppointments,
  createAppointment,
  editAppointment,
  deleteAppointment,
  getDrivers,
  getElders,
  elderPhone
} from "../../network/endpoints";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { ref } from "vue";
// import DeleteModal from "./DeleteModal.vue"; // TODO
// import SuccessAlert from "../busforms/SuccessAlert.vue"; // TODO
import ModalComponent from "../modals/ModalComponent.vue";

export default {
  name: "CalendarComponent",
  components: {
    FullCalendar,
    ModalComponent,
  },

  setup() {
    // When the modal child component loads, snag the ref and link the toggle values
    const modalActive = ref(false);
    const toggleModal = () => {
      modalActive.value = !modalActive.value;
    };
    return { modalActive, toggleModal };
  },

  data() {
    return {
      appointments: {}, // stores ALL loaded appointments. THIS IS NOT fullCalendar.calendarOptions.events!!! <-- that gets casted from this
      count: 0, // Total number of appointments loaded
      isLoading: false,
      lookAtDate: null,
      lastLoadedCalView: "dayGridMonth", // Should be used to track current view for the user, so on reload they reset

      // Modal v-show binds
      isAddingAppointment: false, // Toggles create mode on modal
      isEditingAppointment: false, // Toggles edit mode on modal

      // Refs
      calendarApi: ref(null), // Pulls ref from full-calendar on mount
      showAddEditModal: ref(null), // loaded on

      // Object to pass a newly created appointment around, and also to save state with
      selectedApppointment: {
        appointmentId: -1,
        title: "Enter Title...",
        elderId: 0,
        driverId: 0,
        startDate: "",
        endDate: "",
        pickupAddress: "",
        destinationAddress: "",
        statusBar: "",
        mobility: "",
        needsLBFEVehicle: false,
        baraga: false,
        marquette:false,
        confirmed: false,
      },

      cachedAppointment: {}, // This is bound to the modal children

      // These get loaded on modal open request
      driversListCount: 0,
      eldersListCount: 0,
      driversList: {}, // TODO - these should be synced to a store so we can use the same cache in other places
      eldersList: {},

      // Define options for fullCalendar
      calendarOptions: {
        plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
        scrollTime: "09:00:00",
        nowIndicator: true,
        initialView: this.lastLoadedCalView, // Set this to match our cached looked at view
        editable: true,
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true,
        weekends: true,

        // Define our custom "Create Appointment" button to fire the addAppointmentModal
        customButtons: {
          addAppointmentButton: {
            text: "+ Create",
            hint: "Create appointment",
            click: () => {
              this.isAddingAppointment = true;
              this.isEditingAppointment = false; // This is only place we can create an appointment right now
              this.clearAppointmentCache();
              this.showAddAppointmentModal();
            },
          },
          // Overrides the FullCalendar prev button
          prev: {
            click: () => {
              this.forcePrevPageLoad();
            },
          },
          // Overrides the FullCalendar next button
          next: {
            click: () => {
              this.forceNextPageLoad();
            },
          },
          // Overrides the FullCalendar today button
          today: {
            text: "Today",
            click: () => {
              this.forceResetView();
            },
          },
        },

        // Define our desired header
        headerToolbar: {
          left: "addAppointmentButton prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        },

        // Fire functions on user interaction
        dateClick: (e) => {
          this.handleDateClick(e);
        },

        // Both of these call the same edit function, because they both do the same date editing
        eventDrop: (e) => {
          this.handleEventEdit(e);
        },
        eventResize: (e) => {
          this.handleEventEdit(e);
        },
        eventClick: (e) => {
          this.handleEventClick(e);
        },

        // Bound to stream with loadAppointments
        events: [],
      },
    };
  },

  // Called whenever the component is freshly loaded
  mounted() {
    this.calendarApi = this.$refs.fullCalendar.getApi();
    this.showAddEditModal = this.$refs.toggleModal;
  },

  created() {
    this.reloadAppointments(); // Call calendar reload
    this.loadDriverList(); // These have to get poplated to remove the warnings
    this.loadElderList();
    this.clearAppointmentCache();
  },

  methods: {
    // Full Calendar Helper Functions
    // =====================================================================
    
    // Resets appointments to current appointmentEvents
    reloadAppointments() {
      this.isLoading = true;
      this.loadAppointments();
      this.isLoading = false;
    },

    /* 
        User sends request for [startDate, endDate] range. 
        Start with today, leverage 'lookAtDate' for accurate range
        Backend assumes bad timezone, handles timezone conversion
    */
    async loadAppointments(moveToThisDate) {
      // If it's our first time, remember it (Set to now)
      if (!this.lookAtDate) this.lookAtDate = new Date();
      else if (moveToThisDate) this.lookAtDate = moveToThisDate;

      let startDate, endDate, data;

      // Load what we can see
      if (this.calendarApi) {
        startDate = this.calendarApi.currentData.dateProfile.activeRange.start;
        endDate = this.calendarApi.currentData.dateProfile.activeRange.end;

        data = await getAppointments(
          startDate.toISOString(), // Pass our startDate + endDate
          endDate.toISOString()
        );
        // If we get here without a fullCalendar Reference, use lookAtDate
      } else {
        let startDate = new Date(this.lookAtDate);
        let endDate = new Date(this.lookAtDate);

        // Adjust by +- 30 days
        startDate.setDate(startDate.getDate() - 30);
        endDate.setDate(endDate.getDate() + 30);

        // Calls our endpoint to retrive appointments given a date range
        data = await getAppointments(
          startDate.toISOString(), // Pass our startDate + endDate
          endDate.toISOString()
        );
      }

      // Destructure and rename our appointment event to match FullCalendar's event object format
      this.calendarOptions.events = data.appointments.map((event) => {
        return {
          // Necessary Fields for a Full Calendar event
          title: event.title,
          start: new Date(event.startDate),
          end: new Date(event.endDate),
          allDay: event.isAllDay,

          // Dump the whole event as an 'extendedProp'
          extendedProps: event,
        };
      });

      // Snag meta, and set total count
      this.appointments = data.appointments;
      this.count = data.count;
    },

    // If 'loadAhead' is truthy, load forward, else load backwards. Defaults to +- 1 day
    // 'lookAtDate' is the middle ground value we use when looking up our date range. So it's
    // is always saying to load all events +- 30 days from 'lookAtDate'
    updateAppDateLoadRange(loadAhead) {
      var adjustBy = 1; // Days when isMonth = false, otherwise is in # of months
      let isMonth = false; // bool to fire update date, or update by month

      // If we got here without loading the calendar, abort to loading appointments
      if (this.lookAtDate) {
        // Be smart about adjusting our look ahead
        switch (this.calendarApi.view.type) {
          case "dayGridMonth":
            isMonth = true; // 'Days' get converted to --> 'Month'
            break;
          case "timeGridWeek":
            adjustBy = 7; // Add an additional week
            break;
          default:
            break;
        }

        // 'lookAtDate' is global --> loadAppointments will pick it up
        if (isMonth) {
          loadAhead
            ? this.lookAtDate.setMonth(this.lookAtDate.getMonth() + adjustBy)
            : this.lookAtDate.setMonth(this.lookAtDate.getMonth() - adjustBy);
        } else {
          loadAhead
            ? this.lookAtDate.setDate(this.lookAtDate.getDate() + adjustBy)
            : this.lookAtDate.setDate(this.lookAtDate.getDate() - adjustBy);
        }
      }

      // Call a calendar refresh
      this.reloadAppointments();
    },

    // Calls our create appointment script with the current selectedApppointment
    async createNewAppointment() {
      const response = await createAppointment(this.selectedApppointment);
      return response;
    },

    // Calls edit appointment route on the given appointment
    async updateAppointment() {
      const response = await editAppointment(this.selectedApppointment);
      return response;
    },

    // Destructure appointment from extendedProp from FullCalendar click event and set it as active
    selectAppointment(e) {
      const newAppointmnet = e.event._def.extendedProps;
      if (
        !this.selectedApppointment.appointmentId ||
        this.selectedApppointment.appointmentId != newAppointmnet.appointmentId
      ) {
        // Proxy's are funky, but prevent type smashing, so just gotta deal sometimes
        this.selectedApppointment = JSON.parse(JSON.stringify(newAppointmnet)); // De-proxy
      }
    },

    // Called whenever a user clicks and drags an event in any way
    handleEventEdit(e) {
      this.selectAppointment(e); // will grab the appointment from extendedProps for us
      this.selectedApppointment.startDate = new Date(e.event.start);
      this.selectedApppointment.endDate = new Date(e.event.end);
      this.updateAppointment(); // Leverages 'this.selectedApppointment'
    },

    // Called whenever a user clicks into an event
    handleEventClick(e) {
      this.selectAppointment(e);
      this.isAddingAppointment = false;
      this.isEditingAppointment = true;
      this.showAddAppointmentModal(e);
    },

    // If a user selects a date, move to that date
    handleDateClick(e) {
      this.lookAtDate = new Date(e.date); // reset our day loading, then move
      this.calendarApi.changeView("timeGridDay", this.lookAtDate);
      this.lastLoadedCalView = this.calendarApi.view.type; // reset last loaded view for the user
      this.reloadAppointments();
    },

    // Full Calendar Custom Buttons/Overrides Functions
    // =====================================================================

    // Calls full-calendar api ref to move us forward, then fire our updateAppDateLoadRange
    forceNextPageLoad() {
      this.calendarApi.next();
      this.updateAppDateLoadRange(true); // True --> Load ahead
    },

    // Calls full-calendar api ref to move us backward, then fire our updateAppDateLoadRange
    forcePrevPageLoad() {
      this.calendarApi.prev();
      this.updateAppDateLoadRange(false); // False --> Load behind
    },

    // Reset 'lookAtDate', and reload appointments
    forceResetView() {
      this.lookAtDate = null;
      this.calendarApi.today();
      this.updateAppDateLoadRange();
    },

    // Add / Edit Modal Helpers
    // =====================================================================

    // Fires our endpoint to get drivers list, and total count for loaded drivers
    async loadDriverList() {
      const data = await getDrivers();
      this.driversList = JSON.parse(JSON.stringify(data.data.drivers)); // De-proxy
      this.driversListCount = data.data.count;
    },

    // Fires our endpoint to get elder list, and total count for loaded elders
    async loadElderList() {
      const data = await getElders();
      this.eldersList = JSON.parse(JSON.stringify(data.data.elders)); // De-proxy
      this.eldersListCount = data.data.count;
    },

    async loadElderPhone() {
      const data = await elderPhone();
      this.elderPhone = JSON.parse(JSON.stringify(data.data));
       
    },

    // Set addAppointment to be current Selected appointment, call update and reload
    async saveAppointment() {
      this.selectedApppointment = this.cachedAppointment;

      const response = !this.selectedApppointment.appointmentId
        ? await this.createNewAppointment() // If appointment has no id attached, assume we're creating a new one
        : await this.updateAppointment(); // else, update it

      if (!response || response.status >= 400) {
        return;
      }

      // Force reload to pick up the change
      this.reloadAppointments();
      this.hideModal();
    },

    async deleteAppointment() {
      // Toggle "You sure?"
      const response = await deleteAppointment(this.selectedApppointment);
      if (response.status >= 400) {
        // Die with warning
        return;
      }
      this.hideModal();
      this.clearAppointmentCache();
      this.reloadAppointments();
    },

    // Modal Controls
    // =====================================================================

    clearAppointmentCache() {
      this.selectedApppointment = {
        title: "",
        elderId: 0,
        driverId: 0,
        startDate: "",
        endDate: "",
        pickupAddress: "",
        destinationAddress: "",
        statusBar: "",
        mobility: "",
        needsLBFEVehicle: false,
        baraga: false,
        marquette: false,
        confirmed: false,
      };
    },

    // Loads necessary information and fires event to open modal
    async showAddAppointmentModal() {
      this.loadDriverList();
      this.loadElderList();

      this.cachedAppointment = this.selectedApppointment;
      this.toggleModal(); // References AddEditAppointment Modal
    },

    // Closes modal --> Add any cleanup here
    hideModal() {
      this.toggleModal();
    },
  },
};
</script>

<style scoped lang="scss">
.mb-3 {
  width: 98%;
}

.left-side {
  float: left;
  width: 48%;
}

.right-side {
  float: right;
  width: 48%;
}

.edit-status {
  float: left;
  padding-top: 30px;
  width: 98%;
}
.edit-vehicle {
  float: left;
  padding-top: 80px;
  width: 13em;
}
.edit-baraga {
  float: right; 
  padding-top: 55px;
  margin-right: 23px;
  width: 13em;
}

.edit-marquette {
  float:right;
  padding-top: 23px;
  margin-left:20px;
  width:13em;
}

.edit-confirmed {
  float: left; 
  padding-top: 20px;
  margin-right: 100px;
  width: 13em;
}

.edit-driver-name {
  float: left;
  padding-top: 29px;
  width: 15em;
}

.edit-driver-phone {
  float: right;
  padding-left: 10px;
  padding-top: 5px;
  width: 15em;
}

.edit-elder-name {
  float: left;
  width: 15em;
}

.edit-elder-phone {
  float: right;
  padding-left: 10px;
  width: 15em;
}

.edit-pickup-time {
  float: left;
  width: 15em;
}

.edit-end-time {
  float: left;
  padding-left: 10px;
  width: 15em;
}

.calendar-header-widget {
  text-align: left; //center
  padding-left: 1.3em;
  padding-top: 8px;
  padding-bottom: 1px;
}

.calendar-modal {
  //float: right;
  width: 65em; //25em
}

.sidebar {
  float: left;
  width: 15em;
  background-color: #a9a9a9;
  border-radius: 0.5em;
  min-height: 66.4em; //may need to not hardcode this in later
}

.search {
  padding: .5em;
  padding-top: 1em;
}

.count-header {
  text-align: left;
  margin: 4px;
}

.full-calendar-widget {
  padding: 2em;
  //padding-left: 15em; //hardcoded in to give sidebar space
}

.widget-wrapper {
  background-color: #ffffff;
  border-radius:.5em;
  box-shadow: 2px 3px 10px #ad9b9b;
  margin: 1em;
}

.cMonthView {
  margin: 8%;
  padding: 2px;
}

.fc-icon-fa {
  font-family: FontAwesome;
}

.add-edit-appointment-header {
  border-bottom: 2px;
  border-bottom-color: grey;
  width: 35em;
}

.modal-title {
  float: left;
  left: 0;
  width: 100%;
}

.popup-inner {
  margin-top: 30px;
  margin-bottom: 10px;
  min-width: 30%;
  min-height: 30%;
}

.button-row {
  justify-content: space-between;
  float: left;
  width: 98%;

  .custom-del-btn {
    float: right;
    margin-right: 4px;
  }
  .custom-save-btn {
    float: right;
  }
  .custom-close-btn {
    float: left;
  }
}
</style>