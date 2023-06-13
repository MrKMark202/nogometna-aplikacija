<template>
    <div>
        <div class="naslov">
            <h1>Kreiraj ligu</h1>
        </div>
    
        <div class="obrub">
            <v-text-field v-model="ligaName" label="Naziv Lige" variant="underlined"></v-text-field>
            <v-text-field v-model="ligaYear" label="Godina osnivanja" variant="underlined"></v-text-field>
            <v-text-field v-model="ligaCountry" label="Država" variant="underlined"></v-text-field>


            <input type="file" ref="myfile" />
     
     <v-btn class="ma-5" @click="UploadImageToStorage()"> Done</v-btn>
            
            <v-file-input
                label="Grb Lige"
                variant="filled"
                prepend-icon="mdi-camera"
                v-model="url"
            >
            </v-file-input>


            
            <v-btn @click="createLiga()" elevation="2" class="btn_style" style="margin-top:40px; margin-left: 80%;">Kreiraj!</v-btn>
        </div>
    </div>
</template>

<script>

import {
  db,
  doc,
  setDoc,
  auth,
  ref,
  storage,
  uploadBytes 
} from "@/firebase"

export default {
    name: "createLIGA",
    data: () => ({
        ligaName: null,
        ligaYear: null,
        ligaCountry: null,
        url: ""
    }),

    created() {},
	mounted() {
        
    },
	destroyed() {},

    methods: {
      clearFormData() {
			  this.ligaName = null;
			  this.ligaYear = null;
			  this.ligaCountry = null;
		},
        UploadImageToStorage() {

      console.log("uplodaing...");
      const storageRef = ref(storage, "Users/"+auth.currentUser.email+"/ProfilePicture/profile");
      console.log(this.$refs.myfile.files);
      uploadBytes(storageRef, this.$refs.myfile.files[0]).then(
        console.log("done!")
      );
        },


        async createLiga() {
            await setDoc(
            doc(db, "Users", auth.currentUser.email, "Lige", this.ligaName),
                {
                    ligaName: this.ligaName,
                    ligaYear: this.ligaYear,
                    ligaCountry: this.ligaCountry
                }
            );
            this.clearFormData();
        }
    },
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

    
}

.v-text-field
{
    font-size: 20px;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    font-weight: bold;
}
</style>