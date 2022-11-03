
<template>
  <v-container
    class="spacing-playground"
    fluid
  >
    <v-row>
        <v-subheader class="py-0 d-flex justify-space-between rounded-lg">
            <h3>Edit User</h3>
            <Loader v-if="loading" />
        </v-subheader>
            <v-col  cols="12" sm="12" >
                <v-card class="max-auto">
                    <v-form>
    <v-container>

      <v-row>
        <v-col
          cols="4"
      
        >
          <v-text-field
            v-model="user.name.value"
            :error-messages="user.name.error"
            label="Name"
          ></v-text-field>
        </v-col>
        <v-col
          cols="4"
   
        >
          <v-text-field
            v-model="user.email.value"
            :error-messages="user.email.error"
            disabled    
            label="E-mail"
          ></v-text-field>
        </v-col>
        <v-col
          cols="4"
        >
          <v-select
            v-model="user.type.value"
            :error-messages="user.type.error"
            :items="types"
            label="Type"
            outline
          ></v-select>
        </v-col>
       <v-col
          cols="6"
        >
          <v-text-field
            v-model="user.password.value"
            label="Password"
            hint="please enter password for new password"
            type="password"
            :error-messages="user.password.error"
          ></v-text-field>
        </v-col>
        <v-col
          cols="6"
        >
          <v-text-field
            v-model="user.password_confirmation.value"
            label="Confirm Password"
            type="password"
            :error-messages="user.password_confirmation.error"
            outline
          ></v-text-field>
          </v-col>
        <v-col>
                    <v-btn color="success" class="mt-3" @click="save">Update</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
                </v-card>
            </v-col>
        </v-row>
  </v-container>
</template>
<script>
import UserDataService from '../../services/UserDataService';
import Loader from '../../components/Loader.vue';
export default {
  components: { Loader },
    name:"edit",
    data() {
    return {
      loading:false,
      types:['MANAGER','WORKER'],
      user: {
          id:this.$route.params.id,
        name: {
          value:"",
          error:""
        },
        email: {
          value:"",
          error:""
        },
        type: {
          value:"",
          error:""
        },
        password:{
          value:"",
          error:""
        },
        password_confirmation:{
          value:"",
          error:""
        }
        
      },
    };
  },
    methods: {
    save() {
      this.loading = true;
      var data = {
        id: this.user.id,
        name: this.user.name.value,
        email: this.user.email.value,
        type: this.user.type.value,
        password:this.user.password.value,
        password_confirmation:this.user.password_confirmation.value,
      };
      UserDataService.update(this.user.id,data)
        .then((response) => {
          this.$store.dispatch('alert','success');
          this.$store.dispatch('alertMessage',response.data);
          this.$router.push('/users');
        })
        .catch((e) => {
          if(e.response.status !== 422){
            this.$store.dispatch('alert','error');
            this.$store.dispatch('alertMessage',e.response.data);
          }
          this.user.name.error = e.response.data.errors['name'] ? e.response.data.errors['name']  : ''
          this.user.email.error = e.response.data.errors['email'] ?  e.response.data.errors['email']  : ''
          this.user.type.error = e.response.data.errors['type'] ? e.response.data.errors['type'] : ''
          this.user.password.error = e.response.data.errors['password']  ? e.response.data.errors['password'] : ''
          this.loading = false
        });
    },
    retriveUserDetails(id){
      this.loading = true;
      UserDataService.edit(id)
            .then((response) => {
            this.user.name.value = response.data.data.name;
            this.user.email.value = response.data.data.email;
            this.user.type.value = response.data.data.type;
            this.loading=false;
            
            })
            .catch((e) => {
              this.$store.dispatch('alert','error');
              this.$store.dispatch('alertMessage',e);
              this.loading=false;
            });
    },
  },
  ready: function(id) {
    this.user.id = id;
},
  mounted(){
    this.retriveUserDetails(this.user.id)
  }

}
</script>