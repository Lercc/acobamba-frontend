<template>
    <div>

            <b-card v-show="userInternoLoading" class="loader-userInternos" no-body>
                <moon-loader loading :size="60" :color="'#225ba5'" /> 
            </b-card>   
      
            <b-card v-show="isNotFound" class="loader-userInternos" no-body>
                {{errStatus}}
                {{errStatusText}}
            </b-card> 

            <b-card v-show="!userInternoLoading  && !isNotFound">
                <template #header>
                        <b-row align-h="between">
                                <b-col cols="auto">
                                    EDITAR USUARIOS 
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
                            v-model="userInternoData.attributes.user_name"
                            :state="showInputStatus('user_name')"
                        >
                        </b-form-input>
                        <b-form-invalid-feedback v-for="(inputError, index) in showInputErrors('user_name')" :key="`${index}-input-user_name`" class="text-danger">
                            {{ inputError }}
                        </b-form-invalid-feedback>
                    </b-form-group>
                </b-col>
            </b-form-row>

            <!-- LAST_user_name   -->
            <b-form-row>
                <b-col>
                    <b-form-group
                        label="APELLIDOS"
                    >
                        <b-form-input 
                            type="text"
                            v-model="userInternoData.attributes.user_last_name"
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
                <b-col>
                    <b-form-group
                        label="CORREO ELECTRONICO"
                    >
                    <b-form-input 
                            type="email"
                            v-model="userInternoData.attributes.user_email"
                            :state="showInputStatus('user_email')"
                        >
                          </b-form-input>
                        <b-form-invalid-feedback v-for="(inputError, index) in showInputErrors('user_email')" :key="`${index}-user_input-email`" class="text-danger">
                                    {{ inputError }}
                         </b-form-invalid-feedback>

                    </b-form-group>
                </b-col>
            </b-form-row>
                     <!-- EMAIL   -->
            <b-form-row>
                <b-col>
                    <b-form-group
                        label="TIPO DE TRABAJADOR MUNICIPAL"
                    >
                    <b-form-input 
                            type="text"
                            v-model="userInternoData.attributes.employee_type"
                            :state="showInputStatus('employee_type')"
                        >
                          </b-form-input>
                        <b-form-invalid-feedback v-for="(inputError, index) in showInputErrors('employee_type')" :key="`${index}-user_input-email`" class="text-danger">
                                    {{ inputError }}
                         </b-form-invalid-feedback>

                    </b-form-group>
                </b-col>
            </b-form-row>


              <b-form-row>
                            <b-col>
                                <b-form-group>
                                    <b-form-radio-group
                                        v-model="typeOfficeRadioSelect"
                                        class="d-flex justify-content-around"
                                        buttons
                                        button-variant="outline-info"
                                          @change="inputRadioOfficeSubofficeChanged"
                                    >
                                        <b-form-radio value="office">Selecciona una oficina</b-form-radio>
                                        <b-form-radio value="suboffice">Selecciona una sub-oficina</b-form-radio>
                                    </b-form-radio-group>
                                </b-form-group>
                            </b-col>
                        </b-form-row>

                        <b-form-row v-if="typeOfficeRadioSelect == 'office'">
                            <b-col>
                                <b-form-group
                                    label="Selecciona la Oficina: "
                                >                               

                                    <b-form-select
                                        placeholder="Selecione office"
                                        v-model="userInternoData.attributes.office_id"
                                        :options="officeOptions"
                                    >
                                      <template #first>
                                            <b-form-select-option value='' disabled>-- Selecciona un oficina --</b-form-select-option>
                                        </template>
                                    </b-form-select>
                                </b-form-group>
                            </b-col>
                        </b-form-row>

                        <b-form-row v-else>
                            <b-col>
                                <b-form-group
                                    label="Selecciona la Suboficina: "
                                >
                                    <b-form-select
                                        placeholder="Selecione suboffice"
                                        v-model="userInternoData.attributes.suboffice_id"
                                        :options="subofficeOptions"
                                    >
                                      <template #first>
                                            <b-form-select-option value='' disabled>-- Selecciona una suboficina --</b-form-select-option>
                                        </template>
                                    </b-form-select>
                                </b-form-group>
                            </b-col>
                        </b-form-row>
                 <b-form-row>
                    <b-col>
                            <b-form-group
                            label="estado"
                            >
                                <b-form-select
                                v-model="userInternoData.attributes.user_status"
                                :options="statusOptions"
                                :state="showInputStatus('user_status')"
                                >
                            </b-form-select>

                            <b-form-invalid-feedback v-for="(inputError, index) in showInputErrors('user_status')" :key="`${index}-input-user_status`" class="text-danger">
                                {{ inputError }}
                            </b-form-invalid-feedback>
                            </b-form-group>
                     </b-col>
              </b-form-row>

             <b-form-row >
                <b-col class="d-flex justify-content-center">
                    <b-button variant="info" @click="updateDateUserInterno">ACTUALIZAR</b-button>
                </b-col>
            </b-form-row>

        </b-card>

    </div>
