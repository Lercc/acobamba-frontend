import axios from 'axios';
import store from '@/store'

const API_URL = store.state.api.url;



function getProcessors(pPage = 1) {
    const REQUEST = `api/processors?page=${pPage}`
    const headers = { Authorization : `Bearer ${store.state.user.data.token}`}
    return axios.get(`${API_URL}/${REQUEST}`, { headers })
}


export {
    getProcessors
}