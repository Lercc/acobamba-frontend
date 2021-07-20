<template>

    <div>
        <base-header type="gradient-info" class="pb-6 pb-8 pt-5 pt-md-8">
            <!-- Card stats -->
            <b-row >
                <b-col class="justify-content-center pb-5">
                    <p class="welcome">BANDEJA DE ENTRADA DE DERIVACIONES</p>
                </b-col>
            </b-row>

        </base-header>
        
        <b-container fluid class="mt--6">
            <b-row>
                <b-col cols="12">
                    <b-card v-show="!hasDerivations" class="loader-expedients" no-body>
                        <p v-show="!expedientsLoading" class="text-center">No le han realizado derivaciones</p>
                        <moon-loader v-show="expedientsLoading" :size="100" :color="'#225ba5'" />
                    </b-card>

                    <b-card v-show="hasDerivations" class="table-responsive">
                        <template #header>
                            <b-row align-h="between">
                                <b-col cols="auto">
                                DERIVACIONES
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
                                <th scope="col">Derivado por </th>
                                <th scope="col">Fecha de Derivación</th>
                                <th scope="col">Estado</th>
                                <th scope="col"></th>
                                <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(derivation, index) in derivations" :key="`${index}-ext-exp-ent`">
                                        <th scope="row">{{ derivation.attributes.expedient_code }}</th>
                                        <td>
                                            {{derivation.attributes.user_area}}
                                            <br>
                                            {{derivation.attributes.user_name}}
                                        </td>
                                        <td>{{ derivation.attributes.createdAt }}</td>
                                    <td>{{ derivation.attributes.status }}</td>
                                        <td>
                                        <b-button 
                                            :to="{name: 'interno-detalle-expediente-derivar', params: {derivation_id: derivation.attributes.id, expedient_id: derivation.attributes.expedient_id }}"
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
import { getEmployeeDerivations } from '@/api/employee'

export default {
    data () {
        return {
            hasDerivations: false,
            expedientsLoading: false,
            //
            derivations: [],
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
            this.hasDerivations = false

            getEmployeeDerivations(this.$store.state.user.data.employee_id, pPage) 
                .then (response => {
                    console.log(response);
                    if (response.data.data) {
                        this.hasDerivations = true
                        this.derivations = response.data.data.filter(el => (el.attributes.status == 'en-proceso' || el.attributes.status == 'nuevo'));
                        [this.meta]=[response.data.meta];
                        if (this.derivations.length == 0 ) this.hasDerivations = false
                    } else {
                        this.hasDerivations = false
                    }
                })
                .catch ((err) => {
                    console.log( 'GLOBAL ERROR :', `${err.name} : ${err.message}`)
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
