import axios from 'axios';
import store from '@/store'

const API_URL = store.state.api.url;

// UPDATE
function updateRecoveryPassword(pIdUser, pFormData) {
    const REQUEST = `api/updateRecoveryPassword/${pIdUser}`
    return axios.post(`${API_URL}/${REQUEST}`, pFormData)
}





export {
    updateRecoveryPassword
}