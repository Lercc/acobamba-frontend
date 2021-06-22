<template>
    <div id="lercc">
        
        <p>
            <router-link to="about">Go to about</router-link> |
            <router-link to="info">Go to info</router-link>
        </p>
        <div style="outline:red 1px solid">
            <router-view></router-view>
        </div>
    </div>
</template>