<template>
  
  <nav>
    <div class="grid-item">
      <router-link to="/Home">Home</router-link> |
      <router-link to="/AboutUs">About us</router-link>
    </div>
    <router-view></router-view>
  </nav>

</template>

<script>

export default {
    data () {
      return {
        drawer: null,
      }
    },
  }
</script>

<style lang="scss">

  #app 
  {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    text-align: right;
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
  }

  .grid-item 
  {
    padding: 20px;
    padding-right: 70px;
    background-color: rgb(5, 45, 9);
    font-size: 30px;
  }
</style>