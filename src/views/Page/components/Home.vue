<template>
<div class="Home">
      <content-page-layout />
      <manual-page-layout />
</div>
</template>

<script>
import ContentPageLayout from '@/views/Page/layout/ContentPageLayout.vue'
import ManualPageLayout from '@/views/Page/layout/ManualPageLayout.vue'

export default {
    components: {
        ContentPageLayout,
        ManualPageLayout ,
    }
}
</script>


