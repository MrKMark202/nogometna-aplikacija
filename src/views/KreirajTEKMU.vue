<template>
     <div>
        <div class="naslov">
            <h1>Kreiraj Utakmicu</h1>
        </div>
    
        <div data-app class="obrub1">
        <v-form ref="form" v-model="form" style="margin-top: 20px;">
            <v-text-field :rules="[rules.required]" v-model="kolo" label="Broj utakmice (kolo)" variant="underlined"></v-text-field>
            <v-text-field :rules="[rules.required]" v-model="mjestoIgranja" label="Mjesto igranja" variant="underlined"></v-text-field>
            <v-text-field :rules="[rules.required]" v-model="stadionName" label="Naziv stadiona" variant="underlined"></v-text-field>
            <v-text-field :rules="[rules.required]" v-model="gledateljiBroj" label="Broj gledatelja" variant="underlined"></v-text-field>
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
                            :rules="[rules.required]"
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
                    @change="dohvatKlubova()"
                    :items="lige"
                    label="Izaberite ligu za koju je utakmica namijenjena!"
                    v-model="izabranaLiga"
                    class="vselect"
                    :rules="[rules.required]"
                ></v-select>
                <br><br>
            </div>

            <h1 style="font-size: 60px; margin-top: 10px; color: black; text-align: center;">Rezultat</h1>

            <v-row class="row">
                <v-col>
                    <div>
                        <h2 style="font-size: 30px; margin-bottom: 10px;">Domaćin</h2>
                        <v-select
                            :items="gostiTim"
                            label="Izaberi domaćina"
                            v-model="domacin"
                            @change="domaciDohvat"
                            :rules="[rules.required]"
                        ></v-select>
                        <br><br>
                    </div>
                </v-col>

                <v-col class="gol">
                    <input :rules="[rules.required]" v-model="domacinGol" type="text" solo class="goll" maxlength="2"/>
                </v-col>

                <v-col>
                    <h1 style="margin-bottom: 25px">:</h1>
                </v-col>

                <v-col class="gol">
                    <input :rules="[rules.required]" v-model="gostiGol" type="text" solo class="goll" maxlength="2"/>
                </v-col>

                <v-col>
                    <div>
                        <h2 style="font-size: 30px; margin-bottom: 10px;">Gosti</h2>
                        <v-select
                            :items="domaciTim"
                            label="Izaberi goste"
                            v-model="gosti"
                            @change="gostiDohvat"
                            :rules="[rules.required]"
                        ></v-select>
                        <br><br>
                    </div>
                </v-col>
            </v-row>

            <v-btn 
                @click="createTekma" 
                elevation="2" 
                style="background-color: green; color: white; margin-top:40px; margin-left: 85% !important; font-size: 30px;"
                :disabled="!form"
                :loading="isLoading"
            >
                Kreiraj!
            </v-btn>
            </v-form>
        </div>
    </div>
</template>

