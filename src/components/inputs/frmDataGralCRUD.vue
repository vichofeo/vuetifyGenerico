<template>
  <div>
    <v-dialog v-model="dialogInput" max-width="85%">
      <v-card>
        <v-card-title>
          <span class="text-h5"><span v-show="swEditable">Editar</span> Registro Seleccionado</span>
        </v-card-title>        
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" xs="12" sm="12" md="6" xl="3" lg="3" v-for="(obj, nameObj) in parametros.campos" 
                :key="'srhTb' + nameObj">
                <v-text-field v-model="parametros.valores[nameObj]" 
                :label="obj[0]" :readonly="!obj[1]" :filled="!obj[1]"
                  :rounded="!obj[1]" dense v-if="obj[3]=='T'"/>
                
                  <combo-box-forms v-model="parametros.valores[nameObj].selected" 
                  :items-combo="parametros.valores[nameObj].items" 
                  v-else-if="parametros.valores[nameObj] && parametros.valores[nameObj].selected"
                  :label="obj[0]" :readonly="!obj[1]"  :filled="!obj[1]" :rounded="!obj[1]" dense  hide-details  :disable-lookup="true" flat
                  />
                <div v-else>{{obj[0]}}: {{ parametros.valores[nameObj] }}</div>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-text v-show="mensajePopup">
          <contenedor-alert dark outlined border="bottom" color="grey darken-2" elevation="2" icon="mdi-alert" prominent>
            {{ mensajePopup }}
          </contenedor-alert>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="$emit('input', false)">
            Cancel
          </v-btn>
          <v-btn color="blue darken-1" text @click="saveItem" v-show="swEditable">
            Grabar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <loading :swLoading="swLoader" mensaje="Cargando Informacion, espere por favor..." />
  </div>
</template>

<script>
import * as srv from "@/services/ssepi/geoRefDataService";

import ContenedorAlert from "../utils/ContenedorAlert.vue";
import Loading from "../utils/Loading.vue";
import ComboBoxForms from './ComboBoxForms.vue';

export default {
  components: { ContenedorAlert, Loading, ComboBoxForms },
  name: "AllEditions",
  props: {
    idx: { type: String, default: "-1" },
    modelo: { type: String, default: "eess" },
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
