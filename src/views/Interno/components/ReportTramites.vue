<template>
    <div>
        <base-header type="gradient-info" class="pb-6 pb-8 pt-5 pt-md-8">
            <!-- Card stats -->
            <b-row >
                <b-col class="justify-content-center pb-5">
                    <p class="welcome">REPORTES DE TRÁMITES</p>
                </b-col>
            </b-row>

            <b-row align-h="end">
                <b-col cols="auto" class="mb-2">
                    <b-button :to="{name: 'externo-tramite'}" variant="info" size="md" >nuevo trámite</b-button>
                </b-col>
            </b-row>
        </base-header>
        
        <b-container fluid class="mt--6">
            <b-row>
                <b-col cols="12">
                <b-row>
                <b-col cols="4">
                      <b-card class="table-responsive">
                          <template #header>
                                <b-row align-h="between"  >
                                    <b-col  cols="12"   >
                                        <b-form-group label="Fecha de Inicio" >                                      
                                            <b-form-input type="date" v-model="start" />                                            
                                        </b-form-group>
                                    </b-col>     
                                </b-row>
                                <b-row align-h="between"  >    
                                    <b-col cols="12"  >
                                        <b-form-group label="Fecha de Final">                                      
                                            <b-form-input type="date" v-model="end" />                                            
                                        </b-form-group>
                                    </b-col>  
                                </b-row>
                                <b-row align-h="between"  >     
                                    <b-col cols="12"    >
                                        <b-form-group >               
                                            <b-button type="submit" @click="searchDateExpedientTotal"  variant="danger" ><i class="fa fa-search"></i> Buscar</b-button>
                                        </b-form-group>
                                    </b-col>
                                </b-row>
                        </template>
                        </b-card>
                </b-col>
                <b-col cols="7">

                    <b-card v-show="!hasExpedients" class="loader-expedients" no-body>
                        <p v-show="!expedientsLoading" class="text-center">No tiene tramites realizados</p>
                        <moon-loader v-show="expedientsLoading" :size="100" :color="'#225ba5'" />
                    </b-card>

                    <b-card v-show="hasExpedients" class="table-responsive">
                              <p class="welcomete">lISTA DE TRÁMITES</p>
                        <b-row align-h="center" class="mb-5">
                      
                            <b-button 
                                
                                    variant="success"
                                    size="sm">Descargar
                            </b-button>
                        </b-row>
        

                        <table class="table">
                            <thead>
                                <tr>
                                <th scope="col">Código</th>
                                <th scope="col">Tipo</th>
                                <th scope="col">Cabecera</th>
                                <th scope="col">Asunto</th>
                                <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(expedient, index) in expedients" :key="`${index}-ext-exp-ent`">
                                    <th scope="row">{{ expedient.attributes.code }}</th>
                                    <td>{{ expedient.attributes.document_type }}</td>
                                    <td>{{ expedient.attributes.header }}</td>
                                    <td>{{ expedient.attributes.subject }}</td>
                                    <td>
                                        <b-button 
                                            :to="{name: 'interno-detalle-tramite', params: {expedient_id: expedient.attributes.id}}"
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
            </b-col>    
        </b-row>
    </b-container>

    </div>
</template>
<script>
import { getEmployeeExpedients } from '@/api/expedient'
import { searchDateExpedientsEmployees} from '@/api/expedient' 

export default {
    data () {
        return {
            hasExpedients: false,
            expedientsLoading: false,
            //
            expedients: [],
            //
            meta: {},            
            start : '',
            end : ''
        }
    },

    beforeMount() {
        this.cargarDatos()
    },

    methods: {
        cargarDatos (pPage) {
            this.expedientsLoading = true
            this.hasExpedients = false

            getEmployeeExpedients(this.$store.state.user.data.employee_id, pPage)
                    .then (response => {
                    if (response.data.data) {
                        this.hasExpedients = true
                        this.expedients = response.data.data;
                        [this.meta]=[response.data.meta];
                    } else {
                        this.hasExpedients = false
                    }
                })
                .catch (err => {
                    console.log( 'GLOBAL ERROR :', `${err.name} : ${err.message}`)
                })
                .finally ( () => {
                    console.log('peticion de  expedientes terminada')
                    this.expedientsLoading = false
                })
        },

        searchDateExpedientTotal(){
             this.expedientsLoading = true
            this.hasExpedients = false

            searchDateExpedientsEmployees(this.$store.state.user.data.employee_id,this.start, this.end)
         
                .then (response => {
                     console.log('DATE=EXP : ' ,response);
                    if (response.data.data) {
                        this.hasExpedients = true
                        this.expedients = response.data.data;
                    } else {
                        this.hasExpedients = false
                    }
                })
                .catch (err => {
                    console.log( 'GLOBAL ERROR :', `${err.name} : ${err.message}`)
                })
                .finally ( () => {

               console.log('peticion de BUSCAR x Dte ')
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
.welcomete {
    padding: 0 25px;
    color: rgb(19, 17, 17);
    font-family: 'Bungee', cursive;
    font-size: 1.5rem;
    text-align: center;
}
.loader-expedients {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 400px;
}
</style>
