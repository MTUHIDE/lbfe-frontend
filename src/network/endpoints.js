import axios from 'axios'

// Define the base URL for our request
const baseUrl = "http://localhost:9010/api" // TODO - Load from ENV

// Define the requestType we want. 
// All routes have the same, so this lets us bulk edit if needed
const getOne = '/?id='          // append id
const getList = '/list'
const postCreate = '/create'    // attach a body
const postEdit = '/edit'        // attach a body
const deleteDelete = '/delete'  // attach a body (only needs an id)


// ********* APPOINTMENTS ********* 
const appointmentUrl = baseUrl + '/appointment' //this is changed again, do NOT add an 's' to this as it breaks post requests

// Call the getAllAppointments route in our backend
// TODO - **Find a better way**
export async function getAppointments(startDate, endDate) {

    // TODO - Add date input prune check
    const requestUrl = appointmentUrl + getList + `?startDate=${startDate}&endDate=${endDate}`
    const response = await axios.get(requestUrl)
    return response.data // Contains { status, count, appointment } and excludes raw meta
}

// Retrieve specified Appointment by Id
export async function getAppointmentById(id) {
    const requestUrl = appointmentUrl + getOne + `${id}` // Intended to be manual, users can look up shit this way anyway
    const response = await axios.get(requestUrl)
    return response
}

// Create a new appointment --> Assume appointment contains necessary info, route flags inproper usage
export async function createAppointment(appointment) {
    const requestUrl = appointmentUrl + postCreate
    const response = await axios.post(requestUrl, appointment) // Pass appointment object
    return response
}

// Edit a given appointment --> Assume appointment contains necessary info, route flags inproper usage
export async function editAppointment(appointment) {
    const requestUrl = appointmentUrl + postEdit
    const response = await axios.post(requestUrl, appointment) // Pass appointment object
    return response
}

export async function deleteAppointment(appointment) {
    const requestUrl = appointmentUrl + deleteDelete
    const response = await axios.post(requestUrl, appointment) // Pass id in body
    return response
}



// ********* DRIVERS ************** 
const driverUrl = baseUrl + '/drivers'

// Call the getAllDrivers route in our backend
export async function getDrivers() {
    const requestUrl = driverUrl + getList
    const response = await axios.get(requestUrl)
    return response
}

// Retrieve specified Driver by Id
export async function getDriverById(id) {
    const requestUrl = driverUrl + getOne + `${id}` // Intended to be manual, users can look up shit this way anyway
    const response = await axios.get(requestUrl)
    return response
}

// Create a new driver --> Assume driver object contains necessary info, route flags inproper usage
export async function createDriver(driver) {
    const requestUrl = driverUrl + postCreate
    const response = await axios.post(requestUrl, driver) // Pass driver object
    return response
}

// Edit a given driver --> Assume driver object contains necessary info, route flags inproper usage
export async function editDriver(driver) {
    const requestUrl = driverUrl + postEdit
    const response = await axios.post(requestUrl, driver) // Pass driver object
    return response
}

export async function deleteDriver(driver) {
    const requestUrl = driverUrl + deleteDelete
    const response = await axios.post(requestUrl, driver) // Pass driver in body
    return response
}



// ********* ELDERS *************** 
const elderUrl = baseUrl + '/elders' //changed from elders to elders

// Call the getAlElders route in our backend
export async function getElders() {
    const requestUrl = elderUrl + getList
    const response = await axios.get(requestUrl)
    return response
}

// Retrieve specified Elder by Id
export async function getElderById(id) {
    const requestUrl = elderUrl + getOne + `${id}` // Intended to be manual, users can look up shit this way anyway
    const response = await axios.get(requestUrl)
    return response
}

// Create a new elder --> Assume elder object contains necessary info, route flags inproper usage
export async function createElder(elder) {
    const requestUrl = elderUrl + postCreate
    const response = await axios.post(requestUrl, elder) // Pass elder object
    return response
}

// Edit a given elder --> Assume elder object contains necessary info, route flags inproper usage
export async function editElder(elder) {
    const requestUrl = elderUrl + postEdit
    const response = await axios.post(requestUrl, elder) // Pass elder object
    return response
}

export async function deleteElder(elder) {
    const requestUrl = elderUrl + deleteDelete
    const response = await axios.post(requestUrl, elder) // Pass id in body
    return response
}

export async function elderPhone(elder) {
    const requestUrl = elderUrl + getOne
    const response = await axios.post(requestUrl, elder) // Pass id in body
    return response.elderPhone
}