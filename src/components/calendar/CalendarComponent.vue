<template>
  <div>
    <div class="widget-wrapper calendar-header-widget">
      <h1><i class="icon fas fa-calendar-alt" /> Calendar</h1>
    </div>

    <!-- <div
      class="modal fade"
      id="addAppointmentModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div
        class="modal-dialog modal-dialog-scrollable modal-fullscreen-md-down"
      >
        <div class="modal-content">
          <div
            class="modal-header"
            style="
               {
                border: none
              }
            "
          >
            <h5 class="modal-title">Add Appointment</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <div class="modal-body">
            <form id="submitForm" @submit.prevent="submitForm">
              <div class="mb-3">
                <label for="title" class="form-label">Title: </label>
                <input
                  name="title"
                  type="text"
                  class="form-control"
                  id="title"
                  v-model="addAppointment.addTitle"
                  required
                />
              </div>

              <div class="mb-3">
                <label for="name" class="form-label">Elder: </label>
                <select
                  id="name"
                  name="name"
                  class="form-select"
                  v-model="addAppointment.selectedClient.addClientId"
                  required
                >
                  <option disabled>--Select an Elder--</option>
                  <option
                    v-for="addClientId in addClients"
                    :key="addClientId.id"
                    v-bind:value="addClientId.id"
                  >
                    {{ addClientId.client_name }}CLIENTNAME
                  </option>
                </select>
              </div>

              <div class="mb-3">
                <label for="driver" class="form-label">Driver: </label>
                <select
                  id="driver"
                  name="driver"
                  class="form-select"
                  v-model="addAppointment.selectedDriver.addDriverId"
                  required
                >
                  <option disabled>--Select a Driver--</option>
                  <option
                    v-for="addDriverId in addDrivers"
                    :key="addDriverId.id"
                    v-bind:value="addDriverId.id"
                  >
                    {{ addDriverId.driver_name }}DRIVERNAME
                  </option>
                </select>
              </div>

              <div class="mb-3">
                <label for="dateTime" class="form-label"
                  >Start Date and Time:
                </label>
                <input
                  id="dateTime"
                  name="dateTime"
                  class="form-control"
                  type="datetime-local"
                  v-model="addAppointment.addAppDate"
                  required
                />
              </div>

              <div class="mb-3">
                <label for="dateEndTime" class="form-label"
                  >End Date and Time:
                </label>
                <input
                  id="dateEndTime"
                  name="dateEndTime"
                  class="form-control"
                  type="datetime-local"
                  v-model="addAppointment.addAppEndDate"
                  required
                />
              </div>

              <div class="mb-3">
                <label for="pickup" class="form-label">Pick up address: </label>
                <textarea
                  id="pickup"
                  name="pickup"
                  class="form-control"
                  v-model="addAppointment.addPickupAddress"
                  required
                ></textarea>
              </div>

              <div class="mb-3">
                <label for="dropoff" class="form-label"
                  >Drop off address:
                </label>
                <textarea
                  id="dropoff"
                  name="dropoff"
                  class="form-control"
                  v-model="addAppointment.addDropoffAddress"
                  required
                ></textarea>
              </div>

              <div class="mb-3">
                <label for="notes" class="form-label">Notes: </label>
                <textarea
                  id="notes"
                  name="notes"
                  class="form-control"
                  v-model="addAppointment.addClientNotes"
                ></textarea>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="submit"
              id="appointSubmit"
              form="submitForm"
              class="btn btn-primary"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div> -->
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
/* eslint-disable */
import { getAppointments, editAppointment } from "../../network/endpoints";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { ref } from "vue";
import { Modal } from "bootstrap";
import CalendarPopup from "./CalendarPopup.vue"; // TODO
import DeleteModal from "./DeleteModal.vue"; // TODO
import SuccessAlert from "../busforms/SuccessAlert.vue"; // TODO

