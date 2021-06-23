<template>
    <b-container fluid class="py-5">
        <b-row class="justify-content-center">
            <b-col cols="12" sm="10" md="8" lg="6" xl="5">
                <b-card>
                    <b-card-title class="text-center border">LOGIN</b-card-title>

                    <b-form-row>
                        <b-col cols="12" class="border">
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
                        <b-col cols="12" class="border">
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
                        
                    <b-form-row class="justify-content-center border">
                        <b-col cols="12" sm="12"  class="border" >
                                <b-button class="col-12">Entrar</b-button>
                        </b-col>
                    </b-form-row>
                </b-card>
            </b-col>

            <!--  -->
            <b-col cols="12">
                <p> {{ email }} </p>
                <p> {{ password }} </p>
            </b-col>
            <!--  -->
        </b-row>
    </b-container>
</template>

<script>
export default {
    'name': 'Login', 
    data () {
        return {
            'email': '',
            'password': '',
        }
    } 
}
</script>

<style>

</style>