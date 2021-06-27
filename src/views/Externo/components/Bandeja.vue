<template>

    <div>
        <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
            <!-- Card stats -->
            <b-row >
                <b-col class="justify-content-center pb-5">
                    <p class="welcome">TRÁMITES REALIZADOS</p>
                </b-col>
            </b-row>

            <b-row align-h="end">
                <!-- <b-col cols="auto" class="mb-2">
                    <b-button :to="{name: 'externo-tramite'}" variant="info" size="md">activos</b-button>
                </b-col> -->
                <!-- <b-col cols="auto" class="mb-2">
                    <b-button :to="{name: 'externo-tramite'}" variant="info" size="md">desactivados</b-button>
                </b-col> -->
                <b-col cols="auto" class="mb-2">
                    <b-button :to="{name: 'externo-tramite'}" variant="info" size="md" >nuevo trámite</b-button>
                </b-col>
            </b-row>
        </base-header>
        
        <b-container fluid class="mt--6">
            <b-row>
                <b-col cols="12">
                    <b-card v-show="!hasExpedients" class="loader-expedients" no-body>
                        <p v-show="!expedientsLoading" class="text-center">No tiene tramites realizados</p>
                        <moon-loader v-show="expedientsLoading" :size="100" :color="'#225ba5'" />
                    </b-card>

                    <b-card v-show="hasExpedients" class="table-responsive">
                        <template #header>
                            <b-row align-h="between">
                                <b-col cols="auto">
                                    TRÁMITES
                                </b-col>
                                <b-col cols="auto">
                                    <b-button @click="cargarDatos" variant="danger" size="sm">recargar</b-button>
                                </b-col>
                            </b-row>
                        </template>

                        <table class="table">
                            <thead>
                                <tr>
                                <th scope="col">Código</th>
                                <th scope="col">Tipo</th>
                                <th scope="col">Cabecera</th>
                                <th scope="col">Asunto</th>
                                <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(expedient, index) in expedients" :key="`${index}-ext-exp-ent`">
                                    <th scope="row">{{ expedient.attributes.code }}</th>
                                    <td>{{ expedient.attributes.document_type }}</td>
                                    <td>{{ expedient.attributes.header }}</td>
                                    <td>{{ expedient.attributes.subject }}</td>
                                    <td>
                                        <b-button 
                                            :to="{name: 'externo-detalle-expediente', params: {id: expedient.attributes.id}}"
                                            variant="info"
                                            size="sm">ver detalles
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
                </b-col>    
            </b-row>
        </b-container>

    </div>
</template>
<script>
import { getExpedients } from '@/api/expedient'

export default {
    data () {
        return {
            hasExpedients: false,
            expedientsLoading: false,
            //
            expedients: [],
            //
            meta: {}
        }
    },

    beforeMount() {
        this.cargarDatos()
    },

    methods: {
        cargarDatos (pPage) {
            this.expedientsLoading = true
            this.hasExpedients = false

            getExpedients(this.$store.state.user.data.processor_id, pPage)
                .then (response => {
                    this.hasExpedients = true
                    this.expedients = response.data.data;
                    [this.meta]=[response.data.meta];
                })
                .catch (err => {
                    this.hasExpedients = false
                     if (err.response) {
                        if (err.response.status == 404) {
                            this.expedients = {}
                        } else {
                            console.log( 'ERROR EXPEDIENT STATAUS:',err.response.status)
                        }
                    } else {
                        // context.commit('errors/SET_GLOBAL_ERROR_MESSAGE', , { root: true })
                        console.log( 'GLOBAL ERROR :', `${err.name} : ${err.message}`)
                    }
                })
                .finally ( () => {
                    console.log('peticion de  expedientes terminada')
                    this.expedientsLoading = false
                })
        }
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
