<template>
    <div>
        
        <div class="naslov">
            <h1>Tablica</h1>
        </div>

        <div data-app class="obrub1">
            <v-card-title style="font-size:30px; color: black; font-weight: bold;">
                <v-select
                  :items="ligas"
                  @change="change"
                  label="Izaberite ligu za prikazati"
                  v-model="selectedLiga"
                ></v-select>

                <v-spacer></v-spacer>

                <v-btn @click="changes"></v-btn>
                
                <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
                ></v-text-field>
            </v-card-title>

            <v-data-table
                :headers="headers"
                :items="podaci"
                :search="search"
                style="font-weight: bold; text-align: center;"
                item-key="name"
                class="elevation-1"
                loading
                loading-text="Loading... Please wait"
            ></v-data-table>
        </div>
    </div>
</template>

<script>
  import {db, auth, collection, getDocs, setDoc, doc, onAuthStateChanged} from '@/firebase';
  export default {
    data () {
      return {
        ligas: [],
        klubs:[],
        datas: [],
        selectedLiga: '',
        search: '',
        headers: [
            { text: 'Pozicija', value: 'pz'},
            {
                text: 'Naziv tima',
                align: 'start',
                value: 'nt',
            },
            { text: 'Postignuti pogodci', value: 'pp' },
            { text: 'Primljeni golovi', value: 'pg' },
            { text: 'Gol razlika', value: 'gr'},
            { text: 'Bodovi', value: 'bd', sortable: true},
        ],
        podaci: [],
      }
    },

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
		});
    },

    methods: {

      change() {
        const colRef = collection(db, "Users", auth.currentUser.email, "Lige", this.selectedLiga, "Klubovi");
        getDocs(colRef)
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.klubs.push(doc.id);
          });
        });
        this.changes();
      },

      changes() {
        this.klubs.forEach(klub => {
        const q = getDocs(collection(db, "Users", auth.currentUser.email, "Lige", this.selectedLiga, "Klubovi", klub, "Tablica lige"));
        q.then((querySnapshot) => {
            querySnapshot.docs.forEach((doc) => {
              this.datas.push({klub: klub , data: doc.data()});
            });
          });
        })
          this.datas.forEach((item) => {
            this.podaci.push({nt: item.klub, pp: item.data.Postignutih_pogodaka, pg: item.data.Primljenih_pogodaka, gr: item.data.Postignutih_pogodaka-item.data.Primljenih_pogodaka,bd: item.data.Bodovi});
          });


      }
    },
  }
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

</style>