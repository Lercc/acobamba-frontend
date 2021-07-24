<template>
  <div>
    <b-card v-show="userInternoLoading" class="loader-userInternos" no-body>
      <moon-loader loading :size="60" :color="'#225ba5'" />
    </b-card>

    <b-card v-show="isNotFound" class="loader-userInternos" no-body>
      {{ errStatus }}
      {{ errStatusText }}
    </b-card>

    <b-card v-show="!userInternoLoading && !isNotFound">
      <template #header>
        <b-row align-h="between">
          <b-col cols="auto">
            EDITAR USUARIOS DE LA MUNICIPALIDAD DISTRITAL DE ACOBAMBA
          </b-col>
            <b-col cols="auto">
              <b-button 
                  :to="{ name: 'admin-actualizar-password', params: { 'user_id': userInternoData.attributes.user_id}}"
                  variant="success"
                  size="sm"
              >
                  Cambiar contraseña
              </b-button>
          </b-col>
        </b-row>
      </template>

      <b-form-row>
        <b-col>
          <b-form-group label="NOMBRES">
            <b-form-input
              type="text"
              v-model="userInternoData.attributes.user_name"
              :state="showInputStatus('user_name')"
            >
            </b-form-input>
            <b-form-invalid-feedback
              v-for="(inputError, index) in showInputErrors('user_name')"
              :key="`${index}-input-user_name`"
              class="text-danger"
            >
              {{ inputError }}
            </b-form-invalid-feedback>
          </b-form-group>
        </b-col>
      </b-form-row>

      <!-- LAST_NAME   -->
      <b-form-row>
        <b-col>
          <b-form-group label="APELLIDOS">
            <b-form-input
              type="text"
              v-model="userInternoData.attributes.user_last_name"
              :state="showInputStatus('user_last_name')"
            >
            </b-form-input>
            <b-form-invalid-feedback
              v-for="(inputError, index) in showInputErrors('user_last_name')"
              :key="`${index}-input-user_last_name`"
              class="text-danger"
            >
              {{ inputError }}
            </b-form-invalid-feedback>
          </b-form-group>
        </b-col>
      </b-form-row>

      <!-- EMAIL   -->
      <b-form-row>
        <b-col>
          <b-form-group label="CORREO ELECTRONICO">
            <b-form-input
              type="email"
              v-model="userInternoData.attributes.user_email"
              :state="showInputStatus('user_email')"
            >
            </b-form-input>
            <b-form-invalid-feedback
              v-for="(inputError, index) in showInputErrors('user_email')"
              :key="`${index}-input-user_email`"
              class="text-danger"
            >
              {{ inputError }}
            </b-form-invalid-feedback>
          </b-form-group>
        </b-col>
      </b-form-row>

      <!-- TIPO DOCUMENTO   -->
      <b-form-row>
        <b-col>
          <b-form-group label="TIPO DOCUMENTO">
            <b-form-select
              type="text"
              v-model="userInternoData.attributes.user_doc_type"
              :options="doc_typeOptions"
              :state="showInputStatus('user_doc_type')"
            >
            </b-form-select>

            <b-form-invalid-feedback
              v-for="(inputError, index) in showInputErrors('user_doc_type')"
              :key="`${index}-input-user_doc_type`"
              class="text-danger"
            >
              {{ inputError }}
            </b-form-invalid-feedback>
          </b-form-group>
        </b-col>
      </b-form-row>
      <!-- NUMERO DE DOCUMENTO  -->
      <b-form-row>
        <b-col>
          <b-form-group label="NUMERO DE DOCUMENTO">
            <b-form-input
              type="text"
              v-model="userInternoData.attributes.user_doc_number"
              :state="showInputStatus('user_doc_number')"
            >
            </b-form-input>
            <b-form-invalid-feedback
              v-for="(inputError, index) in showInputErrors('user_doc_number')"
              :key="`${index}-input-user_doc_number`"
              class="text-danger"
            >
              {{ inputError }}
            </b-form-invalid-feedback>
          </b-form-group>
        </b-col>
      </b-form-row>

      <!-- EMAIL   -->
      <b-form-row>
        <b-col>
          <b-form-group label="TIPO DE TRABAJADOR MUNICIPAL">
            <b-form-input
              type="text"
              v-model="userInternoData.attributes.employee_type"
              :state="showInputStatus('employee_type')"
            >
            </b-form-input>
            <b-form-invalid-feedback
              v-for="(inputError, index) in showInputErrors('employee_type')"
              :key="`${index}-user_input-email`"
              class="text-danger"
            >
              {{ inputError }}
            </b-form-invalid-feedback>
          </b-form-group>
        </b-col>
      </b-form-row>
     

      <h2>{{userInternoData.attributes.office_name}}</h2>
      <h2>{{userInternoData.attributes.suboffice_name}}</h2>
      <b-form-row>
        <b-col>
          <b-form-group>
            <b-form-radio-group
              v-model="typeOfficeRadioSelect"
              class="d-flex justify-content-around"
              buttons
              button-variant="outline-info"
              @change="inputRadioOfficeSubofficeChanged"
            >
              <b-form-radio value="office">Selecciona una oficina</b-form-radio>
              <b-form-radio value="suboffice">Selecciona una sub-oficina</b-form-radio>
            </b-form-radio-group>
          </b-form-group>
        </b-col>
      </b-form-row>

    <!-- <b-form-row
        v-if="typeOfficeRadioSelect == 'office' && userInternoData.attributes.office_id"
      > -->
         <b-form-row
           v-if="typeOfficeRadioSelect == 'office'"
         >
        <b-col>
          <b-form-group label="Selecciona la Oficina: ">
            <b-form-select
              placeholder="Selecione office"
              v-model="userInternoData.attributes.office_id"
              :options="officeOptions"
            >
              <template #first>
                <b-form-select-option value='' disabled
                  >-- Selecciona un oficina --</b-form-select-option
                >
              </template>
            </b-form-select>
          </b-form-group>
        </b-col>
      </b-form-row>

      <b-form-row v-else>
        <b-col>
          <b-form-group label="Selecciona la Suboficina: ">
            <b-form-select
              placeholder="Selecione suboffice"
              v-model="userInternoData.attributes.suboffice_id"
              :options="subofficeOptions"
            >
              <template #first>
                <b-form-select-option value='' disabled
                  >-- Selecciona una suboficina --</b-form-select-option
                >
              </template>
            </b-form-select>
          </b-form-group>
        </b-col>
      </b-form-row>
      <b-form-row>
        <b-col>
          <b-form-group label="estado">
            <b-form-select
              v-model="userInternoData.attributes.user_status"
              :options="statusOptions"
              :state="showInputStatus('user_status')"
            >
            </b-form-select>

            <b-form-invalid-feedback
              v-for="(inputError, index) in showInputErrors('user_status')"
              :key="`${index}-input-user_status`"
              class="text-danger"
            >
              {{ inputError }}
            </b-form-invalid-feedback>
          </b-form-group>
        </b-col>
      </b-form-row>

      <b-form-row>
        <b-col class="d-flex justify-content-center">
          <b-button variant="info" @click="updateDateUserInterno">ACTUALIZAR</b-button>
        </b-col>
      </b-form-row>
    </b-card>
  </div>
