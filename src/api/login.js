import axios from 'axios'
// import store from '@/store'

// const API_URL = store.state.api.url

function login(pUrl, pFormData) {
    const CONFIG = {
        headers: {
            'Accept': 'application/json'
            // 'Authorization' : `Bearer ${token}`
        }
    }
    return axios.post(`${pUrl}/api/login`, pFormData, CONFIG)
    // return axios.post(`http://127.0.0.1:8000/api/login`, pFormData, CONFIG)
}

export {
    login
}