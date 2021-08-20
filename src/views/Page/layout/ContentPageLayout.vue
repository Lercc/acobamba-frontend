<template>
  <div class="container cabex">
          <b-jumbotron >
                <div class="container titulo-mesa my-4">
                    <p class="titulo-m-1"> GESTIÓN DE TRÁMITE DOCUMENTARIO WEB </p>
                    <p class="titulo-m-2">   MUNICIPALIDAD DISTRITAL DE ACOBAMBA</p>
                
                    <strong class="reali-class">
                👉👉👉 Realiza tus trámites sin salir de casa 👈👈👈 
                    </strong>
                </div>

            <div class="butons-class mt-4">
                <b-row align-h="start" >
                    <b-col cols="12" sm="12" lg="12" xl="12">
                        <b-button class="buton-color-1" :to="{name: 'login'}"  >Iniciar Sesión</b-button>
                        <b-button class="buton-color" :to="{name: 'register'}" >Registrate</b-button>
                    </b-col>
                </b-row>
            </div>     
         </b-jumbotron>   
  </div>
</template>

<style scope>
    .cabex{
        margin-top:15px;
    }
    .butons-class{
        text-align:center;
        justify-content: center;
    }

    .titulo-mesa {
        color: rgb(39, 6, 158);
        text-align: center;
        justify-content: center;

    }
    .titulo-m-1{
        font-size:40px;
        font-weight:bold;
    }
     .titulo-m-2{
        font-size:30px;
        background:rgb(255, 240, 24) ; 
    }
    .reali-class{
        color:rgb(16, 13, 230);
           text-align:center;
        justify-content: center;
        font-size:35px;
        font-family:Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
    }
    .buton-color{
        background-color: rgb(255, 240, 24) ; 
          border: 4px solid white;
    }

   .buton-color-1{
        background-color: rgb(34, 13, 224) ; 
        color: aliceblue;
        border: 4px solid white;
    }
    
@media (max-width: 576px) {
   .titulo-m-1{
        font-size:25px
    }
     .titulo-m-2{
        font-size:15px
    }

    .reali-class{
          font-size:25px
    }

}
</style>