import axios from 'axios';
import store from '@/store'

const API_URL = store.state.api.url;


// CREATE
function storeExpedient(pFormData) {
    const REQUEST = 'api/expedients'
    const headers = { Authorization : `Bearer ${store.state.user.data.token}`}
    return axios.post(`${API_URL}/${REQUEST}`, pFormData, { headers })
}

// READ
function getExpedients(pProcessorId, pPage = 1) {
    const REQUEST = `api/processors/${pProcessorId}/expedients?page=${pPage}`
    const headers = { Authorization : `Bearer ${store.state.user.data.token}`}
    return axios.get(`${API_URL}/${REQUEST}`, { headers })
}

function getExpedient(pExpedientId) {
    const REQUEST = `api/expedients/${pExpedientId}`
    const headers = { Authorization : `Bearer ${store.state.user.data.token}`}
    return axios.get(`${API_URL}/${REQUEST}`, { headers })
}

function getExpedientsDerivations(pExpedientId) {
    const REQUEST = `api/expedients/${pExpedientId}/derivations`
    const headers = { Authorization : `Bearer ${store.state.user.data.token}`}
    return axios.get(`${API_URL}/${REQUEST}`, { headers })
}

function getExpedientsArchivations(pExpedientId) {
    const REQUEST = `api/expedients/${pExpedientId}/archivations`
    const headers = { Authorization : `Bearer ${store.state.user.data.token}`}
    return axios.get(`${API_URL}/${REQUEST}`, { headers })
}
export { 
    storeExpedient,
    getExpedients,
    getExpedient,
    getExpedientsDerivations,
    getExpedientsArchivations
}