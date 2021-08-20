<template>
  <b-container class="mt-6">

    <b-row align-h="center">
      <b-col cols="12" md="8">
        <b-card no-body class="shadow d-flex justify-content-center align-items-center" style="min-height:350px">
          <span v-show="loading">
            <moon-loader loading :size="100" :color="'#225ba5'" />
          </span>

          <span v-show="messageState">
            {{ requestMessage }}
          </span>

          <b-card-body v-show="!loading && !messageState">
            <b-card-title class="text-uppercase text-center py-3 recovery-class">
              Enviar correo de recuperación
            </b-card-title>

              <b-form-row>
                <b-col cols="12">
                  <b-form-group
                    label="Ingrese su correo"
                  >
                    <b-form-input
                      type="email"
                      placeholder="Ingrese el correo"
                      v-model="email"
                      :state="inputStatus('email')"
                    ></b-form-input>

                    <b-form-invalid-feedback v-for="(inputError, index) in showInputErrors('email')" :key="`${index}-pass`">
                      {{ inputError }}
                    </b-form-invalid-feedback>
                  </b-form-group>
                </b-col>

                <b-col class="d-flex justify-content-center py-3">
                  <b-button variant="primary"  @click="recuperarContra">Enviar correo</b-button>
                </b-col>
              </b-form-row>
              
          <b-form-row class="justify-content-center borde mt-5">
                <b-button :to="{name: 'home'}" variant="link">Volver al Inicio</b-button>
            </b-form-row>

          </b-card-body>

        </b-card>
      </b-col>
    </b-row>

  
  </b-container>
</template>

<script>
import { storeEmailPasswordRecovery } from '@/api/email'

export default {
  name: 'PasswordRecovery',

  data () {
    return {
      loading: false,
      //
      messageState: false,
      requestMessage: '',
      //
      email: '',
      //
      initialValues : true,
      //
      inputErrors: {}
    }
  },

  methods: {
    recuperarContra () {
      this.inputErrors = {}
      this.loading = true

      const recoveryPasswordFormData = new FormData()
      recoveryPasswordFormData.append('email', this.email)

      storeEmailPasswordRecovery(recoveryPasswordFormData)
        .then(() => {
          this.messageState = true
          this.requestMessage = '¡Correo enviado correctamente!'
        })
        .catch(err => {
          if (err.response){
            if (err.response.status == 422) this.inputErrors = err.response.data.errors
          }
        })
        .finally(() => {
          this.initialValues = false
          this.loading = false

          console.log('request send email recovery pass end!');
        })
    },

    showInputErrors (pInput) {
      if(Object.keys(this.inputErrors).includes(pInput)) return this.inputErrors[pInput]
      else return []
    },

    inputStatus (pInput) {
      if (this.initialValues) return null
      else if (Object.keys(this.inputErrors).includes(pInput)) return false
      else return true

    }
  }

}
</script>

<style scoped>

.recovery-class {
    font-size:40px;
    font-family:Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
}


@media (max-width: 576px) {
  .recovery-class{ 
     font-size: 25px;
      color: rgb(17, 17, 41); }
}
 
</style>
