import axios from 'axios'

function login(pUrl, pFormData) {
    const CONFIG = {
        headers: { 'Accept': 'application/json' }
    }
    return axios.post(`${pUrl}/api/login`, pFormData, CONFIG)
}

export {
    login
}