<script>
import {db, auth, collection, getDocs, setDoc, doc, onAuthStateChanged} from '@/firebase';
export default {
    data: () => ({
        form: false,
        isLoading: false,
        kolo: null,
      stadionName: null,
      domacinGol: null,
      gostiGol: null,
      gledateljiBroj: null,
      mjestoIgranja: null,
      klubs: [],
      gostiTim: [],
      domaciTim: [],
      domacin: '',
      gosti: '',
      lige: [],
      izabranaLiga: '',
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      datumSat: null,
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
      gostiData: [],
      rules: {
        required: v => !!v || 'This field is required',
      },
    }),

    mounted() {
      onAuthStateChanged(auth, (user) => {
		if (user) {
            const colRef = collection(db, "Users", user.email, "Lige");
            getDocs(colRef)
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                this.lige.push(doc.id);
            });
            })
            .catch((error) => {
            console.error("Error fetching subcollection documents:", error);
            });
        } else {
            console.log("User is not loged in");
        }
        },
    )},

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
            this.izabranaLiga = '';
            this.date = null;
		},

        trenutniDatum() {
            const current = new Date();
            this.godina = String("GODINA " + `${current.getFullYear()}`);
            this.mjesec = String("MJESEC " + `${current.getMonth()+1}`);
            this.dan = String("DAN " + `${current.getDate()}`);
            this.satUpisa = String(`${current.getHours()}:${current.getMinutes()}:${current.getSeconds()}`);
            this.datumSat = String(this.date + " " + this.satUpisa);
        },

        dohvatKlubova() {
            const colRef = collection(db, "Users", auth.currentUser.email, "Lige", this.izabranaLiga, "Klubovi");
            getDocs(colRef)
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                    this.klubs.push(doc.id);
                    this.gostiTim = this.klubs;
                });
            })
            this.klubs = [];
        },

        izabraniDomaciTim() {
            this.domaciTim = this.klubs.filter((klub) => klub !== this.domacin);
        },

        izabraniGostujuciTim() {
            this.gostiTim = this.klubs.filter((klub) => klub !== this.gosti);
        },

        async domaciDohvat() {
            this.domacinData = [];
                const querySnapshot = await getDocs(collection(db, "Users", auth.currentUser.email, "Lige", this.izabranaLiga, "Klubovi", this.domacin, "Tablica lige"));
                querySnapshot.forEach((doc) => {
                this.domacinData.push(doc.data());
            })

            this.izabraniDomaciTim();
        },

        async gostiDohvat() {
            this.gostiData = [];
            const querySnapshot = await getDocs(collection(db, "Users", auth.currentUser.email, "Lige", this.izabranaLiga, "Klubovi", this.gosti, "Tablica lige"));
            querySnapshot.forEach((doc) => {
                this.gostiData.push(doc.data());
            })
            
            this.izabraniGostujuciTim();
        },

        createTablicaDomacin() {
            this.domBod = 0;
            if(this.domacinGol > this.gostiGol) {
                parseInt(this.domBod+=3);
            }
            else if(this.domacinGol == this.gostiGol) {
                parseInt(this.domBod+=1);
            }


            setDoc(
                doc(db, "Users", auth.currentUser.email, "Lige", this.izabranaLiga, "Klubovi", this.domacin, "Tablica lige", "Podaci"),
                {
                    Bodovi: parseInt(this.domacinData[0].Bodovi) + parseInt(this.domBod),
                    Postignutih_pogodaka: parseInt(this.domacinData[0].Postignutih_pogodaka) + parseInt(this.domacinGol),
                    Primljenih_pogodaka: parseInt(this.domacinData[0].Primljenih_pogodaka) + parseInt(this.gostiGol),
                    Odigranih_dvoboja: parseInt(this.domacinData[0].Odigranih_dvoboja) + parseInt(1),
                    imageURL: this.domacinData[0].imageURL
                }
            );
        },

        createTablicaGosti() {
            this.gosBod = 0;
            if(this.gostiGol > this.domacinGol) {
                parseInt(this.gosBod+=3);
            }
            else if(this.domacinGol == this.gostiGol) {
                parseInt(this.gosBod+=1);
            }

            setDoc(
                doc(db, "Users", auth.currentUser.email, "Lige", this.izabranaLiga, "Klubovi", this.gosti, "Tablica lige", "Podaci"),
                {
                    Bodovi: parseInt(this.gostiData[0].Bodovi) + parseInt(this.gosBod),
                    Postignutih_pogodaka: parseInt(this.gostiData[0].Postignutih_pogodaka) + parseInt(this.gostiGol),
                    Primljenih_pogodaka: parseInt(this.gostiData[0].Primljenih_pogodaka) + parseInt(this.domacinGol),
                    Odigranih_dvoboja: parseInt(this.gostiData[0].Odigranih_dvoboja) + parseInt(1),
                    imageURL: this.gostiData[0].imageURL
                }
            );
        },

        createTekma() {
            this.trenutniDatum();
            setDoc(
            doc(db, "Users", auth.currentUser.email, "Lige", this.izabranaLiga, "Utakmice", this.datumSat),
            {
                Kolo: this.kolo,
                stadionName: this.stadionName,
                gledateljiBroj: this.gledateljiBroj,
                datumTekme: this.date,
                Liga: this.izabranaLiga,
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