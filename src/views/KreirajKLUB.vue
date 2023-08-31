<template>
    <div>
        <div class="naslov">
            <h1>Kreiraj klub</h1>
        </div>
    
        <div class="obrub" data-app>
          <v-form ref="form" v-model="form" style="margin-top: 20px;">
            <v-text-field v-model="clubName" label="Naziv kluba" variant="underlined" :rules="[rules.required]"></v-text-field>
            <v-text-field v-model="clubYear" label="Godina osnivanja" variant="underlined" :rules="[rules.required]"></v-text-field>
            <v-text-field v-model="clubCountry" label="Država" variant="underlined" :rules="[rules.required]"></v-text-field>

            <v-row class="row2">
              <v-col>
                  <div>
                      <v-select
                        :rules="[rules.required]"
                        :items="ligas"
                        label="Izaberite ligu za koju kreirate klub!"
                        v-model="selectedLiga"
                        class="vselect"
                      ></v-select>
                      <br><br>
                  </div>
              </v-col>
            </v-row>
          </v-form>
            <h3 class="grb">Grb Kluba</h3>

            <input 
              class="butot" 
              type="file" 
              ref="KlubPictureFile" 
            />

            <v-btn 
              @click="UploadKlubImageToStorage()" 
              elevation="2" 
              :disabled="!form"
              :loading="isLoading"
              style="background-color: green; color: white; margin-top:40px; margin-left: 85% !important;">Kreiraj!</v-btn>
        </div>
    </div>
</template>

<script>
  import {db, auth, collection, getDocs, setDoc, doc, ref, uploadBytes, storage, onAuthStateChanged, getDownloadURL} from '@/firebase';

  export default {
    name: "CreateClub",
    data: () => ({
      clubName: null,
      clubCountry: null,
      clubYear: null,
      ligas: [],
      selectedLiga: '',
      KlubPictureURL: '',
      form: false,
      isLoading: false,
      rules: {
        required: v => !!v || 'This field is required'
      },
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

      async UploadKlubImageToStorage() {
      if(this.$refs.KlubPictureFile.files[0]) {
        const storageRef = ref(storage, "Users/" + auth.currentUser.email + "/KlubPicture/ " + this.clubName);

        await uploadBytes(storageRef, this.$refs.KlubPictureFile.files[0]).then((snapshot) => {
        console.log("Upload complete!");

          getDownloadURL(snapshot.ref).then((url) => {
            this.KlubPictureURL = url;
            this.createKlub();
            this.createDataTable();
          }).catch((error) => {
            console.error("Error getting download URL:", error);
          });
        }).catch((error) => {
          console.error("Error uploading image:", error);
        });
      }
      else if (!this.$refs.KlubPictureFile.files[0]) {
        this.KlubPictureURL = 'https://firebasestorage.googleapis.com/v0/b/nogometna--aplikacija.appspot.com/o/Users%2Fmk%40gmail.com%2FKlubPicture%2Funknown_klub.png?alt=media&token=6ebf3512-0a33-4b92-8362-f959b2b23b47';
        this.createKlub();
        this.createDataTable();
      }
    },

      async createKlub() {
        await setDoc(
          doc(db, "Users", auth.currentUser.email, "Lige", this.selectedLiga, "Klubovi", this.clubName),
          {
            clubName: this.clubName,
            clubYear: this.clubYear,
            clubCountry: this.clubCountry,
            imageURL: this.KlubPictureURL
          }
        );
        },

        async createDataTable() {
          await setDoc(
            doc(db, "Users", auth.currentUser.email, "Lige", this.selectedLiga, "Klubovi", this.clubName, "Tablica lige", "Podaci"),
            {
              Bodovi: 0,
              Postignutih_pogodaka: 0,
              Primljenih_pogodaka: 0,
              Odigranih_dvoboja: 0,
              imageURL: this.KlubPictureURL
            }
          )
          this.clearFormData();
        },
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