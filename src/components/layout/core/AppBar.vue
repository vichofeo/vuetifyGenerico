<template>
  <v-app-bar id="app-bar" absolute app color="#6A76AB" flat height="50" dark>
  
  
    <v-toolbar-title class="hidden-sm-and-down font-weight-light" v-text="$route.name" />
  
  
   <div class="mx-3" />{{sigla}}   
    <v-menu bottom left offset-y origin="top right" transition="scale-transition" v-for="(menu, title) in menuOps" :key="`item-${title}`">
      <template v-slot:activator="{ attrs, on }">
        <v-btn class="ml-2" min-width="0" text v-bind="attrs" v-on="on"
        @click="()=>{if(!Array.isArray(menu)) $router.push(menu.value).catch(()=>{}); }"
        >
          {{title}} 
        </v-btn>
      </template>
      <v-list :tile="false" nav v-if="Array.isArray(menu)">
        <v-row dense>
          <v-col cols="12" xs="12" sm="6" md="3" lg="4" xl="4" v-for="(opts, i) in menu" 
          :key="`Subitem-${i}`">
            <app-bar-item :to="opts.value">
              {{ opts.text }}
            </app-bar-item>
          </v-col>
        </v-row>
      </v-list>
    </v-menu>
    <v-spacer></v-spacer>
    <v-btn class="ml-2" min-width="0" text to="/">
      <v-icon>mdi-account</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
// Components
import { VHover, VListItem } from "vuetify/lib";

import * as srv from '@/services/ssepi/mOpsService'
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
    sigla: "ASUSS",
    menuOps:[],
    menus:{
      georeferencia :  [
      { title: "Todos", to: '/ssepi/sssscp/all' },
      { title: "op1", to: '/ssepi/sssscp/la paz' },
      { title: "op2", to: '/ssepi/sssscp/santa cruz' },
      { title: "op3", to: '/ssepi/sssscp/oruro' },
      { title: "op4", to: '/ssepi/sssscp/potosi' },
      { title: "op4", to: '/ssepi/sssscp/cochabamba' },
      { title: "op6", to: '/ssepi/sssscp/beni' },
      { title: "op7", to: '/ssepi/sssscp/pando' },
      { title: "op8", to: '/ssepi/sssscp/chuquisaca' },
      { title: "op9", to: '/ssepi/sssscp/tarija' }
    ],
    Reportes:  [
      { title: "Todos", to: '/' },
      { title: "op1", to: '/' },
      { title: "op2", to: '/' },
      { title: "op3", to: '/' },
      { title: "op4", to: '/' },
      { title: "op4", to: '/' },
      { title: "op6", to: '/' },
      { title: "op7", to: '/' },
      { title: "op8", to: '/' },
      { title: "op9", to: '/' }
    ],
    ['sala situacional']: [
      { title: "Todos", to: '/' },
      { title: "op1", to: '/' },
      { title: "op2", to: '/' },
      { title: "op3", to: '/' },
      { title: "op4", to: '/' },
      { title: "op4", to: '/' },
      { title: "op6", to: '/' },
      { title: "op7", to: '/' },
      { title: "op8", to: '/' },
      { title: "op9", to: '/' }
    ],
    infraestructura:  [
      { title: "Todos", to: '/' },
      { title: "op1", to: '/' },
      { title: "op2", to: '/' },
      { title: "op3", to: '/' },
      { title: "op4", to: '/' },
      { title: "op4", to: '/' },
      { title: "op6", to: '/' },
      { title: "op7", to: '/' },
      { title: "op8", to: '/' },
      { title: "op9", to: '/' }
    ],
    ['vigilancia epidemiologica']: [
      { title: "Todos", to: '/' },
      { title: "op1", to: '/' },
      { title: "op2", to: '/' },
      { title: "op3", to: '/' },
      { title: "op4", to: '/' },
      { title: "op4", to: '/' },
      { title: "op6", to: '/' },
      { title: "op7", to: '/' },
      { title: "op8", to: '/' },
      { title: "op9", to: '/' }
    ]
    }
  }),



  methods: {
async getMops(){
  const result =  await srv.getMenuGeoRef()
  this.menuOps = result.data
  this.sigla = result.moredata.institucion
}
  },

  mounted() {
   this.getMops()
  },
};
</script>
