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
                                            <b-form-input type="date" v-model="start" required/>
                                        </b-form-group>
                                    </b-col>     
                                </b-row>
                                <b-row align-h="between"  >    
                                    <b-col cols="12"  >
                                        <b-form-group label="Fecha de Final">
                                            <b-form-input type="date" v-model="end" required/>
                                        </b-form-group>
                                    </b-col>  
                                </b-row>
                                <b-row align-h="between"  >     
                                    <b-col cols="6"    >
                                        <b-form-group >               
                                            <b-button type="submit" @click="searchDateExpedientTotal"  variant="danger" ><i class="fa fa-search"></i> Buscar</b-button>
                                        </b-form-group>
                                    </b-col>
                                  
                                    <b-col cols="6"    >
                                        <b-form-group >               
                                            <b-button  @click="descargarPDF"  variant="info" ><i class="fa fa-search"></i> descargar</b-button>
                                        </b-form-group>
                                    </b-col>
                                </b-row>
                        </template>
                        </b-card>
                </b-col>
                <b-col cols="7">

                    <b-card v-show="!hasDerivations" class="loader-expedients" no-body>
                        <p v-show="!expedientsLoading" class="text-center">No tiene tramites realizados</p>
                        <moon-loader v-show="expedientsLoading" :size="100" :color="'#225ba5'" />
                    </b-card>

                    <b-card v-show="hasDerivations" class="table-responsive" id="page">
                        <p class="welcomete">lISTA DE TRÁMITES</p>
                       
        

                        <table class="table" >
                            <thead>
                                <tr>
                                <th scope="col">Código</th>                             
                                <th scope="col">Derivado por </th>
                                <th scope="col">Fecha de Derivación</th>
                                <th scope="col">Estado</th>
                                <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(derivation, index) in derivations" :key="`${index}-ext-exp-ent`">
                                    <th scope="row">{{ derivation.attributes.expedient_code }}</th>
                                    <td>
                                        {{derivation.attributes.user_area}}
                                        <br>
                                        {{derivation.attributes.user_name}}
                                    </td>

                                    <td>{{ derivation.attributes.createdAt }}</td>

                                    <td>
                                        <span :class=" derivation.attributes.status == 'nuevo' ? 'badge badge-success' : derivation.attributes.status == 'en proceso' ? 'badge badge-primary' : 'badge badge-warning'"> {{derivation.attributes.status}}</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                    </b-card>
                </b-col>

                </b-row>
            </b-col>
        </b-row>
    </b-container>

    </div>
</template>
<script>
import { getEmployeeDerivations, searchDateDerivationsEmployees } from '@/api/employee'

import html2PDF from 'jspdf-html2canvas';

export default {
    data () {
        return {
            hasDerivations: false,
            expedientsLoading: false,
            //
            derivations: [],
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
            this.hasDerivations = false

            getEmployeeDerivations(this.$store.state.user.data.employee_id, pPage) 
                .then (response => {
                    console.log(response);
                    if (response.data.data) {
                        this.hasDerivations = true
                        this.derivations = response.data.data;
                        [this.meta]=[response.data.meta];
                        if (this.derivations.length == 0 ) this.hasDerivations = false
                    } else {
                        this.hasDerivations = false
                    }
                })
                .catch ((err) => {
                    console.log( 'GLOBAL ERROR :', `${err.name} : ${err.message}`)
                })
                .finally ( () => {
                    console.log('peticion de  expedientes terminada')
                    this.expedientsLoading = false
                })
        },

        searchDateExpedientTotal (){
            this.expedientsLoading = true
            this.hasDerivations = false

            searchDateDerivationsEmployees(this.$store.state.user.data.employee_id, this.start, this.end)
                .then (response => {
                     console.log('DATE=EXP : ' ,response);
                    if (response.data.data) {
                        this.hasDerivations = true
                        this.derivations = response.data.data;
                    } else {
                        this.hasDerivations = false
                    }
                })
                .catch (err => {
                    console.log( 'GLOBAL ERROR :', `${err.name} : ${err.message}`)
                })
                .finally ( () => {

               console.log('peticion de BUSCAR x Dte ')
                    this.expedientsLoading = false
                })

        },

        descargarPDF () {
            let page = document.getElementById('page');

            html2PDF(page, {
                jsPDF: {
                    format: 'a4',
                },
                imageType: 'image/jpeg',
                output: './pdf/generate.pdf'
            });
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
