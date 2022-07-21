<script>

export default {
  props: {
    appointmentId: String,
  },
  mounted() {
    console.log(this.appointmentId);
  },
  methods: {
    deleteForm() {
      this.$axios.delete('/api/appointment/' + this.appointmentId, {

      }).then(response => {
        this.$emit('delete-success-alert'); // emit success to parent
      })
      .catch((error) => {
        console.error(error.response.data);
      })
    }
  }
}
</script>

<template>
<div class="modal fade"
         id="deleteModal"
         tabindex="-1"
         role="dialog"
         aria-hidden="true"
         data-bs-backdrop="static"
    >
      <div class="modal-dialog modal-dialog-scrollable modal-fullscreen-md-down">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Delete appointment</h4>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"/>
            </div>
            <div class="modal-body">
              <form @submit.prevent="deleteForm" id="deleteForm">
                <input type="hidden" name="delete_id" id="delete_id" v-bind:value="appointmentId">
                <div class="alert alert-danger" role="alert"><i class="fas fa-exclamation-triangle"></i> Are you sure you want to delete this appointment? This action cannot be undone.
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" id="confirmDeleteBtn" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="submit" name="deletedata" id="deleteComponent" class="btn btn-danger" form="deleteForm">Delete</button>
            </div>
          </div>
        </div>
      </div>
</template>

<style lang="scss" scoped>
.modal-body {
  text-align: left !important;
}

.modal {
  z-index: 1069 !important;
}

</style>
