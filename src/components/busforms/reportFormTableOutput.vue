<template>
  <div class="container" id="reportFormTableOutput">
      <router-link to="/reports" class="btn btn-primary generateButton" id="reportSubmit"> back <i class="fas fa-clipboard-list"></i></router-link>
  </div>

  <div>
          <h1> "Test" </h1>
          <div class="table">
          <table-lite
            :is-slot-mode="true"
            :is-loading="table.isLoading"
            :columns="table.columns"
            :rows="table.rows"
            :total="table.totalRecordCount"
            :sortable="table.sortable"
            @do-search="doSearch"
            @is-finished="table.isLoading = false"
          >
            <template v-slot:name="data">
              <Test>
                {{ data.value.name }}
              </Test>
            </template>
          </table-lite>
        </div>
  </div>
</template>

<script>
import { defineComponent, reactive } from "vue";
import TableLite from "./reportTable/TableLite.vue";
import Test from "./reportTable/Test.vue";
import ModalComponent from "./reportTable/ModalComponent.vue";
import { ref } from "vue";
import {
  getDrivers,
  createDriver,
  editDriver,
  deleteDriver,
} from "@/network/endpoints";
// Fake Data for 'asc' sortable
const sampleData1 = (offst, limit) => {
  offst = offst + 1;
  let data = [];
  for (let i = offst; i <= limit; i++) {
    data.push({
      id: i,
      name: "TEST" + i,
      email: "test" + i + "@example.com",
    });
  }
  return data;
};

