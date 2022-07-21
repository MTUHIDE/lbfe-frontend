// TODO Fix the back button redirect method
// TODO Add Edit functionality
// TODO Populate the card with info from the backend
// TODO Make the modal verify it should be closed to avoid losing unsaved changes

<template>
  <div class="client">
    <div class="container-fluid">

        <h1>Elders</h1>

        <div class="accordion" id="anAccordion">
          <AccordionList 
            v-show="1" 
            v-for="client in clients"
            :key="client.id"
            :collapseId="client.id"
            :name="client.client_name"
            :address="client.client_address" 
            :phone_number="client.client_phone_number"
            :mobility="client.mobility"
            :notes="client.client_notes"
            :numofcancels="client.number_of_cancels" 
        ></AccordionList>
      </div>
    </div>
  </div>
</template>

<script>
import AccordionList from './AccordionList.vue';

export default {
  components: {
    AccordionList
  },
  props: {
    editMode: { type: Boolean, required: false, default: false },
    activeBack: { type: String, required: false, default: "flex" },
    redirect: { type: String, required: true },
  },
  data() {
    return {
      //TODO Remove any un-used items from here
      editing: this.editMode,
      clientName: "",
      title: "",
      driverName: "",
      appDate: "",
      pickupAddress: "",
      dropoffAddress: "",
      clientNotes: "",
      clients: [],
    };
  },
  mounted() {
    this.getClients();
  },
  methods: {
    getClients() {
      this.$axios.get('/api/clients')
        .then((clientsdata) => {
            console.log(clientsdata);
            this.clients = clientsdata.data;
        }).catch((error) => {
            console.log(error)
        })
    },
  },

};
</script>

<style lang="scss" scoped>

</style>
