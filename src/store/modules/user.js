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
        },
        SET_INPUT_ERRORS (state, payload) {
            state.inputErrors = payload
        },
        DELETE_INPUT_ERRORS (state, payload) {
            state.inputErrors = payload
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
            context.commit('DELETE_INPUT_ERRORS', {})

            // peticion api-login
            let userFormData = new FormData()
            userFormData.append('email', payload.email)
            userFormData.append('password', payload.password)

            login(userFormData)
                .then( response => {
                    console.log('HERE 1', response);
                })
                .catch( err => {
                    // console.log('HERE 2', err)
                    if (err.response) {
                        console.log(err.response.data.errors)
                        context.commit('SET_INPUT_ERRORS', err.response.data.errors)
                    }
                })
                .finally(() => {
                    context.commit('SET_LOADING_STATE', false)
                })
        }
    }
    
};