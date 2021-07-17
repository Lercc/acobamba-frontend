<template>
    <div>
        <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
            <!-- Card stats -->
            <b-row >
                <b-col class="justify-content-center pb-5">
                    <p class="welcome">ROLES</p>
                </b-col>
            </b-row>

            <b-row align-h="end">
                <!-- <b-col cols="auto" class="mb-2">
                    <b-button :to="{name: 'externo-tramite'}" variant="info" size="md">activos</b-button>
                </b-col> -->
                <!-- <b-col cols="auto" class="mb-2">
                    <b-button :to="{name: 'externo-tramite'}" variant="info" size="md">desactivados</b-button>
                </b-col> -->
            </b-row>
        </base-header>
    <b-container fluid class="mt--6">
        <b-row>
            <b-col cols="12">
                <b-card v-show="rolesLoading" class="loader-expedients" no-body>
                    <moon-loader loading :size="100" :color="'#225ba5'" />
                </b-card>

                <b-card v-show="!rolesLoading" class="table-responsive">
                    <template #header>
                        <b-row align-h="between">
                            <b-col cols="auto">
                            ROLES
                            </b-col>
                            <b-col cols="auto">
                                <b-button @click="cargarDatos" variant="danger" size="sm">recargar</b-button>
                            </b-col>
                        </b-row>
                    </template>

            <table class="table">
                <thead>
                    <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Name</th>   
                    <th scope="col">Status</th>
                
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(role, index) in roles" :key="`${index}-adm-role`">
                        <th scope="row">{{ role.attributes.id }}</th>
                        <td>{{ role.attributes.name }}</td>
                        <td>{{ role.attributes.status }}</td>

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
        </b-col>    
            </b-row>
        </b-container>

    </div>
</template>

<script>
import { getRoles } from '@/api/role'

export default {
    data () {
        return {
            rolesLoading: false,
            //
            roles: [],
            //
            meta: {}
        }
    },

    beforeMount() {
        this.cargarDatos()
    },

    methods: {
        cargarDatos (pPage) {
            this.rolesLoading = true
            getRoles(pPage)
                .then (response => {
                    if (response.data.data) {
                        this.roles = response.data.data;
                        [this.meta]=[response.data.meta];
                    }
                })
                .catch (err => {
                    console.log( 'GLOBAL ERROR :', `${err.name} : ${err.message}`)
                })
                .finally ( () => {
                    this.rolesLoading = false
                    console.log('peticion de roles terminada')
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
