<script>
import '@fullcalendar/core/vdom' // solves problem with Vite
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

import { ref } from 'vue';
import { Modal } from 'bootstrap';
import DriverCalendarPopup from './DriverCalendarPopup.vue';

export default {
    components: {
        FullCalendar, // make the <FullCalendar> tag available
        DriverCalendarPopup,
    },
    data() {
        const popupTriggers = ref({
            buttonTrigger: false
        });
        const TogglePopup = (trigger) => {
            popupTriggers.value[trigger] = !popupTriggers.value[trigger]
        }
        return {
            appointmentNotes: '',
            clientName: '',
            driverName: '',
            startDateTime: '',
            pickupAddress: '',
            destinationAddress: '',
            appointmentTitle: '',
            mobility: '',
            cpModal: null,
            calendarOptions: {
              height: '80vh',
              scrollTime :  "09:00:00",
              nowIndicator: true,
              views: {
                timeGridThreeDay: {
                     type: 'timeGrid',
                     dayCount: 3,
                     buttonText: '3 day',
                     duration: { days: 3 },
                   },
              },
                  initialView: 'timeGridDay',

                plugins: [ timeGridPlugin, interactionPlugin ],
                headerToolbar: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'timeGridThreeDay,timeGridDay'
                },
                // initialView: 'timeGridWeek',
                editable: true,
                selectable: true,
                selectMirror: true,
                dayMaxEvents: true,
                weekends: true,
                eventClick: (clickData) => {
                    this.cpModal.show();
                    this.appointmentNotes = clickData.event.extendedProps['appointment_notes'];
                    this.clientName = clickData.event.extendedProps['client_name'];
                    this.driverName = clickData.event.extendedProps['driver_name'];
                    this.pickupAddress = clickData.event.extendedProps['pickup_address'];
                    this.destinationAddress = clickData.event.extendedProps['destination_address'];
                    this.appointmentTitle = clickData.event.extendedProps['appointment_title'];
                    this.mobility = clickData.event.extendedProps['mobility'];
                    this.startDateTime = clickData.event.start;
                },
                //select: this.handleDateSelect,

                eventsSet: this.handleEvents,
                /* you can update a remote database when these fire:
                eventAdd:
                eventChange:
                eventRemove:
                */
                events: '/api/appointments'
            },
            popupTriggers,
            TogglePopup,
        }
    },
    // get access to modal for manipulation
    mounted() {
        this.cpModal = new Modal(document.getElementById('driverAppointmentModal'), null);
    },
    methods: {
        handleEvents(events) {
            this.currentEvents = events
        },
    }
}
</script>

<template>
  <div class="container-fluid">
    <DriverCalendarPopup :mobility="mobility" :appointment-title="appointmentTitle" :pickup-address="pickupAddress" :destination-address="destinationAddress" :driver-name="driverName" :client-name="clientName" :appointment-notes="appointmentNotes" :event-start="startDateTime">
        <!-- <DriverAppointmentInfo :redirect="'/calendar'" :activeBack="'none'"/> -->
    </DriverCalendarPopup>

    <div class="cMonthView">
        <FullCalendar :options="calendarOptions"/>
    </div>
  </div>

</template>

<style scoped>
.cMonthView {
    margin: 10%;
    padding: 2px;
}

@media only screen and (max-width: 600px) {
   .cMonthView {
    margin: 0;
    padding: 0.1em;
    } 

    .fc .fc-toolbar-title {
      font-size: 10px !important;
    }
}
</style>
