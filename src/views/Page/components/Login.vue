<template>
    <b-container fluid class="py-5">
        <b-row class="justify-content-center">
            <b-col cols="12" sm="10" md="8" lg="6" xl="5">
                <b-card v-show="loginLoading">
                    <moon-loader class="login-loader"/>
                </b-card>
                
                <b-card v-show="!loginLoading">
                    <b-card-title class="text-center borde">LOGIN</b-card-title>

                    <b-form-row>
                        <b-col cols="12" class="borde">
                            <b-form-group
                                label="Correo :">
                                <b-form-input
                                    type="email"
                                    placeholder="Ingrese su correo"
                                    v-model="email">
                                </b-form-input>
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
                                    v-model="password">
                                </b-form-input>
                            </b-form-group>
                        </b-col>
                    </b-form-row>
                        
                    <b-form-row class="justify-content-center borde">
                        <b-col cols="12" sm="12"  class="borde" >
                                <b-button class="col-12" variant="info" @click="login">Entrar</b-button>
                        </b-col>
                    </b-form-row>
                </b-card>
            </b-col>

            <!--  -->
            <b-col cols="12">
                <p> {{ email }} </p>
                <p> {{ password }} </p>
                <p> {{ loginLoading }} </p>
            </b-col>
            <!--  -->
        </b-row>
    </b-container>
</template>

<script>
import { MoonLoader } from '@saeris/vue-spinners'

export default {
    'name': 'Login',

    components: {
        MoonLoader
    },

    data () {
        return {
            'email': '',
            'password': '',
        }
    },

    methods: {
        login() {
            // llama a la accion userLoading definida en VUEX
            this.$store.dispatch('user/userLogin', { 'email':this.email, 'password':this.password}, { root: true})
            // guardar en un stado global con vuex
            
            // guardar en el localstorage

            // redirigir dependiendo del rol del que logeo
        }
    },

    computed: {
        loginLoading () {
            return this.$store.state.user.loading 
        }
    }
}
</script>

<style scoped>
.login-loader {
    margin: auto
}
</style>