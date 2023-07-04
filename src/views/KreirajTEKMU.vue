<template>
     <div>
        <div class="naslov">
            <h1>Kreiraj Utakmicu</h1>
        </div>
    
        <div data-app class="obrub1">
            <v-text-field v-model="kolo" label="Broj utakmice (kolo)" variant="underlined"></v-text-field>
            <v-text-field v-model="mjestoIgranja" label="Mjesto igranja" variant="underlined"></v-text-field>
            <v-text-field v-model="stadionName" label="Naziv stadiona" variant="underlined"></v-text-field>
            <v-text-field v-model="gledateljiBroj" label="Broj gledatelja" variant="underlined"></v-text-field>
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
                            label="Odaberite datum utakmice"
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

            <div>
                <v-select
                    @change="change"
                    :items="ligas"
                    label="Izaberite ligu za koju je utakmica namijenjena!"
                    v-model="selectedLiga"
                    class="vselect"
                ></v-select>
                <br><br>
            </div>

            <h1 style="font-size: 60px; margin-top: 10px; color: black; text-align: center;">Rezultat</h1>

            <v-row class="row">
                <v-col>
                    <div>
                        <h2 style="font-size: 30px; margin-bottom: 10px;">Domaćin</h2>
                        <v-select
                            :items="klubs"
                            label="Izaberi domaćina"
                            v-model="domacin"
                            class="vselect"
                        ></v-select>
                        <br><br>
                    </div>
                </v-col>

                <v-col class="gol">
                    <input v-model="domacinGol" type="text" solo class="goll" maxlength="2"/>
                </v-col>

                <v-col>
                    <h1 style="margin-bottom: 25px">:</h1>
                </v-col>

                <v-col class="gol">
                    <input v-model="gostiGol" type="text" solo class="goll" maxlength="2"/>
                </v-col>

                <v-col>
                    <div>
                        <h2 style="font-size: 30px; margin-bottom: 10px;">Gosti</h2>
                        <v-select
                            :items="klubs"
                            label="Izaberi goste"
                            v-model="gosti"
                            class="vselect"
                        ></v-select>
                        <br><br>
                    </div>
                </v-col>
            </v-row>

            <v-btn @click="createTekma" elevation="2" style="background-color: green; color: white; margin-top:40px; margin-left: 85% !important; font-size: 30px;">Kreiraj!</v-btn>
        </div>
    </div>
</template>

<script>
import {db, auth, collection, getDocs, setDoc, doc, onAuthStateChanged} from '@/firebase';
export default {
    data: () => ({
      kolo: null,
      stadionName: null,
      domacinGol: null,
      gostiGol: null,
      gledateljiBroj: null,
      mjestoIgranja: null,
      klubs: [],
      domacin: '',
      gosti: '',
      ligas: [],
      selectedLiga: '',
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      menu: false,
      modal: false,
      menu2: false,
      dan: null,
      mjesec: null,
      godina: null,
      satUpisa: null,
      domBod: 0,
      gosBod: 0,
      domacinData: [],
    }),

    mounted() {
      onAuthStateChanged(auth, (user) => {
		if (user) {
            const colRef = collection(db, "Users", user.email, "Lige");
            getDocs(colRef)
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                this.ligas.push(doc.id);
            });
            })
            .catch((error) => {
            console.error("Error fetching subcollection documents:", error);
            });
        } else {
            console.log("User is not loged in");
        }


        if (user) {
            const table = collection(db, "Users", user.email, "Lige", this.selectedLiga, "Klubovi", this.domacin, "Tablica lige", "Podaci");
            getDocs(table)
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                this.domacinData.push(doc.id);
                console.log(this.domacinData);
            });
            })
            .catch((error) => {
            console.error("Error fetching subcollection documents:", error);
            });
        } else {
            console.log("User is not loged in");
        }
		}); 
    },

   methods: {
      clearFormData() {
	        this.kolo = null;
		    this.stadionName = null;
            this.mjestoIgranja = null;
		    this.domacinGol = null;
            this.gostiGol = null;
            this.gledateljiBroj = null;
            this.domacin = '';
            this.gosti = '';
            this.selectedLiga = '';
            this.date = null;
		},

        clearKlubs() {
            this.klubs = [];
        },

        currentDate() {
            const current = new Date();
            this.godina = "GODINA " + `${current.getFullYear()}`;
            this.mjesec = "MJESEC " + `${current.getMonth()+1}`;
            this.dan = "DAN " + `${current.getDate()}`;
            this.satUpisa = `${current.getHours()}:${current.getMinutes()}:${current.getSeconds()}`;
        },

        change() {
            const colRef = collection(db, "Users", auth.currentUser.email, "Lige", this.selectedLiga, "Klubovi");
            getDocs(colRef)
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                    this.klubs.push(doc.id);
                });
            })
            this.clearKlubs();
        },

        createTablicaDomacin() {
            if(this.domacinGol > this.gostiGol) {
                this.domBod+=3;
            }
            else if(this.domacinGol < this.gostiGol) {
                this.domBod+=0;
            }
            else if(this.domacinGol == this.gostiGol) {
                this.domBod+=1;
            }
            setDoc(
                doc(db, "Users", auth.currentUser.email, "Lige", this.selectedLiga, "Klubovi", this.domacin, "Tablica lige", "Podaci"),
                {
                    Postignutih_pogodaka: this.domacinGol,
                    Primljenih_pogodaka: this.gostiGol,
                    bodovi: this.domBod,
                }
            );
            },

        createTablicaGosti() {
            if(this.domacinGol < this.gostiGol) {
            this.gosBod+=3;
            }
            else if(this.domacinGol > this.gostiGol) {
                this.gosBod+=0;
            }
            else if(this.domacinGol == this.gostiGol) {
                this.gosBod+=1;
            }
            setDoc(
                doc(db, "Users", auth.currentUser.email, "Lige", this.selectedLiga, "Klubovi", this.gosti, "Tablica lige", "Podaci"),
                {
                    Postignutih_pogodaka: this.gostiGol,
                    Primljenih_pogodaka: this.domacinGol,
                    bodovi: this.gosBod,
                }
            );
        },

        createTekma() {
            this.currentDate();
            setDoc(
            doc(db, "Users", auth.currentUser.email, "Lige", this.selectedLiga, "Utakmice", this.godina, this.mjesec, this.dan, "KOLO " + this.kolo, this.satUpisa),
            {
                Kolo: this.kolo,
                stadionName: this.stadionName,
                gledateljiBroj: this.gledateljiBroj,
                datumTekme: this.date,
                Liga: this.selectedLiga,
                Domaćin: this.domacin,
                domacinGol: this.domacinGol,
                gostiGol: this.gostiGol,
                Gosti: this.gosti,
                satUpisa: this.satUpisa,
                Mjesto: this.mjestoIgranja,
            }
            );
            this.createTablicaDomacin();
            this.createTablicaGosti();
            this.clearFormData();
        },

    },
};

</script>

<style>
.obrub1
{
    border: 2px solid white;
    background-color: white;
    padding: 50px;
    margin-left: 200px;
    margin-right: 200px;
    margin-top: 100px;
    margin-bottom: 100px;
}

.v-text-field
{
    font-size: 30px;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
}

.gol
{
    width: 80px;
    height: 100px;
    border: 2px solid black;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 50px !important;
    margin-right: 50px !important;
}

.goll
{
    width: 80%;
    height: 100%;
    text-align: center;
    font-size: 60px;
    border: none;
    outline: none;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
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
    font-size: 40px; 
    text-align: center;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    border: 2px solid black;
}

</style>