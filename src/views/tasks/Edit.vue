
<template>
    <v-container
      class="spacing-playground"
      fluid
    >
      <v-row>
          <v-subheader class="py-0 d-flex justify-space-between rounded-lg">
              <h3>Edit Task</h3>
              <Loader v-if="loading" />
          </v-subheader>
          </v-row>
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
    <img v-if="show_image" :src="show_image" height="50" width="50"/>
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
                <v-btn color="success" class="mt-3" @click="update">Update  </v-btn>
    </v-col>
    </v-row>
</v-container>
    </v-container>
  </template>
  <script>
    import Loader from '../../components/Loader.vue';
    import TasksDataService from '../../services/TasksDataService';

  export default {
    components: { Loader },
      name:"edit",
      data() {
      return {
        workersArray:[],
      loading:false,
      show_image:'',
        task: {
            id:this.$route.params.id,
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
        id: this.task.id,
        title: this.task.title.value,
        user_id: this.task.user_id.value,
        image_path: this.task.image_path.value,
        desc: this.task.desc.value,
        };
        TasksDataService.update(data.id,data)
          .then((response) => {
            this.$store.dispatch('alert','success');
            this.$store.dispatch('alertMessage',response.data);
            this.$router.push('/tasks');
          })
          .catch((e) => {
            if(e.response.status !== 422){
              this.$store.dispatch('alert','error');
              this.$store.dispatch('alertMessage',e.response.data);
            }
            this.task.title.error = e.response.data.errors['title'] ? e.response.data.errors['title']  : ''
            this.task.user_id.error = e.response.data.errors['user_id'] ?  e.response.data.errors['user_id']  : ''
            this.task.image_path.error = e.response.data.errors['image_path'] ? e.response.data.errors['image_path'] : ''
            this.task.desc.error = e.response.data.errors['desc'] ? e.response.data.errors['desc'] : ''
            this.loading = false
          });
      },
      retriveTaskDetails(id){
        this.loading = true;
        TasksDataService.edit(id)
              .then((response) => {
            
              this.task.title.value = response.data.data.title;
              this.task.desc.value = response.data.data.des;
              this.task.user_id.value = response.data.data.user._id;
              this.show_image = response.data.data.image_path
              this.workersArray = response.data.data.workers
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
      this.retriveTaskDetails(this.task.id)
    }
  
  }
  </script>