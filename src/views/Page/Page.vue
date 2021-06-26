<template>
    <div id="lercc">
         <header-page-layout />
         <carrusel-page-layout />
        <div style="outline:red 1px solid">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import HeaderPageLayout from '@/views/Page/layout/HeaderPageLayout.vue'
import CarruselPageLayout from '@/views/Page/layout/CarruselPageLayout.vue'

export default {
    components: {
        HeaderPageLayout,
        CarruselPageLayout 
    }
}
</script>
