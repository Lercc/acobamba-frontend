<template>
  <div>
    <base-header type="gradient-info" class="pb-6 pb-8 pt-5 pt-md-8">
      <!-- Card stats -->
      <b-row >
        <b-col class="justify-content-center pb-5">
          <p class="welcome">GENERAR CONTRASEÑA NUEVA</p>
        </b-col>
      </b-row>
    </base-header>

    <b-container fluid class="mt--6" >
      <b-row align-h="center">
        <b-col cols="12" xl="6">
          <b-card
            header="Crear nueva contraseña"
          >
            <b-form-row>
              <b-col cols="12">
                <b-form-group
                  label="Contraseña nueva"
                >
                  <b-form-input
                    type="password"
                    placeholder="Ingrese la contraseña nueva"
                    v-model="password"
                    :state="inputStatus('password')"
                  ></b-form-input>

                  <b-form-invalid-feedback v-for="(inputError ,index) in showInputErrors('password')" :key="`${index}-password`">
                    {{ inputError }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </b-col>

              <b-col cols="12">
                <b-form-group
                  label="Confirme contraseña nueva"
                >
                  <b-form-input
                    type="password"
                    placeholder="Ingrese la contraseña nueva"
                    v-model="passwordConfirmation"
                    :state="inputStatus('password_confirmation')"
                  ></b-form-input>

                  <b-form-invalid-feedback v-for="(inputError ,index) in showInputErrors('password_confirmation')" :key="`${index}-passwordConfirmation`">
                    {{ inputError }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </b-col>

              <b-col class="d-flex justify-content-center">
                <b-button
                  size="lg"
                  variant="info"
                  @click="actualizar"
                >
                  ACTUALIZAR
                </b-button>
              </b-col>

            </b-form-row>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { updateUserPassword } from '@/api/password'
import swal from 'sweetalert'
export default {
  name: 'UpdatePassword',

  data () {
    return {
      
      //
      password: '',
      passwordConfirmation: '',
      //
      initialValues: true,
      inputErrors: {}
    }
  },

  methods: {
    actualizar () {
      this.inputErrors = {}

      const formData = new FormData()
      formData.append('.method', 'put')
      formData.append('user_id', this.$route.params.user_id)
      formData.append('password', this.password)
      formData.append('password_confirmation',this.passwordConfirmation)

      updateUserPassword (this.$route.params.user_id, formData)
        .then(() => {
            swal('¡Actualización correcta!', '¿Quieres cerrar la sesion?', 'success')
              .then(res => {
                switch (res) {
                  case true:
                  case false:
                  case null:
                    this.$router.go(-1)
                    break
                  default:
                    console.log('break update user password');
                    break;
                }
              })
        })
        .catch(err => {
          console.log(err.response);
          if (err.response) {
            if (err.response.status == 422) {
              this.inputErrors = err.response.data.errors
            }
          }
        })
        .finally(() => {
          this.initialValues = false
          console.log('peticion updateCurrentPassword end');
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

<style>
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
</style>