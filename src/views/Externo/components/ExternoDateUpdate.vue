<template>
    <div>
    
        <b-card v-show="processorLoading" class="loader-processors" no-body>
            <moon-loader loading :size="60" :color="'#225ba5'" /> 
        </b-card>  

            <b-card v-show="isNotFound" class="loader-userInternos" no-body>
            {{errStatus}}
            {{errStatusText}}
        </b-card> 

        <b-card v-show="!processorLoading " >

        <div v-if="this.processorData.attributes.dni_represent" >
           <base-header type="gradient-info" class="pb-6 pb-8 pt-5 pt-md-8">
            <b-row >
                    <b-col class="justify-content-center pb-5">
                        <p class="welcome">EDITAR ENTIDAD </p>
                    </b-col>
             </b-row>
          </base-header>

                  
          <b-container fluid class="mt--6">
            <b-row>
               <b-col cols="12">      
                <b-card>
         
                    <b-form-row>
                        <b-col cols="12" sm="6" >
                            <b-form-group
                                label="NOMBRE DE LA EMPRESA"
                            >
                                <b-form-input 
                                    type="text"
                                    v-model="processorData.attributes.user_name"
                                    :state="showInputStatus('user_name')"
                                >
                                </b-form-input>
                                <b-form-invalid-feedback v-for="(inputError, index) in showInputErrors('user_name')" :key="`${index}-input-user_name`" class="text-danger">
                                    {{ inputError }}
                                </b-form-invalid-feedback>
                            </b-form-group>
                        </b-col>
                        
                        <b-col cols="12" sm="6" >
                            <b-form-group
                                label="APELLIDOS"
                            >
                                <b-form-input 
                                    type="text"
                                    v-model="processorData.attributes.user_last_name"
                                    :state="showInputStatus('user_last_name')"
                                >
                                </b-form-input>
                                    <b-form-invalid-feedback v-for="(inputError, index) in showInputErrors('user_last_name')" :key="`${index}-input-user_last_name`" class="text-danger">
                                    {{ inputError }}
                                </b-form-invalid-feedback>
                            </b-form-group>
                        </b-col>
                    </b-form-row>


                    <!-- EMAIL   -->
                    <b-form-row>
                        <b-col cols="12" sm="6" >
                            <b-form-group
                                label="CORREO ELECTRONICO"
                            >
                            <b-form-input 
                                    type="email"
                                    v-model="processorData.attributes.user_email"
                                    :state="showInputStatus('user_email')"
                                >
                                </b-form-input>
                                <b-form-invalid-feedback v-for="(inputError, index) in showInputErrors('user_email')" :key="`${index}-input-email`" class="text-danger">
                                            {{ inputError }}
                                </b-form-invalid-feedback>

                            </b-form-group>
                        </b-col>
                        
                        <b-col cols="12" sm="6" >
                            <b-form-group
                                label="DNI DEL REPRESENTANTE"
                            >
                                <b-form-input 
                                    type="text"
                                    v-model="processorData.attributes.dni_represent"
                                    :state="showInputStatus('dni_represent')"
                                >
                                </b-form-input>
                                    <b-form-invalid-feedback v-for="(inputError, index) in showInputErrors('dni_represent')" :key="`${index}-input-dni_represent`" class="text-danger">
                                    {{ inputError }}
                                </b-form-invalid-feedback>
                            </b-form-group>
                        </b-col>
                    </b-form-row>

                    <b-form-row >
                        <b-col class="d-flex justify-content-center">
                            <b-button variant="info" @click="updateDateProcessor">ACTUALIZAR</b-button>
                        </b-col>
                      </b-form-row>
                </b-card>
                    </b-col>    
                </b-row>             
             </b-container>
                </div>

            <div v-else>
                <base-header type="gradient-info" class="pb-6 pb-8 pt-5 pt-md-8">
                     <b-row >
                        <b-col class="justify-content-center pb-5">
                            <p class="welcome">EDITAR USUARIO </p>
                        </b-col>
                    </b-row>
                </base-header>

              <b-container fluid class="mt--6">
                <b-row>

                <b-col cols="12" >
                  <b-card>        
                    <b-form-row>
                        <b-col cols="12" sm="6">
                            <b-form-group
                                label="NOMBRES"
                            >
                                <b-form-input 
                                    type="text"
                                    v-model="processorData.attributes.user_name"
                                    :state="showInputStatus('user_name')"
                                >
                                </b-form-input>
                                <b-form-invalid-feedback v-for="(inputError, index) in showInputErrors('user_name')" :key="`${index}-input-user_name`" class="text-danger">
                                    {{ inputError }}
                                </b-form-invalid-feedback>

                                
                            </b-form-group>                            
                        </b-col>
                        <b-col cols="12" sm="6">
                          <b-form-group
                                label="APELLIDOS"
                            >
                                <b-form-input 
                                    type="text"
                                    v-model="processorData.attributes.user_last_name"
                                    :state="showInputStatus('user_last_name')"
                                >
                                </b-form-input>
                                    <b-form-invalid-feedback v-for="(inputError, index) in showInputErrors('user_last_name')" :key="`${index}-input-user_last_name`" class="text-danger">
                                    {{ inputError }}
                                </b-form-invalid-feedback>
                            </b-form-group>

                        </b-col>
                    </b-form-row>
                    
                    <b-form-row>
                        <b-col cols="12" sm="6" >
                            <b-form-group
                                label="TIPO DE DOCUMENTO"
                            >
                                <b-form-input 
                                    type="text"
                                    v-model="processorData.attributes.user_doc_type"
                                    :state="showInputStatus('user_doc_type')"
                                >
                                </b-form-input>
                                <b-form-invalid-feedback v-for="(inputError, index) in showInputErrors('user_doc_type')" :key="`${index}-input-user_doc_type`" class="text-danger">
                                    {{ inputError }}
                                </b-form-invalid-feedback>

                                
                            </b-form-group>                            
                        </b-col>
                        <b-col cols="12" sm="6" >
                          <b-form-group
                                label="NÚMERO DE DOCUMENTO"
                            >
                                <b-form-input 
                                    type="text"
                                    v-model="processorData.attributes.user_doc_number"
                                    :state="showInputStatus('user_doc_number')"
                                >
                                </b-form-input>
                                    <b-form-invalid-feedback v-for="(inputError, index) in showInputErrors('user_doc_number')" :key="`${index}-input-user_doc_number`" class="text-danger">
                                    {{ inputError }}
                                </b-form-invalid-feedback>
                            </b-form-group>

                        </b-col>
                    </b-form-row>

                    <!-- EMAIL   -->
                    <b-form-row>
                        <b-col cols="12" sm="6">
                            <b-form-group
                                label="CORREO ELECTRONICO"
                            >
                            <b-form-input 
                                    type="email"
                                    v-model="processorData.attributes.user_email"
                                    :state="showInputStatus('user_email')"
                                >
                                </b-form-input>
                                <b-form-invalid-feedback v-for="(inputError, index) in showInputErrors('user_email')" :key="`${index}-input-email`" class="text-danger">
                                            {{ inputError }}
                                </b-form-invalid-feedback>

                            </b-form-group>
                        </b-col>
                           <b-col>
                            </b-col>
                    </b-form-row>

                    <b-form-row class="mt-5" >
                        <b-col class="d-flex justify-content-center">
                            <b-button variant="primary" @click="updateDateProcessor">ACTUALIZAR</b-button>
                        </b-col>
                    </b-form-row>
                    
                 </b-card>
                </b-col>
            </b-row>
        </b-container>
        </div>            

        </b-card>

    </div>
