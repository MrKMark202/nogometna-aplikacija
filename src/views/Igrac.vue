<template>
    <div>
        <div class="naslov">
            <h1>Kreiraj Igrača</h1>
        </div>
    
        <div class="obrub" data-app>
          <v-form ref="form" v-model="form" style="margin-top: 20px;">
            <v-text-field v-model="playerName" label="Ime Igrača" variant="underlined" :rules="[rules.required]"></v-text-field>

            <v-row class="row2">
              <v-col>
                  <div>
                      <v-select
                        :rules="[rules.required]"
                        :items="ligas"
                        label="Izaberite ligu u koju želite kreirati igrača!"
                        v-model="selectedLiga"
                        class="vselect"
                      ></v-select>
                      <br><br>
                  </div>
              </v-col>
            </v-row>
          </v-form>
            <h3 class="grb">Profilna igrača</h3>

            <input 
              class="butot" 
              type="file" 
              ref="PlayerPictureFile" 
            />

            <v-btn 
              @click="UploadPlayerImageToStorage()" 
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
      playerName: null,
      ligas: [],
      selectedLiga: '',
      PlayerPictureURL: '',
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
		    this.playerName = null;
            this.selectedLiga = '';
	    },

      async UploadPlayerImageToStorage() {
      if(this.$refs.PlayerPictureFile.files[0]) {
        const storageRef = ref(storage, "Users/" + auth.currentUser.email + "/KlubPicture/ " + this.clubName);

        await uploadBytes(storageRef, this.$refs.PlayerPictureFile.files[0]).then((snapshot) => {
        console.log("Upload complete!");

          getDownloadURL(snapshot.ref).then((url) => {
            this.PlayerPictureURL = url;
            this.createKlub();
            this.createDataTable();
          }).catch((error) => {
            console.error("Error getting download URL:", error);
          });
        }).catch((error) => {
          console.error("Error uploading image:", error);
        });
      }
      else if (!this.$refs.PlayerPictureFile.files[0]) {
        //this.PlayerPictureURL = 'https://firebasestorage.googleapis.com/v0/b/nogometna--aplikacija.appspot.com/o/Users%2Fmk%40gmail.com%2FKlubPicture%2Funknown_klub.png?alt=media&token=6ebf3512-0a33-4b92-8362-f959b2b23b47';
        this.createKlub();
        this.createDataTable();
      }
    },

      async createKlub() {
        await setDoc(
          doc(db, "Users", auth.currentUser.email, "Lige", this.selectedLiga, "Igraci", this.playerName),
          {
            playerName: this.playerName,
            imageURL: this.PlayerPictureURL
          }
        );
        },

        async createDataTable() {
          await setDoc(
            doc(db, "Users", auth.currentUser.email, "Lige", this.selectedLiga, "Igraci", this.playerName, "Tablica lige", "Podaci"),
            {
              Bodovi: 0,
              Ubacenih_loptica: 0,
              Primljenih_loptica: 0,
              Odigranih_dvoboja: 0,
              Pobjede: 0,
              Postene_pobjede: 0,
              Direktni_porazi: 0,
              Porazi: 0,
              imageURL: this.PlayerPictureURL
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
    margin-bottom: 100px;
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