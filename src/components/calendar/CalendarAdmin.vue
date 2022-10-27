<script>
/* eslint-disable */
import "@fullcalendar/core/vdom"; // solves problem with Vite
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { ref } from "vue";
import { Modal } from "bootstrap";
import CalendarPopup from "./CalendarPopup.vue";
import DeleteModal from "./DeleteModal.vue";
import SuccessAlert from "../busforms/SuccessAlert.vue";

export default {
  components: {
    FullCalendar, // make the <FullCalendar> tag available
    CalendarPopup,
    SuccessAlert,
    DeleteModal,
  },
  data() {
    const popupTriggers = ref({
      buttonTrigger: false,
    });
    const TogglePopup = (trigger) => {
      popupTriggers.value[trigger] = !popupTriggers.value[trigger];
    };
    return {
      isShow: false,
      isShowDelete: false,
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
      appointmentNotes: "",
      clientId: "",
      driverId: "",
      clientName: "",
      driverName: "",
      startDateTime: "",
      endDateTime: "",
      pickupAddress: "",
      destinationAddress: "",
      appointmentTitle: "",
      appointmentId: "",
      mobility: "",
      cpModal: null,
      calendarOptions: {
        plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
        customButtons: {
          addAppointmentButton: {
            text: "+ Create",
            hint: "Create appointment",
            // icon: 'fa fas fa-plus',
            click: this.showModal,
          },
        },
        headerToolbar: {
          left: "addAppointmentButton prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        },
        scrollTime: "09:00:00",
        nowIndicator: true,
        initialView: "dayGridMonth",
        editable: true,
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true,
        weekends: true,
        dateClick: this.handleDateClick,
        eventDrop: this.handleEventDrop,
        eventResize: this.eventResize,
        //select: this.handleDateSelect,
        eventClick: (clickData) => {
          this.resetModal();
          this.cpModal.show();
          this.appointmentNotes =
            clickData.event.extendedProps["appointment_notes"];
          this.clientName = clickData.event.extendedProps["client_name"];
          this.driverName = clickData.event.extendedProps["driver_name"];
          this.pickupAddress = clickData.event.extendedProps["pickup_address"];
          this.destinationAddress =
            clickData.event.extendedProps["destination_address"];
          this.appointmentTitle = clickData.event["title"];
          this.mobility = clickData.event.extendedProps["mobility"];
          this.appointmentId = clickData.event["id"];
          this.startDateTime = clickData.event.start;
          this.endDateTime = clickData.event.end;
          //TODO : add appointment info param, pass info in here based on clickData.id??? idk. Data dump happen here you cylon
        },
        eventsSet: this.handleEvents,
        /* you can update a remote database when these fire:
                eventAdd:
                eventChange:
                eventRemove:
                */
        events: "/api/appointments",
      },
      popupTriggers,
      TogglePopup,
    };
  },
  // get access to modal for manipulation
  mounted() {
    this.cpDeleteModal = new Modal(
      document.getElementById("deleteModal"),
      null
    );
    this.cpModal = new Modal(document.getElementById("appointmentModal"), null);
    this.cpAddModal = new Modal(
      document.getElementById("addAppointmentModal"),
      null
    );
    // this.cpModal.addEventListener('hidden.bs.offcanvas', function () {
    //   console.log("hidden edit modal");
    // })
    // this.$refs.appointmentModal.addEventListener("hidden.bs.modal", () => {
    //   console.log("hidden edit modal");
    // })
    // $(this.$refs.my_modal).on('hidden.bs.modal', this.doSomething);
    this.getDrivers();
    this.getClients();
  },
  methods: {
    deleteSuccess() {
      this.hideDelete();
      this.hideEditModal();
      this.showDeleteAlert();
      this.refetchEvents();
    },
    showDelete() {
      this.cpDeleteModal.show();
    },
    hideDelete() {
      this.cpDeleteModal.hide();
    },
    resetModal() {
      this.$refs.editModal.setViewingMode();
    },
    handleEventDrop(e) {
      this.$axios
        .put("/api/appointment/update-date/" + e.event.id, {
          start: e.event.start,
          end: e.event.end,
        })
        .then((response) => {
          this.showAlert();
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    },
    eventResize(e) {
      this.$axios
        .put("/api/appointment/update-date/" + e.event.id, {
          start: e.event.start,
          end: e.event.end,
        })
        .then((response) => {
          this.showAlert();
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    },
    doSomething() {
      console.log("edit modal closed");
    },
    handleDateClick: function (arg) {
      // Get api instance
      let calendarApi = this.$refs.fullCalendar.getApi();
      let newDate = arg["dateStr"];
      // go to clicked on date and switch to day view
      calendarApi.changeView("timeGridDay", newDate);
    },
    handleEvents(events) {
      this.currentEvents = events;
    },
    showModal() {
      (this.addTitle = ""),
        (this.selectedClient.addClientId = ""),
        (this.selectedDriver.addDriverId = ""),
        (this.addAppDate = ""),
        (this.addAppEndDate = ""),
        (this.addPickupAddress = ""),
        (this.addDropoffAddress = ""),
        (this.addClientNotes = ""),
        this.cpAddModal.show();
    },
    hideModal() {
      this.cpAddModal.hide();
    },
    hideEditModal() {
      this.cpModal.hide();
    },
    showAlert() {
      // show success alert
      this.isShow = true;
      setTimeout(() => {
        this.isShow = false;
      }, 4000);
    },
    showDeleteAlert() {
      console.log("show delete alert");
      // show success alert
      this.isShowDelete = true;
      setTimeout(() => {
        this.isShowDelete = false;
      }, 4000);
    },
    refetchEvents() {
      // refresh calendar appointments
      let calendarApi = this.$refs.fullCalendar.getApi();
      calendarApi.refetchEvents();
    },
    submitForm() {
      // console.log(this);
      this.$axios
        .post("/api/appointment/store", {
          title: this.addTitle,
          clientId: this.selectedClient.addClientId,
          driverId: this.selectedDriver.addDriverId,
          appDate: this.addAppDate,
          appEndDate: this.addAppEndDate,
          pickupAddress: this.addPickupAddress,
          dropoffAddress: this.addDropoffAddress,
          clientNotes: this.addClientNotes,
          // clientId: this.,
          // driverId: this.,
        })
        .then((response) => {
          this.hideModal();
          this.showAlert();
          this.refetchEvents();
          // console.log(this);
        })
        .catch((error) => {
          console.error(error.response.data);
        });
    },

    getDrivers() {
      this.$axios
        .get("/api/drivers")
        .then((driversdata) => {
          this.addDrivers = driversdata.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getClients() {
      this.$axios
        .get("/api/clients")
        .then((clientdata) => {
          this.addClients = clientdata.data;
          console.log(this.addClients);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    editSuccess() {
      this.hideEditModal();
      this.showAlert();
      this.refetchEvents();
    },
  },
};
</script>

<template>
  <SuccessAlert
    v-show="isShow"
    alertStrongText="Success!"
    alertBodyText="Appointment information saved"
  />
  <SuccessAlert
    v-show="isShowDelete"
    alertStrongText="Success!"
    alertBodyText="Appointment deleted"
  />
  <CalendarPopup
    ref="editModal"
    @delete-clicked="showDelete"
    @success-alert="editSuccess"
    :appointment-id="appointmentId"
    :mobility="mobility"
    :appointment-title="appointmentTitle"
    :pickup-address="pickupAddress"
    :destination-address="destinationAddress"
    :driver-name="driverName"
    :client-name="clientName"
    :appointment-notes="appointmentNotes"
    :event-start="startDateTime"
    :event-end="endDateTime"
  >
    <!-- <Appointment :editMode="true" :redirect="'/calendar'" :activeBack="'none'"/> -->
  </CalendarPopup>
  <DeleteModal
    @delete-success-alert="deleteSuccess"
    :appointment-id="appointmentId"
  />
  <div
    class="modal fade"
    id="addAppointmentModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-scrollable modal-fullscreen-md-down">
      <div class="modal-content">
        <div
          class="modal-header"
          style="
             {
              border: none;
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
                v-model="addTitle"
                required
              />
              <!-- <p v-if="!editing">{{clientName}}</p> -->
              <!-- <p>{{clientName}}</p> -->
            </div>

            <div class="mb-3">
              <label for="name" class="form-label">Elder: </label>
              <select
                id="name"
                name="name"
                class="form-select"
                v-model="selectedClient.addClientId"
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
              <!-- <p v-if="!editing">{{clientName}}</p> -->
            </div>

            <div class="mb-3">
              <label for="driver" class="form-label">Driver: </label>
              <select
                id="driver"
                name="driver"
                class="form-select"
                v-model="selectedDriver.addDriverId"
                required
              >
                <!-- TODO: replace with driver lookup request -->
                <option disabled>--Select a Driver--</option>
                <option
                  v-for="addDriverId in addDrivers"
                  :key="addDriverId.id"
                  v-bind:value="addDriverId.id"
                >
                  {{ addDriverId.driver_name }}
                </option>
              </select>
              <!-- <p v-if="!editing">{{driverName}}</p> -->
            </div>

            <div class="mb-3">
              <label for="dateTime" class="form-label"
                >Start Date and Time:
              </label>
              <!-- TODO: fix formatting for date and time when not editing -->
              <input
                id="dateTime"
                name="dateTime"
                class="form-control"
                type="datetime-local"
                v-model="addAppDate"
                required
              />
            </div>

            <div class="mb-3">
              <label for="dateEndTime" class="form-label"
                >End Date and Time:
              </label>
              <!-- TODO: fix formatting for date and time when not editing -->
              <input
                id="dateEndTime"
                name="dateEndTime"
                class="form-control"
                type="datetime-local"
                v-model="addAppEndDate"
                required
              />
            </div>

            <div class="mb-3">
              <label for="pickup" class="form-label">Pick up address: </label>
              <textarea
                id="pickup"
                name="pickup"
                class="form-control"
                v-model="addPickupAddress"
                required
              ></textarea>
              <!-- <p v-if="!editing">{{pickupAddress}}</p> -->
              <!-- <p>{{pickupAddress}}</p> -->
            </div>

            <div class="mb-3">
              <label for="dropoff" class="form-label">Drop off address: </label>
              <textarea
                id="dropoff"
                name="dropoff"
                class="form-control"
                v-model="addDropoffAddress"
                required
              ></textarea>
              <!-- <p>{{dropoffAddress}}</p> -->
            </div>

            <div class="mb-3">
              <label for="notes" class="form-label">Notes: </label>
              <textarea
                id="notes"
                name="notes"
                class="form-control"
                v-model="addClientNotes"
              ></textarea>
              <!-- <p v-if="!editing">{{clientNotes}}</p> -->
              <!-- <p>{{clientNotes}}</p> -->
            </div>

            <!-- <button type="submit" class="btn btn-primary" id="appointSubmit">Submit</button> -->
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
  </div>

  <FullCalendar ref="fullCalendar" :options="calendarOptions" />
</template>

<style scoped>
.cMonthView {
  margin: 8%;
  padding: 2px;
}

.fc-icon-fa {
  font-family: FontAwesome;
}
</style>