</template>

<script>
import { getProcessor , updateProcessor } from '@/api/processor'
import swal from 'sweetalert'

export default {
    data () {
        return {
            processorLoading : false , 
             errStatus: '',
            errStatusText: '',
            isNotFound: false,
            processorData : {
                attributes : {
                    id: this.$store.state.user.data.processor_id, 
                    user_name: '',
                    user_last_name : '',
                    user_email: '',
                    user_doc_type: '',
                    user_doc_number: '',
                    user_status: 'activado',
                    dni_represent:''
                }
            }, 
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
            this.userExternoLoading = true
            this.inputsInitialValues = true
            this.inputErrors = {}      

            getProcessor (this.$store.state.user.data.processor_id)
                    
                .then(response => {
                    if (response.data.data) this.processorData = response.data.data
                })
                .catch(err => {
                    if (err.response.status == 404)
                        this.isNotFound = true
                        this.errStatus = err.response.status
                        this.errStatusText = err.response.statusText
                })
                .finally(() => {
                    this.userExternoLoading = false
                    console.log('peticion user externo terminada!');
                })
            },

            updateDateProcessor(){
                this.inputErrors = {}

                const processorFormData =  new FormData()
                    processorFormData.append('.method','put')  
                    processorFormData.append('role_id', 3) 
                    processorFormData.append('name', this.processorData.attributes.user_name) 
                    processorFormData.append('last_name' , this.processorData.attributes.user_last_name ) 
                    processorFormData.append('email',this.processorData.attributes.user_email)
                    processorFormData.append('doc_type',this.processorData.attributes.user_doc_type)
                    processorFormData.append('doc_number',this.processorData.attributes.user_doc_number)
                    processorFormData.append('dni_represent',this.processorData.attributes.dni_represent)
                    processorFormData.append('status','activado')
     
     
                updateProcessor(this.$store.state.user.data.processor_id,processorFormData)
                    .then(response => {
                        if(response.data.data)
                            this.processorFormData  =  response.data.data
                            swal('¡Registro correcto!', 'Ok', 'success')
                                .then( res =>{
                                     if(res == null || res == true || res == false)
                                        this.$router.push({name:'perfil-externo'})
                                })
                    })
                    .catch(err => {
                        console.log(err.response);
                        if(err.response.status == 422) this.inputErrors = err.response.data.errors
                    })
                    .finally( () => {
                        this.inputInitialValues = false
                        console.log('peticion update de user externo terminada!');
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
    color: rgb(223, 223, 223); 
    font-family: 'Bungee', cursive;
    font-size: 2.5rem;
    text-align: center;
}
.loader-processors {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 400px;
}

@media (max-width: 576px) {
  .welcome{ 
     font-size: 1.3rem;
      color: rgb(248, 248, 250); 
      text-align: center;
      }
}


</style>