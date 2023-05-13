<template>

<div>
    <div class="naslov2">
        <h1>LogIn</h1>
    </div>

<v-card
  class="mx-auto"
  style="max-width: 500px; margin-top: 80px; margin-left: auto; margin-right:auto; padding: 30px;"
>

<v-card-title> Još nisi napravio račun? <v-btn style="margin-left:10px;"> <router-link to="/SignUP" style="color:black; text-decoration: none;"> Registriraj se! </router-link></v-btn> </v-card-title>

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
      label="Email address"
      style="min-height: 100px"
      type="email"
    ></v-text-field>

    <v-text-field
      v-model="password"
      :rules="[rules.password, rules.length(6)]"
      filled
      color="black"
      label="Password"
      style="min-height: 100px"
      type="password"
    ></v-text-field>

  </v-form>
  <v-card-actions>

    <v-btn
			@click="openDialog"
			class="link-left"
			text
			x-small
			color="blue">
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

    <v-dialog
					width="300px"
					outlined
					persistent
					v-model="passwordIssuesDialog">
					<v-card class="card-border">
						<v-card-title>E-mail</v-card-title>
						<v-card-subtitle>
							Please enter you e-mail
						</v-card-subtitle>
						<v-card-text>
							<v-text-field
								v-model="emailForPassword"
								dense
								label="Email"
								clearble
								type="text"
								:rules="[rules.required, rules.email]"
								outlined></v-text-field>
						</v-card-text>
						<v-card-actions class="card-actions">
							<v-btn
								class="btn-right-margin"
								color="red darken-3"
								outlined
								text
								small
								@click="closeDialog">
								CLOSE
							</v-btn>
							<v-btn
								outlined
								text
								@click="resetPassword(emailForPassword)">
								SEND
							</v-btn>
						</v-card-actions>
					</v-card>
				</v-dialog>
</div>
</template>

<script>
  import {
	  auth,
    sendPasswordResetEmail,
	  signInWithEmailAndPassword,
  } from "@/firebase";

  export default {
    name: "LoginIN",
    data: () => ({
      emailForPassword: null,
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
        .catch((error) => {
          alert(error.message);
        });
      },

      resetPassword(email) {
			sendPasswordResetEmail(auth, email)
				.then(() => {
					console.log("Email je poslan");
				})
				.catch((error) => {
					const errorCode = error.code;
					const errorMessage = error.message;
				});
			this.closeDialog();
		},

      postActionMoveToView() {
			  this.$router.push({ path: "/" });
		  },
		  closeDialog() {
			  this.passwordIssuesDialog = false;
		  },
		  openDialog() {
			  this.passwordIssuesDialog = true;
		  },

    },

    created() {},
	  mounted() {},
	  destroyed() {},

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