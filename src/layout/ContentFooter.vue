<template>
  <footer class="footer px-4">
    <div class="row align-items-center justify-content-lg-between">
      <div class="col">
        <div class="copyright text-center text-lg-right text-muted">
          <a href="#" class="font-weight-bold ml-1" target="_blank">M.D.A</a>
          © {{year}} All rights reserved
        </div>
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  data() {
    return {
      year: new Date().getFullYear()
    };
  }
};
</script>
<style></style>
