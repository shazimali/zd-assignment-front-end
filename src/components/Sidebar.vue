<template>
  <v-navigation-drawer v-model="drawer" app>
    <v-img
      height="140"
      class="pa-4"
      src="https://preview.pixlr.com/images/800wm/1439/2/1439104804.jpg"
    >
      <div class="text-center">
        <v-avatar class="mb-4" color="grey darken-1" size="64">
          <v-img
            aspect-ratio="30"
            src="http://img0cf.b8cdn.com/images/logo/73/1755873_logo_1661774997_n.png"
          />
        </v-avatar>
        <h2 class="white--text">{{ user.type }} </h2>
      </div>
    </v-img>
    <v-divider></v-divider>
    <v-list v-if="user.type == 'MANAGER'">
      <v-list-item v-for="[icon, text, route] in manager_links" :key="icon" :to="route">
        <v-list-item-icon>
          <v-icon>{{ icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ text }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-list v-if="user.type == 'WORKER'">
      <v-list-item v-for="[icon, text, route] in worker_links" :key="icon" :to="route">
        <v-list-item-icon>
          <v-icon>{{ icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ text }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: "Sidebar",
  props: ["drawer"],
  data() {
    return {
      manager_links: [
        ["mdi-microsoft-windows", "Dashboard", '/dashboard'],
        ["mdi-account", "Users", '/users'],
        ["mdi-clipboard-list-outline",'Tasks', '/tasks'],
      ],
      worker_links: [
        ["mdi-microsoft-windows", "Dashboard", '/dashboard'],
        ["mdi-clipboard-list-outline",'Tasks', '/tasks'],
      ],
    };
  },
  computed:{
    ...mapGetters(['user'])
  }
};
</script>

<style scoped></style>
