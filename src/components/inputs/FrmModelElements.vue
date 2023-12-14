<template>
  <div v-if="!Array.isArray(item.valores)">
    <v-scroll-y-transition mode="out-in">
    <v-card>
      <v-card-title v-if="forEdit">Por favor elija las opciones e introduzca las Modificaciones</v-card-title>
      <v-card-text>
        <FrmModelElementsBasics
        v-model="item"
        :lengthCols="lengthCols"
      ></FrmModelElementsBasics></v-card-text>
      <v-card-actions v-if="forEdit"><v-spacer></v-spacer>
        <v-btn
          small
          outlined
          color="success"
          @click="saveItemSimplex"        
        >
          <v-icon left> mdi-content-save-all </v-icon>
          Guardar Modificaciones
        </v-btn>
        
      </v-card-actions>
    </v-card>
  </v-scroll-y-transition>
  </div>

  <div v-else>
    <div v-if="item.valores.length >= 0">
      <table-data
        :headers="item.campos"
        :items="item.valores"
        :opColor="colors[indexParam]"
        :items-per-page="10"
        v-if="!forEdit"
      />
      <v-row v-else>
        <v-col cols="12" xs="12" sm="12" md="6" xl="6" lg="6">
          <TableDataEdit
            :headers="item.campos"
            :items="item.valores"
            :opColor="colors[indexParam]"
            v-model="itemSelected"
            :itemsPerPage="10"
          />
        </v-col>
        <v-scroll-y-transition mode="out-in">
        <v-col cols="12" xs="12" sm="12" md="6" xl="6" lg="6">
          <v-card>
            <v-card-text class="font-weight-black"
              >Formulario de Datos Seleccione un Registro o presione el boton
              Nuevo
              <v-divider vertical></v-divider>
              <v-btn small outlined color="primary" @click="newReg">
                <v-icon left> mdi-bookmark-plus </v-icon>
                Nuevo
              </v-btn>
            </v-card-text>
            <v-card-text>
              <FrmModelElementsBasics
                v-model="datosSelected[indexDatosSelected]"
                :lengthCols="lengthCols"
                v-if="datosSelected"
              ></FrmModelElementsBasics>
            </v-card-text>
            <v-card-actions v-if="datosSelected[indexDatosSelected]">
              <v-btn
                small
                outlined
                color="success"
                @click="saveItem"
                v-if="swModificar"
              >
                <v-icon left> mdi-content-save-all </v-icon>
                Guardar Modificaciones
              </v-btn>
              <v-btn small outlined color="primary" @click="saveItem" v-else>
                <v-icon left> mdi-content-save </v-icon>
                Guardar Nuevo Dato
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        </v-scroll-y-transition>
      </v-row>
    </div>
    <div v-else>
      <contenedor-alert
        dark
        outlined
        border="bottom"
        color="grey darken-2"
        elevation="2"
        icon="mdi-alert"
        prominent
      >
        -Sin Dato-
      </contenedor-alert>
    </div>
  </div>
</template>

<script>
import ContenedorAlert from "@/components/utils/ContenedorAlert.vue";
import TableData from "@/components/utils/TableData.vue";
import TableDataEdit from "@/components/utils/TableDataChecks.vue";

import Loading from "@/components/utils/Loading.vue";
import ComboBoxForms from "@/components/inputs/ComboBoxForms.vue";
import CalendarForms from "@/components/inputs/CalendarForms.vue";

import * as srv from "@/services/ssepi/geoRefDataService";
import * as utils from "@/components/utils/utils";

import MensajeriaUtils from "../utils/MensajeriaUtils";
import FrmModelElementsBasics from "./FrmModelElementsBasics.vue";

