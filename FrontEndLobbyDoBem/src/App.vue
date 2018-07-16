<template>
  <div id="app">
    <!-- <main>
      <router-view></router-view>
    </main> -->
    <v-app>
      <v-toolbar dark
        color="light-blue darken-3"
        dense
        fixed
        app
        extension-height="65px"
      >
        <v-toolbar-side-icon 
        v-if="this.$router.currentRoute.name !== 'login'"
        @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <v-toolbar-title>
          <img src="./assets/logo-lobby-do-bem.png">
        </v-toolbar-title>
      </v-toolbar>
      <v-navigation-drawer
        v-model="drawer"
        fixed
        clipped
        app
        v-if="this.$router.currentRoute.name !== 'login'"
      >
      </v-navigation-drawer>
      <v-content>
        <router-view></router-view>
      </v-content>
      <v-footer height="auto" color="light-blue darken-3"
      dense
      fixed
      app>
        <div class="div-logo-sinn">
          <img class="logo-sinn" src="./assets/logo-rodape-sinn.png">
        </div>
      </v-footer>
    </v-app>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      drawer: false
    }
  }
}
</script>

<style>
body {
  margin: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

main {
  text-align: center;
}

@media (max-width: 425px) {
  img{
    width: 70%;
    height: 60%;
    margin-top: 1.75%;
  }
}
@media (min-width: 426px) and (max-width: 768px){
  img{
    width: 55%;
    height: 55%;
    margin-top: 1.75%;
  }
}
@media (min-width: 769px){
  img{
    width: 50%;
    height: 65%;
    margin-top: 1.75%;
  }
}

.div-logo-sinn{
  margin-left: 10px;
}
/* .logo-sinn{
  width: 55px;
  height: 35px;
} */


</style>
