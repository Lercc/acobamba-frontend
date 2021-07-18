<template>
    <div>

            <b-card v-show="userInternoLoading" class="loader-userInternos" no-body>
                <moon-loader loading :size="60" :color="'#225ba5'" /> 
            </b-card>   
    
            <b-card v-show="!userInternoLoading">
                <template #header>
                        <b-row align-h="between">
                                <b-col cols="auto">
                                    CREAR USUARIO
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
                            v-model="userInternoData.attributes.name"
                            :state="showInputStatus('name')"
                        >
                        </b-form-input>
                        <b-form-invalid-feedback v-for="(inputError, index) in showInputErrors('name')" :key="`${index}-input-name`" class="text-danger">
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
                            v-model="userInternoData.attributes.last_name"
                            :state="showInputStatus('last_name')"
                        >
                          </b-form-input>
                            <b-form-invalid-feedback v-for="(inputError, index) in showInputErrors('last_name')" :key="`${index}-input-last_name`" class="text-danger">
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
                            v-model="userInternoData.attributes.email"
                            :state="showInputStatus('email')"
                        >
                          </b-form-input>
                        <b-form-invalid-feedback v-for="(inputError, index) in showInputErrors('email')" :key="`${index}-user_input-email`" class="text-danger">
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
                            v-model="userInternoData.attributes.phone"
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
                             type="text"
                            v-model="userInternoData.attributes.doc_type"
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
                                    type="text"
                                    v-model="userInternoData.attributes.doc_number"
                                    :state="showInputStatus('doc_number')"
                                >
                                  </b-form-input>
                                  <b-form-invalid-feedback v-for="(inputError, index) in showInputErrors('doc_number')" :key="`${index}-input-doc_number`" class="text-danger">
                                    {{ inputError }}
                                </b-form-invalid-feedback>
                            </b-form-group>
                        </b-col>
                    </b-form-row>


                     <!-- TIPO DE EMPLEADO   -->
                 <b-form-row>
                        <b-col>
                            <b-form-group
                                label="TIPO DE TRABAJADOR MUNICIPAL"
                            >
                            <b-form-select
                                    type="text"
                                    v-model="userInternoData.attributes.employee_type"
                                    :options="EmployeeTypeOptions"
                                    :state="showInputStatus('employee_type')"
                                >
                                </b-form-select>
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
                                    </b-form-select>
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
                                      v-model="userInternoData.attributes.password"
                                      :state="showInputStatus('password')"
                                  > </b-form-input>
                              <b-form-invalid-feedback v-for="(inputError, index) in showInputErrors('password')" :key="`${index}-input-status`" class="text-danger">
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
                                      v-model="userInternoData.attributes.password_confirmation"
                                      :state="showInputStatus('password_confirmation')"
                                     > </b-form-input>
                                <b-form-invalid-feedback v-for="(inputError, index) in showInputErrors('password_confirmation')" :key="`${index}-input-status`" class="text-danger">
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
                                v-model="userInternoData.attributes.status"
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
                    <b-button variant="info" @click="createUserInterno">CREAR</b-button>
                </b-col>
            </b-form-row>

        </b-card>

    </div>
</template>

<script>
import {  storeEmployee } from '@/api/employee'
import { getOffices } from '@/api/office'
import { getSuboffices } from '@/api/suboffice'
import swal from 'sweetalert'

export default {
    data () {
        return {
            userInternoLoading : false , 
            typeOfficeRadioSelect: 'office', 
            subofficeRadioSelect : true , 
            errStatus: '',
            errStatusText: '',
            isNotFound: false,

            userInternoData : {
                attributes : {
                    role_id: 2,
                    name:'',
                    last_name:'',
                    phone: '',
                    doc_type:'dni',
                    doc_number:'',
                    email:'',
                    password:'',
                    password_confirmation:'',
                    office_id: '',
                    suboffice_id:'',
                    employee_type:'', 
                    status:'activado'
                }
            }, 

            statusOptions: [
                  { value: 'activado', text: 'activado'},
                   { value: 'desactivado', text: 'desactivado'}    
            ],
            doc_typeOptions: [
                   { value: 'dni', text: 'dni'},
                   { value: 'extranjeria', text: 'extranjeria'}    
            ],
             EmployeeTypeOptions: [
                   { value: 'gerente', text: 'gerente'},
                   { value: 'subgerente', text: 'subgerente'},    
                   { value: 'secretaria', text: 'secretaria'},  
                   { value: 'trabajador', text: 'trabajador'}    
            ],
            officeOptions : [],
            subofficeOptions : [],
            inputErrors: {},
            //
            inputInitialValues: true,
    

        }
    },

      beforeMount () {
        this.getOfficesOptions()
        this.getSubOfficesOptions()   
  
    },


    methods: {

            createUserInterno(){
                this.inputErrors = {}

                const userInternoFormData =  new FormData()
                    userInternoFormData.append('.method','post')  
                     userInternoFormData.append('role_id',2) 
                    userInternoFormData.append('name', this.userInternoData.attributes.name) 
                    userInternoFormData.append('last_name' , this.userInternoData.attributes.last_name ) 
                    userInternoFormData.append('phone',this.userInternoData.attributes.phone )
                    userInternoFormData.append('doc_type',this.userInternoData.attributes.doc_type)
                     userInternoFormData.append('doc_number',this.userInternoData.attributes.doc_number)
                    userInternoFormData.append('email',this.userInternoData.attributes.email)
                    userInternoFormData.append('employee_type',this.userInternoData.attributes.employee_type)
                    userInternoFormData.append('office_id',this.userInternoData.attributes.office_id)
                    userInternoFormData.append('suboffice_id',this.userInternoData.attributes.suboffice_id)
                    userInternoFormData.append('password',this.userInternoData.attributes.password)
                    userInternoFormData.append('password_confirmation',this.userInternoData.attributes.password_confirmation)
                    userInternoFormData.append('status',this.userInternoData.attributes.status)
     
     
                storeEmployee(userInternoFormData)
                    .then(response => {
                        if(response.data.data)
                            this.userInternoData  =  response.data.data
                            swal('¡Creación correcta!', 'Ok', 'success')
                                .then( res =>{
                                     if(res == null || res == true || res == false)
                                        this.$router.push({name:'users-internos'})
                                })
                    })
                    .catch(err => {
                        console.log(err.response);
                        if(err.response.status == 422) this.inputErrors = err.response.data.errors
                    })
                    .finally( () => {
                        this.inputInitialValues = false
                        console.log('peticion post usuario interno terminada!');
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