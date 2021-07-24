<template>
    <b-container fluid class="py-5">
        <b-row class="justify-content-center">
            <b-col cols="12" sm="10" md="8" lg="6" xl="5">
                <b-card v-show="loginLoading" class="loader-login" no-body>
                    <moon-loader :size="100" :color="'#225ba5'" />
                </b-card>
                
                <b-card v-show="!loginLoading">
                    <b-card-title class="text-center borde">LOGIN</b-card-title>

                    <b-alert variant="danger" :show="showErrorAlert">
                        {{ apiRequestErrorMessage }}
                    </b-alert>

                    <b-form-row>
                        <b-col cols="12" class="borde">
                            <b-form-group
                                label="Correo :">
                                <b-form-input
                                    type="email"
                                    placeholder="Ingrese su correo"
                                    v-model="email"
                                    :state="inputStatus('email')"
                                    @keypress="registrarTest"
                                    >
                                </b-form-input>

                                <b-form-invalid-feedback 
                                    v-for="(showInputError, index) in  showInputErrors('email')"
                                    :key="`email-${index}`"
                                    class="text-danger">
                                    {{ showInputError }}
                                </b-form-invalid-feedback>
                            </b-form-group>
                        </b-col>
                    </b-form-row>

                    <b-form-row>
                        <b-col cols="12" class="borde">
                            <b-form-group
                                label="Contraseña">
                                <b-form-input
                                    type="password"
                                    placeholder="Ingrese su contraseña"
                                    v-model="password"
                                    :state="inputStatus('password')"
                                    @keypress="registrarTest"
                                    >
                                </b-form-input>
                                
                                <b-form-invalid-feedback
                                    v-for="(showInputError, index) in showInputErrors('password')"
                                    :key="`password-${index}`"
                                    class="text-danger">
                                    {{ showInputError }}
                                </b-form-invalid-feedback>
                            </b-form-group>
                        </b-col>
                    </b-form-row>
                        
                    <b-form-row class="justify-content-center borde">
                        <b-col cols="12" sm="12"  class="borde" >
                                <b-button class="col-12" variant="primary" @click="login">Entrar</b-button>
                        </b-col>
                    </b-form-row>

                     <b-form-row class="justify-content-center borde mt-5">
                        <b-col cols="12" sm="12"  class="borde" >
                              <h2 class="text-center" >¿Aún no tienes una cuenta? <b-button class="ml-3" variant="warning" :to="{name: 'register'}" >Registrate AQUÍ</b-button></h2>   
                        </b-col>
                    </b-form-row>

                      <b-form-row class="justify-content-center borde mt-5">
                        <b-button :to="{name: 'ddd'}" variant="link">¿Olvidates tu contraseña  ?</b-button>
                    </b-form-row>

                </b-card>
            </b-col>

            <!--  -->
            <b-col cols="12">
                <p>  </p>
            </b-col>
            <!--  -->
        </b-row>
    </b-container>
</template>

<script>
import { MoonLoader } from '@saeris/vue-spinners'
import { mapState } from 'vuex'
// import swal from 'sweetalert'

export default {
    'name': 'Login',

    components: {
        MoonLoader
    },

    data () {
        return {
            email: '',
            password: '',
            // 
            showErrorAlert: false,
            //
            inputInitialValues: true
        }
    },

    methods: {
        login () {
            this.inputInitialValues = false
            // llama a la accion userLoading definida en VUEX
            this.$store.dispatch('user/userLogin', { 'email':this.email, 'password':this.password }, { root: true})
            // redirigir dependiendo del rol del que logeo

           
        },

        showInputErrors (pInputName) {
            // let inputKeys = Object.keys(this.inputErrors)
            // let errorByInput = inputKeys.includes(pInputName)
            if (Object.keys(this.inputErrors).includes(pInputName)) return this.inputErrors[pInputName]
            else return []
        },

        // retorna true/false/null para el valor status del input
        inputStatus (pInputValue) {
            if (this.inputInitialValues || this.$store.state.errors.globalRequestErrorMessage != '') {
                return null
            } else {
                if (this.$store.state.user.apiRequestErrorMessage != '') {
                    return false
                } else {
                    return !Object.keys(this.inputErrors).includes(pInputValue)
                }
            }
        },

        registrarTest (e) {
            if (e.keyCode === 13) this.login()
        }

    },

    computed: {
        ...mapState('user', ['data']),

        loginLoading () {
            return this.$store.state.user.loading 
        },
        inputErrors () {
            return this.$store.state.user.inputErrors
        },
        apiRequestErrorMessage () {
            return this.$store.state.user.apiRequestErrorMessage
        },
    },

    watch: {
        apiRequestErrorMessage () {
            if (this.$store.state.user.apiRequestErrorMessage != '') {
                this.showErrorAlert = true
            } else {
                this.showErrorAlert = false
            }
        },
        data () {
            if (Object.keys(this.data).length !== 0 ) {
                if (this.data) {
                    switch (this.data.role) {
                        case 'Admin':
                            this.$router.push({ name : 'admin' })
                            break;
                        case 'Interno':
                            this.$router.push({ name : 'interno' })
                            break;
                        case 'Externo':
                            this.$router.push({ name : 'externo' })
                            break;
                        default:
                            console.log('LOGIN BREAK')
                            break;
                    }
                }
            }
        }
    }
}
</script>

<style scoped>
.loader-login {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 400px;
}
</style>