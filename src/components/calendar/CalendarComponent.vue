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
        <full-calendar :options="calendarOptions" />
        <p class="count-header">Showing {{ count }} Appointments</p>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { getAppointments } from "../../network/endpoints"
import FullCalendar from "@fullcalendar/vue3"
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
import interactionPlugin from "@fullcalendar/interaction"
import { ref } from "vue"
import { Modal } from "bootstrap"
import CalendarPopup from "./CalendarPopup.vue" // TODO
import DeleteModal from "./DeleteModal.vue" // TODO
import SuccessAlert from "../busforms/SuccessAlert.vue" // TODO

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
    const popupTriggers = ref({ buttonTrigger: false })
    const TogglePopup = (trigger) => {
      popupTriggers.value[trigger] = !popupTriggers.value[trigger]
    }

    return {
      selectedAppointmentId: null, // Current appointment object being looked at
      appointmentEvents: {},
      appointments: {}, // stores ALL loaded appointments
      count: 0, // Total number of appointments loaded
      isLoading: false,

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
        initialView: "dayGridMonth",
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
            // icon: 'fa fas fa-plus',
            click: (e) => {
              this.showAddAppointmentModal(e)
            },
          },
        },

        // Customize the toolbar with some custom buttons
        headerToolbar: {
          left: "addAppointmentButton prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        },

        // If a user clicks on anything, we can tie those clicks to events and fire functions from them
        dateClick: this.handleDateClick,
        eventDrop: this.handleEventDrop,
        eventResize: this.eventResize,

        // Passing event as function so we can snag meta
        eventClick: (clickData) => {
          this.selectAppointment(clickData)
        },

        // Bound to appointmentEvents object under the hood
        events: [],
      },

      // Export our functions for controlling modals interanlly (not global)
      popupTriggers,
      TogglePopup,
    }
  },

  // Called whenever the component is freshly loaded
  mounted() {
    // Instatiate Modals
    // this.cpModal = new Modal(document.getElementById("appointmentModal"), null )
    // this.cpAddModal = new Modal( document.getElementById("addAppointmentModal"), null )
  },

  created() {
    this.loadAppointments()
  },

  methods: {
    /* 
        User sends request for [startDate, endDate] range. 
        Start with today, assume [-7, +30] days from "Now" 
        Backend assumes bad timezone
    */
    async loadAppointments() {
      var startDate = new Date()
      startDate.setDate(startDate.getDate() - 30)
      var endDate = new Date()
      endDate.setDate(endDate.getDate() + 30)

      // Calls our endpoint to retrive appointments given a date range
      const data = await getAppointments(
        startDate.toISOString(),
        endDate.toISOString()
      )

      // Destructure and rename our appointment event to match FullCalendar's event object format
      this.appointmentEvents = data.appointments.map((event) => {
        return {
          // Necessary Fields for Full Calendar to understand what it's looking at
          title: event.title,
          start: new Date(event.startDate),
          end: new Date(event.endDate),
          allDay: true,
          // Dump the whole event in as an extended prop
          data: event,
        }
      })

      // Snag meta, and set total count
      this.appointments = data.appointments
      this.count = data.count

      this.reloadAppointments()
    },

    // Resets appointments to current appointmentEvents
    reloadAppointments() {
      this.isLoading = true
      this.calendarOptions.events = this.appointmentEvents
      this.isLoading = false
    },

    // Set the given object as the current focused appointment
    selectAppointment(newId) {
      console.log(newId)
      if (this.selectedAppointmentId === newId) return
      this.selectedAppointmentId = newId
    },

    showAddAppointmentModal(e) {
      //   this.cpAddModal.show()
      this.selectAppointment(e)
    },

    hideModal() {
      //   this.cpAddModal.hide()
    },

    handleEventDrop(e) {
      // TODO - Call Update appointment with new start/endDate
    },

    handleDateClick: function (arg) {
      // Get api instance
      // let calendarApi = this.$refs.fullCalendar.getApi()
      // let newDate = arg["dateStr"]
      // // go to clicked on date and switch to day view
      // calendarApi.changeView("timeGridDay", newDate)
    },
    handleEvents(events) {
      this.appointmentEvents = events
    },
  },
}
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