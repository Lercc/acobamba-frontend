<template>
    <h2>fdfdfd</h2>
</template>
<script>
import {Doughnut} from "vue-chartjs"


export default {

    extends : Doughnut , 
    
    data(){
        return { 
            bgColors : ['red','green','blue','yellow']

        }
    },

    mounted(){
        this.renderChart({
            labels : this.labelState , 
            datasets : [
                {
                    label : 'GRAFICOS',
                    backgroundColor :  this.bgColors,
                    data : this.status
                }
            ]
        }, {responsive: true , maintainAspectRadio: false} )
    },

}



</script>
