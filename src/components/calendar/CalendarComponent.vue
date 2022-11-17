<template>
  <div>
    <div class="widget-wrapper calendar-header-widget">
      <h1><i class="icon fas fa-calendar-alt" /> Calendar</h1>
    </div>

    <modal-component @close="toggleModal" :modalActive="modalActive">
      <div class="modal-inner calendar-modal">
        <!-- Modal Body -->
        <calendar-popup
          v-show="isAddingAppointment"
          :modalTitle="`Add Appointment`"
          :driversList="driversList"
          :eldersList="clientsList"
          :callOnSave="saveAppointment"
          :callOnClose="hideModal"

          :appointmentId="cachedAppointment.appointmentId"
          :title="cachedAppointment.title"
          :clientId="cachedAppointment.clientId"
          :driverId="cachedAppointment.driverId"
          :startDate="cachedAppointment.startDate"
          :endDate="cachedAppointment.endDate"
          :pickupAddress="cachedAppointment.pickupAddress"
          :destinationAddress="cachedAppointment.destinationAddress"
          :notes="cachedAppointment.notes"
        />


        <calendar-popup
          v-show="isEditingAppointment"
          :modalTitle="`Edit Appointment`"
          :driversList="driversList"
          :eldersList="clientsList"
          :callOnSave="saveAppointment"
          :callOnClose="hideModal"

          :appointmentId="cachedAppointment.appointmentId"
          :title="cachedAppointment.title"
          :clientId="cachedAppointment.clientId"
          :driverId="cachedAppointment.driverId"
          :startDate="cachedAppointment.startDate"
          :endDate="cachedAppointment.endDate"
          :pickupAddress="cachedAppointment.pickupAddress"
          :destinationAddress="cachedAppointment.destinationAddress"
          :notes="cachedAppointment.notes"
        />

        <!-- End Modal Body -->
      </div>
    </modal-component>

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
  getDrivers,
  getClients,
} from "../../network/endpoints";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { ref } from "vue";
import CalendarPopup from "./CalendarPopup.vue"; // TODO
// import DeleteModal from "./DeleteModal.vue"; // TODO
// import SuccessAlert from "../busforms/SuccessAlert.vue"; // TODO
import ModalComponent from "../modals/ModalComponent.vue";


export default {
  name: "CalendarComponent",
  components: {
    FullCalendar,
    CalendarPopup,
    // DeleteModal,
    // SuccessAlert,
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
        clientId: 0,
        driverId: 0,
        startDate: "",
        endDate: "",
        pickupAddress: "",
        destinationAddress: "",
        notes: "",
      },

      cachedAppointment: {}, // This is bound to the modal children

      // These get loaded on modal open request
      driversListCount: 0,
      clientsListCount: 0,
      driversList: {}, // TODO - these should be synced to a store so we can use the same cache in other places
      clientsList: {},

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
              this.isAddingAppointment = true; // This is only place we can create an appointment right now
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
    this.loadClientList();
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
      console.log("Selecting: ", this.selectedApppointment);
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

    // Fires our endpoint to get client list, and total count for loaded clients
    async loadClientList() {
      const data = await getClients();
      this.clientsList = JSON.parse(JSON.stringify(data.data.clients)); // De-proxy
      this.clientsListCount = data.data.count;
    },

    // Set addAppointment to be current Selected appointment, call update and reload
    saveAppointment() {
      // the create / update functions leverage this.selectedApppointment
      const response = !this.selectedApppointment.id
        ? this.createNewAppointment() // If appointment has no id attached, assume we're creating a new one
        : this.updateAppointment(); // else, update it

      if (response.response.status > 400) {
        // Output "You failed!" message
      }

      this.reloadAppointments(); // Force reload to pick up the change
      this.hideModal();
    },

    // Modal Controls
    // =====================================================================

    // Loads necessary information and fires event to open modal
    async showAddAppointmentModal() {
      this.loadDriverList();
      this.loadClientList();
      this.cachedAppointment = this.selectedApppointment
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
.calendar-header-widget {
  text-align: left;
  padding-left: 1.3em;
  padding-top: 8px;
  padding-bottom: 1px;
}

.calendar-modal {
  width: 35em;
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