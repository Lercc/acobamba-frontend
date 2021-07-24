<template>

    <div>
        <base-header type="gradient-info" class="pb-6 pb-8 pt-5 pt-md-8">
            <!-- Card stats -->
            <b-row >
                <b-col class="justify-content-center pb-5">
                    <p class="welcome">PERFIL DEL TRABAJADOR MUNICIPAL </p>
                </b-col>
            </b-row>

            <b-row>
                <b-col>
                    <b-button :to="{ name: 'interno-actualizar-password' }">
                        Cambiar contraseña
                    </b-button>
                </b-col>
            </b-row>
        </base-header>
        
        <b-container fluid class="mt--6" >
            <b-row align-h="center" >
                <b-col cols="12" xl="6">
                    <b-card no-body class="table-responsive"  >                   
                        
                        <table class="table">
                            <tbody>
                                <tr>
                                    <td><h3><i class="ni ni-single-02 mr-2"></i>Usuario</h3></td>
                                    <td><p>{{ `${this.employeeData.user_name} ${this.employeeData.user_last_name}` }}</p></td>
                                   
                                </tr>
                                <tr>
                                    <td><h3><i class="ni ni-email-83 mr-2"></i>Correo</h3></td>
                                    <td> <p> {{ this.employeeData.user_email }}</p></td>
                                </tr>
                                 <tr>
                                    <td><h3><i class="ni ni-badge mr-2"></i>Tipo de documento</h3></td>
                                    <td><p>{{ this.employeeData.user_doc_type }}</p></td>
                                </tr>
                                 <tr>
                                    <td><h3><i class="ni ni-ui-04 mr-2"></i>Número de Documento</h3></td>
                                    <td><p>{{ this.employeeData.user_doc_number }}</p></td>
                                </tr>
                                <tr>
                                    <td><h3><i class="ni ni-ui-04 mr-2"></i>Tipo de Empleado Municipal</h3></td>
                                    <td><p>{{ this.employeeData.employee_type }}</p></td>
                                </tr>
                                <tr>
                                    <td><h3><i class="ni ni-ui-04 mr-2"></i>Nombre de Oficina a Cargo</h3></td>
                                    <td><p>{{ this.employeeData.office_name }}</p></td>
                                </tr>
                                <tr>
                                    <td><h3><i class="ni ni-ui-04 mr-2"></i>Nombre de SubOficina a Cargo</h3></td>
                                    <td><p>{{ this.employeeData.suboffice_name }} <br>{{ this.employeeData.suboffice_office_name }}  </p></td>
                                </tr>
                                <tr>
                                    <td><h3><i class="ni ni-bold-right mr-2"></i>Estado</h3></td>
                                    <td><p>{{ this.employeeData.user_status}}</p></td>
                                </tr>                              
                            </tbody>
                        </table>

                           <b-button variant="info" href="#">Actualizar Datos</b-button>
                    </b-card>
                </b-col>
            </b-row>
            </b-container>
        </div>
</template>

<script>
import { getEmployee } from '@/api/employee'

export default {
    data () {
        return {
            employeeLoading: false,
            //
            employeeData: [],
            //
            meta: {}
        }
    },

    beforeMount() {
        this.getEmployeeData()
    },

    methods: {
        
        getEmployeeData () {
            getEmployee(this.$store.state.user.data.employee_id)
                .then(response => {
                    this.employeeData = response.data.data.attributes
                })
                .catch(err => {
                    console.log(err.response)
                })
                .finally(() => {
                    console.log('peticion de usuario terminada')
                })
        },
    },


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

.loader-expedients {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 400px;
}
</style>
