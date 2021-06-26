<template>

    <div>
        <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
            <!-- Card stats -->
            <b-row >
                <b-col class="justify-content-center pb-5">
                    <p class="welcome">TRÁMITES REALIZADOS</p>
                </b-col>
            </b-row>

            <b-row align-h="end ">
                <!-- <b-col cols="auto" class="mb-2">
                    <b-button :to="{name: 'externo-tramite'}" variant="info" size="md">activos</b-button>
                </b-col> -->
                <!-- <b-col cols="auto" class="mb-2">
                    <b-button :to="{name: 'externo-tramite'}" variant="info" size="md">desactivados</b-button>
                </b-col> -->
                <b-col cols="auto" class="mb-2">
                    <b-button :to="{name: 'externo-tramite'}" variant="info" size="md" >nuevo trámite</b-button>
                </b-col>
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
import { getNotification } from '@/api/user'

export default {
    data () {
        return {
            
            notifications: {}, 

            "id": 1,
            "expedient_id": 55,
            "expedient_code": "65723-5440",
            "area": "RRHH",
            "exp_status": "archivado",
            "status": "no visto",
            "created_at": "hace 4 días"
        }
    },

    beforeMount() {
        this.getUserNotification()
    },

    methods: {
        getUserNotification() {
            // window.alert('hola')
            getNotification()
                .then (response => {
                    console.log(response.data.data)
                    this.notifications = response.data.data.filter((el, index) => index < 3)
                })
                .catch (err => {
                    console.log(err.response)
                })
                .finally ( () => {
                    console.log('peticion terminada')
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