</template>

<script>
import { getEmployee , updateEmployee } from '@/api/employee'
import { getOffices } from '@/api/office'
import { getSuboffices } from '@/api/suboffice'
import swal from 'sweetalert'

export default {
    data () {
        return {
            userInternoLoading : false , 
            errStatus: '',
            errStatusText: '',
            isNotFound: false,

            userInternoData : {
                attributes : {
                    id: this.$route.params.id , 
                    user_name: '',
                    user_last_name : '',
                    user_email: '',
                    user_status: '',
                    office_name: '',
                    suboffice_name:'',
                    office_name_suboffice: '',
                    employee_type: ''
                }
            }, 

            statusOptions: [
                  { value: 'activado', text: 'activado'},
                   { value: 'desactivado', text: 'desactivado'}    
            ],
            officeOptions : [],
            subofficeOptions : [],
            inputErrors: {},
            //
            inputInitialValues: true,
    

        }
    },

      beforeMount () {
        this.cargarDatos()
        this.getOfficesOptions()
        this.getSubOfficesOptions()   
  
    },


    methods: {
         cargarDatos () {
            this.userInternoLoading = true
            this.inputsInitialValues = true
            this.inputErrors = {}

            getEmployee (this.$route.params.id)
                .then(response => {
                    if (response.data.data) this.userInternoData = response.data.data
                })
                .catch(err => {
                    if (err.response.status == 404)
                        this.isNotFound = true
                        this.errStatus = err.response.status
                        this.errStatusText = err.response.statusText
                })
                .finally(() => {
                    this.userInternoLoading = false
                    console.log('peticion office terminada!');
                })
            },

            updateDateUserInterno(){
                this.inputErrors = {}

                const userInternoFormData =  new FormData()
                    userInternoFormData.append('.method','put')  
                    userInternoFormData.append('user_name', this.userInternoData.attributes.user_name) 
                    userInternoFormData.append('user_last_name' , this.userInternoData.attributes.user_last_name ) 
                    userInternoFormData.append('phone',this.userInternoData.phone )
                    userInternoFormData.append('doc_type',this.userInternoData.doc_type)
                    userInternoFormData.append('doc_number',this.userInternoData.attributes.doc_number)
                    userInternoFormData.append('email',this.userInternoData.attributes.email)
                    userInternoFormData.append('password',this.userInternoData.attributes.password)
                    userInternoFormData.append('password_confirmation',this.userInternoData.attributes.password_confirmation)
                    userInternoFormData.append('status',this.userInternoData.attributes.status)
     
     
                updateEmployee(this.$route.params.id,userInternoFormData)
                    .then(response => {
                        if(response.data.data)
                            this.userInternoData  =  response.data.data
                            swal('¡Actualización correcta!', 'Ok', 'success')
                                .then( res =>{
                                     if(res == null || res == true || res == false)
                                        this.router.push({name:'userInternos'})
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
          getOfficesOptions () {
            getOffices()
                .then( res => {
                     console.log(res);
                     if (res.data.data)
                         this.officeOptions = res.data.data.map( e => ({ 'value': e.attributes.id, 'text': e.attributes.name}))
                })
            },

          getSubOfficesOptions () {
            getSuboffices()
                .then( res => {
                     console.log(res);
                    if (res.data.data)
                        this.subofficeOptions = res.data.data.map( e => ({ 'value': e.attributes.id, 'text': e.attributes.name}))
                })
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
.loader-userInternos {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 400px;
}
</style>