</template>

<script>
import { getEmployee, updateEmployee } from "@/api/employee";
import { getAllOffices }  from '@/api/office'
import { getAllSuboffices }  from '@/api/suboffice'
import swal from "sweetalert";

export default {
  data() {
    return {
      userInternoLoading: false,
      errStatus: '',
      errStatusText: '',
      isNotFound: false,
      typeOfficeRadioSelect: "office",
      userInternoData: {
        attributes: {
          id: this.$route.params.id,
          // user_id: 3,
          user_name: '',
          user_last_name: '',
          user_email: '',
          user_status: '',
          office_id: '',
          suboffice_id: '',
          office_name_suboffice: '',
          employee_type: '',
        },
      },

      statusOptions: [
        { value: "activado", text: "activado" },
        { value: "desactivado", text: "desactivado" },
      ],
      doc_typeOptions: [
        { value: "dni", text: "dni" },
        { value: "extranjeria", text: "extranjeria" },
      ],
      officeOptions: [],
      subofficeOptions: [],
      inputErrors: {},
      //
      inputInitialValues: true,
    };
  },
  // },

  //   beforeMount () {
  //     this.cargarDatos()
  // },

  beforeMount() {
    this.cargarDatos();
    this.getOfficesOptions();
    this.getSubOfficesOptions();
  },

  methods: {
    cargarDatos() {
      this.userInternoLoading = true;
      this.inputsInitialValues = true;
      this.inputErrors = {};

      getEmployee(this.$route.params.id)
        .then((response) => {
          if (response.data.data) this.userInternoData = response.data.data;
        })
        .catch((err) => {
          if (err.response.status == 404) this.isNotFound = true;
          this.errStatus = err.response.status;
          this.errStatusText = err.response.statusText;
        })
        .finally(() => {
          this.userInternoLoading = false;
          console.log("peticion office terminada!");
        });
    },

    updateDateUserInterno() {
      this.inputErrors = {};

      const userInternoFormData = new FormData();
      userInternoFormData.append(".method", "put");
      //userInternoFormData.append("user_id", this.userInternoData.attributes.user_id);
      userInternoFormData.append("role_id", 2);
      userInternoFormData.append("name", this.userInternoData.attributes.user_name);
      userInternoFormData.append(
        "last_name",
        this.userInternoData.attributes.user_last_name
      );
      userInternoFormData.append(
        "doc_type",
        this.userInternoData.attributes.user_doc_type
      );
      userInternoFormData.append(
        "doc_number",
        this.userInternoData.attributes.user_doc_number
      );
      userInternoFormData.append("email", this.userInternoData.attributes.user_email);
      userInternoFormData.append("status", this.userInternoData.attributes.user_status);
      userInternoFormData.append(
        "employee_type",
        this.userInternoData.attributes.employee_type
      );
      userInternoFormData.append("office_id", this.userInternoData.attributes.office_id);
      userInternoFormData.append(
        'suboffice_id',
        this.userInternoData.attributes.suboffice_id
      );

      updateEmployee(this.$route.params.id, userInternoFormData)
        .then((response) => {
          if (response.data.data) this.userInternoData = response.data.data;
          swal("¡Actualización correcta!", "Ok", "success").then((res) => {
            if (res == null || res == true || res == false)
              this.$router.push({ name: "users-internos" });
          });
        })
        .catch((err) => {
          console.log(err.response);
          if (err.response.status == 422) this.inputErrors = err.response.data.errors;
        })
        .finally(() => {
          this.inputInitialValues = false;
          console.log("peticion update office terminada!");
        });
    },

    showInputErrors(pInput) {
      if (Object.keys(this.inputErrors).includes(pInput)) return this.inputErrors[pInput];
      else return [];
    },

    showInputStatus(pInput) {
      if (this.inputInitialValues) return null;
      else if (Object.keys(this.inputErrors).includes(pInput)) return !true;
      else return !false;
    },
    getOfficesOptions () {
            getAllOffices()
                .then( res => {
                     console.log(res);
                     if (res.data.data)
                         this.officeOptions = res.data.data.map( e => ({ 'value': e.attributes.id, 'text': e.attributes.name}))
                })
         },

      getSubOfficesOptions () {
        getAllSuboffices()
            .then( res => {
                  console.log(res);
                if (res.data.data)
                    this.subofficeOptions = res.data.data.map( e => ({ 'value': e.attributes.id, 'text': e.attributes.name}))
            })
        },
    inputRadioOfficeSubofficeChanged() {
      this.userInternoData.attributes.office_id = '';
      this.userInternoData.attributes.suboffice_id = '';
    },
  },
};
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Bungee&display=swap");
.welcome {
  padding: 0 25px;
  color: white;
  font-family: "Bungee", cursive;
  font-size: 2.5rem;
  text-align: center;
}
.loader-userInternos {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
}
</style>
