<script>
export default {
  props: {
    appointmentNotes: String,
    clientName: String,
    driverName: String,
    eventStart: String,
    pickupAddress: String,
    destinationAddress: String,
    appointmentTitle: String,
    mobility: String,
  }
}
</script>

<template>
    <div class="modal fade"
         id="driverAppointmentModal"
         tabindex="-1"
         role="dialog"
         aria-labelledby="exampleModalLabel"
         aria-hidden="true"
    >
        <div class="modal-dialog modal-dialog-scrollable modal-fullscreen-md-down">
            <div class="modal-content">
                <div class="modal-header" style="{ border: none }">
                    <h5 class="modal-title">Appointment Info</h5>

                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"/>
                </div>
                <div class="modal-body">
                  <div class="iconTitleflex"><span class="iconWrap"><i class="fas fa-clock"></i></span>Title:</div><p>{{ appointmentTitle }}</p>
                    <div class="iconTitleflex"><span class="iconWrap"><i class="fas fa-calendar"></i></span>Date/Time:</div><p>{{ eventStart }}</p>
                    <div class="iconTitleflex"><span class="iconWrap"><i class="fas fa-home"></i></span>Pickup Address:</div><p>{{ pickupAddress }}</p>
                  <div class="iconTitleflex"><span class="iconWrap"><i class="fas fa-map-marker-alt"></i></span>Destination Address:</div><p>{{ destinationAddress }}</p>
                    <div class="iconTitleflex"><span class="iconWrap"><i class="fas fa-clipboard"></i></span>Appointment Notes:</div><p>{{ appointmentNotes }}</p>
                    <div class="iconTitleflex"><span class="iconWrap"><i class="fas fa-wheelchair"></i></span>Mobility:</div><p>{{ mobility }}</p>
                    <div class="iconTitleflex"><span class="iconWrap"><i class="fas fa-user"></i></span>Elder Name:</div><p>{{ clientName }}</p>
                    <div class="iconTitleflex"><span class="iconWrap"><i class="fas fa-shuttle-van"></i></span>Driver Name:</div><p>{{ driverName }}</p>

                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.CalendarPopup {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 99;
	background-color: rgba(0, 0, 0, 0.2);

	display: flex;
	align-items: center;
	justify-content: center;
	.popup-inner {
        border-radius: 16px;
		background: #FFF;
		padding: 10px;
        min-width: 30%;
        min-height: 30%;
	}
}

.modal-body {
  text-align: left !important;
}

.iconWrap {
  // width: 1.8rem;
  width: 1.5rem;
  margin-right: 1rem;
  text-align: center !important;
}

p {
  margin-left: 2.5rem;
}
.iconTitleflex {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
</style>
