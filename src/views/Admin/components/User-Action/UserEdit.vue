<template>
    <div>

            <b-card v-show="userLoading" class="loader-users" no-body>
                <moon-loader loading :size="60" :color="'#225ba5'" /> 
            </b-card>   
      
            <b-card v-show="isNotFound" class="loader-users" no-body>
                {{errStatus}}
                {{errStatusText}}
            </b-card> 

            <b-card v-show="!userLoading  && !isNotFound">
                <template #header>
                        <b-row align-h="between">
                                <b-col cols="auto">
                                    EDITAR ADMINISTRADOR
                                </b-col>
                                <b-col cols="auto">
                                    <b-button @click="cargarDatos" variant="success" size="sm">recargar</b-button>
                                </b-col>
                            </b-row>
                </template>

            <b-form-row>
                <b-col>
                    <b-form-group
                        label="NAME"
                    >
                        <b-form-input 
                            type="text"
                            v-model="userData.attributes.name"
                            :state="showInputStatus('name')"
                        >
                        </b-form-input>
                        <b-form-invalid-feedback v-for="(inputError, index) in showInputErrors('name')" :key="`${index}-input-name`" class="text-danger">
                            {{ inputError }}
                        </b-form-invalid-feedback>
                    </b-form-group>
                </b-col>
            </b-form-row>

            <!-- LAST_NAME   -->
            <b-form-row>
                <b-col>
                    <b-form-group
                        label="APELLIDOS"
                    >
                        <b-form-input 
                            type="text"
                            v-model="userData.attributes.last_name"
                            :state="showInputStatus('last_name')"
                        >
                          </b-form-input>
                            <b-form-invalid-feedback v-for="(inputError, index) in showInputErrors('last_name')" :key="`${index}-input-last_name`" class="text-danger">
                            {{ inputError }}
                           </b-form-invalid-feedback>
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
                            v-model="userData.attributes.phone"
                            :state="showInputStatus('phone')"
                        >
                          </b-form-input>

                         <b-form-invalid-feedback v-for="(inputError, index) in showInputErrors('phone')" :key="`${index}-input-phone`" class="text-danger">
                            {{ inputError }}
                           </b-form-invalid-feedback>

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
                            v-model="userData.attributes.doc_type"
                            :options= "doc_typeOptions"
                            :state="showInputStatus('doc_type')"
                        >      
                        </b-form-select>

                        <b-form-invalid-feedback v-for="(inputError, index) in showInputErrors('doc_type')" :key="`${index}-input-doc_type`" class="text-danger">
                            {{ inputError }}
                        </b-form-invalid-feedback>

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
                                    v-model="userData.attributes.doc_number"
                                    :state="showInputStatus('doc_number')"
                                >
                                  </b-form-input>
                                  <b-form-invalid-feedback v-for="(inputError, index) in showInputErrors('doc_number')" :key="`${index}-input-doc_number`" class="text-danger">
                                    {{ inputError }}
                                </b-form-invalid-feedback>
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
                                v-model="userData.attributes.email"
                                :state="showInputStatus('email')"
                            >
                            </b-form-input>
                            <b-form-invalid-feedback v-for="(inputError, index) in showInputErrors('email')" :key="`${index}-input-email`" class="text-danger">
                                        {{ inputError }}
                            </b-form-invalid-feedback>

                        </b-form-group>
                    </b-col>
                </b-form-row>
                <b-form-row>
                    <b-col>
                        <b-form-group
                        label="ESTADO"
                        >
                        <b-form-select
                            v-model="userData.attributes.status"
                            :options="statusOptions"
                            :state="showInputStatus('status')"
                        >
                        </b-form-select>

                        <b-form-invalid-feedback v-for="(inputError, index) in showInputErrors('status')" :key="`${index}-input-status`" class="text-danger">
                            {{ inputError }}
                        </b-form-invalid-feedback>
                        </b-form-group>
                    </b-col>
              </b-form-row>

      <b-form-row >
          <b-col class="d-flex justify-content-center">
            <b-button variant="info" @click="updateDateUser">ACTUALIZAR</b-button>
          </b-col>
        </b-form-row>

        </b-card>

    </div>
</template>

<script>
import { getUser, updateUser } from '@/api/user'
import swal from 'sweetalert'

export default {
    data () {
        return {
            userLoading : false , 
            errStatus: '',
            errStatusText: '',
            isNotFound: false,
            userData : {
                attributes : {
                    id: this.$route.params.id , 
                    name: '',
                    last_name : '',
                    phone: '',
                    doc_type: 'DNI',
                    doc_number: '',
                    email: '',
                    status: ''
                }
            }, 

            statusOptions: [
                  { value: 'activado', text: 'activado'},
                   { value: 'desactivado', text: 'desactivado'}    
            ],
            //
            doc_typeOptions: [
                   { value: 'dni', text: 'dni'},
                   { value: 'extranjeria', text: 'extranjeria'}    
            ],
            inputErrors: {},
            //
            inputInitialValues: true,
    

        }
    },

      beforeMount () {
        this.cargarDatos()
    },


    methods: {
         cargarDatos () {
            this.userLoading = true
            this.inputsInitialValues = true
            this.inputErrors = {}

            getUser (this.$route.params.id)
                .then(response => {
                    if (response.data.data) this.userData = response.data.data
                })
                .catch(err => {
                    if (err.response.status == 404)
                        this.isNotFound = true
                        this.errStatus = err.response.status
                        this.errStatusText = err.response.statusText
                })
                .finally(() => {
                    this.userLoading = false
                    console.log('peticion office terminada!');
                })
            },

            updateDateUser(){
                this.inputErrors = {}

                const userFormData =  new FormData()
                    userFormData.append('.method','put')  
                    userFormData.append('id', this.userData.attributes.id) 
                    userFormData.append('name', this.userData.attributes.name) 
                    userFormData.append('last_name' , this.userData.attributes.last_name ) 
                    userFormData.append('phone',this.userData.attributes.phone )
                    userFormData.append('doc_type',this.userData.doc_type)
                    userFormData.append('doc_number',this.userData.attributes.doc_number)
                    userFormData.append('email',this.userData.attributes.email)
                    userFormData.append('status',this.userData.attributes.status)
     
     
                updateUser(this.$route.params.id,userFormData)
                    .then(response => {
                        if(response.data.data)
                            this.userData  =  response.data.data
                            swal('¡Actualización correcta!', 'Ok', 'success')
                                .then( res =>{
                                     if(res == null || res == true || res == false)
                                        this.$router.push({name:'users'})
                                })
                    })
                    .catch(err => {
                        console.log(err.response);
                        if(err.response.status == 422) this.inputErrors = err.response.data.errors
                    })
                    .finally( () => {
                        this.inputInitialValues = false
                        console.log('peticion update office terminada!');
                    })
            }, 

        showInputErrors(pInput) {
            if(Object.keys(this.inputErrors).includes(pInput)) return this.inputErrors[pInput]
            else return []
        },

        showInputStatus(pInput) {
            if (this.inputInitialValues) return null
            else if (Object.keys(this.inputErrors).includes(pInput)) return !true
            else return !false
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