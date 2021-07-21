import axios from 'axios';
import store from '@/store'

const API_URL = store.state.api.url;



function getProcessors(pPage = 1) {
    const REQUEST = `api/processors?page=${pPage}`
    const headers = { Authorization : `Bearer ${store.state.user.data.token}`}
    return axios.get(`${API_URL}/${REQUEST}`, { headers })
}

//get
function getProcessor(pIdEmployee) {
    const REQUEST = `api/processors/${pIdEmployee}`
    const headers = { Authorization : `Bearer ${store.state.user.data.token}`}
    return axios.get(`${API_URL}/${REQUEST}`, { headers })
}


// POST
// function storeProcessor(pFormData) {
//     const REQUEST = `api/processors`
//     const headers = { Authorization : `Bearer ${store.state.user.data.token}`}
//     return axios.post(`${API_URL}/${REQUEST}`, pFormData, { headers })
// }
function storeProcessor(pFormData) {
    const REQUEST = `api/register`
    return axios.post(`${API_URL}/${REQUEST}`, pFormData)
}


// UPDATE
function updateProcessor(pIdProcessor, pFormData) {
    const REQUEST = `api/processors/${pIdProcessor}`
    const headers = { Authorization : `Bearer ${store.state.user.data.token}`}
    return axios.post(`${API_URL}/${REQUEST}`, pFormData, { headers })
}


export {
    getProcessors ,getProcessor, storeProcessor ,updateProcessor
}