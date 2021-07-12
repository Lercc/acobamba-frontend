<template>
<div class="Home">
      <header-page-layout />
    
      <content-page-layout />
      <manual-page-layout />
      <footer-page-layout />


</div>
</template>

<script>
import HeaderPageLayout from '@/views/Page/layout/HeaderPageLayout.vue'
import ContentPageLayout from '@/views/Page/layout/ContentPageLayout.vue'
import ManualPageLayout from '@/views/Page/layout/ManualPageLayout.vue'
import FooterPageLayout from '@/views/Page/layout/FooterPageLayout.vue'

export default {
    components: {
        HeaderPageLayout,
        ContentPageLayout,
         ManualPageLayout ,
         FooterPageLayout
  
    }
}
</script>


