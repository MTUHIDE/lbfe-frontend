<template>
  
  <div class="accordion-item">
    <h2 class="accordion-header" >
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" v-bind:data-bs-target="'#collapse'+collapseId" aria-expanded="false" aria-controls="collapseId">
        {{name}}
      </button>
    </h2>
    <div v-bind:id="'collapse'+collapseId" class="accordion-collapse collapse" data-bs-parent="#anAccordion">
      <div class="accordion-body">
        <div class="row text-start">
          <div class="col-2">
            <p class="card-text fw-bold">Elder Name: </p>
            <p class="card-text fw-bold">Address: </p>
            <p class="card-text fw-bold">Phone number:</p>
            <p class="card-text fw-bold">Mobility:</p>
            <p class="card-text fw-bold">Number of cancels:</p>
            <p class="card-text fw-bold">Additional notes:</p>
          </div>
          <div class="col">
            <p class="card-text">{{name}} </p>
            <p class="card-text">{{address}} </p>
            <p class="card-text">{{phone_number}}</p>
            <p class="card-text">{{mobility}}</p>
            <p class="card-text">{{numofcancels}}</p>
            <p class="card-text">{{notes}}</p>
          </div>
        </div>
        <div class="button-container mb-3">
          <button type="button" @click="this.getPreviousValues()" class="btn btn-primary px-3" id="clientEdit" data-bs-toggle="modal" data-bs-target="#editModal">Edit</button>
        </div></div>
    </div>

    <div class="modal fade modal-dialog-scrollable" id="editModal" tabindex="-1" aria-labelledby="editModalLabel" aria-hidden="true" >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header text-center">
                <h5 class="modal-title" id="editModalLabel">Edit Elder Information</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <!-- TODO Update these to be poulated with data from the backend -->
                <form id="elderEditForm" @submit.prevent="elderEditForm">
                  <div class="form-group">
                    <label for="editElderName">Elder Name</label>
                    <input type="text" class="form-control" id="editElderName" v-model="oldName" required>
                  </div>
                  <div class="form-group">
                    <label for="edditElderAddress">Address</label>
                    <input type="text" class="form-control" id="editElderAddress" v-model="address" required>
                  </div>
                </form>

                <!--
                <div class="mb-3 row">
                  <label for="name" class="col-sm-2 col-form-label">Name:</label>
                  <div class="col-sm-10">
                    <input type="text" class="form-control-plaintext border rounded" id="name" value=" TMP Carl Wheezer">
                  </div>
                </div>
                
                <div class="mb-3 row">
                  <label for="address" class="col-sm-2 col-form-label">Address:</label>
                  <div class="col-sm-10">
                    <input type="text" class="form-control-plaintext border rounded" id="address" value=" TMP 713 Road St Apt 2 ">
                  </div>
                </div>
                <div class="mb-3 row">
                  <label for="phoneNumber" class="col-sm-2 col-form-label">Phone:</label>
                  <div class="col-sm-10">
                    <input type="text" class="form-control-plaintext border rounded" id="phoneNumber" value=" TMP (906) 333-1542">
                  </div>
                </div>
                <div class="mb-3 row">
                  <label for="mobility" class="col-sm-2 col-form-label">Mobility:</label>
                  <div class="col-sm-10">
                    <input type="text" class="form-control-plaintext border rounded" id="mobility" value=" TMP Wheelchair">
                  </div>
                </div>
                <div class="mb-3 row">
                  <label for="numberOfCancels" class="col-sm-5 col-form-label text-start">Number of Cancels:</label>
                  <div class="col-sm-5">
                    <input type="number" class="border rounded mt-2" id="numberOfCancels" min="0">
                  </div>
                </div>
                <div class="mb-3">
                  <label for="additionalNotes" class="form-label">Additional Notes:</label>
                  <textarea class="form-control border rounded" id="exampleFormControlTextarea1" rows="3">* TMP Is partially deaf</textarea>
                </div>
                -->
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">Save changes</button>
              </div>
            </div>
          </div>
        </div> 
  </div>
</template>

<script>
export default {
  name: "AccordionList",
  props: {
    collapseId: { type: Number, required: true},
    name: { type: String, required: true },
    address: { type: String, required: true },
    phone_number: { type: String, required: true },
    mobility: { type: String, required: true },
    notes: { type: String, required: false },
    numofcancels: { type: String, required: true },

  },
  data() {
    return {
      oldName: "",
    }
  },
  methods: {
    getPreviousValues() { // this function gets the values for a particular appointment
      console.log(this.collapseId);
      // const getUrl = '/api/client/' + this.collapseId;
      // console.log(getUrl);
      this.$axios.get('/api/client/' + this.collapseId)
        .then((clientsdata) => {
          console.log(clientsdata.data['0']);  //THERE SEEMS TO BE SOMETHING WRONG HERE, NOTHING IS LOGGED TO THE CONSOLE. 
          this.oldName = clientsdata.data['0'].client_name;
        }).catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>
<style lang="scss" scoped>

.button-container {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

</style>