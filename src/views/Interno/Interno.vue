<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <side-bar
      :background-color="sidebarBackground"
      short-title="apk"
      title="apk">
      <template slot="links">
        <sidebar-item :link="{name: 'Dashboard', icon: 'ni ni-folder-17 text-blue', path: '/interno'}" />
        <sidebar-item :link="{name: 'Nuevo Trámite', icon: 'ni ni-tag text-green', path: '/interno/tramite'}" />
        <sidebar-item :link="{name: 'Trámites Realizados', icon: 'ni ni-single-02 text-orange', path: '/interno/tramites-realizados'}" />
        <sidebar-item :link="{name: 'Lista de Derivaciones', icon: 'ni ni-single-02 text-orange', path: '/interno/lista-derivaciones'}" />
        <sidebar-item :link="{name: 'Bandeja de Derivaciones', icon: 'ni ni-single-02 text-orange', path: '/interno/bandeja-derivaciones'}" />
        <sidebar-item :link="{name: 'Lista de Archivaciones', icon: 'ni ni-single-02 text-orange', path: '/interno/lista-archivaciones'}" />
      </template>
    </side-bar>

    <div class="main-content" :data="sidebarBackground">
      <interno-navbar></interno-navbar>

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
  import InternoNavbar from '@/views/Interno/layout/InternoNavbar.vue';
  import ContentFooter from '@/layout/ContentFooter.vue';
  import { FadeTransition } from 'vue2-transitions';

  // import { mapState } from 'vuex'

  export default {

    components: {
      InternoNavbar,
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

