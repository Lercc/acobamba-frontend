<template>
    <b-container fluid class="py-5">
        <b-row class="justify-content-center">
            <b-col cols="12" sm="10" md="8" lg="6" xl="5">
                <b-card v-show="processorLoading" class="loader-login" no-body>
                    <moon-loader :size="100" :color="'#225ba5'" />
                </b-card>
                
                <b-card v-show="!processorLoading">
                <template #header>
                        <b-row align-h="between" >
                                <b-col cols="auto" >
                                <h2> REGISTRO DE USUARIO </h2>
                                  
                                </b-col>
                            </b-row>
                </template>
                    

              
                      <b-form-row>
                        <b-col>
                            <b-form-group
                                label="Nombre"
                            >
                                <b-form-input 
                                    type="text"
                                    v-model="processorData.attributes.name"
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
                            v-model="processorData.attributes.last_name"
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
                            v-model="processorData.attributes.phone"
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
                            v-model="processorData.attributes.doc_type"
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
                                    v-model="processorData.attributes.doc_number"
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
                            v-model="processorData.attributes.email"
                            :state="showInputStatus('email')"
                        >
                          </b-form-input>
                        <b-form-invalid-feedback v-for="(inputError, index) in showInputErrors('email')" :key="`${index}-input-email`" class="text-danger">
                                    {{ inputError }}
                         </b-form-invalid-feedback>

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
                            v-model="processorData.attributes.password"
                            :state="showInputStatus('password')"
                    >
                      </b-form-input>
                          <b-form-invalid-feedback v-for="(inputError, index) in showInputErrors('password')" :key="`${index}-input-email`" class="text-danger">
                                    {{ inputError }}
                         </b-form-invalid-feedback>
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
                            v-model="processorData.attributes.password_confirmation"
                            :state="showInputStatus('password_confirmation')"
                    >
                      </b-form-input>
                    </b-form-group>
                </b-col>
            </b-form-row>                        
              <b-form-row class="justify-content-center borde">
                        <b-col cols="12" sm="12"  class="borde" >
                                <b-button class="col-12" variant="primary" @click="createProcessor">Registrarse</b-button>
                        </b-col>
                    </b-form-row>
                </b-card>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>

 import {  storeProcessor } from '@/api/processor'
 //import swal from 'sweetalert'

export default {
    'name': 'Register',

    data () {
        return {
            processorLoading : false , 
            processorData : {
                attributes : {
                    id: this.$route.params.id , 
                    name: '',
                    last_name : '',
                    phone: '',
                    doc_type: 'dni',
                    doc_number: '',
                    role_id:1,
                    email: '',
                    password: '',
                    password_confirmation: '',
                    status: 'activado'
                }
            }, 
            doc_typeOptions: [
                   { value: 'dni', text: 'dni'},
                   { value: 'extranjeria', text: 'extranjeria'}    
            ],
               inputErrors: {},
            inputInitialValues: true,
          
        }
    },

    methods: {
        createProcessor(){
           this.inputErrors = {}

            const processorFormData =  new FormData()
                processorFormData.append('.method','post')  
                processorFormData.append('name', this.processorData.attributes.name) 
                processorFormData.append('last_name' , this.processorData.attributes.last_name ) 
                processorFormData.append('role_id',3) 
                processorFormData.append('phone',this.processorData.attributes.phone )
                processorFormData.append('doc_type',this.processorData.attributes.doc_type)
                processorFormData.append('doc_number',this.processorData.attributes.doc_number)
                processorFormData.append('email',this.processorData.attributes.email)
                processorFormData.append('password',this.processorData.attributes.password)
                processorFormData.append('password_confirmation',this.processorData.attributes.password_confirmation)
                processorFormData.append('status',this.processorData.attributes.status)


                storeProcessor(processorFormData)
                    .then(response => {
                        if(response.data.data){
                            this.processorData  =  response.data.data
                        //    swal('¡Registro correcto!', 'Ok', 'success')
                            //     .then( res =>{
                            //         if(res == null || res == true || res == false)
                            //             this.$router.push({name:'users-externos'})
                            // })   
                            this.$router.push({name:'users-externos'})
                            console.log(response)   
                        }       
                             
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

    },

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