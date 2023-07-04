<template>

    <div>
        <div class="naslov2">
            <h1>Reset your password</h1>
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
                    v-model="email"
                    :rules="[rules.email, rules.required]"
                    filled
                    color="black"
                    label="Email address"
                    style="min-height: 100px"
                    type="email"
                ></v-text-field>

                <v-text-field
                    v-model="newPassword"
                    :rules="[rules.password, rules.length(6), rules.required]"
                    filled
                    color="black"
                    label="New password"
                    style="min-height: 100px"
                    type="password"
                ></v-text-field>

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

                <v-card-actions>

                    <v-btn
                        class="white--text"
                        color="black"
                        depressed
                        @click="verifyPIN"
                        style="font-weight: bold;"
                    >
                    Change Password!
                    </v-btn>
                </v-card-actions>
            </v-form>
        </v-card>
    </div>
</template>
    
<script>
import {auth, db, doc, getDoc, updatePassword} from "@/firebase";
    export default {
        name: "passReset",
        data: () => ({   
            email: null,
            form: false,
            newPassword: null,
            pin: null,
            rules: {
                email: v => !!(v || '').match(/@/) || 'Please enter a valid email',
                length: len => v => (v || '').length >= len || `Invalid character length, required ${len}`,
                password: v => !!(v || '').match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/) ||
                'Password must contain an upper case letter, a numeric character, and a special character',
                required: v => !!v || 'This field is required',
            },  
        }),

        methods: {
            async verifyPIN() {

                getDoc(doc(db, 'Users', this.email.toLowerCase())).then(docSnap => {
                    if (docSnap.exists()) {
                        console.log("Document data: ", docSnap.data()["PIN"]);
                        const savedPin = docSnap.data()["PIN"]
                        if (this.pin === savedPin) {
                            this.pinVerified = true;
                            console.log('PIN verified.');
                            updatePassword(auth, this.newPassword);
                            console.log('Data updated successfully.');
                        }
                        else {
                            console.log('Invalid PIN.');
                        }
                    } 
                    else {
                        console.log("No such document!");
                    }
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