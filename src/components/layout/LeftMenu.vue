<template>
  <section>
    <v-app-bar clipped-left color="#1D62A1" density="compact" class="text-white">
      <v-app-bar-nav-icon @click.stop="drawerRight = !drawerRight"></v-app-bar-nav-icon>

      <v-toolbar-title>ADMINISTRATOR EPI</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-navigation-drawer v-model="drawerRight" app clipped left>
      
      
          <v-list-item class="text-h6" title="Aplicacion"/>
          <v-list-item title="Subtitulo"/>

      

      <v-divider></v-divider>
      <v-list density="compact" nav v-for="(menu, i) in $store.state.pages" :key="`mnpr_${i}`">
        <v-list-subheader>{{ menu.name_module }}</v-list-subheader>
        
        <v-list-item
          v-for="(m, index) in menu.children"
          :title="m.name_module"
          :value="m.name_module"          
          :to="`${menu.path_browser}/${m.path_browser}`"
          :key="`sbmnpr_${index}`"
        ></v-list-item>
      </v-list>
      <template v-slot:append>
        <div class="pa-2">
          <v-btn color="#1D62A1" @click="out()" block class="text-white">Salir</v-btn>
        </div>
      </template>
    </v-navigation-drawer>
  </section>
</template>

<script>
//import { clearDataStore } from "@/config/localStore";
export default {
  name: "LeftMenu",
  props: {
    source: String,
  },
  data: () => ({
    drawer: null,
    drawerRight: null,
    right: false,
    left: false,
    menu: [{ title: "opcion 001", url: "/#", icon: "mdi-home" }],
  }),
  methods: {
    out() {
      //clearDataStore();
      this.$router.push({ name: "Login" });
    },
  },
};
</script>

<style></style>
