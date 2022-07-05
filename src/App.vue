<template>
  <div class="container">
    <div class="navbar-header">
      <a class="navbar-brand"><h1 class="slova">RECEPTOMAT</h1></a>
      <br /><br />
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "app",
};
</script>

<style>
@import url(https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css);

body {
  background-image: url("./assets/odozada_dva.jpg");
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
}
</style>