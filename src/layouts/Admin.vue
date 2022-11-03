<template>
  <v-app id="inspire">
    <Header @handleDrawer="drawer = !drawer"/>
    <Sidebar :drawer="drawer"/>
     <v-main style="background: #f5f5f540">
      <v-container class="py-8 px-6" fluid>
        <router-view/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Header from "../components/Header.vue";
import Sidebar from "../components/Sidebar.vue";
  export default {
    data: () => ({
        cards: ["Today", "Yesterday"],
        drawer:true,
    }),
    components: { Header, Sidebar }
}
</script>