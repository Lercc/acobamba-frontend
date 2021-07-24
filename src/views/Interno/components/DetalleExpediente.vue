<template>

    <div>
        <base-header type="gradient-info" class="pb-6 pb-8 pt-5 pt-md-8">
            <!-- Card stats -->
            <b-row >
                <b-col class="justify-content-center pb-5">
                    <p class="welcome">DETALLES DEL EXPEDIENTE DERIVADO</p>
                </b-col>
            </b-row>

            <!-- <b-row>
                <b-col>
                    <b-button v-show="currentDerivationData.attributes.status == 'nuevo'" v-b-modal.modal-1>DERIVAR</b-button>
                </b-col>
            </b-row> -->
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
                                    <td v-show="expedientData.employee_id">
                                        {{ `${expedientData.employee_name  } ${ expedientData.employee_last_name }` }}
                                    </td>
                                    <td v-show="expedientData.processor_id">
                                        {{ `${expedientData.processor_name  } ${ expedientData.processor_last_name }` }}
                                    </td>
                                </tr>
                                <tr>
                                    <td>Tipo</td>
                                    <td>{{ expedientData.document_type }} </td>
                                </tr>
                                <tr>
                                    <td>Asunto</td>
                                    <td>{{ expedientData.subject }}</td>
                                </tr>
                                <tr>
                                    <td>Cabecera</td>
                                    <td>{{ expedientData.header }}</td>
                                </tr>
                                <tr>
                                    <td>N° Folios</td>
                                    <td>{{ expedientData.folios }}</td>
                                </tr>
                                <tr>
                                    <td>Documento(s)</td>
                                    <td>
                                        <b-button @click="downloadFile" size="sm">
                                            DESCARGAR ARCHIVO
                                        </b-button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Correo</td>
                                    <td v-show="expedientData.employee_id">{{ this.expedientData.employee_email }}</td>
                                    <td v-show="expedientData.processor_id">{{ this.expedientData.processor_email }}</td>
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
                                    <td>Responsable</td>
                                    <td v-show="expedientData.employee_id">Usuario | Interno</td>
                                    <td v-show="expedientData.processor_id">Usuario | Externo</td>
                                </tr>
                            </tbody>
                        </table>
                    </b-card>

                     <b-card no-body class="table-responsive">
                        <template #header>
                            DATOS DE LA DERIVACIÓN
                        </template>
                        
                        <table class="table">
                            <tbody>
                                <tr>
                                    <td>De:</td>
                                    <td>
                                        {{ this.currentDerivationData.attributes.user_area }}
                                        <br>
                                        {{ this.currentDerivationData.attributes.user_name }}
                                    </td>
                                </tr>
                                <tr>
                                    <td>A:</td>
                                    <td>
                                        {{ this.currentDerivationData.attributes.employee_area }}
                                        <br>
                                        {{ this.currentDerivationData.attributes.employee_name }}
                                    </td>
                                </tr>
                                <tr>
                                    <td>Fecha</td>
                                    <td>{{ this.currentDerivationData.attributes.createdAt }}</td>
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

                <!-- <b-modal id="modal-1" title="CREAR DERIVACIÓN"  button-size="sm" hide-footer size="lg">
                    <b-col cols="12">
                        <b-form-row>
                            <b-col>
                                <b-form-group>
                                    <b-form-radio-group
                                        v-model="areaDerivationRadio"
                                        class="d-flex justify-content-around"
                                        buttons
                                        button-variant="outline-info"
                                        @change="inputRadioOfficeSubofficeChanged"
                                    >
                                        <b-form-radio value="office">Derivar a una oficina</b-form-radio>
                                        <b-form-radio value="suboffice">Derivar a una sub-oficina</b-form-radio>
                                    </b-form-radio-group>
                                </b-form-group>
                            </b-col>
                        </b-form-row>

                        <b-form-row v-if="areaDerivationRadio == 'office'">
                            <b-col>
                                <b-form-group
                                    label="Selecciona la Oficina: "
                                >
                                    <div class="officeOptions-loading" v-show="officeOptionsLoading">
                                        <beat-loader loadingv-show="expedientsLoading" :size="12" :color="'#000000'" />
                                    </div>

                                    <b-form-select
                                        placeholder="Selecione office"
                                        v-model="officeId"
                                        :options="officeOptions"
                                        @change="inputOfficeSubofficeChanged"
                                        v-show="!officeOptionsLoading"
                                    >
                                    </b-form-select>
                                </b-form-group>
                            </b-col>

                            <b-col>
                                <b-form-group
                                    label="Selecciona el Empleado: "
                                >
                                    <b-form-select
                                        v-model="employeeId"
                                        :options="employeeOfficeOptions"
                                    >
                                        <template #first>
                                            <b-form-select-option value="" disabled>-- Selecciona un empleado --</b-form-select-option>
                                        </template>
                                    </b-form-select>
                                </b-form-group>
                            </b-col>
                        </b-form-row>

                        <b-form-row v-else>
                            <b-col>
                                <b-form-group
                                    label="Selecciona la Suboficina: "
                                >
                                    <b-form-select
                                        placeholder="Selecione office"
                                        v-model="subofficeId"
                                        :options="subofficeOptions"
                                        @change="inputOfficeSubofficeChanged"
                                    >
                                    </b-form-select>
                                </b-form-group>
                            </b-col>

                            <b-col>
                                <b-form-group
                                    label="Selecciona el Empleado: "
                                >
                                    <b-form-select
                                        v-model="employeeId"
                                        :options="employeeSubofficeOptions"
                                    >
                                        <template #first>
                                            <b-form-select-option value="" disabled>-- Selecciona un empleado --</b-form-select-option>
                                        </template>
                                    </b-form-select>
                                </b-form-group>
                            </b-col>
                        </b-form-row>

                        <b-form-row>
                            <b-col class="d-flex justify-content-center">
                                <b-button @click="makeDerivation" :disabled="!employeeId" variant="success">Realizar Derivacion</b-button>
                            </b-col>
                        </b-form-row>
                     </b-col>
                </b-modal> -->
            </b-row>
        </b-container>

    </div>
