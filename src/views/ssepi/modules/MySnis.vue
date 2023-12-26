<template>
  <v-card class="ma-5" color="lighten-1">
    <v-card-title class="font-weight-black" style="color:#1D62A1">Informacion SNIS (ver 001)</v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12" xs="12" sm="12" md="6" xl="3" lg="3" v-for="(obj, key, index) in cboxs"
            :key="'comboxes_' + index">
            <!--<combo-box-forms v-model="seleccionados[index]" :itemsCombo="obj.items" :label="obj.label" class="ml-auto" dense
                            :onChange="obtieneData"></combo-box-forms>-->

            <v-combobox v-model="seleccionados[index]" :items="obj.items" :label="obj.label" chips class="ml-auto" dense
              @change="obtieneData">
              <template v-slot:selection="data">
                <v-chip :key="JSON.stringify(data.item.text)" v-bind="data.attrs" :input-value="data.selected"
                  :disabled="data.disabled" @click:close="data.parent.selectItem(data.item.text)">
                  <v-avatar class="primary white--text" left v-text="data.item.text.slice(0, 1).toUpperCase()"></v-avatar>
                  {{ data.item.text }}
                </v-chip>
              </template>
            </v-combobox>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-text v-if="Object.keys(datos).length > 0">
      <v-container fluid tag="section">
        <v-row>
          <v-col cols="12" xs="12" sm="12" :md="lengthMd" :xl="lengthOthers" :lg="lengthOthers"
            v-for="(obj, key, index) in datos" :key="'cstdB' + index">
            <contenedor-card-chars :data="dataChartist(obj, selectedAtributo[index], selectedValor[index])"
              :options="optionsChartist()" :responsive-options="responsiveOptions" color="primary" type="Line">
              <h4 class="card-title font-weight-light mt-2 ml-2">
                {{ key }}
              </h4>

              <p class="d-inline-flex font-weight-light ml-2 mt-1">
              <div class="sidebar-box">
                <select v-model="selectedAtributo[index]" class="styled-select">
                  <option v-for="option in listAtributo[key]" :value="option">
                    {{ option }}
                  </option>
                </select>
              </div>
              <div class="sidebar-box">
                <select v-model="selectedValor[index]" class="styled-select">
                  <option v-for="option in listValor[key]" :value="option">
                    {{ option }}
                  </option>
                </select>
              </div>
              </p>

              <template v-slot:actions>
                <v-icon class="mr-1" small> mdi-clock-outline </v-icon>
                <span class="caption grey--text font-weight-light">{{ seleccionados[5].text }}/ {{ seleccionados[6].text
                }}</span>
              </template>
            </contenedor-card-chars>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-text v-else>
      <contenedor-alert dark outlined border="bottom" color="grey darken-2" elevation="2" icon="mdi-alert" prominent>
        titulo c
        <div class="text-h5">-Sin Datos-</div>
      </contenedor-alert>
    </v-card-text>

    <loading :swLoading="swLoader" mensaje="Cargando Informacion, espere por favor..." />
  </v-card>
</template>

<script>
import * as srv from "@/services/ssepi/misSnisService";
import Loading from "@/components/utils/Loading.vue";
import MensajeriaUtils from "@/components/utils/MensajeriaUtils";
import ContenedorAlert from "@/components/utils/ContenedorAlert.vue";
import ComboBoxForms from "@/components/inputs/ComboBoxForms.vue";

import ContenedorCard from "@/components/utils/ContenedorCard";
import ContenedorCardChars from "@/components/utils/ContenedorCardChars.vue";

