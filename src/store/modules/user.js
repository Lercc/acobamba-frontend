import { login } from '@/api/login'

const userInitialData = () => {
    if (localStorage.getItem('userData')) {
        return JSON.parse(localStorage.getItem('userData'))
    } else {
        return {}
    }
}

export default {
    namespaced: true,
    state: {
       loading: false,
       data: userInitialData(),
       apiRequestErrorMessage: '',
       inputErrors: {}
    },
    mutations: {
        SET_LOADING_STATE (state, payload) {
            state.loading = payload
        },

        SET_USER_DATA (state, payload) {
            state.data = payload
            localStorage.setItem('userData', JSON.stringify(payload))
        },
        DELETE_USER_DATA (state) {
            state.data = {}
        },

        SET_API_REQUEST_ERROR_MESSAGE (state, payload) {
            state.apiRequestErrorMessage = payload
        },
        DELETE_API_REQUEST_ERROR_MESSAGE (state) {
            state.apiRequestErrorMessage = ''
        },

        SET_INPUT_ERRORS (state, payload) {
            state.inputErrors = payload
        },
        DELETE_INPUT_ERRORS (state) {
            state.inputErrors = {}
        }
    },
    actions: {
        userLogin (context, payload) {
            context.commit('SET_LOADING_STATE', true)
            context.commit('DELETE_INPUT_ERRORS')
            context.commit('DELETE_API_REQUEST_ERROR_MESSAGE')
            context.commit('errors/DELETE_GLOBAL_ERROR_MESSAGE', '', { root: true })

            // petición api-login
            let userFormData = new FormData()
            userFormData.append('email', payload.email)
            userFormData.append('password', payload.password)

            login(context.rootState.api.url, userFormData)
                .then( response => {
                    context.commit('SET_USER_DATA', response.data.attributes)
                })
                .catch( err => {
                    if (err.response) {
                        if (err.response.status == 422) {
                            context.commit('SET_INPUT_ERRORS', err.response.data.errors)
                        } else {
                            context.commit('SET_API_REQUEST_ERROR_MESSAGE', err.response.data.message)
                        }
                    } else {
                        context.commit('errors/SET_GLOBAL_ERROR_MESSAGE', `${err.name} : ${err.message}`, { root: true })
                    }
                })
                .finally(() => {
                    context.commit('SET_LOADING_STATE', false)
                }) 
        }
    }
};