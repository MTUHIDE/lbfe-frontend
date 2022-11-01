
module.exports = {
    // DEFINE ALL METHODS / ROUTE CALLS IN HERE

    // Check that the status returned by a route is valid (all 200s)
    validateStatus(status) {
        return status >= 200 && status < 300
    },

    // APPOINTMENTS
    async getAppointmentById() {},

    async getAllAppointments() {},

    async createAppointment() {},

    async deletetAppointment() {},

    // ELDERS

    // DRIVERS
}


