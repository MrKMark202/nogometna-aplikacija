<template>
    <div>
        <div class="naslov">
            <h1>Kreiraj klub</h1>
        </div>
    
        <div class="obrub" data-app>
            <v-text-field v-model="clubName" label="Naziv kluba" variant="underlined"></v-text-field>
            <v-text-field v-model="clubYear" label="Godina osnivanja" variant="underlined"></v-text-field>
            <v-text-field v-model="clubCountry" label="Država" variant="underlined"></v-text-field>

            <v-row class="row2">
              <v-col>
                  <div>
                      <v-select
                        :items="ligas"
                        label="Standard"
                        v-model="selectedLiga"
                        class="vselect"
                      ></v-select>
                      <br><br>
                  </div>
              </v-col>
            </v-row>

            <h3 class="grb">Grb Kluba</h3>

            <input 
                class="butot" 
                type="file" 
                ref="myfile" 
            />

            <v-btn @click="createKlub()" elevation="2" style="background-color: green; color: white; margin-top:40px; margin-left: 85% !important;">Kreiraj!</v-btn>
        </div>
    </div>
</template>

<script>
  import {db, auth, collection, getDocs, setDoc, doc, ref, uploadBytes, storage, onAuthStateChanged} from '@/firebase';

  export default {
    name: "CreateClub",
    data: () => ({
      clubName: null,
      clubCountry: null,
      clubYear: null,
      ligas: [],
      selectedLiga: '',
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
		});
   },

    methods: {
      clearFormData() {
			  this.clubName = null;
			  this.clubYear = null;
			  this.clubCountry = null;
        this.selectedLiga = '';
		  },

      UploadImageToStorage() {
        console.log("uplodaing...");
        const storageRef = ref(storage, "Users/"+auth.currentUser.email+"/ClubPicture/picture");
        console.log(this.$refs.myfile.files);
        uploadBytes(storageRef, this.$refs.myfile.files[0]).then(
          console.log("done!")
        );
      },   

      createKlub() {
        setDoc(
          doc(db, "Users", auth.currentUser.email, "Lige", this.selectedLiga, "Klubovi", this.clubName),
          {
            clubName: this.clubName,
            clubYear: this.clubYear,
            clubCountry: this.clubCountry
          }
        );
          this.clearFormData();
        }
      },
  };
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
  }

  .v-text-field
  {
    font-size: 20px !important;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    font-weight: bold;
  }

  .row2
  {
    color: black;
    text-align: center;
  }

  .vselect
  {
    font-size: 20px !important;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif !important;
  }
</style>