export default {
  name: "CalendarComponent",
  components: {
    FullCalendar,
    CalendarPopup,
    DeleteModal,
    SuccessAlert,
  },

  data() {
    // Custom functions (NOT TO BE EXPORTED) to handle modal hiding/showing
    const popupTriggers = ref({ buttonTrigger: false });
    const TogglePopup = (trigger) => {
      popupTriggers.value[trigger] = !popupTriggers.value[trigger];
    };

    return {
      selectedAppointment: null, // Current appointment object being looked at
      appointments: {}, // stores ALL loaded appointments. THIS IS NOT fullCalendar.calendarOptions.events!!! <-- that gets casted from this
      count: 0, // Total number of appointments loaded
      isLoading: false,
      lookAtDate: null,
      calendarApi: ref(null), // Pulls ref from full-calendar on mount
      lastLoadedCalView: "dayGridMonth", // Should be used to track current view for the user, so on reload they reset

      // Modal v-show binds
      isShow: false,
      isShowDelete: false,

      // Object to pass a newly created appointment around, and also to save state with
      addAppointment: {
        addTitle: "",
        addAppDate: "",
        addAppEndDate: "",
        addPickupAddress: "",
        addDropoffAddress: "",
        addClientNotes: "",
        addDrivers: [],
        addClients: [],
        selectedDriver: {
          addDriverId: "",
        },
        selectedClient: {
          addClientId: "",
        },
      },

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
            click: (e) => {
              this.showAddAppointmentModal(e);
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
            click: (e) => {
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
          this.selectAppointment(e);
        },

        // Bound to stream with loadAppointments
        events: [],
      },

      // Export our functions for controlling modals interanlly (not global)
      popupTriggers,
      TogglePopup,
    };
  },

  // Called whenever the component is freshly loaded
  mounted() {
    this.calendarApi = this.$refs.fullCalendar.getApi();

    // Instatiate Modals
    // this.cpModal = new Modal(document.getElementById("appointmentModal"), null )
    // this.cpAddModal = new Modal( document.getElementById("addAppointmentModal"), null )
  },

  created() {
    this.reloadAppointments(); // Call calendar reload
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
      else if (!!moveToThisDate) this.lookAtDate = moveToThisDate;

      let startDate = new Date(this.lookAtDate);
      let endDate = new Date(this.lookAtDate);

      // Adjust by +- 30 days
      startDate.setDate(startDate.getDate() - 30);
      endDate.setDate(endDate.getDate() + 30);

      // Calls our endpoint to retrive appointments given a date range
      const data = await getAppointments(
        startDate.toISOString(), // Pass our startDate + endDate
        endDate.toISOString()
      );

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
      if (!!this.lookAtDate) {
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
          !!loadAhead
            ? this.lookAtDate.setMonth(this.lookAtDate.getMonth() + adjustBy)
            : this.lookAtDate.setMonth(this.lookAtDate.getMonth() - adjustBy);
        } else {
          !!loadAhead
            ? this.lookAtDate.setDate(this.lookAtDate.getDate() + adjustBy)
            : this.lookAtDate.setDate(this.lookAtDate.getDate() - adjustBy);
        }
      }

      // Call a calendar refresh
      this.reloadAppointments();
    },

    // Calls edit appointment route on the given appointment
    async updateAppointment() {
      const response = await editAppointment(this.selectedAppointment);
    },

    // Destructure appointment from extendedProp from FullCalendar click event and set it as active
    selectAppointment(e) {
      const newAppointmnet = e.event._def.extendedProps;
      if (
        !this.selectedAppointment ||
        this.selectedAppointment.appointmentId != newAppointmnet.appointmentId
      ) {
        // Proxy's are funky, but prevent type smashing, so just gotta deal sometimes
        this.selectedAppointment = JSON.parse(JSON.stringify(newAppointmnet)); // De-proxy
      }
    },

    // Called whenever a user clicks and drags an event in any way
    handleEventEdit(e) {
      this.selectAppointment(e); // will grab the appointment from extendedProps for us
      this.selectedAppointment.startDate = new Date(e.event.start);
      this.selectedAppointment.endDate = new Date(e.event.end);
      this.updateAppointment(); // Leverages 'this.selectedAppointment'
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

    // Modal Controls
    // =====================================================================

    showAddAppointmentModal(e) {
      console.log(e);
    },

    hideModal() {},
  },
};
</script>

<style scoped>
.calendar-header-widget {
  text-align: left;
  padding-left: 1.3em;
  padding-top: 8px;
  padding-bottom: 1px;
}

.count-header {
  text-align: left;
  margin: 4px;
}

.full-calendar-widget {
  padding: 2em;
}

.widget-wrapper {
  background-color: #ffffff;
  border-radius: 1.3em;
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
</style>