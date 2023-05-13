<template>

    <div>
        <div class="naslov1">
            <h1>SignUp</h1>
        </div>

    <v-card
      class="mx-auto"
      style="max-width: 500px; margin-top: 80px; margin-left: 14%; padding: 30px;"
    >

    <v-card-title> Imaš li već račun? <v-btn style="margin-left:10px;"> <router-link to="/LogIn" style="color:black; text-decoration: none;"> Prijavi se! </router-link></v-btn> </v-card-title>

      <v-form ref="form" v-model="form" style="margin-top: 20px;">

      <v-text-field
          v-model="name"
          filled
          color="black"
          label="Name"
          style="min-height: 100px;"
        ></v-text-field>

        <v-text-field
          v-model="surname"
          filled
          color="black"
          label="Surname"
          style="min-height: 100px"
        ></v-text-field>

      <v-text-field
          v-model="email"
          :rules="[rules.email]"
          filled
          color="black"
          label="Email address"
          style="min-height: 100px"
          type="email"
        ></v-text-field>

        <v-text-field
          v-model="password"
          :rules="[rules.password, rules.length(6)]"
          filled
          color="black"
          counter="6"
          label="Password"
          style="min-height: 100px"
          type="password"
        ></v-text-field>

        <v-checkbox
          v-model="agreement"
          :rules="[rules.required]"
          color="black"
        >
          <template v-slot:label>
            I agree to the Terms of Service and Privacy Policy
          </template>
        </v-checkbox>
      </v-form>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn
          style="margin-bottom: 10px;"
          text
          @click="$refs.form.reset()"
        >
          Clear
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          type="button"
          :disabled="!form"
          :loading="isLoading"
          class="white--text"
          color="black"
          depressed
          @click="signup"
        >
          SignUP!
        </v-btn>
      </v-card-actions>
        </v-card>
    </div>
  </template>


<script>

import {
	doc,
	auth,
	db,
	setDoc,
	createUserWithEmailAndPassword,
} from "@/firebase"

  export default {
    name: "SignUP",
    data: () => ({
      agreement: false,
      name: null,
      surname: null,
      email: null,
      form: false,
      isLoading: false,
      password: null,
      rules: {
        email: v => !!(v || '').match(/@/) || 'Please enter a valid email',
        length: len => v => (v || '').length >= len || `Invalid character length, required ${len}`,
        password: v => !!(v || '').match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/) ||
          'Password must contain an upper case letter, a numeric character, and a special character',
        required: v => !!v || 'This field is required',
      },
    }),

    methods: {
      clearFormData() {
			this.name = null;
			this.surname = null;
			this.email = null;
			this.password = null;
		},

    postActionMoveToView() {
			this.$router.push({ path: "/" });
		},

    async saveAdditionalData(user, email, name, surname) {
			await setDoc(doc(db, "users", email), {
				Email: email,
				Name: name,
				Surname: surname,
				AuthorisationType: "USER",
			});
		},
      signup() {
        createUserWithEmailAndPassword(auth, this.email,this.password)
          .then((userCredital) =>{
            alert("Uspješna registracija");
            const user = userCredital.user;
            const name = this.name;
            const surname = this.surname;
            this.saveAdditionalData(user, email, name, surname);
          })
          .catch((error) => {
            alert("Došlo je do pogreške", error);
          });
      },
    },
  };
</script>

<style>
.naslov1
  {
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    padding-left: 15%;
    color: white;
    margin-top:120px;
  }

  
</style>