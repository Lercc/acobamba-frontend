<script>
import {Doughnut} from "vue-chartjs"


export default {

    extends : Doughnut ,

    props: {
        nuevoData: {
            type: Number
        },
        enProcesoData: {
            type: Number
        },
        derivadoData: {
            type: Number
        }
    },
    
    // data(){
    //     return { 
    //         bgColors : ['green','yellow','yellow']

    //     }
    // },

    mounted(){

        console.log(this.nuevoData);
        console.log(this.enProcesoData);
        console.log(this.derivadoData);
        
        this.renderChart({
            labels : [
                'nuevo',
                'en proceso',
                'derivado'
            ], 
            datasets : [
                {
                    label : 'GRAFICOS',
                    data: [this.nuevoData, this.enProcesoData, this.derivadoData],
                    backgroundColor : [
                        'rgb(54, 162, 235)',
                        'rgb(255, 205, 86)',
                        'rgb(255, 99, 132)'
                    ],
                    // hoverOffset: 4
                }
            ]
        }, {responsive: true , maintainAspectRadio: false } )


     
    },

}



</script>
