import axios from 'axios';
import store from '@/store'

const API_URL = store.state.api.url;

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
    getExpedients,
    getExpedient,
    getExpedientsDerivations,
    getExpedientsArchivations
}