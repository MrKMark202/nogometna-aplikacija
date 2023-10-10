<template>
  <div>
    <div class="naslov">
      <h1>🎱BallPool App</h1>
    </div>

    <div class="podnaslovne_stvari">
      <h2 style="text-align: center;">Kreirajte vlastitu ligu i dvoboje</h2>
      <h2 style="text-align: center;">Najvažnije, zabavite se!</h2>
      </div>  
  </div>
</template>

<script>
  export default {
    name: 'Home',
  }
</script>

<style>
  body
    {
    background-image: linear-gradient(rgba(0, 0, 0, 0.20), rgba(0, 0, 0, 0.20)), url(https://cdn.discordapp.com/attachments/1033708274324873236/1161379528875188286/slika.jpg?ex=653815f9&is=6525a0f9&hm=783ceea3e289a5ee642934b679c72a3ed7c29427685a11a696405aa47264b882&); 
    background-size: cover; 
    z-index: -1;
    color: white;
    }

  .naslov
  {
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    text-align: center;
    color: white;
    margin-top:120px;
  }
  
  h1
  {
    font-size: 150px;
  }

  .podnaslovne_stvari 
  {
    margin-top: 10%;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    color: white;
  }

  h2
  {
    font-size: 80px;
  }
</style>