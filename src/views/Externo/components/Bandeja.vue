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
                    <b-card v-show="!hasExpedients">
                        <p class="text-center">No tiene tramites realizados</p>
                    </b-card>

                    <b-card v-show="hasExpedients" >
                        <table class="table ">
                            <thead>
                                <tr>
                                <th scope="col">Codigo</th>
                                <th scope="col">Tipo</th>
                                <th scope="col">Cabeecera</th>
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
                                        <b-button :to="{name: 'externo-tramite'}" variant="info" size="sm">ver detalles</b-button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <b-pagination
                            v-model="pagination.currentPage"
                            :total-rows="pagination.total"
                            :per-page="pagination.per_page" 
                            aria-controls="my-table">
                        </b-pagination>
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
            'hasExpedients': false,
            'expedientsLoading': false,
            //
            'expedients': {},
            //
            'pagination': {}
        }
    },

    beforeMount() {
        this.getUserexpedients()
    },

    methods: {
        getUserexpedients () {
            this.expedientsLoading = true

            getExpedients(this.$store.state.user.data.processor_id)
                .then (response => {
                    this.hasExpedients = true
                    console.log('RESPONSE/EXPD:',response.data);
                    this.expedients = response.data.data;
                    [this.pagination]=[response.data.meta];
                })
                .catch (err => {
                    this.hasExpedients = false
                    console.log('THIS .E404' ,err.response.status)
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
</style>