</template>

<script>
import { getExpedient, getExpedientsDerivations, getExpedientsArchivations} from '@/api/expedient';
import { getAllOffices } from '@/api/office';
import { getAllSuboffices } from '@/api/suboffice';
import { getAllEmployees } from '@/api/employee';
import { storeDerivation, getDerivation, updateDerivation } from '@/api/derivation';

import FileSaver from 'file-saver';

export default {
    data() {
        return {
            showPopUpDerivation: false,
            //
            expedientData: {},
            currentDerivationData: {
                attributes: {
                    user_are: ''
                }
            },
            derivationsData: {},
            archivationData: {},
            //
            areaDerivationRadio: 'office',
            //
            officeOptions: [],
            officeOptionsLoading: false,
            subofficeOptions: [],
            //
            officeId: 1,
            subofficeId: 1,
            //
            employeeId: '',
            //
            allEmployeesData: []
        }
    },

    beforeMount() {
        this.getExpedientData();
        this.getDerivationsData();
        this.getArchivationData();
        this.getCurrentDerivationData();
        this.getOfficesData();
        this.getSubofficesData();
        this.getEmployesData();
    },

    methods: {
        getExpedientData () {
            getExpedient(this.$route.params.expedient_id)
                .then(response => {
                    this.expedientData = response.data.data.attributes
                })
                .catch(err => {
                    console.log(err.response)
                    // error nul en peticoin de current derivation !
                })
                .finally(() => {
                    console.log('peticion de expediente terminada')
                })
        },

        getCurrentDerivationData () {
            //peticion
            getDerivation(this.$route.params.derivation_id)
                .then (res => {
                    this.currentDerivationData = res.data.data
                })
                .catch (err => {
                    console.log(err.response);
                })
                .finally( () => {
                    console.log('peticion current derivation terminada');
                })
        },

        getDerivationsData () {
            getExpedientsDerivations(this.$route.params.expedient_id)
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
            getExpedientsArchivations(this.$route.params.expedient_id)
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

        getOfficesData() {
            this.officeOptionsLoading = true
            getAllOffices()
                .then(res => {
                    this.officeOptions = res.data.data.map(el => { 
                            if (el.attributes.status == 'activado')
                                return { 'value': el.attributes.id, 'text': el.attributes.name }
                        })
                })
                .finally(() => {
                    this.officeOptionsLoading = false
                })
        },

        getSubofficesData() {
            getAllSuboffices()
                .then(res => {
                    this.subofficeOptions = res.data.data.map(el => { 
                            if (el.attributes.status == 'activado')
                                return { 'value': el.attributes.id, 'text': el.attributes.name }
                        })
                })
        },

        getEmployesData () {
            getAllEmployees()
                .then( res => {
                    this.allEmployeesData = res.data.data
                })
        },

        makeDerivation() {
            const DerivationFormData = new FormData()
            DerivationFormData.append('expedient_id', this.$route.params.expedient_id)
            DerivationFormData.append('user_id', this.$store.state.user.data.id)
            DerivationFormData.append('employee_id', this.employeeId)
            DerivationFormData.append('status', 'nuevo')
            storeDerivation(DerivationFormData)
                .then(res =>{
                    console.log('derivation :', res);
                    if (res.data.data) {
                        const UpdateCurrentDerivationFormData = new FormData()
                        UpdateCurrentDerivationFormData.append('.method', 'put')
                        UpdateCurrentDerivationFormData.append('employee_id', this.currentDerivationData.attributes.employee_id)
                        UpdateCurrentDerivationFormData.append('status', 'derivado')

                        updateDerivation(this.currentDerivationData.attributes.id, UpdateCurrentDerivationFormData)
                            .then(res => {
                                    console.log('updateCurrentDerivation:', res);
                                })
                            .catch(err =>{
                                console.log('updateCurrentDerivation error:', err);
                                console.log('updateCurrentDerivation error:', err.response);
                            })
                            .finally( () =>{
                                console.log('updateCurrentDerivation terminada');
                            })
                    }
                })
                .catch(err =>{
                    console.log('derivation error:', err.response);
                })
                .finally( () =>{
                    console.log('derivation terminada');
                })
        },

        inputOfficeSubofficeChanged () {
            this.employeeId = ''
        },
       
       inputRadioOfficeSubofficeChanged () {
            this.employeeId = ''
        },

        downloadFile() {
            FileSaver.saveAs(`${this.$store.state.api.url}/storage/${this.expedientData.file}`);
        }
    },

    computed: {
        employeeOfficeOptions () {
            return this.allEmployeesData
                    .filter(el => el.attributes.office_id == this.officeId && (el.attributes.employee_type == 'gerente' || el.attributes.employee_type == 'secretaria'))
                    .map(el => ({ 'value': el.attributes.id, 'text': `${el.attributes.employee_type} : ${el.attributes.user_name} ${el.attributes.user_last_name}` }))
        },

        employeeSubofficeOptions () {
            return this.allEmployeesData
                    .filter(el => el.attributes.suboffice_id == this.subofficeId && (el.attributes.employee_type == 'subgerente' || el.attributes.employee_type == 'secretaria'))
                    .map(el => ({ 'value': el.attributes.id, 'text': `${el.attributes.employee_type} : ${el.attributes.user_name} ${el.attributes.user_last_name}` }))
        }
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
.officeOptions-loading {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    border: 1px solid #cad1d7;
    border-radius: 0.375rem;
}
</style>