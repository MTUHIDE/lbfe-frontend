// TODO Fix the back button redirect method
// TODO Add Edit functionality
// TODO Populate the card with info from the backend
// TODO Make the modal verify it should be closed to avoid losing unsaved changes

<template>

  <modal-component @close="toggleModal" :modalActive="modalActive">
      <div class="modal-inner calendar-modal">

        <DriverForm1></DriverForm1>
      
        <!-- End Modal Body -->
      </div>
    </modal-component>

  <div class="headerToolbar">
    <button
      @click="showAddDriverModal"
      class="btn btn-secondary custom-create-btn"
    >
      + Create
    </button>
  </div>


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
</template>

<script>
import { defineComponent, reactive } from "vue";
import TableLite from "./driverTable/TableLite.vue";
import Test from "./driverTable/Test.vue";
import ModalComponent from "./driverTable/ModalComponent.vue";
import DriverForm1 from "./DriverCreateForm.vue";
import { ref } from "vue";
import {
  getDrivers,
  createDriver,
  editDriver,
  deleteDriver,
} from "../../network/endpoints";

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
  name: "App",
  components: { TableLite, Test, ModalComponent, DriverForm1 },
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
          limit = 20;
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

      formData: {
        firstName: '',
        lastName: '',
        insuranceId: ''
      },
      errors: {
        firstName: '',
        lastName: '',
        insuranceId: ''
      },
      formError: '',
      formSubmitted: false,

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

    //validate the form
    validateForm(){
      this.errors = {
        firstName: '',
        lastName: '',
        insuranceId: ''
      };

      this.formError = '';

      let isValid = true;

      //validate first name
      if (!this.cachedDriver.firstName.trim()){
        this.errors.firstName = 'First name is requried';
        isValid = false;
      }

      //validate last name
      if (!this.cachedDriver.lastName.trim()){
        this.errors.lastName = 'Last name is requried';
        isValid = false;
      }

      //validate insuuranceID
      if (!this.cachedDriver.insuranceId.trim()){
        this.errors.insuranceId = 'insuranceId is requried';
        isValid = false;
      }

      if (!isValid){
        this.formError = 'Please correct the error in the form before submitting.';
      }

      return isValid;
    },

    submitForm(){
      if (this.validateForm()){
        alert('Form submitted successfully!');

        this.formData ={
        firstName: '',
        lastName: '',
        insuranceId: ''
        };

      } else {
        console.log('Form validation failed')
      }
    },



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
        const data = await getDrivers();
        //CODE FROM LOAD DRIVER LIST FROM CALENDAR COMPONENT
        // const data = await getDrivers();
        this.driversList = JSON.parse(JSON.stringify(data.data.drivers)); // De-proxy
        this.driversListCount = data.data.count;        
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


      const response = this.selectedDriver.driverId === -1
        ? await this.createNewDriver() // If appointment has no id attached, assume we're creating a new one
        : await this.updateDriver(); // else, update it

      if (!response || response.status >= 400) {
        //send a message that a driver could not be updated
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
.table{
  padding-top: 60px;
}
.edit-right {
  width: 15em;
  float: right;
  padding-top: 5px;
  padding-bottom: 5px;
}
.edit-left {
  width: 15em;
  float: left;
  padding-top: 5px;
  padding-bottom: 5px;
}
.headerToolbar {
  margin-top: 20px;
  float: left;
  padding-left: 10px;
}

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
  margin-top: 50px;
  margin-bottom: 10px;
  min-width: 30%;
  min-height: 30%;
}

.button-row {
  justify-content: space-between;
  padding-bottom: 10px;
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
