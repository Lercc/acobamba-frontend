import { login } from '@/api/login'

export default  {
    namespaced: true,
    state: {
       loading: false,
       data: {},
       errors: {},
       inputErrors: {}
        // data: {},
        // type: 'user'
    },
    mutations: {
        SET_LOADING_STATE (state, payload) {
            state.loading = payload
        },
        SET_USER_DATA (state, payload) {
            state.data = payload
       }
       
        // setUserStoreData(state, payload) {
        //     state.data = payload

        //     localStorage.setItem('usuario',JSON.stringify(payload))
        // },
        // clearUserStoreData(state, payload) {
        //     state.data = payload

        //     localStorage.removeItem("usuario");
        // }
    },
    actions: {
        userLogin (context, payload) {
            context.commit('SET_LOADING_STATE', true)

            // peticion api-login
            let userFormData = new FormData()
            userFormData.append('email', payload.email)
            userFormData.append('password', payload.password)

            login(userFormData)
                .then( response => {
                    console.log(response);
                })
                .catch( err => {
                    console.log(err)
                })
                .finally(() => {
                    context.commit('SET_LOADING_STATE', false)
                })
        }
    }
    
};