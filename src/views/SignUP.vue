<template>

    <div>
        <div class="naslov1">
            <h1>SignUp</h1>
        </div>

    <v-card
      class="mx-auto"
      style="max-width: 500px; margin-top: 80px; margin-left: 14%; padding: 30px;"
    >

    <v-card-title> Imaš li već račun? <v-btn to="/LogIn" style="margin-left:10px; color:black; text-decoration: none;"> Prijavi se! </v-btn> </v-card-title>

      <v-form ref="form" v-model="form" style="margin-top: 20px;">

      <v-text-field
          v-model="name"
          filled
          label="Name"
          style="min-height: 100px;"
          :rules="[rules.required]"
          type="text"
        ></v-text-field>

        <v-text-field
          v-model="surname"
          filled
          color="black"
          label="Surname"
          style="min-height: 100px"
          :rules="[rules.required]"
          type="text"
        ></v-text-field>

        <h5>Date format: DD/MM/YYYY</h5>

        <v-text-field
          v-model="birthDate"
          filled
          color="black"
          label="Your birth date"
          style="min-height: 100px"
          :rules="[rules.required]"
          type="text"
        ></v-text-field>

      <v-text-field
          v-model="email"
          :rules="[rules.email, rules.required]"
          filled
          color="black"
          label="Email address"
          style="min-height: 100px"
          type="email"
        ></v-text-field>

        <v-text-field
          v-model="password"
          :rules="[rules.password, rules.length(6), rules.required]"
          filled
          color="black"
          counter="6"
          label="Password"
          style="min-height: 100px"
          type="password"
        ></v-text-field>

        <h5>PIN will be used as checkmark for reseting your password if you forgot it</h5>
        <h5>Minimum of 4 numbers!</h5>

        <v-text-field
          type="password"
          v-model="pin"
          filled
          color="black"
          label="Insert your PIN"
          style="min-height: 100px"
          :rules="[rules.length(4), rules.required]"
          counter="4"
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
    components: {},
    data: () => ({
      agreement: false,
      valid: true,
      name: null,
      surname: null,
      email: null,
      form: false,
      isLoading: false,
      password: null,
      birthDate: null,
      pin: '',
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
        this.birthDate = null;
        this.pin = null;
		},

    postActionMoveToView() {
			this.$router.replace({ path: "/" });
		},

    async saveAdditionalData(user, email, name, surname, birthDate, pin) {
			await setDoc(doc(db, "Users", email.toLowerCase()), {
				Email: email,
				Name: name,
				Surname: surname,
        Birthdate: birthDate,
        PIN: pin,
				AuthorisationType: "USER",
			});
		},
    
      signup() {
        const email = this.email;
        const password = this.password;
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) =>{
            alert("Uspješna registracija");
            const user = userCredential.user;
            const name = this.name;
            const surname = this.surname;
            const birthDate = this.birthDate;
            const pin = this.pin;
            this.clearFormData();
            this.saveAdditionalData(user, email, name, surname, birthDate, pin);
            this.postActionMoveToView();
          })
          .catch((error) => {
            alert("Došlo je do pogreške", error);
          });
      },
      
      filterNonNumeric(event) {
        if (
        event.key === 'ArrowLeft' ||
        event.key === 'ArrowRight' ||
        event.key === 'Backspace' ||
        event.key === 'Delete' ||
        event.key === 'Tab'
      ) {
        return;
      }

      // Prevent non-numeric characters
      if (!/^\d+$/.test(event.key)) {
        event.preventDefault();
      }
    }
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