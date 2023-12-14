<template>
  <div>
    <v-dialog v-model="dialogInput" max-width="85%">
      
      <v-card>
        <template>
          <v-card>
            <v-toolbar color="#1D62A1" dark flat>
              <v-toolbar-title>{{ parametros.Identificacion?.valores.nombre_institucion }} - 
                {{parametros.Identificacion?.valores.ciudad }}
                <span v-show="swEditable">Editar</span> </v-toolbar-title>

              <v-spacer></v-spacer>

              <template v-slot:extension>
                <v-tabs v-model="tab" align-with-title>
                  <v-tabs-slider color="yellow"></v-tabs-slider>

                  <v-tab v-for="(item, index) in parametros" :key="index">
                    {{ index.replace("_", " ") }}
                  </v-tab>
                </v-tabs>
              </template>
            </v-toolbar>

            <v-tabs-items v-model="tab">
              <v-tab-item v-for="(item, index) in parametros" :key="index">
                <v-card flat>
                  <v-card-text>
                    <FrmModelElements
                    v-model="parametros[index]"
                    :lengthCols="3"
                    :index-param="index"        
                  />
                  </v-card-text>
                </v-card>
                
              
              </v-tab-item>
            </v-tabs-items>
          </v-card>
        </template>


      </v-card>
    </v-dialog>
    <loading :swLoading="swLoader" mensaje="Cargando Informacion, espere por favor..." />
  </div>
</template>

<script>
import * as srv from "@/services/ssepi/geoRefDataService";


import Loading from "../utils/Loading.vue";

import FrmModelElements from "./FrmModelElements.vue";

export default {
  components: { Loading,FrmModelElements },
  name: "AllEditions",
  props: {
    idx: { type: String, default: "-1" },
    modelo: { type: String, default: "all" },
    value: { type: Boolean, default: false },
  },
  data() {
    return {
      parametros: {},

      headersTb: [],
      editedItem: {},
      swEditable: 0,
      mensajePopup: "",
      swLoader: false,
      tab: null,
      colors: { Responsables:"indigo" , Infraestructura: "teal", Mobiliario: "green", Equipamiento: "blue", Personal: "blue-grey" }
    };
  },

  created() {
    this.initial();
  },
  methods: {
    async initial() {
      const aux = await srv.getDataEess({ idx: this.idx, modelo: this.modelo });
      console.log("##################### Initial");
      console.log(":::::::: ", aux.data);
      if (aux.ok) this.parametros = aux.data;
      else this.parametros = {};
    },

    StringToFrase(cadena) {
      return cadena
        .replaceAll("_", " ")
        .toLowerCase()
        .replace(/(^\w{1})|(\s+\w{1})/g, (letra) => letra.toUpperCase());
    },

    async saveItem() {
      this.swLoader = true;
      this.mensajePopup = "";

      const res = ""; //await srv.editSaveDataModRues({ [index]: this.editedItem })

      if (res.ok) {
        this.dialog = false;
      } else {
        this.mensajePopup =
          res.message +
          ". El campo editado excede en longitud de lo permitido. Intente nuevamente";
      }

      this.swLoader = false;
    },
  },

  computed: {
    dialogInput: {
      get() {
        return this.value;
      },
      set(newValue) {
        this.$emit("input", newValue);
      },
    },
  },
};
</script>

<style></style>
