<template>
    <div>
        <!-- inicio de navbar   -->
        <b-navbar  toggleable="lg" type="dark" variant="primary"  style="border:2px red solid" >
            <b-navbar-brand :to="{name: 'home'}">GESTRAM-MDA</b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav class="ml-auto">
                    <b-navbar-nav>
                  
                        <b-nav-item :to="{name: 'about'}">TUPA</b-nav-item>
                        <b-nav-item :to="{name: 'info'}"> MUNICIPALIDAD</b-nav-item>
                        <b-nav-item :to="{name: 'login'}">Iniciar Sesión</b-nav-item>
                        <b-nav-item :to="{name: 'admin'}">Go to Admin</b-nav-item>
                        <b-nav-item :to="{name: 'interno'}">Go to Interno</b-nav-item>
                        <b-nav-item :to="{name: 'externo'}">Go to Externo</b-nav-item>
                    </b-navbar-nav>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>

        <b-container fluid v-if="showAlert">
            <b-row>
                <b-col cols="12" class="text-center bg-red opacity-9">
                    <span class="text-white">{{ globalRequestErrorMessage }}</span>
                </b-col>
            </b-row>
        </b-container>
        <!-- fin de navbar --> 
    </div>
</template>
<script>
export default {

    data() {
        return {
            'showAlert': false
        }
    },

    computed: {
        globalRequestErrorMessage() {
            return this.$store.state.errors.globalRequestErrorMessage
        }
    },

    watch: {
        globalRequestErrorMessage() {
            if (this.$store.state.errors.globalRequestErrorMessage != '') {
                this.showAlert = true
            } else {
                this.showAlert = false
            }
        }
    }
}
</script>
