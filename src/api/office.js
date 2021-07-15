import axios from 'axios';
import store from '@/store'

const API_URL = store.state.api.url;


// CREATE
// function storeExpedient(pFormData) {
//     const REQUEST = 'api/expedients'
//     const headers = { Authorization : `Bearer ${store.state.user.data.token}`}
//     return axios.post(`${API_URL}/${REQUEST}`, pFormData, { headers })
// }

// READ
function getOffices(pPage = 1) {
    const REQUEST = `api/offices?page=${pPage}`
    const headers = { Authorization : `Bearer ${store.state.user.data.token}`}
    return axios.get(`${API_URL}/${REQUEST}`, { headers })
}
export { 
    getOffices
}