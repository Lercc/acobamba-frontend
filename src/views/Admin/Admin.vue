<template>
    <div>
        <p> SOY EL PANEL ADMIN</p>
        <p>
            <router-link :to="{name: 'admin'}">Dasboard</router-link> |
            <router-link :to="{name: 'admin-roles'}">Roles</router-link> |
            <router-link :to="{name: 'admin-users'}">Users</router-link> |
        </p>

        <div style="outline:blue 1px solid">
            <router-view></router-view>
        </div>
    </div>
</template>