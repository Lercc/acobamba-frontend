<template>
    <div>
        <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
        
        <b-row>
            <b-col>
                <b-button :to="{ name: 'users' }" >LISTA DE ADMINISTRADORES</b-button>
                <b-button :to="{ name: 'user-create' }" >CREAR ADMINISTRADOR</b-button>
            </b-col>
        </b-row>

        </base-header>
        
        <b-container fluid class="mt--6">
            <b-row>
                <b-col cols="12">
                    <router-view></router-view>
                </b-col>
            </b-row>
        </b-container>

    </div>
</template>