<template>
  <nav>
    <div class="grid-container">
      <div class="grid-item1">
        <v-app-bar-nav-icon
          @click.stop="drawer = !drawer"
          style="color: white"
        ></v-app-bar-nav-icon>

        <v-navigation-drawer
          v-model="drawer"
          absolute
          temporary
          style="background-color: green"
        >
          <v-list style="padding: 10px">
            <v-list-item-group
              v-model="group"
              active-class="deep-purple--text text--accent-4"
            >
              <v-list-item to="/" class="btn_style"> Home </v-list-item>

              <v-list-item to="/AboutUs" class="btn_style">
                About us
              </v-list-item>

              <v-list-item to="/KreirajLigu" class="btn_style">
                Kreiraj ligu
              </v-list-item>

              <v-list-item to="/KreirajKlub" class="btn_style">
                Kreiraj klub
              </v-list-item>

              <v-list-item to="/KreirajUtakmicu" class="btn_style">
                Kreiraj utakmicu
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-navigation-drawer>
      </div>
      <div class="grid-item2" style="text-align: right">
        <v-btn
          v-show="!isAuthenticated"
          class="btn_style"
          elevation="2"
          to="/Login"
        >
          LogIn
        </v-btn>
        <a v-show="!isAuthenticated"> | </a>
        <v-btn
          v-show="!isAuthenticated"
          class="btn_style"
          elevation="2"
          to="/Signup"
        >
          SignUp
        </v-btn>
        <p v-show="isAuthenticated">
          {{ mail }} |
          <v-btn href="#" @click.prevent="signOut()" class="btn_style"
            >LogOut</v-btn
          >
        </p>
      </div>
    </div>
    <router-view></router-view>
  </nav>
</template>

<script>
import {db , auth, getAuth,getDoc, onAuthStateChanged, signOut,doc} from "@/firebase";

  export default {
    data: () => ({
      drawer: false,
      group: null,
      isAuthenticated: false,
			isAuthorized: false,
      mail: 'User not loged in!'
    }),

    watch: {
      group () {
        this.drawer = false;
      },
    },

     mounted() {
      onAuthStateChanged(auth, (user) => {
			if (user) {
        getDoc(doc(db, "Users", user.email)).then(docSnap => {
          if (docSnap.exists()) {
            console.log("Document data: ", docSnap.data()["Email"]);
            this.mail = docSnap.data()["Email"]
          } else {
            console.log("No such document!");
          }
        })
        this.mail = auth.currentUser.email;
			} else {
				this.email = "User in not loged in"
			}
		});
      this.getDocuments()
    },

    methods: {
      signOut() {
			  const auth = getAuth();
			  signOut(auth)
				.then(() => {
					console.log("signed out");
          this.$router.push({ path: "/Login" });
				})
				.catch((error) => {
					console.error(error);
				});
    },

    getDocuments(auth) {
      console.log(auth);
    }

  },
    beforeCreate() {
		onAuthStateChanged(auth, (user) => {
			if (user) {
        console.log(user);
				console.log("Prijavljen");
				this.isAuthenticated = true;
			} else {
				console.log("Nema prijave");
				this.isAuthenticated = false;
			}
		});
	},
  };
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  color: #2c3e50;
}

a {
  font-weight: bold;
  color: white;

  &.router-link-exact-active {
    color: rgb(159, 255, 140);
  }
}

.grid-container {
  display: grid;
  grid-template-columns: auto auto;
  padding: 20px;
  background-color: rgb(7, 45, 7);
}

.grid-item1 {
  font-size: 30px;
}

.grid-item2 {
  font-size: 30px;
}

.btn_style {
  background-color: green !important;
  color: white !important;
  font-weight: bold;
}
</style>
