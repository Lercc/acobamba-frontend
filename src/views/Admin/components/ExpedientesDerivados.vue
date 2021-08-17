<template>

    <div>
        <base-header type="gradient-info" class="pb-6 pb-8 pt-5 pt-md-8">
            <!-- Card stats -->
            <b-row >
                <b-col class="justify-content-center pb-5">
                    <p class="welcome">EXPEDIENTES DERIVADOS - MDA</p>
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
                    <b-card v-show="!hasDerivations" class="loader-expedients" no-body>
                        <p v-show="!derivationsLoading" class="text-center">No tiene tramites realizados</p>
                        <moon-loader v-show="derivationsLoading" :size="100" :color="'#225ba5'" />
                    </b-card>

                    <b-card v-show="hasDerivations" class="table-responsive">
                        <template #header>
                            <b-row align-h="between">
                                <b-col cols="auto">
                                LISTA  DERIVACIONES
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
                                <th scope="col">Derivado a  </th>
                                <th scope="col">Estado</th>
                                <th scope="col">Oficina Actual</th>
                                <th scope="col">Fecha de Derivado</th>
                                <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(derivation, index) in derivations" :key="`${index}-ext-exp-ent`">
                                    <th scope="row">{{ derivation.attributes.expedient_code }}</th>
                                      
                                        <td>{{ derivation.attributes.employee_name }}</td>
                                        <td>{{ derivation.attributes.status }}</td>
                                        <td>{{derivation.attributes.employee_area}} <br>{{derivation.attributes.employee_name}} </td>
                                        <td>{{ derivation.attributes.createdAt }}</td>
                                        <td>
                                        <b-button 
                                            :to="{name: 'interno-detalle-expediente', params: {derivation_id: derivation.attributes.id, expedient_id: derivation.attributes.expedient_id }}"
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
import { getExpedientsDerivationsAll } from '@/api/expedient'

export default {
    data () {
        return {
            hasDerivations: false,
            derivationsLoading: false,
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
            this.derivationsLoading = true
            this.hasDerivations = false

            getExpedientsDerivationsAll(pPage)
                .then ((response) => {
                    console.log('GET=EXP : ' ,response);
                    if (response.data.data) {
                        this.hasDerivations = true
                        this.derivations = response.data.data;
                        [this.meta]=[response.data.meta];
                    } else {
                        this.hasDerivations = false
                    }
                    // console.log("hay registro")
                    // console.log(response)
                })
                .catch ((err) => {
                    console.log( 'GLOBAL ERROR :', `${err.name} : ${err.message}`)
                     //   console.log(" no hay registros")
                      //  console.log(err.name)
                })
                .finally ( () => {
                    console.log('peticion de  expedientes terminada')
                     this.derivationsLoading = false
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
