import axios from 'axios';
import store from '@/store'

const API_URL = store.state.api.url;

function getNotification() {
    const REQUEST = `api/notifications`
    const headers = { Authorization : `Bearer ${store.state.user.data.token}`}
    return axios.get(`${API_URL}/${REQUEST}`, { headers})
}

function getUserDerivations(pUserId, pPage = 1) {
    const REQUEST = `api/users/${pUserId}/derivations?page=${pPage}`
    const headers = { Authorization : `Bearer ${store.state.user.data.token}`}
    return axios.get(`${API_URL}/${REQUEST}`, { headers })
}


function getUserArchivations(pUserId, pPage = 1) {
    const REQUEST = `api/users/${pUserId}/archivations?page=${pPage}`
    const headers = { Authorization : `Bearer ${store.state.user.data.token}`}
    return axios.get(`${API_URL}/${REQUEST}`, { headers })
}

function getUsers(pPage = 1) {
    const REQUEST = `api/users?page=${pPage}`
    const headers = { Authorization : `Bearer ${store.state.user.data.token}`}
    return axios.get(`${API_URL}/${REQUEST}`, { headers })
}





export { getNotification ,getUserDerivations, getUserArchivations,getUsers }