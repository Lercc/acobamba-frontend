<template>
    <div>
        <!-- inicio de navbar -->
        <b-navbar toggleable="lg" type="dark" variant="info">
            <b-navbar-brand href="/">Inicio</b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav class="ml-auto">
                    <b-navbar-nav>
                        <b-nav-item href="#">TUPA</b-nav-item>
                        <b-nav-item href="about" >Go to about</b-nav-item>
                        <b-nav-item href="info" >Go to info</b-nav-item>
                        <b-nav-item href="login" >Go to login</b-nav-item>
                    </b-navbar-nav>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
        <!-- fin de navbar --> 
    </div>
</template>