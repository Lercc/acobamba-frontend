import axios from 'axios';
import store from '@/store'

const API_URL = store.state.api.url;


// CREATE
function storeOffice(pFormData) {
    const REQUEST = 'api/offices'
    const headers = { Authorization : `Bearer ${store.state.user.data.token}`}
    return axios.post(`${API_URL}/${REQUEST}`, pFormData, { headers })
}

// READ
function getAllOffices() {
    const REQUEST = `api/officesall`
    const headers = { Authorization : `Bearer ${store.state.user.data.token}`}
    return axios.get(`${API_URL}/${REQUEST}`, { headers })
}

function getOffices(pPage = 1) {
    const REQUEST = `api/offices?page=${pPage}`
    const headers = { Authorization : `Bearer ${store.state.user.data.token}`}
    return axios.get(`${API_URL}/${REQUEST}`, { headers })
}

function getOffice(pIdOffice) {
    const REQUEST = `api/offices/${pIdOffice}`
    const headers = { Authorization : `Bearer ${store.state.user.data.token}`}
    return axios.get(`${API_URL}/${REQUEST}`, { headers })
}

// UPDATE
function updateOffice (pIdOffice, pFormData) {
    const REQUEST = `api/offices/${pIdOffice}`
    const headers = { Authorization : `Bearer ${store.state.user.data.token}`}
    return axios.post(`${API_URL}/${REQUEST}`, pFormData, { headers })
}
export {
    storeOffice,
    getAllOffices,
    getOffices,
    getOffice,
    updateOffice
}