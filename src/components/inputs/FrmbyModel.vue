<template>
  <div>
    <v-stepper v-model="e1">
      <v-stepper-header>
        <template v-for="n in steps">
          <v-stepper-step
            :key="`${n}-step`"
            :complete="e1 > n"
            :step="n"
            editable
          >
            {{ indexStepsParam[n - 1] }}
          </v-stepper-step>

          <v-divider v-if="n !== steps" :key="n"></v-divider>
        </template>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content v-for="n in steps" :key="`${n}-content`" :step="n">
          <v-card flat class="mb-12">
            <v-card-text>
              <FrmModelElements
                v-model="parametros[indexStepsParam[n - 1]]"
                :lengthCols="6"
                v-if="indexStepsParam[n - 1]"
              />
            </v-card-text>
            <v-card-text v-show="mensajePopup">
              <contenedor-alert
                dark
                outlined
                border="bottom"
                color="grey darken-2"
                elevation="2"
                icon="mdi-alert"
                prominent
              >
                {{ mensajePopup }}
              </contenedor-alert>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="$emit('input', false)">
                Cancel
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="nextStep(n)"
                v-show="swEditable"
              >
                Continuar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>

    <loading :swLoading="swLoading"></loading>
  </div>
</template>

<script>
import * as srv from "@/services/ssepi/geoRefDataService";
import ContenedorCard from "@/components/utils/ContenedorCard.vue";
import ContenedorAlert from "@/components/utils/ContenedorAlert.vue";
import TableData from "@/components/utils/TableData.vue";

import Loading from "@/components/utils/Loading.vue";
import ComboBoxForms from "@/components/inputs/ComboBoxForms.vue";
import CalendarForms from "@/components/inputs/CalendarForms.vue";
import FrmModelElements from "./FrmModelElements.vue";

import * as util from "@/components/utils/utils";
import MensajeriaUtils from "@/components/utils/MensajeriaUtils";

import Swal from "sweetalert2";
import { utils } from "xlsx";
export default {
  components: {
    ContenedorCard,
    ContenedorAlert,
    TableData,
    Loading,
    ComboBoxForms,
    CalendarForms,
    FrmModelElements,
  },
  name: "FrmByModel",

  props: {
    idx: { type: String, default: "-1" },
    modelo: { type: String, default: "eesseg" },
    root: { type: Object, default: {} },
    recarga: {type: Function, default() {return null},}
  },

  data: () => ({
    e1: 1,
    steps: 2,
    indexStepsParam: [],

    parametros: {},

    swEditable: 1,
    mensajePopup: false,

    swLoading: false,
  }),
  watch: {
    steps(val) {
      if (this.e1 > val) {
        this.e1 = val;
      }
    },
  },
  mounted() {
    this.getModuleDta();
  },
  methods: {
    async getModuleDta() {
      try {
        this.swLoading = true;
        const results = await srv.getDataParamEessByIdx({
          idx: this.idx,
          modelo: this.modelo,
        });
        this.parametros = results.data;

        this.indexStepsParam = Object.keys(this.parametros);
        this.steps = this.indexStepsParam.length;
        this.swLoading = false;
      } catch (e) {
        console.log("error en la formacion y adquision de datos");
        console.log(e);
      }
    },

    async saveItem() {
        const mensajeria = new MensajeriaUtils(this.$toast)
      try {
        this.swLoader = true;
        this.mensajePopup = "";

        const data = {
          eg: this.root,
          data: util.filterDataByModelParam(this.parametros),
          modelo: this.modelo,
        };

        const res = await srv.saveDataParamEessByIdx(data);

        if (res.ok) {
          mensajeria.setMensaje(res.message)
          mensajeria.exito();          
          //recarga datos
          this.recarga(true)
          this.getModuleDta();
          this.e1 = 1
        } else {
          this.mensajePopup = res.message;
          /*res.message +
                            ". El campo editado excede en longitud de lo permitido. Intente nuevamente";*/
        }

        this.swLoader = false;
      } catch (error) {
        console.log(error);
        mensajeria.setMensaje("Ha ocurrido un error en tiempo de corrida. Vuelva a intentarlo")
        mensajeria.error()
      }
    },

    nextStep(n) {
      if (n === this.steps) {
        //se guardan los datos y se regarda los datos del tree
        this.confirmarGuardado();
      } else {
        this.e1 = n + 1;
      }
    },
    confirmarGuardado() {
      Swal.fire({
        title: "Esta seguro de registrar los datos.",
        text: "No podra revertir el proceso.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Aceptar",
      }).then((result) => {
        this.saveItem();
      });
    },
  },
};
</script>
