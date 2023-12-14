<template>
  <div>
    <v-navigation-drawer v-model="drawerRight" app clipped width="100" color="#fff">
      <v-list-item>
        <div id="logoasuss">
          <img src="/img/logo.png" alt="Epidemiologia SSCP" class="mt-5"/>
        </div>
      </v-list-item>
      <br>

      <v-list dense nav>
        <v-menu rounded="lg" bottom right offset-x origin="top left" transition="scale-transition"
          v-for="(menu, title) in menuOps" :key="`item-${title}`">
          <template v-slot:activator="{ on, attrs }">
            <v-tooltip right>
              <template v-slot:activator="{ on: tooltip }">
                <v-btn class="mt-1" width="90" height="50" text v-bind="attrs" v-on="{ ...tooltip, ...on }"
                  @click="() => { if (!Array.isArray(menu)) $router.push(menu.value).catch(() => { }); }">
                  <v-img max-width="45"
                    :src='"/img/iconos/" + title.replaceAll(" ", "").toLowerCase().replaceAll("_", "") + ".png"'></v-img>
                </v-btn>
              </template>
              <span>{{ title }}</span>
            </v-tooltip>
          </template>
          <v-list dense class="text-sm-left ma-2" light nav v-if="Array.isArray(menu)" color="#E8EAF6">
            <v-subheader class="font-weight-black" style="color: black">{{ title }}</v-subheader>
            <v-list-item-group color="red">
              <v-row dense>
                <v-col cols="12" xs="12" sm="6" md="3" lg="4" xl="4" v-for="(item, index) in menu"
                  :key="`Subitem-${index}`">
                  <v-list-item :key="item.text" :to="{ path: item.value, query: { t: new Date().getTime() } }">
                    <v-list-item-content >
                      <v-list-item-title>{{ item.text }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-col>
              </v-row>
            </v-list-item-group>
          </v-list>
        </v-menu>

      </v-list>

    </v-navigation-drawer>

    <v-app-bar app clipped-left color="#1D62A1" dark>
      <v-btn width="90" height="60" @click.stop="drawerRight = !drawerRight" color="#1D62A1" class="mr-2">
        <v-icon x-large>mdi-menu</v-icon>
      </v-btn>
      <v-toolbar-title class="text">Menu</v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- menu del usuario lado derecho -->
      <div class="d-flex pa-2">
        <div>
          <v-toolbar-title class="text mt-4 mr-3">{{ sigla }}</v-toolbar-title>
          
        </div>
        <v-menu rounded="LG" bottom left offset-y origin="top right" transition="scale-transition">
          <template v-slot:activator="{ on, attrs }">
            <v-tooltip left>
              <template v-slot:activator="{ on: tooltip }">
                <v-btn width="90" height="60" v-bind="attrs" v-on="{ ...tooltip, ...on }" color="#1D62A1">
                  <v-icon x-large>mdi-account</v-icon>
                </v-btn>
              </template>
              <span>INFORMACION</span>
            </v-tooltip>
          </template>

          <v-list color="#E8EAF6" class="ma-2 pa-3 text-center">
            <v-toolbar-title class="text mt-3 mr-3" v-text="$route.name"></v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn to="/ssepi/lgnUser" class="mt-2" color="#1D62A1" dark>Cambiar Contraseña</v-btn>
            <v-spacer></v-spacer>
            <v-btn to="/" class="mt-2" color="#1D62A1" dark>Salir</v-btn>
          </v-list>
        </v-menu>
      </div>

    </v-app-bar>
  </div>
</template>

<script>

// Components
import { VHover, VListItem } from "vuetify/lib";

import * as srv from "@/services/ssepi/mOpsService";
//import { isNavigationFailure, NavigationFailureType } from 'vue-router/src/util/errors';
//{ isNavigationFailure, NavigationFailureType }

import VueRouter from "vue-router";
const { isNavigationFailure, NavigationFailureType } = VueRouter;



export default {
  name: "DashboardCoreAppBar",
  components: {
    AppBarItem: {
      render(h) {
        return h(VHover, {
          scopedSlots: {
            default: ({ hover }) => {
              return h(
                VListItem,
                {
                  attrs: this.$attrs,
                  class: {
                    "red--text": !hover,
                    "blue--text secondary elevation-8": hover,
                  },
                  props: {
                    activeClass: "",
                    dark: hover,
                    link: true,
                    ...this.$attrs,
                  },
                },
                this.$slots.default
              );
            },
          },
        });
      },
    },
  },

  data: () => ({
    selectedItem: [],
    drawerRight: null,
    sigla: "ASUSS",
    menuOps: [],
    menus: {
      georeferencia: [
        { title: "Todos", to: "/ssepi/sssscp/all" },
        { title: "op1", to: "/ssepi/sssscp/la paz" },
        { title: "op2", to: "/ssepi/sssscp/santa cruz" },
        { title: "op3", to: "/ssepi/sssscp/oruro" },
        { title: "op4", to: "/ssepi/sssscp/potosi" },
        { title: "op4", to: "/ssepi/sssscp/cochabamba" },
        { title: "op6", to: "/ssepi/sssscp/beni" },
        { title: "op7", to: "/ssepi/sssscp/pando" },
        { title: "op8", to: "/ssepi/sssscp/chuquisaca" },
        { title: "op9", to: "/ssepi/sssscp/tarija" },
      ],
      Reportes: [
        { title: "Todos", to: "/" },
        { title: "op1", to: "/" },
        { title: "op2", to: "/" },
        { title: "op3", to: "/" },
        { title: "op4", to: "/" },
        { title: "op4", to: "/" },
        { title: "op6", to: "/" },
        { title: "op7", to: "/" },
        { title: "op8", to: "/" },
        { title: "op9", to: "/" },
      ],
      ["sala situacional"]: [
        { title: "Todos", to: "/" },
        { title: "op1", to: "/" },
        { title: "op2", to: "/" },
        { title: "op3", to: "/" },
        { title: "op4", to: "/" },
        { title: "op4", to: "/" },
        { title: "op6", to: "/" },
        { title: "op7", to: "/" },
        { title: "op8", to: "/" },
        { title: "op9", to: "/" },
      ],
      infraestructura: [
        { title: "Todos", to: "/" },
        { title: "op1", to: "/" },
        { title: "op2", to: "/" },
        { title: "op3", to: "/" },
        { title: "op4", to: "/" },
        { title: "op4", to: "/" },
        { title: "op6", to: "/" },
        { title: "op7", to: "/" },
        { title: "op8", to: "/" },
        { title: "op9", to: "/" },
      ],
      ["vigilancia epidemiologica"]: [
        { title: "Todos", to: "/" },
        { title: "op1", to: "/" },
        { title: "op2", to: "/" },
        { title: "op3", to: "/" },
        { title: "op4", to: "/" },
        { title: "op4", to: "/" },
        { title: "op6", to: "/" },
        { title: "op7", to: "/" },
        { title: "op8", to: "/" },
        { title: "op9", to: "/" },
      ],
    },
    transitionName: 'slide-left'
  }),

  methods: {
    async href(obj) {
      await this.$router.push(obj.value).catch(failure => {

        if (isNavigationFailure(failure)) {
          // ...
        }
        // Only duplicated navigations
        if (isNavigationFailure(failure, NavigationFailureType.duplicated)) {
          // ...
          console.log("mallllllllllll", failure)
        }
        // Aborted or canceled navigations
        if (isNavigationFailure(failure, NavigationFailureType.aborted | NavigationFailureType.canceled)) {
          // ...
        }
      })

      //return undefined;
    },
    async getMops() {
      const result = await srv.getMenuGeoRef();
      this.menuOps = result.data;
      this.sigla = result.moredata.institucion;
    },

  },

  mounted() {
    this.getMops();
  },

  beforeRouteUpdate(to, from, next) {
    const toDepth = to.path.split('/').length
    const fromDepth = from.path.split('/').length
    //this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
    console.log("##########Before", toDepth)
    next()
  },
  watch: {

    '$route'(to, from) {
      const toDepth = to.path.split('/').length
      const fromDepth = from.path.split('/').length
      this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'

    }
  }

};
</script>
<style scoped lang="css">
button{
  background:#fff;
  border:none;
  position:relative;
  height:60px;
  font-size:1.6em;
  padding:0 2em;
  cursor:pointer;
  transition:800ms ease all;
  outline:none;
}
button:hover{
  background:#1D62A1;
  color:rgb(255, 255, 255);  /* color text */
}
button:before,button:after{
  content:'';
  position:absolute;
  top:0;
  right:0;
  height:3px;
  width:0;
  background: #ffffff;  /* barra */
  transition:400ms ease all;
}
button:after{
  right:inherit;
  top:inherit;
  left:0;
  bottom:0;
}
button:hover:before,button:hover:after{
  width:100%;
  transition:800ms ease all;
}
#logoasuss{
  width:100%;
  text-align: center;
}
</style>