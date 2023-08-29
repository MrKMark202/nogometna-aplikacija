<template>
    <div data-app class="obrub1">
        <v-row >
          <v-col cols="2" v-if="selectedImageURL">
            <v-img :src="selectedImageURL" v-if="selectedImageURL" class="image-box"></v-img>
          </v-col>
          
          <v-col cols="4" >
            <div class="naslov" style="color: black !important; margin-top: 0px !important;">
              <h2>Pregled utakmica</h2>
            </div>
          </v-col>
        </v-row>
            <v-select
              :items="ligas"
              @change="loadLeagueImage()"
              label="Izaberite ligu za prikazati!"
              v-model="selectedLiga"
              style="width: 40%; margin-left: 30%;"
            ></v-select>
                
            <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
                class="search"
            ></v-text-field>
            

            <v-data-table
                :headers="headers"
                :items="podaci"
                :search="search"
                style="font-weight: bold; text-align: center;"
                class="elevation-1"
            >
            </v-data-table>
    </div>
</template>

<script>
  import {db, auth, collection, getDocs, onAuthStateChanged} from '@/firebase';
  export default {
    data () {
      return {
        ligas: [],
        dataLigas: [],
        selectedLiga: '',
        search: '',
        selectedImageURL: '',
        polje1: [],
        headers: [
            { text: 'Kolo', value: 'kl'},
            { text: 'Domacin', value: 'dm'},
            { text: 'Golovi domačina', value: 'gd'},
            { text: ":", value: 'i'},
            { text: 'Golovi gostiju', value: 'gg'},
            { text: 'Gosti', value: 'gs'},
            { text: 'Liga', value: 'lg' },
            { text: 'Mjesto', value: 'ms' },
            { text: 'Stadion', value: 'std' },
            { text: 'Gledatelji', value: 'gl' },
            { text: 'Datum', value: 'dt' },
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

        this.dohvatPodatakaLige();

		});
    },

    methods: {
      async dohvatPodatakaLige() {
        this.dataLigas = [];
          const a = collection(db, "Users", auth.currentUser.email, "Lige");
          await getDocs(a)
          .then((querySnapshot) => {
            querySnapshot.docs.forEach((doc) => {
              this.dataLigas.push({liga: doc.id, data: doc.data()});
            });
          });
      },

      async loadLeagueImage() {
      if (this.selectedLiga) {
        const selectedLigaData = this.dataLigas.find(liga => liga.liga === this.selectedLiga);
        if (selectedLigaData && selectedLigaData.data.imageURL) {
          this.selectedImageURL = selectedLigaData.data.imageURL;
        } else {
          this.selectedImageURL = "";
        }
      } else {
        this.selectedImageURL = '';
      }
      this.dohvatPodatakaTekme();
    },

    async dohvatPodatakaTekme() {
        this.polje1 = [];
        const tekma = collection(db, "Users", auth.currentUser.email, "Lige", this.selectedLiga, "Utakmice");
           await getDocs(tekma)
          .then((querySnapshot) => {
            querySnapshot.docs.forEach((doc) => {
              this.polje1.push({data: doc.data()});
            });
            this.dohvatPodatakaZATablicu();
        });
    },

      dohvatPodatakaZATablicu() {
        this.podaci = [];

        this.polje1.forEach((item) => {
          this.podaci.push({
            kl: item.data.Kolo,
            dm: item.data.Domaćin,
            gd: item.data.domacinGol,
            i: ":",
            gg: item.data.gostiGol,
            gs: item.data.Gosti,
            lg: item.data.Liga,
            ms: item.data.Mjesto,
            std: item.data.stadionName,
            gl: item.data.gledateljiBroj,
            dt: item.data.datumTekme
          });
          
        });
      },
    },
  }
</script>

<style scoped>
  .obrub1
  {
    border: 2px solid white;
    background-color: white;
    padding: 50px;
    margin-left: 200px;
    margin-right: 200px;
    margin-bottom: 100px;
  }

  .search {
    margin-left: 30%;
    margin-right: 30%;
    margin-bottom: 30px;
  }
  .image-box {
  width: 200px;
  height: 200px; 
  } 
</style>