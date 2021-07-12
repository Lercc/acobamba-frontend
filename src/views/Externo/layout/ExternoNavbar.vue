<template>
    <admin-nav class="navbar-top navbar-dark"
              id="navbar-main"
              :show-toggle-button="false"
              expand>
              
        <ul class="navbar-nav align-items-center d-none d-md-flex">
            <li class="nav-item dropdown">
                <admin-dropdown class="nav-link pr-0">
                    <div class="media align-items-center" slot="title">
                        <div class="media-body ml-2 d-none d-lg-block mr-3">
                            <span class="mb-0 text-sm  font-weight-bold"> LERCC </span>
                        </div>
                        <span class="avatar avatar-sm rounded-circle rounded-circle apk-employee opacity-8">
                          <img class="apk-employee-img" alt="employee" src="/img/icons/apk/logo_social-262x262.png">
                        </span>
                    </div>

                    <p class="dropdown-item mb-0" style="cursor:pointer">
                      <i class="ni ni-user-run"></i>
                      <span >Logout AQUI X2</span>
                    </p>
                </admin-dropdown>
            </li>
        </ul>
    </admin-nav>
</template>
<script>
  export default {
    data() {
      return {
        activeNotifications: false,
        showMenu: false,
        searchQuery: ''
      };
    },
    methods: {
    /** */
      toggleSidebar() {
        this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
      },
      hideSidebar() {
        this.$sidebar.displaySidebar(false);
      },
      toggleMenu() {
        this.showMenu = !this.showMenu;
      }
    }
  };
</script>
<style scoped>
  .apk-employee {
    background-color: rgba(0, 0, 0, .05);
  }
  .apk-employee-img{
    transform: scale(.95);
  }
</style>