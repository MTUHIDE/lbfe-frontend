// TODO Fix the back button redirect method
// TODO Add Edit functionality
// TODO Populate the card with info from the backend
// TODO Make the modal verify it should be closed to avoid losing unsaved changes

<template>

<modal-component @close="toggleModal" :modalActive="modalActive">
      <div class="modal-inner calendar-modal">
        <div class="calendar-popup">
          <!-- Modal Header -->
          <h5 v-show="isAddingElder" class="modal-title">
            Add Elder
          </h5>
          <h5 v-show="isEditingElder" class="modal-title">
            Edit Elder
          </h5>

          <!-- Modal Body -->
          <div class="popup-inner">
            <form id="editForm" @submit.prevent="editForm">
            <div class = "edit-left">  
              <div class="edit-blanks">
                <label for="editFirstName" class="form-label">First Name: </label>
                <input
                  name="firstName"
                  type="text"
                  class="form-control"
                  id="editFirstName"
                  v-model="cachedElder.firstName"
                  required
                />
              </div>
              <div class="edit-blanks">
                <label for="editPhone" class="form-label">Phone Number: </label>
                <input
                  name="phone"
                  type="text"
                  class="form-control"
                  id="editPhone"
                  v-model="cachedElder.phoneNumber"
                  required
                />
              </div>

              <div class="edit-blanks">
                <label for="editMobility" class="form-label"
                  >Mobility:
                </label>
                <textarea
                  id="editMobility"
                  name="mobility"
                  class="form-control"
                  v-model="cachedElder.mobility"
                  required
                ></textarea>
              </div>

            </div>

            <div class = "edit-right">
              <div class="edit-blanks">
                <label for="editLastName" class="form-label">Last Name: </label>
                <input
                  name="lastName"
                  type="text"
                  class="form-control"
                  id="editLastName"
                  v-model="cachedElder.lastName"
                  required
                />
              </div>

              <div class="edit-blanks">
                <label for="editCancels" class="form-label"># of Cancels: </label>
                <input
                  name="cancels"
                  type="text"
                  class="form-control"
                  id="editCancels"
                  v-model="cachedElder.numOfCancels"
                  required
                />
              </div>

              <div class="edit-checkbox">
                <label for="editNeedsWheelchair" class="form-label">Needs Wheelchair: </label>
                <input type="checkbox" v-model="cachedElder.needsWheelChair" :options="wheelchairOptions" id="wheelchair">
              </div>

            </div>
            <div class = "edit-bottom">
              <div class="edit-blanks">
                <label for="editAddress" class="form-label"
                  >Home Address:
                </label>
                <textarea
                  id="editAddress"
                  name="address"
                  class="form-control"
                  v-model="cachedElder.address"
                  required
                ></textarea>
              </div>

              <div class="edit-blanks">
                <label for="editNotes" class="form-label"
                  >Driver Notes:
                </label>
                <textarea
                  id="editNotes"
                  name="notes"
                  class="form-control"
                  v-model="cachedElder.notes"
                ></textarea>
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
              @click="addElderButton"
              class="btn btn-primary custom-save-btn"
            >
              Save
            </button>
            <button
              v-show="!isAddingElder"
              @click="deleteElder"
              class="btn btn-danger custom-del-btn"
            >
              Delete
            </button>
          </div>
        </div>

        <!-- End Modal Body -->
      </div>
    </modal-component>

          <div class="headerToolbar">
            <button
              @click="showAddElderModal"
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
import TableLite from "./elderTable/TableLite.vue";
import Test from "./elderTable/Test.vue";
import ModalComponent from "./elderTable/ModalComponent.vue";
import { ref } from "vue";
import {
  getElders,
  createElder,
  editElder,
  deleteElder,
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
      elders: {}, // stores ALL loaded appointments. THIS IS NOT fullCalendar.calendarOptions.events!!! <-- that gets casted from this
      count: 0, // Total number of appointments loaded
      isLoading: false,

      // Modal v-show binds
      isAddingElder: false, // Toggles create mode on modal
      isEditingElder: false, // Toggles edit mode on modal

      // Refs
      showAddEditModal: ref(null), // loaded on

      // Object to pass a newly created appointment around, and also to save state with
      selectedElder: {
        elderId: -1,
        firstName: "",
        lastName: "",
        fullName: "{{firstName}} {{lastName}}", //THIS IS NOT DONE CORRECTLY OBV
        startDate: "",
        numOfCancels: "",
        mobility: "",
        needsWheelchair: false,
        phoneNumber: "",
        address: "",
        notes: "",
      },

      cachedElder: {}, // This is bound to the modal children

        // REPLACE TEMP BUTTON WITH THIS ONE?
        customButtons: {
          addElderButton: {
            text: "+ Create",
            hint: "Create elder",
            click: () => {
              this.isAddingElder = true;
              this.isEditingElder = false; // This is only place we can create an appointment right now
              this.clearElderCache();
              this.showAddElderModal();
            },
          },
        },

        // Define our desired header
        headerToolbar: {
          left: "addElderButton",
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
    this.reloadElders();
    this.clearElderCache();
  },

  methods: {
    // Full Calendar Helper Functions
    // =====================================================================

    // Resets appointments to current appointmentEvents
    reloadElders() {
      this.isLoading = true;
      this.loadElders();
      this.isLoading = false;
    },

        // Called whenever a user clicks into an event
    handleEventClick(e) {
      this.selectElder(e);
      this.isAddingElder = false;
      this.isEditingElder = true;
      this.showAddElderModal(e);
    },

    /* 
        User sends request for [startDate, endDate] range. 
        Start with today, leverage 'lookAtDate' for accurate range
        Backend assumes bad timezone, handles timezone conversion
    */
    async loadElders() {
        const data = await getElders();
        //CODE FROM LOAD DRIVER LIST FROM CALENDAR COMPONENT
        // const data = await getDrivers();
        // this.driversList = JSON.parse(JSON.stringify(data.data.drivers)); // De-proxy
        // this.driversListCount = data.data.count;        
        return data; //FIGURE OUT HOW TO PARSE DATA
    },
    // Calls our create appointment script with the current selectedApppointment
    async createNewElder() {
      const response = await createElder(this.selectedElder);
      return response;
    },

    // Calls edit appointment route on the given appointment
    async updateElder() {
      const response = await editElder(this.selectedElder);
      return response;
    },

    // Destructure appointment from extendedProp from FullCalendar click event and set it as active
    selectElder(e) {
      const newElder = e.event._def.extendedProps;
      if (
        !this.selectedElder.elderId ||
        this.selectedElder.elderId != newElder.elderId
      ) {
        // Proxy's are funky, but prevent type smashing, so just gotta deal sometimes
        this.selectedElder = JSON.parse(JSON.stringify(newElder)); // De-proxy
      }
    },

    // Add / Edit Modal Helpers
    // =====================================================================

    // Set addAppointment to be current Selected appointment, call update and reload
    async saveElder() {
      this.selectedElder = this.cachedElder;

      const response = !this.selectedElder.elderId
        ? await this.createNewElder() // If appointment has no id attached, assume we're creating a new one
        : await this.updateElder(); // else, update it

      if (!response || response.status >= 400) {
        return;
      }

      // Force reload to pick up the change
      this.reloadElders();
      this.hideModal();
    },

    async deleteElder() {
      // Toggle "You sure?"
      const response = await deleteElder(this.selectedElder);
      if (response.status >= 400) {
        // Die with warning
        return;
      }
      this.hideModal();
      this.clearElderCache();
      this.reloadElders();
    },

    // Modal Controls
    // =====================================================================

    clearElderCache() {
      this.selectedElder = {
        elderId: -1,
        firstName: "",
        lastName: "",
        fullName: "{{firstName}} {{lastName}}", //THIS IS NOT DONE CORRECTLY OBV
        startDate: "",
        numOfCancels: "",
        mobility: "",
        needsWheelchair: false,
        phoneNumber: "",
        address: "",
        notes: "",
      };
    },

    // Loads necessary information and fires event to open modal
    async showAddElderModal() {
      this.cachedElder = this.selectedElder;
      this.isAddingElder = true;
      this.toggleModal(); // References AddEditAppointment Modal
    },

    // Closes modal --> Add any cleanup here
    hideModal() {
      this.isAddingElder = false;
      this.isEditingElder = false;
      this.toggleModal();
    },
  },
});
</script>

<style lang="scss" scoped>
.table{
  padding-top: 60px;
}
.edit-bottom {
  padding-top: 5px;
}
.edit-blanks {
  padding-top: 5px;
  padding-bottom: 5px;
}
.edit-checkbox {
  padding-top: 50px;
  padding-bottom: 30px;
}
.edit-right {
  width: 20em;
  float: right;
  padding-bottom: 20px;
}
.edit-left {
  width: 20em;
  float: left;
  padding-bottom: 20px;
}
.headerToolbar {
  margin-top: 20px;
  float: left;
  padding-left: 10px;
}

.calendar-header-widget {
  text-align: left; //center
  padding-left: 1.3em;
  padding-top: 8px;
  padding-bottom: 1px;
}

.calendar-modal {
  //float: right;
  width: 45em; //25em
}

.count-header {
  text-align: left;
  margin: 4px;
}

.widget-wrapper {
  background-color: #ffffff;
  border-radius:.5em;
  box-shadow: 2px 3px 10px #ad9b9b;
  margin: 1em;
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
