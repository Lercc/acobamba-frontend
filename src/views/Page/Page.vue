<template>
    <div id="lercc">
        
        <p>
            <router-link to="/">Home</router-link> |
            <router-link to="about">Go to about</router-link> |
            <router-link to="info">Go to info</router-link> |
            <router-link to="login">Go to login</router-link>
        </p>
        <div style="outline:red 1px solid">
            <router-view></router-view>
        </div>
    </div>
</template>