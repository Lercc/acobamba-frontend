<template>

    <div>
        <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
            <!-- Card stats -->
            <b-row >
                <b-col class="justify-content-center pb-5">
                    <p class="welcome">LISTA DE ARCHIVACIONES</p>
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
                    <b-card v-show="!hasArchivations" class="loader-archivations" no-body>
                        <p v-show="!archivationsLoading" class="text-center">No tiene tramites realizados</p>
                        <moon-loader v-show="archivationsLoading" :size="100" :color="'#225ba5'" />
                    </b-card>

                    <b-card v-show="hasArchivations" class="table-responsive">
                        <template #header>
                            <b-row align-h="between">
                                <b-col cols="auto">
                                ARCHIVACIONES
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
                                 <th scope="col">Fecha de Archivado</th>
                                  <th scope="col">Asunto</th>
                                <th scope="col">Observaciones</th>
                                 <th scope="col">Status</th>
                                <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(archivation, index) in archivations" :key="`${index}-ext-exp-ent`">
                                    <th scope="row">{{ archivation.attributes.expedient_code }}</th>
                                      
                               <!--        {{ archivation.attributes.employee_name }} -->
                                        <td>{{ archivation.attributes.createdAt }}</td>
                                        <td>{{ archivation.attributes.subject }}</td>    
                                        <td>{{ archivation.attributes.observations }}</td>                         
                                        <td>{{ archivation.attributes.status }}</td>
                                                       
                             
                                        <td>
                                        <b-button 
                                            :to="{name: 'interno-detalle-expediente', params: {id: archivation.attributes.id}}"
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
import { getUserArchivations } from '@/api/user'

export default {
    data () {
        return {
            hasArchivations: false,
            archivationsLoading: false,
            //
            archivations: [],
            //
            meta: {}
        }
    },

    beforeMount() {
        this.cargarDatos()
    },

    methods: {
        cargarDatos (pPage) {
            this.archivationsLoading = true
            this.hasArchivations = false

            getUserArchivations(this.$store.state.user.data.id, pPage)
         
                .then ((response) => {
             
                    if (response.data.data) {
        
                        this.hasArchivations = true
                        this.archivations = response.data.data;
                        [this.meta]=[response.data.meta];
                    } else {
                        this.hasArchivations = false
                     
                    }
                    // console.log("hay registro")
                    // console.log(response)
                })
                .catch ((err) => {
                    console.log( 'GLOBAL ERROR :', `${err.name} : ${err.message}`)
                })
                .finally ( () => {
                    console.log('peticion de  expedientes terminada')
                    this.archivationsLoading = false
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
.loader-archivations {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 400px;
}
</style>
