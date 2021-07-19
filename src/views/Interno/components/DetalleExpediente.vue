<template>

    <div>
        <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
            <!-- Card stats -->
            <b-row >
                <b-col class="justify-content-center pb-5">
                    <p class="welcome">DETALLES DEL TRÁMITE</p>
                </b-col>
            </b-row>
        </base-header>
        
        <b-container fluid class="mt--6">
            <b-row>
                <b-col cols="12" xl="6">
                    <b-card no-body class="table-responsive">
                        <template #header>
                            DATOS DEL EXPEDIENTE
                        </template>
                        
                        <table class="table">
                            <tbody>
                                <tr>
                                    <td>Usuario</td>
                                    <td>{{ `${expedientData.employee_name } ${ expedientData.employee_last_name }` }}</td>
                                </tr>
                                <tr>
                                    <td>Correo</td>
                                    <td>{{ this.expedientData.employee_email }}</td>
                                </tr>
                                <tr>
                                    <td>Tipo</td>
                                    <td>{{ this.expedientData.document_type }} </td>
                                </tr>
                                <tr>
                                    <td>Asunto</td>
                                    <td>{{ this.expedientData.subject }}</td>
                                </tr>
                                <tr>
                                    <td>Cabecera</td>
                                    <td>{{ this.expedientData.header }}</td>
                                </tr>
                                <tr>
                                    <td>N° Folios</td>
                                    <td>{{ this.expedientData.folios }}</td>
                                </tr>
                                <tr>
                                    <td>Correo</td>
                                    <td>{{ this.expedientData.employee_email }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </b-card>
                </b-col>

                <b-col cols="12" xl="6">
                    <b-card no-body class="table-responsive">
                        <template #header>
                            DATOS DE CREACIÓN
                        </template>
                        
                        <table class="table">
                            <tbody>
                                <tr>
                                    <td>Fecha</td>
                                    <td>{{ this.expedientData.createdAt }}</td>
                                </tr>
                                <tr>
                                    <td>Codigo</td>
                                    <td>{{ this.expedientData.code }}</td>
                                </tr>
                                <tr>
                                    <td>Oficina</td>
                                    <td>Trámite externo</td>
                                </tr>
                                <tr>
                                    <td>Responsable</td>
                                    <td>Usuario | Externo</td>
                                </tr>
                            </tbody>
                        </table>
                    </b-card>
                </b-col>

                 <b-col cols="12">
                    <b-card no-body class="table-responsive">
                        <template #header >
                            SEGUIMIENTO DEL EXPEDIENTE - DERIVADOS
                        </template>
                        
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>N°</th>
                                    <th>Fecha</th>
                                    <th>Oficina</th>
                                    <th>Correo</th>
                                    <th>Forma</th>
                                    <th>Proveido</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(derivation, index) in derivationsData" :key="`${index}-derivation`">
                                    <td>{{ index + 1 }}</td>
                                    <td>{{ derivation.attributes.createdAt }}</td>
                                    <td>
                                         A: {{ derivation.attributes.employee_area }}
                                        <br>
                                        Por: {{ derivation.attributes.user_name }}
                                    </td>
                                    <td></td>
                                    <td>Original</td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                    </b-card>
                </b-col>

                 <b-col cols="12">
                    <b-card no-body class="table-responsive">
                        <template #header >
                            SEGUIMIENTO DEL EXPEDIENTE - ARCHIVADOS
                        </template>
                        
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>N°</th>
                                    <th>Fecha</th>
                                    <th>Oficina</th>
                                    <th>Observaciones</th>
                                    <th>Forma</th>
                                    <th>Proveido</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-if="Object.keys(archivationData).length != 0">
                                    <td>1</td>
                                    <td>{{ archivationData.attributes.createdAt }}</td>
                                    <td>
                                        {{ archivationData.attributes.user_area }}
                                        <br>
                                        {{ archivationData.attributes.user_name }}
                                    </td>
                                    <td>{{ archivationData.attributes.observations }}</td>
                                    <td>Original</td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                    </b-card>
                </b-col>
            </b-row>
        </b-container>

    </div>
</template>

<script>
import { getExpedient, getExpedientsDerivations, getExpedientsArchivations} from '@/api/expedient';

export default {
    data() {
        return {
            expedientData: {},
            derivationsData: {},
            archivationData: {},
        }
    },

    beforeMount() {
        this.getExpedientData();
        this.getDerivationsData();
        this.getArchivationData();
    },

    methods: {
        getExpedientData () {
            getExpedient(this.$route.params.id)
                .then(response => {
                    this.expedientData = response.data.data.attributes
                })
                .catch(err => {
                    console.log(err.response)
                })
                .finally(() => {
                    console.log('peticion de expediente terminada')
                })
        },
        getDerivationsData () {
            getExpedientsDerivations(this.$route.params.id)
                .then(response => {
                    if (response.data.data === undefined) {
                        this.derivationsData = {}
                    } else {
                        this.derivationsData = response.data.data
                    }
                })
                .catch(err => {
                    console.log('ERROR DERIVATION: ' ,err)
                })
                .finally(() => {
                    console.log('peticion de derivaciones terminada')
                })
        },
        getArchivationData () {
            getExpedientsArchivations(this.$route.params.id)
                .then(response => {
                    if (response.data.data === undefined) {
                        this.archivationData = {}
                    } else {
                        this.archivationData = response.data.data
                    }
                })
                .catch(err => {
                    console.log('ERROR ARCHIVATION: ' ,err)
                })
                .finally(() => {
                    console.log('peticion de archivaciones terminada')
                })
        },
    }

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

