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
                            Tu expediente de codigo <span class="text-blue">{{notification.attributes.expedient_code}}</span> ha sido <span class="text-blue">{{notification.attributes.exp_status}}</span> <span v-show="notification.attributes.exp_status === 'archivado' ? false : true" >  al area de: <span class="text-blue">{{notification.attributes.area}}</span></span>.
                            <b-badge variant="info">{{ notification.attributes.status === 'visto' ? 'visto' : 'nuevo'}}</b-badge>
                        </b-card-text>
                        <template #footer>
                            <div class="d-flex justify-content-around align-items-center">
                                <small class="text-muted ">{{notification.attributes.created_at}}</small> 
                                <b-button :to="{name: 'externo-detalle-expediente', params: { id: notification.attributes.expedient_id}}" variant="info" size="sm">ver trámite</b-button>
                            </div>
                        </template>
                    </b-card>
                </b-col>

                <!-- <b-col cols="12" class="py-4">
                    <p class="text-center m-0">
                        <a href="" class="text-white text-underline opacity-7">+ VER TODO</a>
                    </p>
                </b-col> -->
            </b-row>
        </base-header>
        
        <b-container fluid class="border border-red mt--6">
            <b-row>
                <b-col cols="12">
                    <b-card img-src="/img/guide/guide.png" overlay></b-card>
                </b-col>    
            </b-row>
        </b-container>

    </div>
</template>
<script>
import { getProcessorNotifications } from '@/api/notification'

export default {
    data () {
        return {
            notifications: {},
        }
    },

    beforeMount() {
        this.getNotifications()
    },

    methods: {
        getNotifications() {
            getProcessorNotifications (this.$store.state.user.data.processor_id)
                .then (response => {
                    this.notifications = response.data.data.filter((el, index) => index < 3)
                })
                .catch (err => {
                    console.log(err.response)
                })
                .finally ( () => {
                    console.log('peticion de  notificaciones processor  terminada')
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
