<template>
    <div>
        <p> SOY EL PANEL EXTERNO</p>
        <p>
            <router-link :to="{name: 'externo'}">Dasboard</router-link> |
            <router-link :to="{name: 'externo-tramite'}">Tramite</router-link> |
            <router-link :to="{name: 'externo-bandeja'}">Bandeja</router-link> |
        </p>

        <div style="outline:pink 1px solid">
            <router-view></router-view>
        </div>
    </div>
</template>