<template>
    <div>
        <b-card v-show="subofficesLoading" class="loader-expedients" no-body>
            <moon-loader loading :size="100" :color="'#225ba5'" />
        </b-card>

        <b-card v-show="!subofficesLoading" class="table-responsive">
            <template #header>
                <b-row align-h="between">
                    <b-col cols="auto">
                        SUBOFICINAS
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
                    <th scope="col">Oficina</th>
                    <th scope="col">Suboficina</th>
                    <th scope="col">Status</th>
                    <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(office, index) in suboffices" :key="`${index}-adm-office`">
                        <th scope="row">{{ office.attributes.id }}</th>
                        <td>{{ office.attributes.name }}</td>
                        <td>{{ office.attributes.office_name }}</td>
                        <td>{{ office.attributes.status }}</td>
                        <td>
                            <b-button 
                                :to="{ name: 'suboffice-edit', params: { id: office.attributes.id }}"
                                variant="info"
                                size="sm">editar
                            </b-button>
                        </td>
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
import { getSuboffices } from '@/api/suboffice'

export default {
    name: 'SubofficesTable',

    data () {
        return {
            subofficesLoading: false,
            //
            suboffices: [],
            //
            meta: {}
        }
    },

    beforeMount() {
        this.cargarDatos()
    },

    methods: {
        cargarDatos (pPage) {
            this.subofficesLoading = true
            getSuboffices(pPage)
                .then (response => {
                    if (response.data.data) {
                        this.suboffices = response.data.data;
                        [this.meta]=[response.data.meta];
                    }
                })
                .catch (err => {
                    console.log( 'GLOBAL ERROR :', `${err.name} : ${err.message}`)
                })
                .finally ( () => {
                    this.subofficesLoading = false
                    console.log('peticion de suboffices terminada')
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
