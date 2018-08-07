<template>
  <div id="app">
    <!-- <main>
      <router-view></router-view>
    </main> -->
    <v-app id="inspire">
      <v-toolbar dark
        class="menu"
        dense
        fixed
        app
        height="65"
      >
        <v-toolbar-side-icon 
        v-if="this.$router.currentRoute.name !== 'login'"
        @click.stop="open = !open" class="sideNavIcon"></v-toolbar-side-icon>
        <v-toolbar-title>
          <img id="logo" v-if="mini === true" src="./assets/logo-lobby-do-bem.png">
        </v-toolbar-title>
      </v-toolbar>
      <v-navigation-drawer
        v-model="open"
        fixed
        clipped
        app
        v-if="this.$router.currentRoute.name !== 'login'"
        class="fullSideNav blue-grey lighten-1"
      >
        <v-divider></v-divider>

        <v-list-tile
          class="routes"
          v-for="route in routers"
          v-if="route.active === true"
          :key="route.title"
        >
          <v-avatar
          size="37px">
            <img :src="route.icon">
          </v-avatar>
          <v-list-tile-content>
            <v-list-tile-title>
              <router-link class="routerLink" 
                :to="route.path">
                {{ route.name }}
              </router-link>
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

      </v-navigation-drawer>

      <!--<v-navigation-drawer
        :mini-variant.sync="mini"
        v-model="drawer"
        hide-overlay
        stateless
        fixed
        class="sideNavBar blue-grey lighten-1"
      >
      <v-toolbar flat class="transparent topAsideFull blue-grey darken-3">
        <v-list class="pa-0">
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <v-icon>menu</v-icon>
            </v-list-tile-avatar>
  
            <v-list-tile-content>
              <img id="logoMenu" v-if="mini === false" src="./assets/logo-lobby-do-bem.png">
            </v-list-tile-content>
  
            <v-list-tile-action>
              <v-btn
                icon
                @click.stop="mini = !mini"
              >
                <v-icon>chevron_left</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-toolbar>
  
      <v-list class="listSideNavFull" dense>
        <v-list-tile class="itensListSideNavFull"
          v-for="route in routers"
          v-if="route.active === true"
          :key="route.title"
        >
        <router-link
                :to="route.path">
          <v-avatar
          size="37px">
            <img :src="route.icon">
          </v-avatar>
              </router-link>
          <v-list-tile-content>
            <v-list-tile-title>
              <router-link class="router"
                :to="route.path">
                {{ route.name }}
              </router-link>
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>-->


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
import router from './router/index.js'

export default {
  name: 'app',
  data () {
    return {
      drawer: true,
      person: {},
      routers: router.options.routes,
      items: [
        { title: 'Home', icon: 'dashboard' },
        { title: 'About', icon: 'question_answer' }
      ],
      mini: true,
      right: null,
      open: false
    }
  },
  created () {
    this.person = JSON.parse(localStorage.getItem('person'))
  }
}
</script>

<style>
@media (max-width: 425px) {
  body {
  margin: 0;
  }

  .footer{
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
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

  .routerLink{
    text-decoration: none;
    color: black;
    font-size: 12px;
    margin-left: 15px;
    margin-top: 10px;
  }

  .routes {
    margin: 12.5px;
  }
  img{
    width: 70%;
    height: 60%;
    margin-top: 1.75%;
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

  .content{
    background-color: white;
  }

  .sideNavBar{
    display: none;
  }
}
@media (min-width: 426px) and (max-width: 768px){
  body {
    margin: 0;
  }

  .footer{
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
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

  .routerLink{
    text-decoration: none;
    color: black;
    font-size: 12px;
    margin-left: 15px;
    margin-top: 10px;
  }

  .routes {
    margin: 12.5px;
  }
  img{
    width: 70%;
    height: 55%;
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

  .content{
    background-color: white;
    width: 90%;
    margin-left: 7.5%;
  }

  .listSideNavFull{
    display: flex;
    flex-direction: column;
    margin-left: 5%;
  }
  .itensListSideNavFull{
    margin-top: 10%;
  }
  .router {
    text-decoration: none;
    color: white;
    margin-left: 5%;
  }
  .topAsideFull{
    background-color: #D5E157 !important;
    height: 64px;
  }
  #logo{
    width: 70%;
    height: 65%;
    margin-top: 1.75%;
  }
  #logoMenu{
    height: 65%;
    width: 100%;
    margin-top: 1.75%;
  }
}
@media (min-width: 769px){

  body {
  margin: 0;
  }

  .footer{
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
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

  .routerLink{
    text-decoration: none;
    color: white;
    font-size: 14px;

    margin-left: 15px;
    margin-top: 10px;
  }

  .routes {
    margin: 12.5px;
  }
  #logo {
    width: 70%;
    height: 65%;
    margin-top: 1.75%;
  }
  .div-logo-sinn{
    margin-left: 10px;
    margin-right: 20px;
  }

  .menu{
    background-color: #004D61 !important;
  }
  /* .logo-sinn{
    width: 55px;
    height: 35px;
  } 

  .content{
    background-color: white;
    margin-left: 4.5%;
  }
  .listSideNavFull{
    display: flex;
    flex-direction: column;
    margin-left: 5%;
  }
  .itensListSideNavFull{
    margin-top: 10%;
  }
  .router {
    text-decoration: none;
    color: white;
    margin-left: 5%;
  }
  .topAsideFull{
    background-color: #D5E157 !important;
  }
  #logoMenu{
    height: 70%;
    margin-top: 1.75%;
  } */
}

</style>
