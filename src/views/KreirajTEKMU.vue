<template>
     <div>
        <div class="naslov">
            <h1>Kreiraj Utakmicu</h1>
        </div>
    
        <div class="obrub">
            <v-text-field label="Broj utakmice (kolo)" variant="underlined"></v-text-field>


            <v-col
            cols="12"
            sm="6"
            md="4"
            >
            <v-dialog
                ref="dialog"
                v-model="modal"
                :return-value.sync="date"
                persistent
                width="290px"
            >
                <template v-slot:activator="{ on, attrs }">
                <v-text-field
                    v-model="date"
                    label="Picker in dialog"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                ></v-text-field>
                </template>
                <v-date-picker
                v-model="date"
                scrollable
                >
                <v-spacer></v-spacer>
                <v-btn
                    text
                    color="primary"
                    @click="modal = false"
                >
                    Cancel
                </v-btn>
                <v-btn
                    text
                    color="primary"
                    @click="$refs.dialog.save(date)"
                >
                    OK
                </v-btn>
                </v-date-picker>
            </v-dialog>
            </v-col>

            <h1 style="font-size: 60px; margin-top: 10px; color: black; text-align: center;">Rezultat</h1>

            <v-row class="row">

                <v-col>
                    <div>
                        <h2 style="font-size: 30px; margin-bottom: 10px;">Domaćin</h2>
                        <label for="klub"></label>
                        <select name="klub" id="klub" class="select">
                            <option value="Barca">Barca</option>
                            <option value="liverpool">Liv</option>
                            <option value="levate">Levante</option>
                            <option value="city">Man City</option>
                        </select>
                        <br><br>
                    </div>
                </v-col>

                <v-col class="gol">
                    <v-text-field solo class="goll" maxlength="1"></v-text-field>
                </v-col>

                <v-col>
                    <h1 style="margin-bottom: 25px">:</h1>
                </v-col>
                <v-col class="gol">
                    <v-text-field solo class="goll" maxlength="1"></v-text-field>
                </v-col>
                <v-col>
                    <div>
                        <h2 style="font-size: 30px; margin-bottom: 10px;">Gosti</h2>
                        <label for="klub"></label>
                        <select name="klub" id="klub" class="select">
                            <option value="Barca">Barca</option>
                            <option value="liverpool">Liv</option>
                            <option value="levate">Levante</option>
                            <option value="city">Man City</option>
                        </select>
                        <br><br>
                    </div>
                </v-col>
            </v-row>

            <div>
                <h2 style="font-size: 30px; margin-bottom: 10px;">Domaćin</h2>
                    <label for="klub"></label>
                    <select name="klub" id="klub" class="select">
                        <option value="Barca">Barca</option>
                        <option value="liverpool">Liv</option>
                        <option value="levate">Levante</option>
                        <option value="city">Man City</option>
                    </select>
                    <br><br>
            </div>

            <v-btn elevation="2" style="background-color: green; font-size: 30px; color: white; margin-top:40px; margin-left: 80%;">Kreiraj!</v-btn>
        </div>
    </div>
</template>

<script>
export default {
    data: () => ({
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      menu: false,
      modal: false,
      menu2: false,
    }),
  }
</script>

<style>
.obrub
{
    border: 2px solid white;
    background-color: white;
    padding: 50px;
    margin-left: 20%;
    margin-right: 20%;
    margin-top: 100px;
    margin-bottom: 100px;
}

.v-text-field
{
    font-size: 20px;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
}

.goll
{
    font-size: 35px;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
}

.row
{
    color: black;
    text-align: center;
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.select
{
    font-size: 50px; 
    text-align: center;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    border: 2px solid black;
}

.gol
{
    border: 2px solid black;
    height: 100px;
    margin-left: 90px;
    margin-right: 90px;

}

</style>