<template>
    <div>
        <b-card v-show="usersLoading" class="loader-expedients" no-body>
            <moon-loader loading :size="100" :color="'#225ba5'" />
        </b-card>

        <b-card v-show="!usersLoading" class="table-responsive">
            <template #header>
                <b-row align-h="between">
                    <b-col class="text-center" cols="auto">
                     ADMINISTRADORES DEL SISTEMA
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
                    <th scope="col">Role</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Tipo de documento</th>
                    <th scope="col">Numero de documento</th>                    
                    <th scope="col">Email</th>
                    <th scope="col">Estado</th>
               
                    
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(user, index) in users" :key="`${index}-adm-user`">
                         <td>
                            <b-button 
                                :to="{ name: 'user-edit', params: { id: user.attributes.id }}"
                                variant="info"
                                size="sm">editar
                            </b-button>
                        </td>
                        <th scope="row">{{ user.attributes.id }}</th>
                        <td>{{ user.attributes.name }}</td>
                        <td>{{ user.attributes.last_name }}</td>
                        <td>{{ user.attributes.role_name }}</td>         
                        <td>{{ user.attributes.phone }}</td>
                        <td>{{ user.attributes.doc_type }}</td>
                        <td>{{ user.attributes.doc_number }}</td>
                        <td>{{ user.attributes.email }}</td>
                        <td>{{ user.attributes.status }}</td>
                      
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
import { getUsers } from '@/api/user'

export default {
    data () {
        return {
            usersLoading: false,
            //
            users: [],
            //
            meta: {}
        }
    },

    beforeMount() {
        this.cargarDatos()
    },

    methods: {
        cargarDatos (pPage) {
            this.usersLoading = true
            getUsers(pPage)
                .then (response => {
                    if (response.data.data) {
                        this.users = response.data.data;
                        [this.meta]=[response.data.meta];
                    }
                })
                .catch (err => {
                    console.log( 'GLOBAL ERROR :', `${err.name} : ${err.message}`)
                })
                .finally ( () => {
                    this.usersLoading = false
                    console.log('peticion de users terminada')
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
