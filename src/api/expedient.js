import axios from 'axios';
import store from '@/store'

const API_URL = store.state.api.url;

function getExpedients(pProcessorId) {
    const REQUEST = `api/processors/${pProcessorId}/expedients`
    const headers = { Authorization : `Bearer ${store.state.user.data.token}`}
    return axios.get(`${API_URL}/${REQUEST}`, { headers })
}
export { getExpedients }