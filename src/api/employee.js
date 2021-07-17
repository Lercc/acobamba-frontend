import axios from 'axios';
import store from '@/store'

const API_URL = store.state.api.url;


function getEmployeeDerivations(pEmployeeId, pPage = 1) {
    const REQUEST = `api/employees/${pEmployeeId}/derivations?page=${pPage}`
    const headers = { Authorization : `Bearer ${store.state.user.data.token}`}
    return axios.get(`${API_URL}/${REQUEST}`, { headers })
}

function getEmployees(pPage = 1) {
    const REQUEST = `api/employees?page=${pPage}`
    const headers = { Authorization : `Bearer ${store.state.user.data.token}`}
    return axios.get(`${API_URL}/${REQUEST}`, { headers })
}


export {
    getEmployeeDerivations, getEmployees
}