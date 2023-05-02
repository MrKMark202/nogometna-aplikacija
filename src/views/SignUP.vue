<template>

    <div>
        <div class="naslov1">
            <h1>SignUp</h1>
        </div>

    <v-card
      class="mx-auto"
      style="max-width: 500px; margin-top: 80px; margin-left: 14%; padding: 30px;"
    >

    <v-tittle> Imaš li već račun? <v-btn style="margin-left:10px;"> <router-link to="/LogIn" style="color:black; text-decoration: none;"> Prijavi se! </router-link></v-btn> </v-tittle>

      <v-form
        ref="form"
        v-model="form"
        style="margin-top: 20px;"
      >

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

        <v-container grid-list-md>
        <v-layout row wrap>
      <v-flex xs12 lg6>
        <v-menu
          ref="menu1"
          v-model="menu1"
          :close-on-content-click="false"
          :nudge-right="40"
          lazy
          transition="scale-transition"
          offset-y
          full-width
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="dateFormatted"
              label="Date"
              hint="MM/DD/YYYY format"
              persistent-hint
              @blur="date = parseDate(dateFormatted)"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="date" no-title @input="menu1 = false"></v-date-picker>
        </v-menu>
      </v-flex>
    </v-layout>
</v-container>

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
          :disabled="!form"
          :loading="isLoading"
          class="white--text"
          color="black"
          depressed
        >
          SignUP!
        </v-btn>
      </v-card-actions>
        </v-card>
    </div>
  </template>


<script>
  export default {
    data: () => ({
      agreement: false,
      email: undefined,
      form: false,
      isLoading: false,
      password: undefined,
      rules: {
        email: v => !!(v || '').match(/@/) || 'Please enter a valid email',
        length: len => v => (v || '').length >= len || `Invalid character length, required ${len}`,
        password: v => !!(v || '').match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/) ||
          'Password must contain an upper case letter, a numeric character, and a special character',
        required: v => !!v || 'This field is required',
      },
    }),
  }
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