<template>
    <div>
        <div class="naslov">
            <h1>Kreiraj klub</h1>
        </div>
    
        <div class="obrub">
            <v-text-field label="Naziv kluba" variant="underlined"></v-text-field>
            <v-text-field label="Godina osnivanja" variant="underlined"></v-text-field>
            <v-text-field label="Država" variant="underlined"></v-text-field>

            <v-container fluid>
              <v-row align-items="center">
              <v-col
              class="d-flex"
              cols="12"
              sm="6"
            >
            <v-select
              :items="stvari"
              label="Standard"
            ></v-select>
            </v-col>
            </v-row>
            </v-container>

            <v-file-input
                label="Grb Kluba"
                 variant="filled"
                prepend-icon="mdi-camera"
            >
            </v-file-input>

            <v-btn elevation="2" style="background-color: green; font-size: 30px; color: white; margin-top:40px; margin-left: 80%;">Kreiraj!</v-btn>
        </div>
    </div>
</template>

<style>
.obrub
{
    border: 2px solid white;
    background-color: white;
    padding: 50px;
    margin-left: 20%;
    margin-right: 20%;
    margin-top: 100px;

    
}

.v-text-field
{
    font-size: 20px;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    font-weight: bold;
}
</style>

<script>
  export default {
    data: () => ({
      stvari: ['Foo', 'Bar', 'Fizz', 'Buzz'],
    }),
  }
</script>