// Fake Data for 'desc' sortable
const sampleData2 = (offst, limit) => {
  let data = [];
  for (let i = limit; i > offst; i--) {
    data.push({
      id: i,
      name: "TEST" + i,
      email: "test" + i + "@example.com",
    });
  }
  return data;
};
export default defineComponent({
        name: "reportFormTableOutput",
        components: { TableLite, Test, ModalComponent },
  setup() {

    const modalActive = ref(false);
    const toggleModal = () => {
      modalActive.value = !modalActive.value;
    };

    // Table config
    const table = reactive({
      isLoading: false,
      columns: [
        {
          label: "ID",
          field: "id",
          width: "3%",
          sortable: true,
          isKey: true,
        },
        {
          label: "Name",
          field: "name",
          width: "10%",
          sortable: true,
        },
        {
          label: "Email",
          field: "email",
          width: "15%",
          sortable: true,
        },
      ],
      rows: [],
      totalRecordCount: 0,
      sortable: {
        order: "id",
        sort: "asc",
      },
    });

    /**
     * Search Event
     */
    const doSearch = (offset, limit, order, sort) => {
      table.isLoading = true;
      setTimeout(() => {
        table.isReSearch = offset == undefined ? true : false;
        if (offset >= 10 || limit >= 20) {
          limit = 30;
        }
        if (sort == "asc") {
          table.rows = sampleData1(offset, limit);
        } else {
          table.rows = sampleData2(offset, limit);
        }
        table.totalRecordCount = 20;
        table.sortable.order = order;
        table.sortable.sort = sort;
      }, 600);
    };
    // First get data
    doSearch(0, 10, "id", "asc");
    return {
      table,
      doSearch,
      modalActive,
      toggleModal,
    };
  },
  data() {
    return {
      drivers: {}, // stores ALL loaded appointments. THIS IS NOT fullCalendar.calendarOptions.events!!! <-- that gets casted from this
      count: 0, // Total number of appointments loaded
      isLoading: false,

      // Modal v-show binds
      isAddingDriver: false, // Toggles create mode on modal
      isEditingDriver: false, // Toggles edit mode on modal

      // Refs
      showAddEditModal: ref(null), // loaded on

      // Object to pass a newly created appointment around, and also to save state with
      selectedDriver: {
        driverId: -1,
        firstName: "",
        lastName: "",
        fullName: "{{firstName}} {{lastName}}", //THIS IS NOT DONE CORRECTLY OBV
        startDate: "",
        insuranceId: "",
        phoneNumber: "",
        address: "",
        notes: "",
      },

      cachedDriver: {}, // This is bound to the modal children

        // REPLACE THE TEMP BUTTON WITH THIS ONE?
        customButtons: {
          addDriverButton: {
            text: "+ Create",
            hint: "Create driver",
            click: () => {
              this.isAddingDriver = true;
              this.isEditingDriver = false; // This is only place we can create an appointment right now
              this.clearDriverCache();
              this.showAddDriverModal();
            },
          },
        },

        // Define our desired header
        headerToolbar: {
          left: "addDriverButton",
          center: "title",
        },
        eventClick: (e) => {
          this.handleEventClick(e);
        },
      }
    },

  // Called whenever the component is freshly loaded
  mounted() {
    this.showAddEditModal = this.$refs.toggleModal;
  },

  created() {
    this.reloadDrivers();
    this.clearDriverCache();
  },

  methods: {
    // Full Calendar Helper Functions
    // =====================================================================

    // Resets appointments to current appointmentEvents
    reloadDrivers() {
      this.isLoading = true;
      this.loadDrivers();
      this.isLoading = false;
    },

        // Called whenever a user clicks into an event
    handleEventClick(e) {
      this.selectDriver(e);
      this.isAddingDriver = false;
      this.isEditingDriver = true;
      this.showAddDriverModal(e);
    },

    /* 
        User sends request for [startDate, endDate] range. 
        Start with today, leverage 'lookAtDate' for accurate range
        Backend assumes bad timezone, handles timezone conversion
    */
    async loadDrivers() {
        let data = await getDrivers();
        //CODE FROM LOAD DRIVER LIST FROM CALENDAR COMPONENT
        // const data = await getDrivers();
        // this.driversList = JSON.parse(JSON.stringify(data.data.drivers)); // De-proxy
        // this.driversListCount = data.data.count;        
        return data; //FIGURE OUT HOW TO PARSE DATA
    },
    // Calls our create appointment script with the current selectedApppointment
    async createNewDriver() {
      const response = await createDriver(this.selectedDriver);
      return response;
    },

    // Calls edit appointment route on the given appointment
    async updateDriver() {
      const response = await editDriver(this.selectedDriver);
      return response;
    },

    // Destructure appointment from extendedProp from FullCalendar click event and set it as active
    selectDriver(e) {
      const newDriver = e.event._def.extendedProps;
      if (
        !this.selectedDriver.driverId ||
        this.selectedDriver.driverId != newDriver.driverId
      ) {
        // Proxy's are funky, but prevent type smashing, so just gotta deal sometimes
        this.selectedDriver = JSON.parse(JSON.stringify(newDriver)); // De-proxy
      }
    },

    // Add / Edit Modal Helpers
    // =====================================================================

    // Set addAppointment to be current Selected appointment, call update and reload
    async saveDriver() {
      this.selectedDriver = this.cachedDriver;

      const response = !this.selectedDriver.driverId
        ? await this.createNewDriver() // If appointment has no id attached, assume we're creating a new one
        : await this.updateDriver(); // else, update it

      if (!response || response.status >= 400) {
        return;
      }

      // Force reload to pick up the change
      this.reloadDrivers();
      this.hideModal();
    },

    async deleteDriver() {
      // Toggle "You sure?"
      const response = await deleteDriver(this.selectedDriver);
      if (response.status >= 400) {
        // Die with warning
        return;
      }
      this.hideModal();
      this.clearDriverCache();
      this.reloadDrivers();
    },

    // Modal Controls
    // =====================================================================

    clearDriverCache() {
      this.selectedDriver = {
        driverId: -1,
        firstName: "",
        lastName: "",
        fullName: "{{firstName}} {{lastName}}", //THIS IS NOT DONE CORRECTLY OBV
        startDate: "",
        insuranceId: "",
        phoneNumber: "",
        address: "",
        notes: "",
      };
    },

    // Loads necessary information and fires event to open modal
    async showAddDriverModal() {
      this.cachedDriver = this.selectedDriver;
      this.isAddingDriver = true;
      this.toggleModal(); // References AddEditAppointment Modal
    },

    // Closes modal --> Add any cleanup here
    hideModal() {
      this.isAddingDriver = false;
      this.isEditingDriver = false;
      this.toggleModal();
    },
  },
});
</script>


<style lang="scss" scoped>
.modal-animation-enter-active,
.modal-animation-leave-active {
  transition: opacity 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}
.modal-animation-enter-from,
.modal-animation-leave-to {
  opacity: 0;
}
.modal-animation-inner-enter-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02) 0.15s;
}
.modal-animation-inner-leave-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}
.modal-animation-inner-enter-from {
  opacity: 0;
  transform: scale(0.8);
}
.modal-animation-inner-leave-to {
  transform: scale(0.8);
}
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(156, 156, 156, 0.7);
  border: hidden;

  .modal-inner {
    border-radius: 9px;
    border: hidden;
    border-color: #fff;
    position: relative;
    max-width: 575px;
    width: 45em; //this is the width of the white box
    background-color: #fff;
    padding: 8px 8px;
  }
}
.generateButton {
        max-width: 350px;
        padding: 0.75em;
        margin-bottom: 10px;
        transition: all 0.3s;
        background: lightgrey;
        color: rgb(39, 39, 39);
        border: none;
    }

</style>