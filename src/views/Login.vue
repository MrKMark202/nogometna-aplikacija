<template>

  <div>
    <div class="naslov2">
        <h1>LogIn</h1>
    </div>

    <v-card
      class="mx-auto"
      style="max-width: 500px; margin-top: 80px; margin-left: auto; margin-right:auto; padding: 30px;"
    >

      <v-card-title> Još nisi napravio račun? <v-btn to="/SignUP" style="margin-left:10px; color:black; text-decoration: none;"> Registriraj se! </v-btn> </v-card-title>

      <v-form
        ref="form"
        v-model="form"
        style="margin-top: 20px;"
      >
        <v-text-field
            v-model="email"
            :rules="[rules.email]"
            filled
            color="black"
            label="Email adresa"
            style="min-height: 100px"
            type="email"
          ></v-text-field>

          <v-text-field
            v-model="password"
            :rules="[rules.password, rules.length(6)]"
            filled
            color="black"
            label="Lozinka"
            style="min-height: 100px"
            type="password"
          ></v-text-field>
      </v-form>
      <v-card-actions>
        <v-btn
          class="link-left"
          text
          x-small
          color="blue"
          to="/passReset"
          >
          Zaboravili ste lozinku?
        </v-btn>

        <v-spacer></v-spacer>

        <v-btn
          :disabled="!form"
          :loading="isLoading"
          class="white--text"
          color="black"
          depressed
          @click="login"
        >
          LogIN!
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
  import {
	  auth,
	  signInWithEmailAndPassword,
  } from "@/firebase";

  export default {
    name: "LoginIN",
    data: () => ({
			passwordIssuesDialog: false,
      agreement: false,
      email: null,
      form: false,
      isLoading: false,
      password: null,
      valid: true,
      showIcon: false,
      rules: {
        email: v => !!(v || '').match(/@/) || 'Please enter a valid email',
        length: len => v => (v || '').length >= len || `Invalid character length, required ${len}`,
        password: v => !!(v || '').match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/) ||
          'Password must contain an upper case letter, a numeric character, and a special character',
        required: v => !!v || 'This field is required',
      },
    }),

    methods: {
      login() {
        let email = this.email;
        signInWithEmailAndPassword(auth, email, this.password)
        .then(() => {
          this.$router.push("/");
        })
        .catch(() => {
          alert("Pogrešna lozinka ili e-mail");
        });
      },

      postActionMoveToView() {
			  this.$router.push({ path: "/" });
		  },
    },
  };

</script>

<style>
.naslov2
  {
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    text-align: center;
    color: white;
    margin-top:120px;
  }
</style>