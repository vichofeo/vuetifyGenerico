<template>
  <v-card class="ma-2">
    <v-card-title class="primary white--text text-h5">
      Arbol de datos de Establecimientos de Salud
    </v-card-title>
    <v-row class="pa-4" justify="space-between">
      <v-col cols="12" xs="12" sm="12" md="4" lg="4" xl="5">
        <v-sheet class="pa-4 primary lighten-2">
          <v-text-field
            v-model="search"
            label="Buscar..."
            dark
            flat
            solo-inverted
            hide-details
            clearable
            clear-icon="mdi-close-circle-outline"
          ></v-text-field>
        </v-sheet>

        <v-treeview
          v-model="tree"
          hoverable
          rounded
          color="success"
          activatable
          :active.sync="activeTree"
          :items="items2"
          item-key="id"
          return-object
          transition
          :open.sync="open"
          :search="search"
        >
          <template v-slot:prepend="{ item, open }">
            <v-icon v-if="item.id == 1" color="teal">mdi-home-variant</v-icon>
            <v-icon v-if="item.type == 'ASUSS'" color="teal"
              >{{ open ? "mdi-minus-network" : "mdi-plus-network" }}
            </v-icon>
            <v-icon v-if="item?.type == 'dpto'" color="teal">
              {{ open ? "mdi-map-marker-minus" : "mdi-map-marker-plus" }}
            </v-icon>
            <v-icon v-if="item?.type == 'EG'" color="teal">
              {{ open ? "mdi-minus-box-outline" : "mdi-hospital-building" }}
            </v-icon>
            <v-icon v-if="item?.type == 'EESS'" color="red">
              mdi-hospital</v-icon
            >
          </template>
          <template v-slot:append="{ item, active }">
            <v-icon v-if="item?.add && active" color="red">mdi-new-box</v-icon>
          </template>
        </v-treeview>
      </v-col>

      <v-divider vertical></v-divider>

      <v-col class="d-flex text-center">
        <v-scroll-y-transition mode="out-in">
          <div
            v-if="!selected"
            class="text-h6 grey--text text--lighten-1 font-weight-light"
            style="align-self: center"
          >
            Elija una Opcion
          </div>
          <v-card v-else :key="selected.idx" class="pt-6 mx-auto" flat>
            <v-card-text>
              <v-avatar size="88">
                <v-img
                  :src="`/img/${selected.nombre_corto}.png`"
                  lazy-src="/img/asuss.png"
                >
                  <template v-slot:placeholder>
                    <v-row
                      class="fill-height ma-0"
                      align="center"
                      justify="center"
                    >
                      <v-progress-circular
                        indeterminate
                        color="grey lighten-5"
                      ></v-progress-circular>
                    </v-row>
                  </template>
                </v-img>
              </v-avatar>
              <h3 class="text-h5 mb-2">
                {{
                  selected.type == "EESS"
                    ? selected.eg + " - " + selected.dpto
                    : selected?.nombre_corto
                    ? selected.nombre_corto
                    : selected.name
                }}
              </h3>
              <div class="blue--text mb-2" v-if="selected.type == 'EESS'">
                {{ selected.nombre_corto }}
              </div>
              <div class="blue--text subheading font-weight-bold">
                {{ selected.nombre_institucion }}
              </div>
          
              <div class=" text-caption" v-if="selected?.add">
              <v-btn class="ma-2" small text  color="red" @click="addItem(selected)">
                <v-icon>mdi-new-box</v-icon>
              </v-btn>
            </div>
          
            </v-card-text>
            
            <v-divider></v-divider>
            <v-row class="text-left" v-if="selected.type != 'dpto' && !swNew">
              <v-col class="text-right mr-4 mb-2" tag="strong" cols="6">
                Institucion: 
              </v-col>
              <v-col>{{
                selected.nombre_corto ? selected.nombre_corto : selected.name
              }}</v-col>
              <v-col class="text-right mr-4 mb-2" tag="strong" cols="6">
                Departamento:
              </v-col>
              <v-col>{{ selected.egdpto }}</v-col>
              <v-col class="text-right mr-4 mb-2" tag="strong" cols="6">
                Website:
              </v-col>
              <v-col>
                <a :href="`//${selected.website}`" target="_blank">WEBSITE</a>
              </v-col>
              <v-col class="text-right mr-4 mb-2" tag="strong" cols="6">
                Phone:
              </v-col>
              <v-col>Telefono</v-col>
            </v-row>
            <v-card-text  v-if="swNew">
              <FrmbyModel idx="-1" modelo="eesseg" :root="selected" :recarga="recargar"></FrmbyModel>
            </v-card-text>
            
          </v-card>
        </v-scroll-y-transition>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import * as srv from "@/services/ssepi/geoMisEess";
import FrmbyModel from '@/components/inputs/FrmbyModel.vue';

export default {
  components: { FrmbyModel },
  data: () => ({
    active: [],
    avatar: null,

    users: [],

    initiallyOpen: [1],

    tree: [],
    items2: [],
    activeTree: [],

    search: null,
    open: [1, 2],

    swNew: false
    
  }),

  computed: {
    selected() {
      if (!this.activeTree.length) return undefined;
      this.swNew =  false
      return this.activeTree[0];
    },
  },

  mounted() {
    this.initial();
  },
  methods: {
    async initial() {
      try {
        const result = await srv.getDataMiseess();
        this.items2 = result.data;
      } catch (error) {
        console.log(error);
      }
    },
    addItem() {
      this.swNew = true
      
    },
    recargar(sw){
      if(sw) this.initial()
    }
  },
};
</script>
<style scoped>
.fcolor {
  color: #1D62A1;
}
</style>