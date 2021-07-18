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
                                <tr>
                                    <td>1</td>
                                    <td>{{ this.expedientData.createdAt }}</td>
                                    <td>
                                        A: Central | Unidad de Administración Documentaria
                                        <br>
                                        Por: Externo, Usuario
                                    </td>
                                    <td>{{ this.expedientData.employee_email }}</td>
                                    <td>Original</td>
                                    <td></td>
                                </tr>
                                <tr v-for="(derivation, index) in derivationsData" :key="`${index}-derivation`">
                                    <td>{{ index + 2 }}</td>
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
                    <b-card  header="CREAR DERIVACIÓN">
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
                                            <b-form-select-option value="null" disabled>-- Selecciona un empleado --</b-form-select-option>
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
                                            <b-form-select-option value="null" disabled>-- Selecciona un empleado --</b-form-select-option>
                                        </template>
                                    </b-form-select>
                                </b-form-group>
                            </b-col>
                        </b-form-row>

                        <b-form-row>
                            <b-col class="d-flex justify-content-center">
                                <b-button @click="makeDerivation" variant="success">Realizar Derivacion</b-button>
                            </b-col>
                        </b-form-row>

                    </b-card>
                </b-col>
            </b-row>
        </b-container>

    </div>
</template>

<script>
import { getExpedient, getExpedientsDerivations} from '@/api/expedient';
import { getAllOffices } from '@/api/office';
import { getAllSuboffices } from '@/api/suboffice';
import { getAllEmployees } from '@/api/employee';

export default {
    data() {
        return {
            expedientData: {},
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
            employeeId:  null,
            //
            allEmployeesData: []
        }
    },

    beforeMount() {
        this.getExpedientData();
        this.getDerivationsData();
        this.getOfficesData();
        this.getSubofficesData();
        this.getEmployesData();
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
                    console.log(res);
                    this.allEmployeesData = res.data.data
                })
        },

        makeDerivation() {
            window.alert('derivacion realizada')
        },

        inputOfficeSubofficeChanged () {
            this.employeeId = null
        },
       
       inputRadioOfficeSubofficeChanged () {
            this.employeeId = null
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

