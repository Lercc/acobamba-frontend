import axios from 'axios';
import store from '@/store'

const API_URL = store.state.api.url;


// CREATE
function storeSuboffice(pFormData) {
    const REQUEST = 'api/suboffices'
    const headers = { Authorization : `Bearer ${store.state.user.data.token}`}
    return axios.post(`${API_URL}/${REQUEST}`, pFormData, { headers })
}

// READ
function getSuboffices(pPage = 1) {
    const REQUEST = `api/suboffices?page=${pPage}`
    const headers = { Authorization : `Bearer ${store.state.user.data.token}`}
    return axios.get(`${API_URL}/${REQUEST}`, { headers })
}

function getSuboffice(pIdSuboffice) {
    const REQUEST = `api/suboffices/${pIdSuboffice}`
    const headers = { Authorization : `Bearer ${store.state.user.data.token}`}
    return axios.get(`${API_URL}/${REQUEST}`, { headers })
}

// UPDATE
function updateSuboffice (pIdSuboffice, pFormData) {
    const REQUEST = `api/suboffices/${pIdSuboffice}`
    const headers = { Authorization : `Bearer ${store.state.user.data.token}`}
    return axios.post(`${API_URL}/${REQUEST}`, pFormData, { headers })
}
export {
    storeSuboffice,
    getSuboffices,
    getSuboffice,
    updateSuboffice
}