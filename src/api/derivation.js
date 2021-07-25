import axios from 'axios';
import store from '@/store'

const API_URL = store.state.api.url;


// CREATE
function storeDerivation(pFormData) {
    const REQUEST = 'api/derivations'
    const headers = { Authorization : `Bearer ${store.state.user.data.token}`}
    return axios.post(`${API_URL}/${REQUEST}`, pFormData, { headers })
}

// READ
function getDerivation(pId) {
    const REQUEST = `api/derivations/${pId}`
    const headers = { Authorization : `Bearer ${store.state.user.data.token}`}
    return axios.get(`${API_URL}/${REQUEST}`, { headers })
}

// function getAllOffices() {
//     const REQUEST = `api/officesall`
//     const headers = { Authorization : `Bearer ${store.state.user.data.token}`}
//     return axios.get(`${API_URL}/${REQUEST}`, { headers })
// }

// UPDATE
function updateDerivation (pId, pFormData) {
    const REQUEST = `api/derivations/${pId}`
    const headers = { Authorization : `Bearer ${store.state.user.data.token}`}
    return axios.post(`${API_URL}/${REQUEST}`, pFormData, { headers })
}


function updateStatusDerivation(pId,pFormData){ 
    const REQUEST = `api/updatestatederivation/${pId}`
    const headers = { Authorization : `Bearer ${store.state.user.data.token}`}
    return axios.post(`${API_URL}/${REQUEST}`, pFormData, { headers })
}

function deleteDerivation(pId){ 
    const REQUEST = `api/derivations/${pId}`
    const headers = { Authorization : `Bearer ${store.state.user.data.token}`}
    return axios.delete(`${API_URL}/${REQUEST}`, { headers })
}

export {
    storeDerivation,
    getDerivation,
    updateDerivation,
    updateStatusDerivation,
    deleteDerivation
}