import axios from 'axios';
import store from '@/store'

const API_URL = store.state.api.url;

// UPDATE
function updateRecoveryPassword(pIdUser, pFormData) {
    const REQUEST = `api/updateRecoveryPassword/${pIdUser}`
    return axios.post(`${API_URL}/${REQUEST}`, pFormData)
}

function updateCurrentPassword(pIdUser, pFormData) {
    const REQUEST = `api/updateCurrentPassword/${pIdUser}`
    const headers = { Authorization : `Bearer ${store.state.user.data.token}`}
    return axios.post(`${API_URL}/${REQUEST}`, pFormData, { headers })
}

function updateUserPassword(pIdUser, pFormData) {
    const REQUEST = `api/updateUserPassword/${pIdUser}`
    const headers = { Authorization : `Bearer ${store.state.user.data.token}`}
    return axios.post(`${API_URL}/${REQUEST}`, pFormData, { headers })
}

export {
    updateRecoveryPassword,
    updateCurrentPassword,
    updateUserPassword
}