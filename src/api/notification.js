import axios from 'axios';
import store from '@/store'

const API_URL = store.state.api.url;

function getProcessorNotifications (pProcessorId) {
    const REQUEST = `api/list/processors/${pProcessorId}/notifications`
    const headers = { Authorization : `Bearer ${store.state.user.data.token}`}
    return axios.get(`${API_URL}/${REQUEST}`, { headers})
}

function getEmployeeNotifications (pEmployeeId) {
    const REQUEST = `api/list/employees/${pEmployeeId}/notifications`
    const headers = { Authorization : `Bearer ${store.state.user.data.token}`}
    return axios.get(`${API_URL}/${REQUEST}`, { headers})
}



export { 
    getProcessorNotifications,
    getEmployeeNotifications
 }