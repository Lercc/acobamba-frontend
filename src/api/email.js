import axios from 'axios';
import store from '@/store'

const API_URL = store.state.api.url;


// CREATE
function storeEmailPasswordRecovery (pFormData) {
    const REQUEST = 'api/email-password-recovery'
    return axios.post(`${API_URL}/${REQUEST}`, pFormData)
}

// READ
function getEmailPasswordRecovery(pEmailId) {
    const REQUEST = `api/email-password-recovery/${pEmailId}`
    return axios.get(`${API_URL}/${REQUEST}`)
}

export {
    storeEmailPasswordRecovery,
    getEmailPasswordRecovery
}