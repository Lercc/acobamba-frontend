import axios from 'axios'
// import store from '@/store'

// const API_URL = store.state.api.url

function login(pFormData) {
    
    const headers = {
        // 'Authorization' : `Bearer ${token}`
        'Accept' : 'application/json'
    }

    return axios.post(`http://127.0.0.1:8000/api/login`, pFormData, { headers })
}

export {
    login
}