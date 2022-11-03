<template>
  <div>
  <v-app id="inspire">
    <v-container>
      <v-layout wrap>
        <v-flex sm12 md6 offset-md3>
          <v-card elevation="4" light tag="section">
            <v-card-title>
              <v-layout align-center justify-space-between>
                <h3 class="headline">
                  Login
                </h3>
                <!-- <v-flex>
                  <v-img class="ml-3" contain height="48px" position="center right" src="https://www.mobygames.com/images/i/12/25/1435075.png"></v-img>
                </v-flex> -->
              </v-layout>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <p>Sign in with your username and password:</p>
              <v-form>
                <v-text-field
                              outline
                              label="email"
                              type="text"
                              aria-required="true"
                              v-model="data.email"></v-text-field>
                <v-text-field
                              outline
                              hide-details
                              label="Password"
                              type="password"
                              v-model="data.password"></v-text-field>
              </v-form>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <!-- <v-btn color="info">
                Forgot password?
              </v-btn> -->
              <v-spacer></v-spacer>
              <v-btn color="info" @click="submit">
                Login
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
        <!-- <v-flex sm12 md6 offset-md3>
          <v-layout align-center justify-space-between>
            <p class="caption my-3">
              <a href="#">Privacy Policy</a>
              |
              <a href="#">Terms of Service</a>
            </p>
            <p class="caption my-3">Powered by <a href="#">StaffCircle</a></p>
          </v-layout>
        </v-flex> -->
      </v-layout>
    </v-container>
  </v-app>
</div>
</template>

<script>
import axios from 'axios';
import AuthDataService from '../services/AuthDataService';
export default {
    name:"Login",
    data(){
        return{
            is_error: false,
            message:null,
            data: {
                email:'',
                password:''
            }
        }
    },

    methods: {
        submit(){
            delete axios.defaults.headers.common["Authorization"];
            AuthDataService.login(this.data).then((res) =>{          
            localStorage.setItem( 'token', res.data.token);
            localStorage.setItem( 'type', res.data.user.type);
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.token;
            this.$store.dispatch('user',res.data.user);
            this.$router.push('/dashboard');
            }).catch((e) => {
                this.$store.dispatch('alert','error');
                if(e.response.data.errors){
                  this.$store.dispatch('alertMessage',e.response.data.errors);
                }else{
                  this.$store.dispatch('alertMessage',e.response.data.message);
                }
            });
        }
    },
    mounted(){
            this.$store.dispatch('alert',null);
            this.$store.dispatch('alertMessage',null);
        }
}
</script>

<style>
.v-btn,
.v-card{
  border-radius: 4px;
}
.v-card__title{
    text-transform:uppercase;
}
</style>