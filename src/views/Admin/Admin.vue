<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <side-bar
      :background-color="sidebarBackground"
      short-title="apk"
      title="apk">
      <template slot="links">
        <sidebar-item :link="{name: 'Dashboard', icon: 'ni ni-folder-17 text-blue', path: '/admin'}" />
        <sidebar-item :link="{name: 'Oficinas', icon: 'ni ni-tag text-green', path: '/admin/offices'}" />
        <sidebar-item :link="{name: 'Suboficinas', icon: 'ni ni-single-02 text-orange', path: '/admin/suboffices'}" />
        <sidebar-item :link="{name: 'Roles', icon: 'ni ni-single-02 text-orange', path: '/admin/roles'}" />
        <sidebar-item :link="{name: 'Administradores', icon: 'ni ni-single-02 text-orange', path: '/admin/users'}" />
        <sidebar-item :link="{name: 'Usuarios Externos', icon: 'ni ni-single-02 text-orange', path: '/admin/users-externos'}" />
        <sidebar-item :link="{name: 'Usuarios Internos', icon: 'ni ni-single-02 text-orange', path: '/admin/users-internos'}" />
      </template>
    </side-bar>

    <div class="main-content" :data="sidebarBackground">
      <admin-navbar></admin-navbar>

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
  import AdminNavbar from '@/views/Admin/layout/AdminNavbar.vue';
  import ContentFooter from '@/layout/ContentFooter.vue';
  import { FadeTransition } from 'vue2-transitions';

  // import { mapState } from 'vuex'

  export default {

    components: {
      AdminNavbar,
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

