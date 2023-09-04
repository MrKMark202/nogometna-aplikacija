<template>
    <div>
      <div data-app class="obrub1">
        <v-row >
          <v-col cols="2" v-if="selectedImageURL">
            <v-img :src="selectedImageURL" class="image-box"></v-img>
          </v-col>
          
          <v-col cols="4" >
            <div class="naslov" style="color: black !important; margin-top: 0px !important">
              <h1>Tablica</h1>
            </div>
          </v-col>
        </v-row>
       
        <div class="grid-container2">
          <v-btn class="grid-item4" @click="izbrisiLigu()" elevation="2" style="background-color: red; color: white; margin-top:40px; font-size: 30px;">Izbriši ligu!</v-btn>
          <v-btn class="grid-item4" @click="izbrisiKlub()" elevation="2" style="background-color: red; color: white; margin-top:40px; font-size: 30px;">Izbriši klub!</v-btn>
            <v-select
              class="grid-item4"
              :items="ligas"
              @change="dohvatKlubova(), loadLeagueImage()"
              label="Izaberite ligu za prikazati!"
              v-model="selectedLiga"
              style="width: 350px;"
            ></v-select>

            <v-select
              class="grid-item4"
              :items="klubs"
              label="Izaberite klub!"
              v-model="selectedKlub"
              style="width: 350px;"
              ></v-select>
        </div>
                
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
          item-key="nt"
          class="elevation-1"
          loading
          loading-text="Izaberite ligu!"
        >
          <template v-slot:item.grb="{ item }">
            <v-img :src="item.grb" class="klub-grb"></v-img>
          </template>
         </v-data-table>
      </div>
  </div>
</template>

<script>

  import {db, auth, collection, getDocs, onAuthStateChanged, deleteDoc, doc } from '@/firebase';
  export default {
    data () {
      return {
        ligas: [],
        dataLigas: [],
        klubs:[],
        datas: [],
        selectedLiga: '',
        selectedKlub: '',
        search: '',
        selectedImageURL: '',
        headers: [
            { text: 'Pozicija', value: 'pz'},
            { text: 'Grb', value: 'grb'},
            {
                text: 'Naziv tima',
                align: 'start',
                value: 'nt',
            },
            { text: 'Odigranih dvoboja', value: 'od' },
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
    },

      async dohvatKlubova() {
        this.klubs = [];
        const colRef = collection(db, "Users", auth.currentUser.email, "Lige", this.selectedLiga, "Klubovi");
        await getDocs(colRef)
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.klubs.push(doc.id);
          });
        });
        this.dohvatPodatakaTabliceKlubova();
      },
      
      dohvatPodatakaTabliceKlubova() {
        this.datas = [];
        this.klubs.forEach(klub => {
          const q =  getDocs(collection(db, "Users", auth.currentUser.email, "Lige", this.selectedLiga, "Klubovi", klub, "Tablica lige"));
          q.then((querySnapshot) => {
            querySnapshot.docs.forEach((doc) => {
              this.datas.push({klub: klub , data: doc.data()});
            });
            this.dohvatPodatakaZATablicu();
          });
        }) 
      },

      dohvatPodatakaZATablicu () {
        this.podaci = [];
        const sortedDatas = [...this.datas];
        sortedDatas.sort((a, b) => {
          return b.data.Bodovi - a.data.Bodovi;
        });
        
        sortedDatas.forEach((item, index) => {
          this.podaci.push({
            pz: index + 1,
            grb: item.data.imageURL,
            nt: item.klub,
            od: item.data.Odigranih_dvoboja,
            pp: item.data.Postignutih_pogodaka,
            pg: item.data.Primljenih_pogodaka,
            gr: item.data.Postignutih_pogodaka - item.data.Primljenih_pogodaka,
            bd: item.data.Bodovi,
          });
        });
      },

      async izbrisiLigu() {
        if(!this.selectedLiga) {
          alert("Prvo izaberite ligu");
        }
        else {
          const documentRef = doc(db, "Users", auth.currentUser.email, "Lige", this.selectedLiga);

          try {
            if(confirm("Jeste li sigurni da želite izbridati ligu")) {
              await deleteDoc(documentRef);
              console.log('Document deleted successfully');
              window.location.reload();
            }
          } catch (error) {
            console.error('Error deleting document:', error);
          }
        }
      },

      async izbrisiKlub() {
        if(!this.selectedLiga) {
          alert("Prvo izaberite ligu da bi ste mogli klub!");
        }
        
        else if(this.selectedLiga && !this.selectedKlub) {
          alert("Izaberite klub!");
        }

        else {
          const documentRef = doc(db, "Users", auth.currentUser.email, "Lige", this.selectedLiga, "Klubovi", this.selectedKlub);

          try {
            if(confirm("Jeste li sigurni da želite izbrisati klub")) {
              await deleteDoc(documentRef);
              console.log('Document deleted successfully');
              window.location.reload();
            }
          } catch (error) {
            console.error('Error deleting document:', error);
          }
        }
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

  .grid-container2 {
    display: grid;
    grid-template-columns: auto auto;
    background-color: white;
    justify-content: space-between;
    align-items: center;
    margin-left: 10%;
    margin-right: 10%;
  }
  .grid-item4 {
    background-color: white;
    padding: 20px;
  }

  .klub-grb {
  max-width: 50px;
  max-height: 50px;
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