<template>

    <div>
        <base-header type="gradient-info" class="pb-6 pb-8 pt-5 pt-md-8">
            <!-- Card stats -->
            <b-row >
                <b-col class="justify-content-center pb-5">
                    <p class="welcome">Bienvenido a la Mesa de Partes Virtual</p>
                </b-col>
            </b-row>

            <b-row>
                <b-col lg="6" xl="4" v-for="(notification, index) in notifications" :key="`${index}-dash-notif`">
                    <b-card class="mb-4 mb-xl-0" >
                        <b-card-text class="text-justify">
                            Tu expediente de codigo <span class="text-blue">{{notification.attributes.expedient_code}}</span> ha sido <span class="text-blue">{{notification.attributes.exp_status}}</span> <span v-show="notification.attributes.exp_status === 'archivado' ? false : true" > a el area: <span class="text-blue">{{notification.attributes.area}}</span></span>.
                            <b-badge variant="info">{{ notification.attributes.status === 'visto' ? 'visto' : 'nuevo'}}</b-badge>
                        </b-card-text>
                        <template #footer>
                            <div class="d-flex justify-content-around align-items-center">
                                <small class="text-muted ">{{notification.attributes.created_at}}</small> 
                                <b-button :to="{name: 'interno-detalle-tramite', params: {expedient_id: notification.attributes.expedient_id}}" variant="info" size="sm">ver trámite</b-button>
                            </div>
                        </template>
                   </b-card>
                </b-col>
            </b-row>
        </base-header>
        
        <b-container fluid class="border border-red mt--6">
            <b-row align-h="center">
                <b-col cols="9" md="6" xl="4">
                    <b-card no-body class="p-4" v-if="derivations.length > 0">
                      <p class="welcomete">Estadística de los Estado de Expedientes</p>
                        <chart-estado 
                            v-if="derivations.length > 0"
                            :nuevoData="nuevoAmount"
                            :enProcesoData="enProcesoAmount"
                            :derivadoData="derivadoAmount"
                        />
                    </b-card>

                    <b-card no-body class="p-9 text-center" v-else>
                        <b-card-text>
                            No tienes derivaciones
                        </b-card-text>
                    </b-card>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>
<script>
import { getEmployeeNotifications } from '@/api/notification'
import { getEmployeeDerivationsState } from '@/api/employee'
import ChartEstado from './ViewsCharts/ChartEstado.vue'


export default {
    components: {
       ChartEstado
    },
    data () {
        return {
            derivations:[],
            status: [], 
            notifications: {},

            // charDATA
            nuevoAmount: 0,
            enProcesoAmount: 0,
            derivadoAmount: 0
        }
    }, 

    beforeMount() {
        this.getNotifications()
        // this.cargarDatosEmpDerivations()
    },

    created() {
        this.cargarDatosEmpDerivations()
    },

    methods: {
        getNotifications() {
            getEmployeeNotifications(this.$store.state.user.data.employee_id)
                .then (response => {
                    this.notifications = response.data.data.filter((el, index) => index < 3)
                })
                .catch (err => {
                    console.log(err.response)
                })
                .finally ( () => {
                    console.log('peticion de notificaciones terminada')
                })
        },

        cargarDatosEmpDerivations() {
            getEmployeeDerivationsState(this.$store.state.user.data.employee_id)
                .then (({ data }) => {
                    console.log('EmploDerivationAll :', data);
                    this.derivations = data.data
                    for(const el in data.data) {
                        switch (data.data[el].attributes.status) {
                            case 'nuevo':
                                this.nuevoAmount += 1
                                break;

                            case 'en proceso':
                                this.enProcesoAmount += 1
                                break;

                            case 'derivado':
                                this.derivadoAmount += 1
                                break;
                        
                            default:
                                console.log('for break default');
                                break;
                        }
                    }
                })
                .catch ((err) => {
                    console.log( 'GLOBAL ERROR :', `${err.name} : ${err.message}`)
                })
                .finally ( () => {
                    console.log('peticion de status de derivations terminada')
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
.welcomete {
    padding: 0 25px;
    color: rgb(10, 10, 10);
    font-family: 'Bungee', cursive;
    font-size: 1.5rem;
    text-align: center;
}
.gtr {
    background: green;
    background-color: red;
}
</style>
