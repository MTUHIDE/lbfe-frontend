// TODO: Create the client page to sit next to the appointments
// ^ look into if we still should be doin this??
<template>
    <div>
        <div class="row">
            <div class="col-md-12">
                <div class="appWrap">
                    <Appointment :editMode="true" :redirect="'/calendar'"></Appointment>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
    import Appointment from '../../components/busforms/Appointment.vue';

    export default {
        components: {
            Appointment,
        },
    }
</script>

<style lang="scss" scoped>
    .row {
        margin: 0;
    }

    .appWrap {
        width: 75%;
        margin: auto;
    }
</style>
