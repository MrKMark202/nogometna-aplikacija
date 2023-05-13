<template>
  <nav>
    <div class="grid-container">
      <div class="grid-item1">


      <v-app-bar-nav-icon @click.stop="drawer = !drawer" style="color:white;"></v-app-bar-nav-icon>


    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
      style="background-color: green;"
    >
      <v-list style="padding:10px;">
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item>
            <router-link to="/" style="text-decoration: none;">Home</router-link>
          </v-list-item>
          <v-list-item>
            <router-link to="/AboutUs" style="text-decoration: none;">About us</router-link>
          </v-list-item>
          <v-list-item>
            <router-link to="/KreirajLIGU" style="text-decoration: none;">Kreiraj ligu</router-link>
          </v-list-item>
          <v-list-item>
            <router-link to="/KreirajKlub" style="text-decoration: none;">Kreiraj klub</router-link>
          </v-list-item>
          <v-list-item>
            <router-link to="/KreirajUtakmicu" style="text-decoration: none;">Kreiraj utakmicu</router-link>
          </v-list-item>

        </v-list-item-group>
       
      </v-list>
      
    </v-navigation-drawer>


      </div>
      <div class="grid-item2" style="text-align: right;">
        <v-btn
          elevation="2"
          style="background-color: green;"
        >
          <router-link to="/LogIN" style="text-decoration: none;">LogIn</router-link>
        </v-btn>
        |
        <v-btn
        elevation="2"
        style="background-color: green;"
        >
          <router-link to="/SignUP" style="text-decoration: none;">SignUp</router-link>
        </v-btn>
      </div>
    </div>
    <router-view></router-view>
  </nav>

</template>

<script>
  export default {
    data: () => ({
      drawer: false,
      group: null,
    }),

    watch: {
      group () {
        this.drawer = false
      },
    },
  }
</script>

<style lang="scss">

  #app 
  {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    color: #2c3e50;
  }

  a {
    font-weight: bold;
    color: white;

    &.router-link-exact-active {
      color: rgb(159, 255, 140);
    }
  }

  .grid-container 
  {
    display: grid;
    grid-template-columns: auto auto;
    padding: 20px;
    background-color: rgb(7, 45, 7);
  }

  .grid-item1
  {
    font-size: 30px;
  }

  .grid-item2
  {
    font-size: 30px;
  }

</style>