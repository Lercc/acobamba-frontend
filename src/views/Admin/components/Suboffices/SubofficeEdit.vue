<template>
  <div>
    <b-card v-show="officeLoading" class="loader-expedients" no-body>
        <moon-loader loading :size="100" :color="'#225ba5'" />
    </b-card>

    <b-card v-show="isNotFound" class="loader-expedients" no-body>
        {{ errStatus }}
        {{ errStatusText }}
    </b-card>

    <b-card v-show="!officeLoading && !isNotFound">
        <template #header>
            <b-row align-h="between">
                <b-col cols="auto">
                    SUBOFICINAS
                </b-col>
                <b-col cols="auto">
                    <b-button @click="cargarDatos" variant="success" size="sm">recargar</b-button>
                </b-col>
            </b-row>
        </template>

        <b-form-row>
          <b-col>
            <b-form-group
              label="oficina"
            >
              <b-form-select
                v-model="subofficeData.attributes.office_id"
                :options="officeOptions"
                :state="showInputStatus('office_id')"
              >
              </b-form-select>

              <b-form-invalid-feedback v-for="(inputError, index) in showInputErrors('office_id')" :key="`${index}-input-status`" class="text-danger">
                {{ inputError }}
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
        </b-form-row>

        <b-form-row>
          <b-col>
            <b-form-group
              label="nombre"
            >
              <b-form-input
                type="text"
                v-model="subofficeData.attributes.name"
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
                v-model="subofficeData.attributes.status"
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
            <b-button variant="info" @click="updateOffice">ACTUALIZAR</b-button>
          </b-col>
        </b-form-row>
    </b-card>
  </div>
</template>

<script>
import { getSuboffice, updateSuboffice } from '@/api/suboffice'
import { getOffices } from '@/api/office'
import swal from 'sweetalert'

export default {
  name: 'OfficeEdit',

  data () {
    return {
      officeLoading: false,
      //
      errStatus: '',
      errStatusText: '',
      isNotFound: false,
      //
      subofficeData: {
        attributes: {
          id: this.$route.params.id,
          office_id: 3,
          name: "Sub-Gerencia de Personal y RR.HH",
          status: "activado"
        }
      },
      //
      statusOptions: [
        { value: 'activado', text: 'activado'},
        { value: 'desactivado', text: 'desactivado'}
      ],
      officeOptions: [],
      //
      inputErrors: {},
      inputsIntialValues: true
    }
  },

  beforeMount () {
    this.getOfficesOptions()
    this.cargarDatos()
  },

  methods: {
    cargarDatos () {
      this.officeLoading = true
      this.inputsIntialValues = true
      this.inputErrors = {}

      getSuboffice (this.$route.params.id)
        .then(response => {
          if (response.data.data) this.subofficeData = response.data.data
        })
        .catch(err => {
          if (err.response.status == 404)
            this.isNotFound = true
            this.errStatus = err.response.status
            this.errStatusText = err.response.statusText
        })
        .finally(() => {
          this.officeLoading = false
          console.log('peticion suboffice terminada!');
        })
    },

    updateOffice () {
      this.inputErrors = {}

      const subofficeFormData= new FormData()
      subofficeFormData.append('.method', 'put')
      subofficeFormData.append('office_id', this.subofficeData.attributes.office_id)
      subofficeFormData.append('name', this.subofficeData.attributes.name)
      subofficeFormData.append('status', this.subofficeData.attributes.status)

      updateSuboffice (this.$route.params.id, subofficeFormData)
        .then (response => {
          if (response.data.data) 
            this.subofficeData = response.data.data
            swal('¡Actualización Correcta!','ok', 'success')
              .then (res => {
                if (res == null || res == true || res == false) 
                  this.$router.push({ name: 'suboffices' })
              })
        })
        .catch (err => {
          if (err.response.status == 422) this.inputErrors = err.response.data.errors

        })
        .finally (() => {
          this.inputsIntialValues = false
          console.log('peticion update suboffice terminada!');
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

    getOfficesOptions () {
      getOffices()
        .then( res => {
          console.log(res);
          if (res.data.data)
            this.officeOptions = res.data.data.map( e => ({ 'value': e.attributes.id, 'text': e.attributes.name}))
        })
    }

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
