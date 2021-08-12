<template>
    <div>
        <base-header type="gradient-info" class="pb-6 pb-8 pt-5 pt-md-8">
        </base-header>
        
        <b-container fluid class="mt--6">
            <b-row>
                <b-col cols="12">
                    <b-card
                        header="REGISTRAR NUEVO TRÁMITE"
                    >
                        <!-- TIPO DOCUMENTO   -->
                        <b-form-row>
                            <b-col>
                                <b-form-group
                                    label="TIPO DOCUMENTO"
                                >
                                    <b-form-select
                                        v-model="document_type"
                                        :options="options"
                                        :state="inputStatus('document_type')"
                                    />
                                </b-form-group>
                                
                        <!-- HEADER -->
                            </b-col>
                            <b-col >
                                <b-form-group
                                    label="HEADER"
                                >
                                    <b-form-input 
                                        type="text"
                                        v-model="setHeader"
                                        disabled
                                        :state="inputStatus('header')"
                                    />
                                </b-form-group>
                            </b-col>
                        </b-form-row>


                        <!-- SUBJECT -->
                        <b-form-row>
                            <b-col>
                                <b-form-group
                                    label="SUBJECT"
                                >
                                    <b-form-textarea
                                        type="text"
                                        v-model="subject"
                                        placeholder="Ingrese el asunto"
                                        rows="2"
                                        :state="inputStatus('subject')"
                                    />

                                    <b-form-invalid-feedback
                                        v-for="(showInputError, index) in showInputErrors('subject')"
                                        :key="`subject-${index}`"
                                        class="text-danger"
                                    >
                                        {{ showInputError }}
                                    </b-form-invalid-feedback>
                                </b-form-group>
                            </b-col>
                        </b-form-row>
                      
                        <!-- FOLIOS -->
                        <b-form-row>
                            <b-col>
                                <b-form-group
                                    label="FOLIOS"
                                >
                                    <b-form-input
                                        type="number"
                                        v-model="folios"
                                        :state="inputStatus('folios')"
                                    />

                                    <b-form-valid-feedback> todo ok!</b-form-valid-feedback>
                                </b-form-group>
                            </b-col>
                        <!-- FILE -->
                             <b-col>
                                <b-form-group
                                    label="FILE"
                                >
                                    <b-form-file 
                                        v-model="file"
                                        placeholder="Seleccione su archivo"
                                        :state="inputStatus('file')"
                                    > </b-form-file>

                                    <b-form-invalid-feedback
                                        v-for="(showInputError, index) in showInputErrors('file')"
                                        :key="`file-${index}`"
                                        class="text-danger"
                                    >
                                        {{ showInputError }}
                                    </b-form-invalid-feedback>
                                </b-form-group>
                            </b-col>
                        </b-form-row>
                        
                        <b-form-row class="justify-content-center">
                        <b-button variant="info" @click="createExpedient">
                            Registrar
                        </b-button>
                    </b-form-row>
                    </b-card>
                </b-col>
            </b-row>
        </b-container>

    </div>
</template>

<script>
import { storeExpedient } from '@/api/expedient'
import { storeDerivation } from '@/api/derivation'
import { getSecretariaTramDoc } from '@/api/employee'
import swal from 'sweetalert'

export default {
    data () {
        return {
            state: false,
            //
            document_type: 'solicitud',
            // header // reemplazador por el computed setHeader
            subject: '',
            folios: '1',
            file: null,
            //
            options: [
                { value: 'solicitud', text: 'solicitud'},
                { value: 'carta', text: 'carta' },
                { value: 'dictamen', text: 'dictamen' },
                { value: 'directiva', text: 'directiva' },
                { value: 'expediente', text: 'expediente' },
                { value: 'informe', text: 'informe' },
                { value: 'memorandum', text: 'memorandum' },
                { value: 'oficio', text: 'oficio' },
            ],
            //
            inputErrors: {},
            //
            inputInitialValues: true

        }
    },

    beforeMount() {
        this.getEmployeeTramDocOffice()
    },


    computed: {
        setHeader () {
            const time = new Date()
            return `${this.document_type}-${time.getDate()}/${time.getMonth() + 1}/${time.getFullYear()}`
        }
    },

    methods: {
        createExpedient () {
            this.inputErrors = {}
            let expedientFormData = new FormData()

            expedientFormData.append('processor_id', this.$store.state.user.data.processor_id)
            expedientFormData.append('document_type', this.document_type)
            expedientFormData.append('header', this.setHeader)
            expedientFormData.append('subject', this.subject)
            expedientFormData.append('folios', this.folios)
            expedientFormData.append('file', this.file)
            expedientFormData.append('status', 'activado')

            // console.log(expedientFormData.get('file'))
            storeExpedient(expedientFormData)
                .then(response => {
                    if (response.status == 201) {
                        console.log('respuesta de la creacion:' ,response);
                        if (response.data.data) {
                            const FirstDerivationFormData = new FormData()
                            FirstDerivationFormData.append('expedient_id', response.data.data.attributes.id)
                            FirstDerivationFormData.append('user_id', this.$store.state.user.data.id)
                            FirstDerivationFormData.append('employee_id', this.secretariaTramDocId)
                            FirstDerivationFormData.append('status', 'nuevo')
                            storeDerivation(FirstDerivationFormData)
                                .then(res =>{
                                    console.log('first derivation :', res);
                                })
                                .catch(err =>{
                                    console.log('first derivation error:', err.response);
                                })
                        }

                        swal('Registro exitoso!', `codigo de expediente: ${response.data.data.attributes.code}`, 'success')
                            .then( res => {
                                switch (res) {
                                    case true:
                                    case null:
                                    case false :
                                        this.$router.push({name: 'externo-tramites-realizados'})
                                        break
                                    default :
                                        console.log('swal break exp')
                                }
                            })
                       this.clearData()
                    }
                })
                .catch(err => {
                    if (err.response){
                        if (err.response.status == 422) {
                            this.inputErrors = err.response.data.errors
                        }
                    }
                })
                .finally(() => {
                    this.inputInitialValues = false
                    console.log('request de exp terminada!');
                })
        },

        showInputErrors(pInput) {
            const errorKeys = Object.keys(this.inputErrors)
            if (errorKeys.includes(pInput)) return this.inputErrors[pInput]
            else return []
        },

        inputStatus(pInput) {
            if (this.inputInitialValues == true ) return null
            else if (Object.keys(this.inputErrors).includes(pInput)) return false
            else return true
        },

        getEmployeeTramDocOffice() {
            getSecretariaTramDoc()
                .then(res => {
                    this.secretariaTramDocId = res.data
                })
        }
    }

}
</script>