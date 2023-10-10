<template>
    <div>
       <div class="naslov">
           <h1>Kreiraj partiju</h1>
       </div>
   
       <div data-app class="obrub1">
       <v-form ref="form" v-model="form" style="margin-top: 20px;">
           <v-text-field :rules="[rules.required]" v-model="mjestoIgranja" label="Mjesto igranja" variant="underlined"></v-text-field>
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
                   label="Izaberite ligu za koju je partija namijenjena!"
                   v-model="izabranaLiga"
                   class="vselect"
                   :rules="[rules.required]"
               ></v-select>
               <br><br>
           </div>

           <div>
               <v-select
                   @change="dohvatKlubova()"
                   :items="playerONE"
                   label="Izaberite prvog igrača!"
                   v-model="playerOne"
                   class="vselect"
                   :rules="[rules.required]"
               ></v-select>
               <br><br>
           </div>

           <v-text-field :rules="[rules.required]" v-model="ubaceneLoptice" label="Broj ubacenih loptica prvog igrača!" variant="underlined"></v-text-field>
           
           <v-checkbox
                class="checkbox"
                v-model="checkboxOne"
                label="Igrač je pobijedio?"
            ></v-checkbox>

            <v-checkbox
                class="checkbox"
                v-model="fairWinOne"
                label="Igrač je pošteno pobijedio?"
            ></v-checkbox>

            <v-checkbox
                class="checkbox"
                v-model="badLoseOne"
                label="Direktan poraz?"
            ></v-checkbox>

           <div>
               <v-select
                   @change="dohvatKlubova()"
                   :items="playerTWO"
                   label="Izaberite drugog igrača!"
                   v-model="playerTwo"
                   class="vselect"
                   :rules="[rules.required]"
                   style="margin-top: 30px;"
               ></v-select>
               <br><br>
           </div>
           
           <v-text-field :rules="[rules.required]" v-model="primljeneLoptice" label="Broj ubačenih loptica drugog igrača!" variant="underlined"></v-text-field>

           <v-checkbox
                class="checkbox"
                v-model="checkboxTwo"
                label="Igrač je pobijedio?"
            ></v-checkbox>

            <v-checkbox
                class="checkbox"
                v-model="fairWinTwo"
                label="Igrač je pošteno pobijedio?"
            ></v-checkbox>

            <v-checkbox
                class="checkbox"
                v-model="badLoseTwo"
                label="Direktan poraz?"
            ></v-checkbox>

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
     mjestoIgranja: null,
     playerONE: [],
     lige: [],
     playerOne: '',
     playerTwo: '',
     playerTWO: [],
     izabranaLiga: '',
     ubaceneLoptice: null,
     primljeneLoptice: null,
     checkboxOne: false,
     checkboxTwo: false,
     fairWinOne: false,
     fairWinTwo: false,
     badLoseOne: false,
     badLoseTwo: false,
     date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
     datumSat: null,
     modal: false,
     dan: null,
     mjesec: null,
     godina: null,
     satUpisa: null,
     rules: {
       required: v => !!v || 'This field is required',
     },
   }),

   watch: {
        checkboxOne: function (newVal) {
            if (newVal) {
                this.checkboxTwo = false;
                this.fairWinTwo = false;
                this.badLoseTwo = false;
            }
        },
        checkboxTwo: function (newVal) {
            if (newVal) {
                this.checkboxOne = false;
                this.fairWinOne = false;
                this.badLoseOne = false;
            }
        },
        fairWinOne: function (newVal) {
            if (newVal) {
                this.fairWinTwo = false;
                this.checkboxTwo = false;
                this.badLoseOne = false;
                this.badLoseTwo = false;
            }
        },
        fairWinTwo: function (newVal) {
            if (newVal) {
                this.fairWinOne = false;
                this.checkboxOne = false;
                this.badLoseTwo = false;
                this.badLoseOne = false;
            }
        },
        badLoseOne: function (newVal) {
            if (newVal) {
                this.fairWinOne = false;
                this.checkboxTwo = false;
                this.badLoseTwo = false;
            }
        },
        badLoseTwo: function (newVal) {
            if (newVal) {
                this.fairWinTwo = false;
                this.checkboxOne = false;
                this.badLoseOne = false;
            }
        },
    },

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
           this.mjestoIgranja = null;
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
           const colRef = collection(db, "Users", auth.currentUser.email, "Lige", this.izabranaLiga, "Igraci");
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
       margin-left: 20%;
       margin-right: 20%;
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

   .checkbox
   {
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    font-weight: bold;
   }
</style>