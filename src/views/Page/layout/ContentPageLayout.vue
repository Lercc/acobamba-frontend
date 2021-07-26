<template>
  <div class="container cabex">

        <b-jumbotron>
            <template #header>MESA DE PARTES VIRTUAL </template>
            <h2>   MUNICIPALIDAD DISTRITAL DE ACOBAMBA</h2>
            <template #lead>
             
            </template>

            <hr class="my-4">

            <p>
            Realiza tus trámites sin salir de casa
            </p>
       
            <b-button variant="primary" :to="{name: 'login'}"  >Iniciar Sesión</b-button>
            <b-button variant="danger" :to="{name: 'register'}" >Registrate</b-button>
        </b-jumbotron>
   
  </div>
</template>

<style scope>
    .cabex{
        margin-top:15px;
    }
</style>