<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <side-bar
      :background-color="sidebarBackground"
      short-title="apk"
      title="apk">
      <template slot="links">
        <sidebar-item :link="{name: 'Dashboard', icon: 'ni ni-chart-bar-32 text-red', path: '/externo'}" />
        <sidebar-item :link="{name: 'Nuevo Trámite', icon: 'ni ni-folder-17 text-blue', path: '/externo/tramite'}" />
        <sidebar-item :link="{name: 'Trámites Realizados', icon: 'ni ni-bullet-list-67 text-greee', path: '/externo/tramites-realizados'}" />
        <sidebar-item :link="{name: ' Mi Perfil', icon: 'ni ni-single-02 text-green', path: '/externo/perfil-externo'}" />
      </template>
    </side-bar>

    <div class="main-content" :data="sidebarBackground">
      <externo-navbar></externo-navbar>

      <div @click="toggleSidebar">
        <fade-transition :duration="200" origin="center top" mode="out-in">
          <!-- your content here -->
          <router-view ></router-view>
        </fade-transition>
        <content-footer v-if="!$route.meta.hideFooter"></content-footer>
      </div>
      
    </div>
  </div>
</template>
<script>
  import ExternoNavbar from '@/views/Externo/layout/ExternoNavbar.vue';
  import ContentFooter from '@/layout/ContentFooter.vue';
  import { FadeTransition } from 'vue2-transitions';

  // import { mapState } from 'vuex'

  export default {

    components: {
      ExternoNavbar,
      ContentFooter,
      FadeTransition
    },
    data() {
      return {
        sidebarBackground: 'vue' //vue|blue|orange|green|red|primary
      };
    },

    methods: {
      toggleSidebar() {
        if (this.$sidebar.showSidebar) {
          this.$sidebar.displaySidebar(false);
        }
      }
    }
  };
</script>
<style lang="scss">
</style>
