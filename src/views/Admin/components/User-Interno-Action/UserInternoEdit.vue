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
                                    EDITAR USUARIOS DE LA MUNICIPALIDAD DISTRITAL DE ACOBAMBA
                                </b-col>
                                <b-col cols="auto">
                                    <b-button @click="cargarDatos" variant="success" size="sm">recargar</b-button>
                                </b-col>
                            </b-row>
                </template>

            <b-form-row>
                <b-col>
                    <b-form-group
                        label="NOMBRES"
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

            <!-- LAST_NAME   -->
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
                        <b-form-invalid-feedback v-for="(inputError, index) in showInputErrors('user_email')" :key="`${index}-input-user_email`" class="text-danger">
                                    {{ inputError }}
                         </b-form-invalid-feedback>

                    </b-form-group>
                </b-col>
            </b-form-row>

                  <!-- ROLE_NAME   -->
            <b-form-row>
                <b-col>
                    <b-form-group
                        label="OFICINAS"
                    >
                        <b-form-select
                            :on-search="selectOffice"
                            v-model="userInternoData.attributes.office_name"
                            :options="rolesOptions"
                            :state="showInputStatus('office_name')"
                        >
                        </b-form-select>
                            <b-form-invalid-feedback v-for="(inputError, index) in showInputErrors('role_name')" :key="`${index}-input-role_name`" class="text-danger">
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
                                    type="number"
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

          
 

                 <b-form-row>
                    <b-col>
                        <b-form-group
                        label="estado"
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
            <b-button variant="info" @click="updateDateuserInterno">ACTUALIZAR</b-button>
          </b-col>
        </b-form-row>

        </b-card>

    </div>
</template>

<script>

// import vSelect from 'vue-select';
// import { getuserInterno, updateuserInterno } from '@/api/userInterno'

//import swal from 'sweetalert'

export default {
    // data () {
    //     return {
     
    //         userInternoLoading : false , 
    //        errStatus: '',
    //         errStatusText: '',
    //         isNotFound: false,
    //         userInternoData : {
    //             attributes : {
    //                 id: this.$route.params.id , 
    //                 user_name: '',
    //                 user_last_name : '',
    //                 user_email: '',
    //                 office_name: '',
    //                 suboffice_name: '',
    //                 office_name_suboffice: '',
    //                 employee_type:'',
    //              //   status: ''
    //             }
    //         }, 

    //         statusOptions: [
    //               { value: 'activado', text: 'activado'},
    //                { value: 'desactivado', text: 'desactivado'}    
    //         ],
    //         inputErrors: {},
    //         //
    //         inputInitialValues: true,
    

    //     }
    // },

    //   beforeMount () {
    //     this.cargarDatos()
    // },

    // methods: {
    //      cargarDatos () {
    //         this.userInternoLoading = true
    //         this.inputsInitialValues = true
    //         this.inputErrors = {}

    //         getuserInterno (this.$route.params.id)
    //             .then(response => {
    //             if (response.data.data) this.userInternoData = response.data.data
    //             })
    //             .catch(err => {
    //             if (err.response.status == 404)
    //                 this.isNotFound = true
    //                 this.errStatus = err.response.status
    //                 this.errStatusText = err.response.statusText
    //             })
    //             .finally(() => {
    //             this.userInternoLoading = false
    //             console.log('peticion office terminada!');
    //             })
    //         },

    //         updateDateuserInterno(){
    //             this.inputErrors = {}

    //             const userInternoFormData =  new FormData()
    //                 userInternoFormData.append('.method','put')  
    //                 userInternoFormData.append('name', this.userInternoData.attributes.name) 
    //                 userInternoFormData.append('last_name' , this.userInternoData.attributes.last_name ) 
    //                 userInternoFormData.append('role_name',this.userInternoData.role_name) 
    //                 userInternoFormData.append('phone',this.userInternoData.phone )
    //                 userInternoFormData.append('doc_type',this.userInternoData.doc_type)
    //                 userInternoFormData.append('doc_number',this.userInternoData.attributes.doc_number)
    //                 userInternoFormData.append('email',this.userInternoData.attributes.email)
    //                 userInternoFormData.append('password',this.userInternoData.attributes.password)
    //                 userInternoFormData.append('password_confirmation',this.userInternoData.attributes.password_confirmation)
    //                 userInternoFormData.append('status',this.userInternoData.attributes.status)
     
     
    //             updateuserInterno(this.$route.params.id,userInternoFormData)
    //                 .then(response => {
    //                     if(response.data.data)
    //                     this.userInternoData  =  response.data.data
    //                     swal('¡Actualización correcta!', 'Ok', 'success')
    //                         .then( res =>{
    //                             if(res == null || res == true || res == false)
    //                             this.router.push({name:'userInternos'})
    //                         })
    //                         .catch(err => {
    //                             if(err.response.status == 422) this.inputErrors = err.response.data.errors
    //                         })

    //                         .finally( () => {
    //                             this.inputsInitialValues =false
    //                            console.log('peticion update office terminada!');
    //                   })
    //                 })
     
    //         }, 

    //     showInputErrors(pInput) {
    //      if(Object.keys(this.inputErrors).includes(pInput)) return this.inputErrors[pInput]
    //      else return []
    //     },

    //     showInputStatus(pInput) {
    //         if (this.inputInitialValues == true ) return null
    //         else if (Object.keys(this.inputErrors).includes(pInput)) return false
    //         else return !false
    //     },
    // }

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