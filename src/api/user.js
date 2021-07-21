import axios from 'axios';
import store from '@/store'

const API_URL = store.state.api.url;

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

function getUser(pIdUser) {
    const REQUEST = `api/users/${pIdUser}`
    const headers = { Authorization : `Bearer ${store.state.user.data.token}`}
    return axios.get(`${API_URL}/${REQUEST}`, { headers })
}

// UPDATE
function updateUser(pIdUser, pFormData) {
    const REQUEST = `api/users/${pIdUser}`
    const headers = { Authorization : `Bearer ${store.state.user.data.token}`}
    return axios.post(`${API_URL}/${REQUEST}`, pFormData, { headers })
}





export { getUserDerivations, getUserArchivations,getUsers,getUser,updateUser }