import axios from 'axios'


// Define the base URL for our request
// TODO - Load from ENV
const baseUrl = "http://localhost:9010/api" 

// Define the requestType we want. 
// All routes have the same, so this lets us bulk edit if needed
const getOne = '/?id='          // append id
const getList = '/list'
const postCreate = '/create'    // attach a body
const postEdit = '/edit'        // attach a body
const deleteDelete = '/delete'  // attach a body (only needs an id)


// ********* APPOINTMENTS ********* 
// changed from appointements to appointment, need further testing to ensure it works
const appointmentUrl = baseUrl + '/appointment' //CHANGED THIS SO NOW ENDPOINTS WORK - DONT GET RID OF IT

// Call the getAllAppointments route in our backend
// TODO - **Find a better way**
export async function getAppointments(startDate, endDate) {

    // TODO - Add date input prune check

    const requestUrl = appointmentUrl + getList + `?startDate=${startDate}&endDate=${endDate}`
    const response = await axios.get(requestUrl)
    return await axios.get(requestUrl)

    // wrong return 
    //return response.data // Contains { status, count, appointment } and excludes raw meta
}

// Retrieve specified Appointment by Id
export async function getAppointmentById(id) {
    const requestUrl = appointmentUrl + getOne + `${id}` // Intended to be manual, users can look up shit this way anyway
    return await axios.get(requestUrl)
}

// Create a new appointment --> Assume appointment contains necessary info, route flags inproper usage
export async function createAppointment(appointment) {
    const requestUrl = appointmentUrl + postCreate
    return await axios.post(requestUrl, appointment) // Pass appointment object
}

// Edit a given appointment --> Assume appointment contains necessary info, route flags inproper usage
export async function editAppointment(appointment) {
    const requestUrl = appointmentUrl + postEdit
    return await axios.post(requestUrl, appointment) // Pass appointment object
}

export async function deleteAppointment(appointment) {
    const requestUrl = appointmentUrl + deleteDelete
    return await axios.post(requestUrl, appointment) // Pass id in body
}



// ********* DRIVERS ************** 
const driverUrl = baseUrl + '/drivers'

// Call the getAllDrivers route in our backend
export async function getDrivers() {
    const requestUrl = driverUrl + getList
    return await axios.get(requestUrl)
}

// Retrieve specified Driver by Id
export async function getDriverById(id) {
    const requestUrl = driverUrl + getOne + `${id}` // Intended to be manual, users can look up shit this way anyway
    return await axios.get(requestUrl)
}

// Create a new driver --> Assume driver object contains necessary info, route flags inproper usage
export async function createDriver(driver) {
    const requestUrl = driverUrl + postCreate
    return await axios.post(requestUrl, driver) // Pass driver object
}

// Edit a given driver --> Assume driver object contains necessary info, route flags inproper usage
export async function editDriver(driver) {
    const requestUrl = driverUrl + postEdit
    return await axios.post(requestUrl, driver) // Pass driver object
}

export async function deleteDriver(driver) {
    const requestUrl = driverUrl + deleteDelete
    return await axios.post(requestUrl, driver) // Pass driver in body
}



// ********* ELDERS *************** 
const clientUrl = baseUrl + '/elders' //changed from clients to elders

// Call the getAlElders route in our backend
export async function getClients() {
    const requestUrl = clientUrl + getList
    return await axios.get(requestUrl)
}

// Retrieve specified Elder by Id
export async function getElderById(id) {
    const requestUrl = clientUrl + getOne + `${id}` // Intended to be manual, users can look up shit this way anyway
    return await axios.get(requestUrl)
}

// Create a new elder --> Assume elder object contains necessary info, route flags inproper usage
export async function createElder(elder) {
    const requestUrl = clientUrl + postCreate
    return await axios.post(requestUrl, elder) // Pass elder object
}

// Edit a given elder --> Assume elder object contains necessary info, route flags inproper usage
export async function editElder(elder) {
    const requestUrl = clientUrl + postEdit
    return await axios.post(requestUrl, elder) // Pass elder object
}

export async function deleteElder(elder) {
    const requestUrl = clientUrl + deleteDelete
    return await axios.post(requestUrl, elder) // Pass id in body
}