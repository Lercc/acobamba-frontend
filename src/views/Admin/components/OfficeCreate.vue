<template>
  <div>
    <b-card v-show="officeLoading" class="loader-expedients" no-body>
        <moon-loader loading :size="100" :color="'#225ba5'" />
    </b-card>

    <b-card v-show="!officeLoading">
        <template #header>
            <b-row align-h="between">
                <b-col cols="auto">
                    OFICINAS
                </b-col>
            </b-row>
        </template>

        <b-form-row>
          <b-col>
            <b-form-group
              label="nombre"
            >
              <b-form-input
                type="text"
                placeholder="Ingrese el nombre de la oficina"
                v-model="officeData.attributes.name"
                :state="showInputStatus('name')"
              >
              </b-form-input>

              <b-form-invalid-feedback v-for="(inputError, index) in showInputErrors('name')" :key="`${index}-input-name`" class="text-danger">
                {{ inputError }}
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
        </b-form-row>
      
        <b-form-row>
          <b-col>
            <b-form-group
              label="estado"
            >
              <b-form-select
                v-model="officeData.attributes.status"
                :options="statusOptions"
                :state="showInputStatus('status')"
              >
              </b-form-select>

              <b-form-invalid-feedback v-for="(inputError, index) in showInputErrors('status')" :key="`${index}-input-status`" class="text-danger">
                {{ inputError }}
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
        </b-form-row>

        <b-form-row >
          <b-col class="d-flex justify-content-center">
            <b-button variant="info" @click="createOffice">ACTUALIZAR</b-button>
          </b-col>
        </b-form-row>
    </b-card>
  </div>
</template>

<script>
import { storeOffice } from '@/api/office'
import swal from 'sweetalert'

export default {
  name: 'OfficeCreate',

  data () {
    return {
      officeLoading: false,
      //
      officeData: {
        attributes: {
          name: '',
          status: 'activado'
        }
      },
      //
      statusOptions: [
        { value: 'activado', text: 'activado'},
        { value: 'desactivado', text: 'desactivado'}
      ],
      //
      inputErrors: {},
      inputsIntialValues: true
    }
  },

  methods: {
    createOffice () {
      this.inputErrors = {}

      const officeFormData= new FormData()
      officeFormData.append('name', this.officeData.attributes.name)
      officeFormData.append('status', this.officeData.attributes.status)

      storeOffice (officeFormData)
        .then (response => {
          if (response.data.data) 
            this.officeData = response.data.data
            swal('¡Creación Correcta!','ok', 'success')
              .then (res => {
                if (res == null || res == true || res == false)
                  this.$router.push({ name: 'offices' })
              })
        })
        .catch (err => {
          if (err.response.status == 422) this.inputErrors = err.response.data.errors

        })
        .finally (() => {
          this.inputsIntialValues = false
          console.log('peticion update office terminada!');
        })
    },

    showInputErrors (pInput) {
      if(Object.keys(this.inputErrors).includes(pInput)) return this.inputErrors[pInput]
      else return []
    },

    showInputStatus (pInput) {
      if (this.inputsIntialValues) return null
      else if(Object.keys(this.inputErrors).includes(pInput)) return !true
      else return !false
    },

  }
}
</script>

<style scoped>
.loader-expedients {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 400px;
}
</style>
