<template>
    <div>
        <!-- inicio de navbar -->
        <b-navbar toggleable="lg" type="dark" variant="info">
            <b-navbar-brand href="/">Inicio</b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav class="ml-auto">
                    <b-navbar-nav>
                        <b-nav-item href="#">M.D.A </b-nav-item>
                        <b-nav-item href="about" >Go to about</b-nav-item>
                        <b-nav-item href="info" >Go to info</b-nav-item>
                        <b-nav-item href="login" >Go to login</b-nav-item>
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
