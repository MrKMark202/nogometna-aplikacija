<template>

    <div>
        <div class="naslov2">
            <h1>Resetirajte svoju lozinku!</h1>
        </div>

        <v-card
            class="mx-auto"
            style="max-width: 500px; margin-top: 80px; margin-left: auto; margin-right:auto; padding: 30px;"
        >

            <v-form
                ref="form"
                v-model="form"
                style="margin-top: 20px;"
            >
                <v-text-field
                    v-model="emailForPassword"
                    :rules="[rules.email, rules.required]"
                    filled
                    color="black"
                    label="Email adresa"
                    style="min-height: 100px"
                    type="email"
                ></v-text-field>

                <v-card-actions class="card-actions">
					<v-btn
                        class="butot"
                        style="color:white;"
						outlined
						text
						@click="resetPassword(emailForPassword)"
                    >
					    Pošalji zahtjev!
					</v-btn>
				</v-card-actions>
            </v-form>
        </v-card>
    </div>
</template>
    
<script>
import {auth, sendPasswordResetEmail} from "@/firebase";

    export default {
        name: "passReset",
        data: () => ({   
            email: null,
            form: false,
            newPassword: null,
            emailForPassword: null,
			passwordIssuesDialog: false,
            rules: {
                email: v => !!(v || '').match(/@/) || 'Please enter a valid email',
                required: v => !!v || 'This field is required',
            },  
        }),

        methods: {
            resetPassword(email) {
			    sendPasswordResetEmail(auth, email)
				.then(() => {
					alert("Email sent");
                    window.location.href="/";
				})
				.catch((error) => {
                    alert("Došlo je do pogreške!", error);
				});
            
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