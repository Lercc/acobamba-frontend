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
            <b-card-title class="text-uppercase text-center py-3">
              Crear nueva contraseña
            </b-card-title>

              <b-form-row>
                <b-col cols="12">
                  <b-form-group
                    label="Ingrese su nueva contraseña"
                  >
                    <b-form-input
                      type="password"
                      placeholder="Ingrese una contraseña"
                      v-model="password"
                      :state="inputStatus('password')"
                    ></b-form-input>

                    <b-form-invalid-feedback v-for="(inputError, index) in showInputErrors('password')" :key="`${index}-pass`">
                      {{ inputError }}
                    </b-form-invalid-feedback>
                  </b-form-group>
                </b-col>

                <b-col cols="12">
                  <b-form-group
                    label="Vuelva a ingresar su contraseña"
                  >
                    <b-form-input
                      type="password"
                      placeholder="Repita la contraseña"
                      v-model="password_confirmation"
                      :state="inputStatus('password_confirmation')"
                    ></b-form-input>

                    <b-form-invalid-feedback v-for="(inputError, index) in showInputErrors('password_confirmation')" :key="`${index}-re-pass`">
                      {{ inputError }}
                    </b-form-invalid-feedback>
                  </b-form-group>
                </b-col>

                <b-col class="d-flex justify-content-center py-3">
                  <b-button @click="actualizarContra">actualizar contraseña</b-button>
                </b-col>
              </b-form-row>
          </b-card-body>

        </b-card>
      </b-col>
    </b-row>

  
  </b-container>
</template>

<script>
import { getEmailPasswordRecovery, updateEmailPasswordRecovery } from '@/api/email'
import { updateRecoveryPassword } from '@/api/password'

export default {
  name: 'PasswordRecovery',

  data () {
    return {
      loading: true,
      //
      emailPasswordRecoveryData: {},
      //
      messageState: false,
      requestMessage: '',
      //
      password: '',
      password_confirmation: '',
      //
      initialValues : true,
      //
      inputErrors: {}
    }
  },

  beforeMount () {
    this.emailVerification()
  },

  methods: {
    emailVerification () {
      this.loading = true
      this.messageState = false
      this.requestMessage = ''
      this.emailPasswordRecoveryData = {}

      getEmailPasswordRecovery(this.$route.params.emailId)
        .then(response => {
          const currentTime = new Date().getTime()
          if (response.data.status == 'invalido' || currentTime > response.data.expiration_at * 1000) {
            this.messageState = true
            this.requestMessage = 'Tiempo agotado, realize una nueva petición'
          }
          else {
            this.emailPasswordRecoveryData = response.data
          }
        })
        .catch(err => {
          console.log(err.response);
          if (err.response.status == 404) {
            this.requestMessage = `${err.response.status} ${err.response.statusText}`
            this.messageState = true
          }
        })
        .finally(() => {
          this.loading = false
          console.log('peticion email terminada!');
        })
    },

    actualizarContra () {
      this.inputErrors = {}

      const recoveryPasswordFormData = new FormData()
      recoveryPasswordFormData.append('.method', 'put')
      recoveryPasswordFormData.append('password', this.password)
      recoveryPasswordFormData.append('password_confirmation', this.password_confirmation)

      updateRecoveryPassword(this.emailPasswordRecoveryData.user_id, recoveryPasswordFormData)
        .then(() => {
          this.messageState = true
          this.requestMessage = '¡Contraseña actualizada correctamente!'

          const formData = new FormData()
          formData.append('.method', 'put')
          formData.append('status', 'invalido')
          updateEmailPasswordRecovery(this.$route.params.emailId, formData)
            .then(res => {
              console.log('update emailPasswordRecovery', res);
            })
            .catch(err => {
              console.log('update emailPasswordRecovery ERRor: ',err.response);
            })
            .finally(() => {
              this.initialValues = false
              console.log('request updateEmailPasswordRecovery  end!');
            })
          })
        .catch(err => {
          console.log(err.response);
          if (err.response){
            if (err.response.status == 422) this.inputErrors = err.response.data.errors
          }
        })
        .finally(() => {
          this.initialValues = false
          console.log('request update recovery pass end!');
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