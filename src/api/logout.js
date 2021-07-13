import axios from 'axios'

function logout( token,pUrl,pFormData) {
    const CONFIG = {
    headers: {   
                'Accept'        : 'application/json',
                'Authorization' :  `Bearer ${token}`
              },       
    }
    return axios.post(`${pUrl}/api/logout`, pFormData, CONFIG)
}

export {
    logout
}