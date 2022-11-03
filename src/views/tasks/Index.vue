<template>
    <div class="transactions">
      <v-subheader class="py-0 d-flex justify-space-between rounded-lg">
            <h3>Tasks</h3>
            <v-btn v-if="user.type == 'MANAGER'" color="success" to="./tasks/create">
                Create Task
            </v-btn>
        </v-subheader>
          <v-row>
            <v-col col="12">
              <v-form>
                <v-container>
                  <v-row>
                    <v-col col="6">
                    <v-text-field
                    :counter="20"
                    v-model="search_id"
                    label="Please enter task ID"
                    outline
                  >
                  </v-text-field>
                  </v-col>
                  <v-col col="6">
                    <v-btn color="success" class="mt-3" @click="search">Search  </v-btn>
                  </v-col>
                  </v-row>
                </v-container>
              </v-form>
            </v-col>
          </v-row>
          <v-row>
                <v-col cols="12" sm="12">
        <v-card class="mx-auto" tile>
          <v-card-title>Tasks List</v-card-title>
          <v-data-table 
              :headers="user.type == 'MANAGER' ? manager_headers : worker_headers "
              :items="allTasks"
              :items-per-page=5
              :loading="loading"
              :server-items-length="totalTasks"
              @pagination="pagination"
              class="elevation-1"
              :footer-props="{
                  'itemsPerPageOptions': [5,10,15]
              }"
          >
          <template v-slot:item.image="{ item }">
            <img v-bind:src="`${item.image}`" style="width: 50px; height:50px" /> 
        </template>
        <template v-if="user.type == 'MANAGER'"  v-slot:[`item.actions`]="{ item,index }">
            <v-icon small class="mr-2" @click="editTask(item.id)">mdi-pencil</v-icon>
            <v-icon small class="mr-2" @click="deleteTask(item.id,index)">mdi-delete</v-icon>
          </template>
          <template v-slot:[`item.status`]="{ item }">
            <v-col
            cols="12"
            sm="6"
            md="6"
          >
            <v-radio-group
            v-model="item.status"
            @change="updateStatus(item.id,$event)"
            >
              <v-radio
                label="InProgress"
                color="orange"
                value="InProgress"
                
              ></v-radio>
              <v-radio
                label="Completed"
                color="green"
                value="Completed"
              ></v-radio>
            </v-radio-group>
          </v-col>
          </template>
          </v-data-table>
        </v-card>
      </v-col>
          </v-row>
    </div>
  </template>
  
  <script>
  import TasksDataService from "../../services/TasksDataService";
  import { mapGetters } from 'vuex'

  export default {
      name: "transaction",
      data() {
          return {
            search_id: '',
            allTasks:[],
            totalTasks:0,
            loading: false,
              manager_headers: [
                  { text: "id", align: "start",value: "id" },
                  { text: "title", value: "title"},
                  { text: "Image", value: "image"},
                  { text: "Assigned User", value: "assigned_user"},
                  { text: "Status", value: "status"},
                  { text: "Created At", value: "created_at"},
                  { text: "Actions", value: "actions"},
              ],
              worker_headers: [
                  { text: "id", align: "start",value: "id" },
                  { text: "title", value: "title"},
                  { text: "Image", value: "image"},
                  { text: "Assigned User", value: "assigned_user"},
                  { text: "Status", value: "status"},
                  { text: "Created At", value: "created_at"},
              ]
          }
      },
      methods : {
          retriveTasks($event){
            TasksDataService.getAll($event.page,$event.itemsPerPage,this.user._id,this.user.type,this.search_id)
              .then((response) => {
              this.allTasks = response.data.data.map(this.getDisplayTasks);
              this.totalTasks = response.data.meta.total;
              this.loading=false;
              })
              .catch((e) => {
                this.$store.dispatch('alert','error');
                  this.$store.dispatch('alertMessage',e);
                  this.loading = false;
              });
          },
          pagination($event) {
              this.loading=true;
              this.retriveTasks($event);
          },
          getDisplayTasks(task) {
            return {
                id: task.id,
                title: task.title,
                image: task.image_path ? task.image_path : '',
                assigned_user: task.user,
                status: task.status,
                created_at: task.created_at,
            };
          },
          editTask(id){
          this.$router.push('/tasks/edit/'+id)
          },
          deleteTask(id,index){
            if(confirm("Do you really want to delete?")){
              this.loading = true;
              TasksDataService.delete(id)
              .then((response) => {
                if(response.status == 200){
                  this.$store.dispatch('alert','success');
                  this.$store.dispatch('alertMessage',response.data);
                  this.allTasks.splice(index, 1);
                }else{
                  this.$store.dispatch('alert','error');
                  this.$store.dispatch('alertMessage',response.data);
                }
                this.loading = false
                this.$router.push('/tasks')
              })
              .catch((e) => {
                this.$store.dispatch('alert','error');
                this.$store.dispatch('alertMessage',e);
                this.loading = false
              });
              
            }
          },
          updateStatus(id,status){
            if(confirm("Do you really want to change this task status?")){
              this.loading = true;
              var data = {status:status};
              TasksDataService.updateStatus(id,data)
              .then((response) => {
                if(response.status == 200){
                  this.$store.dispatch('alert','success');
                  this.$store.dispatch('alertMessage',response.data);
                }else{
                  this.$store.dispatch('alert','error');
                  this.$store.dispatch('alertMessage',response.data);
                }
                this.loading = false
              })
              .catch((e) => {
                this.$store.dispatch('alert','error');
                this.$store.dispatch('alertMessage',e);
                this.loading = false
              });
              
            }
          },
          search(){
            this.loading = true;
            TasksDataService.getAll(1,5,this.user._id,this.user.type,this.search_id)
              .then((response) => {
              this.allTasks = response.data.data.map(this.getDisplayTasks);
              this.totalTasks = response.data.meta.total;
              this.loading=false;
              })
              .catch((e) => {
                this.$store.dispatch('alert','error');
                this.$store.dispatch('alertMessage',e);
                this.loading = false;

              });
          }
      },
      computed:{
        ...mapGetters(['user'])
      }
  }
  </script>