export default {
  components: {
    ContenedorAlert,
    TableData,
    Loading,
    ComboBoxForms,
    CalendarForms,
    TableDataEdit,
    FrmModelElementsBasics,
  },
  name: "FrmByModelElements",
  props: {
    value: { type: Object, default: {} },
    lengthCols: { type: Number, default: 3 },
    indexParam: { type: String, default: "Responsables" },
    indexFromUrl: { type: String, default: "eess" },
    forEdit: { type: Boolean, default: false },
    recarga: {
      type: Function,
      default() {
        return null;
      },
    },
  },
  data() {
    return {
      colors: {
        Responsables: "indigo",
        Infraestructuras: "teal",
        Mobiliarios: "green",
        Equipamientos: "blue",
        Personals: "blue-grey",
      },
      itemSelected: [],
      datosSelected: {},
      indexDatosSelected: null,
      swModificar: false,
    };
  },

  computed: {
    item: {
      get() {
        return this.value;
      },
      set(newValue) {
        this.$emit("input", newValue);
      },
    },
  },
  methods: {
    async getData(obj) {
      const mensaje = new MensajeriaUtils(this.$toast);
      try {
        this.swModificar = true;
        const data = { idx: obj.idx, modelo: obj.linked };
        const results = await srv.getDataByModelIdxEess(data);
        if (results.ok) {
          this.indexDatosSelected = Object.keys(results.data);
          this.datosSelected = results.data;
        } else {
          mensaje.setMensaje(
            "Ocurrio un problema en la adquision de datos. " + results.message
          );
          mensaje.advertencia();
        }
      } catch (error) {
        console.log(error);
        mensaje.setMensaje(
          "Ocurrio un error en la Adquision de datos. Vuelva a Intentarlo, si el erro persiste comuniquese con su Administrador"
        );
        mensaje.error();
      }
    },
    async newReg() {
      const mensaje = new MensajeriaUtils(this.$toast);
      this.datosSelected = {};
      this.itemSelected = [];
      try {
        this.swModificar = false;
        const data = { idx: "-1", modelo: this.item.linked };
        const results = await srv.getDataParamEessByIdx(data);

        if (results.ok) {
          this.indexDatosSelected = Object.keys(results.data);
          this.datosSelected = results.data;
        } else {
          mensaje.setMensaje(
            "Ocurrio un problema en la adquision de datos. " + results.message
          );
          mensaje.advertencia();
        }
      } catch (error) {
        console.log(error);
        mensaje.setMensaje(
          "Ocurrio un error en la Adquision de datos. Vuelva a Intentarlo, si el erro persiste comuniquese con su Administrador"
        );
        mensaje.error();
      }
    },
    async saveItem() {
      const mensaje = new MensajeriaUtils(this.$toast);
      try {
        const modelo = this.item.linked;
        let idx = "-1";
        if (this.swModificar) idx = this.itemSelected[0].idx;

        const datos = utils.filterDataByModelParam(this.datosSelected);
        //this.datosSelected[index].valores.idx= idx
        const data = {
          modelo: modelo,
          idx: idx,
          sw: this.swModificar,
          data: datos,
        };
        console.log(data);
        //guardar dato
        const results = await srv.saveDataByModel(data);

        if (results.ok) {
          console.log(results);
          //recrga datos
          mensaje.setMensaje(results.message);
          mensaje.informacion();
          this.recarga(true);
          this.datosSelected = {};
          this.itemSelected = [];
          this.swModificar = false;
        } else {
          mensaje.setMensaje(
            "Ocurrio un problema mientra se guardaban los datos. " +
              results.message
          );
          mensaje.advertencia();
        }
      } catch (error) {
        console.log(error);
        mensaje.setMensaje(
          "Ocurrio un error en el proceso de guardado. Comuniquese con su administrador"
        );
        mensaje.error();
      }
    },
    async saveItemSimplex() {
      const mensaje = new MensajeriaUtils(this.$toast);
      try {
        const modelo = this.indexFromUrl;
        let idx = "-1";
        
        console.log("data ORIGEN............",this.item);
        const aux=  {[this.indexParam]: this.item}
        const datos = utils.filterDataByModelParam(aux);
        //this.datosSelected[index].valores.idx= idx
        const data = {
          modelo: modelo,
          idx: idx,
          sw: true,
          data: datos,
        };
        console.log("SAVE ITEM SIMPLEX............",data);
        //guardar dato
        const results = await srv.saveDataByModel(data);

        if (results.ok) {
          console.log(results);
          //recrga datos
          mensaje.setMensaje(results.message);
          mensaje.informacion();
          this.datosSelected = {};
          this.itemSelected = [];
          this.indexDatosSelected= null
          this.recarga(false);          
        } else {
          mensaje.setMensaje(
            "Ocurrio un problema mientra se guardaban los datos. " +
              results.message
          );
          mensaje.advertencia();
        }
      } catch (error) {
        console.log(error);
        mensaje.setMensaje(
          "Ocurrio un error en el proceso de guardado. Comuniquese con su administrador"
        );
        mensaje.error();
      }
    },
  },
  watch: {
    itemSelected: {
      handler(val, oldVal) {
        if (val.length == 1) this.getData(val[0]);
        else {
          this.datosSelected = {};
          this.swModificar = false;
        }
      },
      deep: true,
    },
    indexParam: function(val){
      this.itemSelected= []
      this.datosSelected= {}
    }
  },
};
</script>
