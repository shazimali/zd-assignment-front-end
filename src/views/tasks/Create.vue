
<template>
  
    <v-container
      class="spacing-playground"
      fluid
    >
        <v-row>
            <v-subheader class="py-0 d-flex justify-space-between rounded-lg">
                <h3>Create Task</h3>
                <Loader v-if="loading" />
            </v-subheader>
              <v-col  cols="12" sm="12" >
                  <v-card class="max-auto">
            <v-form>
            <v-container>
        
                <v-row>
                <v-col
                    cols="12"
                >
                    <v-text-field
                    v-model="task.title.value"
                    :counter="20"
                    :error-messages="task.title.error"
                    label="Title"
                    outline
                    ></v-text-field>
                </v-col>
                <v-col
                    cols="6"
                >
                <v-file-input
                    v-model="task.image_path.value"
                    :error-messages="task.image_path.error"
                    label="Image"
                    outline
                >

                </v-file-input>
                </v-col>
                <v-col  
                cols="6"
                >
                    <v-select
                    v-model="task.user_id.value"
                    :error-messages="task.user_id.error"
                    :items="workersArray"
                    label="Assigned User"
                    item-text="name"
                    item-value="id"
                    outline
                ></v-select>
                </v-col>
                <v-col
                cols="12"
            >
                <v-textarea
                name="input-7-1"
                label="Description"
                v-model="task.desc.value"
                :error-messages="task.desc.error"
                ></v-textarea>
            </v-col>
                <v-col>
                            <v-btn color="success" class="mt-3" @click="save">save  </v-btn>
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
import Loader from '../../components/Loader.vue';
import TasksDataService from '../../services/TasksDataService';
  export default {
      components: { Loader },
      name:"create",
      data() {
      return {
        workersArray:[],
      loading:false,
        task: {
          title: {
            value:"",
            error:""
          },
          desc: {
            value:"",
            error:""
          },
          image_path: {
            value:"",
            error:""
          },
          user_id:{
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
          title: this.task.title.value,
          user_id: this.task.user_id.value,
          image_path: this.task.image_path.value,
          desc: this.task.desc.value,
        };
        TasksDataService.store(data)
          .then((response) => {
            this.$store.dispatch('alert','success');
            this.$store.dispatch('alertMessage',response.data);
            this.loading = false
            this.$router.push('/tasks');
          })
          .catch((e) => {
            if(e.response.status !== 422){
              this.$store.dispatch('alert','error');
              this.$store.dispatch('alertMessage',e.response.data);
            }
            this.task.title.error = e.response.data.errors['title'] ? e.response.data.errors['title']  : ''
            this.task.image_path.error = e.response.data.errors['image_path'] ?  e.response.data.errors['image_path']  : ''
            this.task.user_id.error = e.response.data.errors['user_id']  ? e.response.data.errors['user_id'] : ''
            this.loading = false
          });
      },
      getWorkersList(){
        this.loading = true
        TasksDataService.getAllWorkers()
          .then((response) => {
            this.workersArray = response.data.data
            this.loading = false
          })
          .catch((e) => {
              this.$store.dispatch('alert','error');
              this.$store.dispatch('alertMessage',e);
            this.loading = false
          });
      }
    },
    mounted() {
        this.getWorkersList();
      }
  
  }
  </script>