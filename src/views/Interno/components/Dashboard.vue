<template>

    <div>
        <base-header type="gradient-info" class="pb-6 pb-8 pt-5 pt-md-8">
            <!-- Card stats -->
             <b-container>
            <b-row >
                <b-col  cols="12" class="justify-content-center pb-5">
                    <p class="welcome">Bienvenido a la Mesa de Partes Virtual</p>
                </b-col>
            </b-row>

            <b-row>
                <b-col cols="12" lg="6" xl="4" v-for="(notification, index) in notifications" :key="`${index}-dash-notif`">
                    <b-card class="mb-4 mb-xl-0" >
                        <b-card-text class="text-justify">
                            Tu expediente de codigo <span class="text-blue">{{notification.attributes.expedient_code}}</span> ha sido <span class="text-blue">{{notification.attributes.exp_status}}</span> <span v-show="notification.attributes.exp_status === 'archivado' ? false : true" > al area de : <span class="text-blue">{{notification.attributes.area}}</span></span>.
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

            </b-container>
        </base-header>
        
        <b-container fluid class="border border-red mt--6">
            <b-row align-h="center">
                <b-col cols="12" sm="9" md="9" lg="6" xl="6">
                    <b-card no-body class="p-4 text-center" v-if="showChar">
                        <p class="welcomete">Estadística de los Estados de los Expedientes Derivados</p>

                        <p v-show="derivations.length == 0">
                            no tiene derivaciones
                        </p>
                        
                        <p v-show="derivations.length == 0">
                            no tiene archivaciones
                        </p>

                        <chart-estado
                            v-show="!derivations.length == 0"
                            :nuevoData="nuevoAmount"
                            :enProcesoData="enProcesoAmount"
                            :derivadoData="derivadoAmount"
                            :archivadoData="archivadoAmount"
                        />
                    </b-card>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>
<script>
import { getEmployeeNotifications } from '@/api/notification'
import { getEmployeeDerivationsState } from '@/api/employee'
import { getUserAmountArchivations } from '@/api/user'
import ChartEstado from './ViewsCharts/ChartEstado.vue'


export default {
    components: {
       ChartEstado
    },
    data () {
        return {
            //
            showChar: false,

            derivations: [],
            archivations: [],
            status: [], 
            notifications: {},

            // charDATA
            nuevoAmount: 0,
            enProcesoAmount: 0,
            derivadoAmount: 0,
            archivadoAmount: 0
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
            this.showChar = false

            getEmployeeDerivationsState(this.$store.state.user.data.employee_id)
                .then (({ data }) => {
                    // console.log('EmploDerivationAll :', data);
                    if (data.data) {
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
                    }
                    getUserAmountArchivations(this.$store.state.user.data.id)
                    .then(res => {
                        // console.log('UserAmountArchivation :', res);
                        this.archivations = res.data
                        this.archivadoAmount = res.data.length
                    })
                    .catch ((err) => {
                    console.log( 'GLOBAL ERROR :', `${err.name} : ${err.message}`)
                    })
                    .finally ( () => {
                        console.log('peticion de status de derivations terminada')
                        this.showChar = true
                    })
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

@media (max-width: 761px) {
  .welcome { display: none !important; }
}

@media (max-width: 576px) {
  .welcomete{ 
     font-size: 1.2rem;
      color: rgb(33, 33, 37); }
}



</style>
