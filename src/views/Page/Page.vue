<template>
    <div>
        <header-page-layout />
        <div>
            <router-view></router-view>
        </div>
        <footer-page-layout />
    </div>
</template>

<script>
import HeaderPageLayout from '@/views/Page/layout/HeaderPageLayout.vue'
import FooterPageLayout from '@/views/Page/layout/FooterPageLayout.vue'

export default {
    components: {
        HeaderPageLayout,
         FooterPageLayout
  
    }
}
</script>
