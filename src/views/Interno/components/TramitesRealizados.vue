<template>
    <div>
        <base-header type="gradient-info" class="pb-6 pb-8 pt-5 pt-md-8">
            <!-- Card stats -->
            <b-row >
                <b-col class="justify-content-center pb-5">
                    <p class="welcome">TRÁMITES REALIZADOS</p>
                </b-col>
            </b-row>

            <b-row align-h="end">
                <b-col cols="auto" class="mb-2">
                     <b-container>
                    <b-button :to="{name: 'externo-tramite'}" variant="info" size="md" >Volver al  Dashboard</b-button>
                     </b-container>
                </b-col>
            </b-row>
        </base-header>
        
        <b-container fluid class="mt--6">
            <b-row>
                <b-col cols="12">
                    <b-card v-show="!hasExpedients" class="loader-expedients" no-body>
                        <p v-show="!expedientsLoading" class="text-center">No tiene tramites realizados</p>
                        <moon-loader v-show="expedientsLoading" :size="100" :color="'#225ba5'" />
                    </b-card>

                    <b-card v-show="hasExpedients" class="table-responsive">
                          <template #header>
                            <b-row align-h="between"  >
                                 <b-container>
                                      <b-form-row>
                                    <b-col cols="12" sm="4" md="4" >
                                        <b-form-group>
                                        <b-form-select 
                                            v-model="criterio" 
                                            :options= "tramitesOptions">                                        
                                            </b-form-select>
                                        </b-form-group>
                                    </b-col>
                                    <b-col cols="12" sm="4" md="4">
                                        <b-form-group >                                      
                                            <b-form-input type="text" v-model="buscar" @keyup.enter="searchExpedientTotal"  placeholder="Texto a buscar"/>                                            
                                        </b-form-group>
                                    </b-col>     
                                    <b-col cols="12" sm="4" md="4" >
                                        <b-form-group >               
                                            <b-button type="submit" @click="searchExpedientTotal"  variant="danger" ><i class="fa fa-search"></i> Buscar</b-button>
                                        </b-form-group>
                                    </b-col>
                                </b-form-row>
                              </b-container>
                            </b-row>
                        </template>

                        <table class="table">
                            <thead>
                                <tr>
                                <th scope="col">Acciones</th>
                                <th scope="col">Código</th>
                                <th scope="col">Tipo</th>
                                <th scope="col">Cabecera</th>
                                <th scope="col">Asunto</th>
                            
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(expedient, index) in expedients" :key="`${index}-ext-exp-ent`">
                                     <td>
                                        <b-button 
                                            :to="{name: 'interno-detalle-tramite', params: {expedient_id: expedient.attributes.id}}"
                                            variant="info"
                                            size="sm">ver detalles
                                        </b-button>
                                    </td>
                                    <th scope="row">{{ expedient.attributes.code }}</th>
                                    <td>{{ expedient.attributes.document_type }}</td>
                                    <td>{{ expedient.attributes.header }}</td>
                                    <td>{{ expedient.attributes.subject }}</td>
                              
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
import { getEmployeeExpedients } from '@/api/expedient'
import { searchExpedientsEmployees} from '@/api/expedient' 

export default {
    data () {
        return {
            hasExpedients: false,
            expedientsLoading: false,
            //
            expedients: [],
            //
            meta: {},            
            criterio : 'code',
            buscar : '',

            tramitesOptions: [
                   { value: 'code', text: 'codigo'},
                   { value: 'subject', text: 'asunto'}  ,
            ],
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

        searchExpedientTotal(){
             this.expedientsLoading = true
            this.hasExpedients = false

            searchExpedientsEmployees(this.$store.state.user.data.employee_id,this.buscar, this.criterio)
         
                .then (response => {
                     console.log('GET=EXP : ' ,response);
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

               console.log('peticion de  filtradp terminada')
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
.loader-expedients {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 400px;
}

@media (max-width: 576px) {
  .welcome{ 
     font-size: 1.3rem;
      color: rgb(233, 233, 248); }
}

</style>
