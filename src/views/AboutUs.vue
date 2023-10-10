<template>

  <div class="body1">
    <div class="o_nama">
      <h1>O nama</h1>
    </div>

    <div class="paragrafi">
      <p>
        Ovo je web aplikacija koja vam omogućava kreiranje liga sa svim vašim prijateljima, te kreiranje partija (dvoboja) između vas i na kraju imate
        prikaz rezultata kroz tablicu te prikaz svih kreiranih dvoboja. Aplikacija je naprevljena u svrhu zabave tako da samo naprijed!
      </p>
    </div>
  </div>
  
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'AboutUs',
  components: {
    HelloWorld
  }
}
</script>


<style>
  .o_nama
  {
    margin-top: 100px;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    font-size: 50px;
    text-align: center;
    color: white;
  }

  .paragrafi
  {
    margin-top: 120px;
    margin-bottom: 30px;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    margin-left: 50px;
    margin-right: 50px;
    color: white;
    text-align: center;
    font-size: 30px;
  }
</style>