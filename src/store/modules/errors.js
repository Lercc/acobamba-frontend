export default  {
    namespaced: true,
    state: {
       globalRequestErrorMessage: ''
    },

    mutations: {
        SET_GLOBAL_ERROR_MESSAGE (state, payload) {
            state.globalRequestErrorMessage = payload
        },
        DELETE_GLOBAL_ERROR_MESSAGE (state) {
            state.globalRequestErrorMessage = ''
        }
    },
};