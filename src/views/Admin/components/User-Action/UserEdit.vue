<template>
    <div>

            <b-card v-show="userLoading" class="loader-users" no-body>
                <moon-loader loading :size="60" :color="'#225ba5'" /> 
            </b-card>   
      
            <b-card v-show="isNotFound" class="loader-users" no-body>
                {{errStatus}}
                {{errStatusText}}
            </b-card> 

        <b-container fluid class="mt--3">
            <b-row >
                <b-col cols="12">             
                    <b-card
                        header="EDITAR USUARIO"
                    >
                     <!-- NAME  -->
                        <b-form-row>
                            <b-col>
                                <b-form-group
                                    label="NAME"
                                >
                                    <b-form-input 
                                      type="text"
                                      v-model="name"
                                      :state="inputStatus('name')"
                                  />
                                </b-form-group>
                            </b-col>
                        </b-form-row>

                     <!-- LAST_NAME   -->
                        <b-form-row>
                            <b-col>
                                <b-form-group
                                    label="APELLIDO"
                                >
                                    <b-form-input 
                                      type="text"
                                      v-model="last_name"
                                      :state="inputStatus('last_name')"
                                  />
                                </b-form-group>
                            </b-col>
                        </b-form-row>

                        
                   <!-- PHONE   -->
                        <b-form-row>
                            <b-col>
                                <b-form-group
                                    label="NUMERO DE CELULAR"
                                >
                                   <b-form-input 
                                      type="number"
                                      v-model="phone"
                                      :state="inputStatus('phone')"
                                  />
                                </b-form-group>
                            </b-col>
                        </b-form-row>

                   <!-- TIPO DOCUMENTO   -->
                        <b-form-row>
                            <b-col>
                                <b-form-group
                                    label="TIPO DOCUMENTO"
                                >
                                    <b-form-select
                                        v-model="doc_type"
                                        :options="options"
                                        :state="inputStatus('doc_type')"
                                    />
                                </b-form-group>
                            </b-col>
                        </b-form-row>
                      <!-- NUMERO DE DOCUMENTO  -->
                                <b-form-row>
                                    <b-col>
                                        <b-form-group
                                            label="NUMERO DE DOCUMENTO"
                                        >
                                          <b-form-input 
                                              type="number"
                                              v-model="doc_number"
                                              :state="inputStatus('doc_number')"
                                          />
                                        </b-form-group>
                                    </b-col>
                                </b-form-row>

                      <!-- EMAIL   -->
                        <b-form-row>
                            <b-col>
                                <b-form-group
                                    label="CORREO ELECTRONICO"
                                >
                                <b-form-input 
                                      type="email"
                                      v-model="email"
                                      :state="inputStatus('email')"
                                  />
                                </b-form-group>
                            </b-col>
                        </b-form-row>

                    <!-- PASSWORD   -->
                        <b-form-row>
                            <b-col>
                                <b-form-group
                                    label="CONTRASEÑA"
                                >
                                <b-form-input 
                                      type="password"
                                      v-model="password"
                                      :state="inputStatus('password')"
                                  />
                                </b-form-group>
                            </b-col>
                        </b-form-row>

                       <!-- CONFIRMA PASSWORD   -->
                        <b-form-row>
                            <b-col>
                                <b-form-group
                                    label="CONFIRMA TU CONTRASEÑA"
                                >
                                <b-form-input 
                                      type="password"
                                      v-model="password_confirmation"
                                      :state="inputStatus('password_confirmation')"
                                  />
                                </b-form-group>
                            </b-col>
                        </b-form-row>

                        <b-button @click="cancelEdit">
                          Cancelar
                        </b-button>

                         <b-button @click="ediUser">
                          Actualizar
                        </b-button>

                    </b-card>
                </b-col>
            </b-row>
        </b-container>

    </div>
</template>

<script>
import { storeExpedient } from '@/api/expedient'
import swal from 'sweetalert'

export default {
    data () {
        return {
            state: false,
            exitIdUser: false , 
            userLoading : false , 
            name: '',
            last_name : '',
            phone: '',
            doc_type: 'DNI',
            doc_number: '',
            email: '',
            password: '',
            password_confirmation: '',
            options: [
                { value: 'DNI', text: 'DNI'},
                { value: 'EXTRANJERIA', text: 'EXTRANJERIA' },
            ],
            //
            inputErrors: {},
            //
            inputInitialValues: true,
    

        }
    },

    computed: {
        setHeader () {
            const time = new Date()
            return `${this.document_type}-${time.getDate()}/${time.getMonth() + 1}/${time.getFullYear()}`
        }
    },

    methods: {
        createExpedient () {
            this.inputErrors = {}
            let expedientFormData = new FormData()

            expedientFormData.append('processor_id', this.$store.state.user.data.processor_id)
            expedientFormData.append('document_type', this.document_type)
            expedientFormData.append('header', this.setHeader)
            expedientFormData.append('subject', this.subject)
            expedientFormData.append('folios', this.folios)
            expedientFormData.append('file', this.file)
            expedientFormData.append('status', 'activado')

            // console.log(expedientFormData.get('file'))
            storeExpedient(expedientFormData)
                .then(response => {
                    if (response.status == 201) {
                        swal('Registro exitoso!', `codigo de expediente: ${response.data.data.attributes.code}`, 'success')
                            .then( res => {
                                    console.log(res);

                                switch (res) {
                                    case true:
                                    case null:
                                    case false :
                                        this.$router.push({name: 'externo-tramites-realizados'})
                                        break
                                    default :
                                        console.log('swal break exp')
                                }
                            })
                       this.clearData()
                    }
                })
                .catch(err => {
                    if (err.response){
                        if (err.response.status == 422) {
                            this.inputErrors = err.response.data.errors
                        }
                    }
                })
                .finally(() => {
                    this.inputInitialValues = false
                    console.log('request de exp terminada!');
                })
        },

        showInputErrors(pInput) {
            const errorKeys = Object.keys(this.inputErrors)
            if (errorKeys.includes(pInput)) return this.inputErrors[pInput]
            else return []
        },

        inputStatus(pInput) {
            if (this.inputInitialValues == true ) return null
            else if (Object.keys(this.inputErrors).includes(pInput)) return false
            else return true
        },
    }

}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Bungee&display=swap');
.welcome {
    padding: 0 25px;
    color: white;
    font-family: 'Bungee', cursive;
    font-size: 2.5rem;
    text-align: center;
}
.loader-users {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 400px;
}
</style>