//import * as ChartistTooltips from 'chartist-plugin-tooltips';
import * as ChartistTooltips from "chartist-plugin-tooltips";
export default {
  name: "frmsSnis301",
  components: {
    Loading,
    ContenedorAlert,
    ComboBoxForms,
    ContenedorCard,
    ContenedorCardChars,
  },
  data: () => ({
    e1: 'Todos',
    swLoader: false,
    frm: null,
    datos: [],
    cboxs: {},
    seleccionados: [],
    responsiveOptions: [
      [
        "screen and (max-width: 640px)",
        {
          seriesBarDistance: 5,
          axisX: {
            labelInterpolationFnc: function (value) {
              return value[0];
            },
          },
        },
      ],
    ],

    listAtributo: [],
    listValor: [],
    selectedAtributo: {},
    selectedValor: {},
  }),
  mounted() {
    this.verifyOption();
    this.obtieneData();
  },
  methods: {
    verifyOption() {
      if (this.$route.params.idx) this.frm = this.$route.params.idx;
      else this.frm = "all";
    },

    async obtieneData() {
      const mensaje = new MensajeriaUtils(this.$toast);
      try {
        this.swLoader = true;
        const data = { idx: this.frm, selected: this.seleccionados };
        const results = await srv.getDataMysnis(data);

        if (results.ok) {
          this.seleccionados = [];
          this.selectedAtributo = []
          this.selectedValor = []

          this.datos = results.datos;
          this.cboxs = results.data;
          this.listAtributo = results.lists[0];

          this.listValor = results.lists[1];


          for (const obj in this.cboxs)
            this.seleccionados.push(this.cboxs[obj].selected);
          //obtiene opcion default
          for (const key in this.datos) {
            this.listAtributo[key].length > 1 ? this.listAtributo[key].push(this.e1) : ""
            this.selectedAtributo.push(this.listAtributo[key][0])
            this.selectedValor.push(this.listValor[key][0])
          }

        } else {
          mensaje.setMensaje(results.message);
          mensaje.advertencia();
        }
        this.swLoader = false;
      } catch (error) {
        console.log(error);
        mensaje.setMensaje(
          "Ocurrio un error en el dibujo de pantalla. Comuniquese con el administrador"
        );
        mensaje.error();
        this.swLoader = false;
      }
    },

    /**
     * recompone combos de grafico con la opcion todos
     * */
    dataChartist(obj, list1, list2) {

      const series = []
      if (list1 != this.e1) {

        series.push({
          name: list1,
          data: obj.series[list1][list2].map(z => parseInt(z, 10)),
        })
      } else {
        for (const key in obj.series) {
          series.push({
            name: key,
            data: obj.series[key][list2].map(z => parseInt(z, 10)),
          })
        }

      }
      return {
        labels: obj.labels,
        series: series,

      };
    },

    optionsChartist() {
      return {
        /*axisX: {
          type: this.$chartist.AutoScaleAxis,
          onlyInteger: false
          //"type": Chartist.AutoScaleAxis,      
        },*/
        axisY: {
          type: this.$chartist.AutoScaleAxis,
          // This value specifies the minimum height in pixel of the scale steps
          scaleMinSpace: 20,
          // Use only integer values (whole numbers) for the scale steps
          onlyInteger: false
        },
        lineSmooth: this.$chartist.Interpolation.cardinal({
          tension: 0,
        }),
        low: 0,
        high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
        chartPadding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
        },
        plugins: [
          //this.$chartist.plugins.tooltip(),
          /*this.$chartist.plugins.tooltip({
                valueTransform: function () {
                    return (value / 1000) + 'k';
                }
            })*/
          this.$chartist.plugins.tooltip({
            anchorToPoint: true,
            appendToBody: true,
          }),
        ],
      };
    },
  },
  beforeRouteUpdate(to, from) {
    // just use `this`
    this.frm = to.params.idx;
    this.obtieneData();
  },
  computed: {
    lengthMd() {
      if (Object.keys(this.datos).length == 1) return 12;
      else return 6;
    },
    lengthOthers() {
      const tmp = Object.keys(this.datos).length;
      let tam = 4;
      switch (tmp) {
        case 1:
          tam = 12;
          break;
        case 2:
          tam = 6;
          break;
        default:
          tam = 4;
          break;
      }
      return tam;
    },
  },
};
</script>
<style scoped>
/* OTROS ESTILOS*/
.styled-select {
  width: 240px;
  height: 34px;
  overflow: hidden;
  background: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E") no-repeat right #ddd;
  border: 1px solid #ccc;
}

.sidebar-box select {
  display: block;
  padding: 5px 10px;
  height: 42px;
  margin: 10px auto;
  min-width: 225px;
  width: 90%;
  -webkit-appearance: none;
  height: 34px;
  /* background-color: #ffffff; */
  background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E"),
    linear-gradient(to bottom, #ffffff 0%, #f7f7f7 100%);
  background-repeat: no-repeat, repeat;
  background-position: right 0.7em top 50%, 0 0;
  background-size: 0.65em auto, 100%;
}
</style>
