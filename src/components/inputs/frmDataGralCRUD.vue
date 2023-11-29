<template>
  <div>
    <v-dialog v-model="dialogInput" max-width="85%">
      <v-card>
        <template>
          <v-card>
            <v-toolbar color="#6A76AB" dark flat>
              <v-toolbar-title>{{ parametros.Identificacion.valores.nombre_institucion }} - {{
                parametros.Identificacion.valores.ciudad }}
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
                <v-card flat v-if="!Array.isArray(item.valores)">
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" xs="12" sm="12" md="6" xl="3" lg="3" v-for="(obj, nameObj) in item.campos"
                          :key="'srhTb' + nameObj">
                          <v-text-field v-model="item.valores[nameObj]" :label="obj[0]" :readonly="!obj[1]"
                            :filled="!obj[1]" :rounded="!obj[1]" dense v-if="obj[3] == 'T' && !obj[5]" />

                          <combo-box-forms v-model="item.valores[nameObj].selected"
                            :items-combo="item.valores[nameObj].items" :label="obj[0]" :readonly="!obj[1]"
                            :filled="!obj[1]" :rounded="!obj[1]" dense hide-details :disable-lookup="true" flat
                            v-else-if="obj[3] == 'C' && item.valores[nameObj] && item.valores[nameObj].selected && !obj[5]" />
                          <CalendarForms :label="obj[0]" :name="nameObj" :yyyymmdd="item.valores[nameObj]"
                            :set-function="() => { }" v-else-if="obj[3] == 'F' && !obj[5]" />
                          <div v-else>

                            <div class="font-weight-black">
                              {{ obj[0] }}: {{ obj[5] }} 
                            </div> <span v-if="obj[3] == 'T'">{{ item.valores[nameObj] }}</span>
                            <span v-else> {{ item.valores[nameObj]?.selected?.text }}</span>

                          </div>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>
                  <v-card-text v-show="mensajePopup">
                    <contenedor-alert dark outlined border="bottom" color="grey darken-2" elevation="2" icon="mdi-alert"
                      prominent>
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
                <div v-else>
                  <p>&nbsp;</p>
                  <ContenedorCard :title="index" :color="`${colors[index]} darken-1`" icon="mdi-calendar-check">
                    <div v-if="item.valores.length > 0">

                      <table-data :headers="item.campos" :items="item.valores" :opColor="colors[index]"
                        :items-per-page="10" />
                    </div>
                    <div v-else>
                      <contenedor-alert dark outlined border="bottom" color="grey darken-2" elevation="2" icon="mdi-alert"
                        prominent>
                        -Sin Dato-
                      </contenedor-alert>
                    </div>
                  </ContenedorCard>
                </div>
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

import ContenedorAlert from "../utils/ContenedorAlert.vue";
import Loading from "../utils/Loading.vue";
import ComboBoxForms from "./ComboBoxForms.vue";
import CalendarForms from './CalendarForms.vue';

import ContenedorCard from '@/components/utils/ContenedorCard.vue'
import TableData from "../utils/TableData.vue";

export default {
  components: { ContenedorAlert, Loading, ComboBoxForms, CalendarForms, TableData, ContenedorCard },
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
