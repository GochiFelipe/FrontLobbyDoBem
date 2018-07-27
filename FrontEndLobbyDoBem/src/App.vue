<template>
  <div id="app">
    <!-- <main>
      <router-view></router-view>
    </main> -->
    <v-app>
      <v-toolbar dark
        class="menu"
        dense
        fixed
        app
        height="70"
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
        <v-toolbar flat>
          <v-avatar
          size="36px">
            <img >
          </v-avatar>
          <v-list>
            <v-list-tile>
              <v-list-tile-title class="title">
                {{ person.data.url }}
                {{ person.data.name }} {{ person.data.lastname }}
              </v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-toolbar>

        <v-divider></v-divider>

      </v-navigation-drawer>
      <v-content class="content">
        <router-view></router-view>
      </v-content>
      <v-footer 
      class="menu footer"
      dense
      height="60"
      >
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
      drawer: false,
      person: {}
    }
  },
  created () {
    this.person = JSON.parse(localStorage.getItem('person'))
    console.log(this.person.data)
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
    width: 70%;
    height: 55%;
    margin-top: 1.75%;
  }
}
@media (min-width: 769px){
  img{
    width: 70%;
    height: 65%;
    margin-top: 1.75%;
  }
}

.div-logo-sinn{
  margin-left: 10px;
}

.menu{
  background-color: #004D61 !important;
}
/* .logo-sinn{
  width: 55px;
  height: 35px;
} */
</style>
