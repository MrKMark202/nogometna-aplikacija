<template>
    <div>
        <div class="naslov">
            <h1>Kreiraj ligu</h1>
        </div>
    
        <div class="obrub">
            <v-text-field v-model="ligaName" label="Naziv Lige" variant="underlined"></v-text-field>
            <v-text-field v-model="ligaYear" label="Godina osnivanja" variant="underlined"></v-text-field>
            <v-text-field v-model="ligaCountry" label="Država" variant="underlined"></v-text-field>


            <h3 class="grb">Grb Lige</h3>

            <input 
                class="butot" 
                type="file" 
                ref="myfile" 
            />
 
            <v-btn @click="createLiga(), UploadImageToStorage()" elevation="2" class="btn_style" style="margin-top:40px; margin-left: 85% !important;">Kreiraj!</v-btn>
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
    }),

    methods: {
      clearFormData() {
			this.ligaName = null;
			this.ligaYear = null;
			this.ligaCountry = null;
		},

        UploadImageToStorage() {
            console.log("uplodaing...");
            const storageRef = ref(storage, "Users/"+auth.currentUser.email+"/LigaPicture/picture");
            console.log(this.$refs.myfile.files);
            uploadBytes(storageRef, this.$refs.myfile.files[0]).then(
                console.log("Done!")
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
    margin-left: 25% !important;
    margin-right: 25% !important;
    margin-top: 100px;

    
}

.v-text-field
{
    font-size: 20px;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    font-weight: bold;
}

.butot
{
    margin-top: 20px;
    background-color: green;
    color: black;
    font-size: 20px;
    font-weight: bold;
}

.grb
{
    margin-top: 20px;
    color: black;
    font-size: 30px;
}
</style>