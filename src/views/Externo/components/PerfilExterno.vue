<template>

    <div>
        <base-header type="gradient-info" class="pb-6 pb-8 pt-5 pt-md-8">
            <!-- Card stats -->
            <b-row >
                <b-col class="justify-content-center pb-5">
                    <p class="welcome">PERFIL DEL USUARIO</p>
                </b-col>
            </b-row>

            <b-row>
                <b-col>
                    <b-button :to="{ name: 'externo-actualizar-password' }">
                        Cambiar contraseña
                    </b-button>
                </b-col>
            </b-row>
        </base-header>
        
        <b-container fluid class="mt--6" >
            <b-row align-h="center">
                <b-col cols="12" xl="6">
                    <b-card no-body class="table-responsive"  >
                    
                        
                        <table class="table">
                            <tbody>
                                <tr>
                                    <td><h3><i class="ni ni-single-02 mr-2"></i>Usuario</h3></td>
                                    <td><h2>{{ `${this.processorData.user_name} ${this.processorData.user_last_name}` }}</h2></td>
                                   
                                </tr>
                                <tr>
                                    <td><h3><i class="ni ni-email-83 mr-2"></i>Correo</h3></td>
                                    <td> <h2> {{ this.processorData.user_email }}</h2></td>
                                </tr>
                                 <tr>
                                    <td><h3><i class="ni ni-badge mr-2"></i>Tipo de documento</h3></td>
                                    <td><h2>{{ this.processorData.user_doc_type }}</h2></td>
                                </tr>
                                 <tr>
                                    <td><h3><i class="ni ni-ui-04 mr-2"></i>Número de Documento</h3></td>
                                    <td><h2>{{ this.processorData.user_doc_number }}</h2></td>
                                </tr>
                                <tr>
                                    <td><h3><i class="ni ni-bold-right mr-2"></i>Estado</h3></td>
                                    <td><h2>{{ this.processorData.user_status}}</h2></td>
                                </tr>                              
                            </tbody>
                        </table>

                           <b-button variant="primary" :to="{name: 'externo-date-update'}"   >Actualizar Datos</b-button>
                    </b-card>
                </b-col>
            </b-row>
            </b-container>
        </div>
</template>

<script>
import { getProcessor } from '@/api/processor'

export default {
    data () {
        return {
            processorLoading: false,
            //
            processorData: [],
            //
            meta: {}
        }
    },

    beforeMount() {
        this.getProcessorData()
    },

    methods: {
        
        getProcessorData () {
            getProcessor(this.$store.state.user.data.processor_id)
                .then(response => {
                    this.processorData = response.data.data.attributes
                })
                .catch(err => {
                    console.log(err.response)
                })
                .finally(() => {
                    console.log('peticion de usuario terminada')
                })
        },
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

@media (max-width: 576px) {
  .welcome{ 
     font-size: 1.3rem;
      color: rgb(233, 233, 248); 
      text-align: center;
      }
}

</style>
