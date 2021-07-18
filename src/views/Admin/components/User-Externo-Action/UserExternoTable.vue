<template>
    <div>
        <b-card v-show="processorsLoading" class="loader-expedients" no-body>
            <moon-loader loading :size="100" :color="'#225ba5'" />
        </b-card>

        <b-card v-show="!processorsLoading" class="table-responsive">
            <template #header>
                <b-row align-h="between">
                    <b-col cols="auto">
                        USUARIOS DE TRAMITANTES      
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
                    <th scope="col">Nombre</th>   
                    <th scope="col">Apellidos</th>
                    <th scope="col">Email</th>    
                    <th scope="col">Estado</th>
                    <th scope="col">Acciones</th>
                    
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(processor, index) in processors" :key="`${index}-adm-processor`">
                        <th scope="row">{{ processor.attributes.id }}</th>
                        <td>{{ processor.attributes.user_name }}</td>
                        <td>{{ processor.attributes.user_last_name }}</td>
                        <td>{{ processor.attributes.user_email }}</td>         
                        <td>{{ processor.attributes.user_status }}</td>
                        <td>
                            <b-button 
                                :to="{ name: 'processor-edit', params: { id: processor.attributes.id }}"
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
import { getProcessors } from '@/api/processor'

export default {
    data () {
        return {
            processorsLoading: false,
            //
            processors: [],
            //
            meta: {}
        }
    },

    beforeMount() {
        this.cargarDatos()
    },

    methods: {
        cargarDatos (pPage) {
            this.processorsLoading = true
            getProcessors(pPage)
                .then (response => {
                    if (response.data.data) {
                        this.processors = response.data.data;
                        [this.meta]=[response.data.meta];
                    }
                })
                .catch (err => {
                    console.log( 'GLOBAL ERROR :', `${err.name} : ${err.message}`)
                })
                .finally ( () => {
                    this.processorsLoading = false
                    console.log('peticion de processors terminada')
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
