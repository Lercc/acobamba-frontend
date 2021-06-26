<template>
    <div>
        <p> SOY EL PANEL INTERNO</p>
        <p>
            <router-link :to="{name: 'interno'}">Dasboard</router-link> |
            <router-link :to="{name: 'interno-tramite'}">Tramite</router-link> |
            <router-link :to="{name: 'interno-bandeja'}">Bandeja</router-link> |
        </p>

        <div style="outline:orange 1px solid">
            <router-view></router-view>
        </div>
    </div>
</template>