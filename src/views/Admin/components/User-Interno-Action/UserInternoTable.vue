<template>
    <div>
        <b-card v-show="employeesLoading" class="loader-expedients" no-body>
            <moon-loader loading :size="100" :color="'#225ba5'" />
        </b-card>

        <b-card v-show="!employeesLoading" class="table-responsive">
            <template #header>
                <b-row align-h="between">
                    <b-col class="text-center" cols="auto">
                     USUARIOS DE LA MUNICIPALIDAD DISTRITAL DE ACOBAMBA
                    </b-col>
                    <b-col cols="auto">
                        <b-button @click="cargarDatos" variant="danger" size="sm">recargar</b-button>
                    </b-col>
                </b-row>
            </template>

            <table class="table">
                <thead>
                    <tr>
                    <th scope="col">Acciones</th>
                    <th scope="col">Id</th>
                    <th scope="col">Nombre</th>   
                    <th scope="col">Apellidos</th>
                    <th scope="col">Email</th>
                    <th scope="col">Oficina</th>
                    <th scope="col">Sub-Oficina</th>      
                    <th scope="col">Estado</th>
                  
                    
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(employee, index) in employees" :key="`${index}-adm-employee`">
                        <td>
                            <b-button 
                                :to="{ name: 'user-interno-edit', params: { id: employee.attributes.id }}"
                                variant="info"
                                size="sm">editar
                            </b-button>
                        </td>
                        <th scope="row">{{ employee.attributes.id }}</th>
                        <td>{{ employee.attributes.user_name }}</td>
                        <td>{{ employee.attributes.user_last_name }}</td>
                        <td>{{ employee.attributes.user_email }}</td>         
                        <td>{{ employee.attributes.office_name}}</td>
                        <td> <strong> {{ employee.attributes.suboffice_name }} </strong>  <br>{{ employee.attributes.suboffice_office_name }}   </td>
                        <td>{{ employee.attributes.user_status }}</td>
                     
                    </tr>
                </tbody>
            </table>

            <template #footer>
                <base-pagination 
                    :pageCount="meta.last_page" 
                    :perPage="meta.per_page"
                    :value="meta.current_page"
                    @input="cargarDatos">
                </base-pagination>
            </template>
        </b-card>

    </div>
</template>

<script>
import { getEmployees } from '@/api/employee'

export default {
    data () {
        return {
            employeesLoading: false,
            //
            employees: [],
            //
            meta: {}
        }
    },

    beforeMount() {
        this.cargarDatos()
    },

    methods: {
        cargarDatos (pPage) {
            this.employeesLoading = true
            getEmployees(pPage)
                .then (response => {
                    if (response.data.data) {
                        this.employees = response.data.data;
                        [this.meta]=[response.data.meta];
                    }
                })
                .catch (err => {
                    console.log( 'GLOBAL ERROR :', `${err.name} : ${err.message}`)
                })
                .finally ( () => {
                    this.employeesLoading = false
                    console.log('peticion de employees terminada')
                })
        }
    },


}
</script>
<style scoped>
.loader-expedients {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 400px;
}
</style>
