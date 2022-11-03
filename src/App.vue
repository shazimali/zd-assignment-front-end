<template>
  <v-app id="inspire">
    <Header v-if="user" @handleDrawer="drawer = !drawer"/>
    <Sidebar v-if="user" :drawer="drawer"/>
     <v-main style="background: #f5f5f540">
      <v-container class="py-8 px-6" fluid>
        <v-alert 
        v-if="alert" 
        close-text="Close Alert" 
        dense 
        shaped 
        :type="alert == 'success'? 'success':'error'" 
        dismissible
        @input="onclose"
        >
        {{ alertMessage }}
        </v-alert>
        <router-view/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Header from "../src/components/Header.vue";
import Sidebar from "../src/components/Sidebar.vue";
import { mapGetters } from "vuex";
export default {
    data: () => ({
        cards: ["Today", "Yesterday"],
        drawer:true,
        myAlertModel: true,
    }),
    components: { Header, Sidebar },
    computed:{
      ...mapGetters(['user','alertMessage','alert'])
    },
    methods:{
      onclose() {
        this.$store.dispatch('alert',null);
        this.$store.dispatch('alertMessage',null);
      }
    }
}
</script>