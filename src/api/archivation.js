import axios from 'axios';
import store from '@/store'

const API_URL = store.state.api.url;


// CREATE
function storeArchivation (pFormData) {
    const REQUEST = 'api/archivations'
    const headers = { Authorization : `Bearer ${store.state.user.data.token}`}
    return axios.post(`${API_URL}/${REQUEST}`, pFormData, { headers })
}

// READ
function getArchivation(pId) {
    const REQUEST = `api/archivations/${pId}`
    const headers = { Authorization : `Bearer ${store.state.user.data.token}`}
    return axios.get(`${API_URL}/${REQUEST}`, { headers })
}

// function getAllOffices() {
//     const REQUEST = `api/officesall`
//     const headers = { Authorization : `Bearer ${store.state.user.data.token}`}
//     return axios.get(`${API_URL}/${REQUEST}`, { headers })
// }

// UPDATE
// function updateDerivation (pId, pFormData) {
//     const REQUEST = `api/derivations/${pId}`
//     const headers = { Authorization : `Bearer ${store.state.user.data.token}`}
//     return axios.post(`${API_URL}/${REQUEST}`, pFormData, { headers })
// }

export {
    storeArchivation,
    getArchivation
}