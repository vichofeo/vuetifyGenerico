<template>
<<<<<<< HEAD
    <div id="margen">
      <p>&nbsp;</p>
      <ContenedorCard color="blue dark-1" :title="titulo" :image="true">
        <FrmModelElements
          v-model="parametros[indexParam]"
          :lengthCols="4"
          :index-param="indexParam"
          :index-from-url="indexReal"
          :recarga="recargar"
          v-if="indexParam"
          :forEdit="true"
        />
      </ContenedorCard>
=======
  <div>
    <v-card class="pa-2 text-center">
      <h1 class="text-h5 font-weight-black">{{ titulo }}</h1>
    </v-card>

    <div v-if="frm == reporte">
      <v-card class="pa-2 text-center">
        <v-row>
          <v-col cols="12" xs="12" sm="12" md="6" xl="6" lg="6" v-for="(obj, key, index) in cboxs"
            :key="'comboxes_' + index">
            <v-combobox v-model="seleccionados[index]" :items="obj.items" :label="obj.label" chips class="ml-auto" dense
              @change="getDataComboWithData">
              <template v-slot:selection="data">
                <v-chip :key="JSON.stringify(data.item.text)" v-bind="data.attrs" :input-value="data.selected"
                  :disabled="data.disabled" @click:close="
                    data.parent.selectItem(data.item.text)
                    ">
                  <v-avatar class="primary white--text" left v-text="data.item.text.slice(0, 1).toUpperCase()"></v-avatar>
                  {{ data.item.text }}
                </v-chip>
              </template>
            </v-combobox>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" xs="12" sm="12" md="12" xl="12" lg="12" >
            <TableData :headers="labelDataFromCbx" :items="itemDataFromCbx"
            :opColor="colors[reporte]"  :itemsPerPage="10" ></TableData>
          </v-col>
        </v-row>
      </v-card>
      
>>>>>>> 1b5ca14d5d9b401886af9937b33d991e1eff2fcf
    </div>

    <div v-else>
      <div v-if="indexParam &&
        parametros[indexParam].valores &&
        parametros[indexParam].valores.length >= 0
        ">
        <v-row>
          <v-col cols="12" xs="12" sm="12" md="6" xl="6" lg="6">
            <TableDataEdit :headers="parametros[indexParam].campos" :items="parametros[indexParam].valores"
              :opColor="colors[indexParam]" v-model="itemSelected" :itemsPerPage="10" />
          </v-col>
          <v-scroll-y-transition mode="out-in">
            <v-col cols="12" xs="12" sm="12" md="6" xl="6" lg="6">
              <v-card>
                <v-card-text class="font-weight-black">Formulario de Datos Seleccione un Registro o presione el
                  boton Nuevo
                  <v-divider vertical></v-divider>
                  <v-btn small outlined color="primary" @click="newReg">
                    <v-icon left> mdi-bookmark-plus </v-icon>
                    Nuevo
                  </v-btn>
                </v-card-text>
                <v-card-text>
                  <v-row v-if="!swModificar && cboxs">
                    <v-col cols="12" xs="12" sm="12" md="6" xl="4" lg="4" v-for="(obj, key, index) in cboxs"
                      :key="'comboxes_' + index">
                      <v-combobox v-model="seleccionados[index]" :items="obj.items" :label="obj.label" chips
                        class="ml-auto" dense @change="obtieneData">
                        <template v-slot:selection="data">
                          <v-chip :key="JSON.stringify(data.item.text)" v-bind="data.attrs" :input-value="data.selected"
                            :disabled="data.disabled" @click:close="
                              data.parent.selectItem(data.item.text)
                              ">
                            <v-avatar class="primary white--text" left
                              v-text="data.item.text.slice(0, 1).toUpperCase()"></v-avatar>
                            {{ data.item.text }}
                          </v-chip>
                        </template>
                      </v-combobox>
                    </v-col>
                  </v-row>

                  <FrmModelElementsBasics v-model="datosSelected[indexDatosSelected]" :lengthCols="lengthCols"
                    v-if="datosSelected"></FrmModelElementsBasics>
                </v-card-text>
                <v-card-actions v-if="datosSelected[indexDatosSelected]">
                  <v-btn small outlined color="success" @click="saveItem" v-if="swModificar">
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
        <contenedor-alert dark outlined border="bottom" color="grey darken-2" elevation="2" icon="mdi-alert" prominent>
          -Sin Dato-
        </contenedor-alert>
      </div>
    </div>
  </div>
</template>

<script>
import * as srv from "@/services/ssepi/geoRefDataService";

import ContenedorCard from "@/components/utils/ContenedorCard.vue";
import ContenedorAlert from "@/components/utils/ContenedorAlert.vue";

import FrmModelElementsBasics from "@/components/inputs/FrmModelElementsBasics.vue";

import TableData from "@/components/utils/TableData.vue";
import TableDataEdit from "@/components/utils/TableDataChecks.vue";

import Loading from "@/components/utils/Loading.vue";
import ComboBoxForms from "@/components/inputs/ComboBoxForms.vue";
import CalendarForms from "@/components/inputs/CalendarForms.vue";

import MensajeriaUtils from "@/components/utils/MensajeriaUtils";
import * as utils from '@/components/utils/utils'
export default {
  components: {
    ContenedorCard,
    ContenedorAlert,

    FrmModelElementsBasics,
    TableData,
    TableDataEdit,
    Loading,
    ComboBoxForms,
    CalendarForms,
  },
  name: "AcreditacionHabilitacion",

  data: () => ({
    frm: null,
    parametros: null,
    swEditable: 0,
    mensajePopup: false,
    colors: {
      Habilitaciones: "blue",
      Acreditaciones: "blue-grey",
      repo_acrehab: "teal"
    },
    titulo: "",
    indexParam: null,
    indexReal: null,
    itemSelected: [],
    datosSelected: {},
    indexDatosSelected: null,
    swModificar: false,
    lengthCols: 6,
    cboxs: {},
    seleccionados: [],
    reporte: 'repo_acrehab',
    itemDataFromCbx:[],
    labelDataFromCbx:[]
  }),
  mounted() {
    this.verifyOption();
    this.getModuleDta();
  },
  methods: {
    async getModuleDta() {
      const mensaje = new MensajeriaUtils()
      try {

        if (this.frm != this.reporte) {
          this.cboxs = {}
          this.seleccionados = []
          this.itemDataFromCbx = []
          this.labelDataFromCbx = []
          const results = await srv.getDataParamEess(this.frm);
          this.parametros = results.data;
          this.indexParam = Object.keys(this.parametros)[0];
          this.indexReal = this.frm;
          this.titulo = results.institucion.nombre_institucion + ": " + this.indexParam;
        } else {
          this.getDataComboWithData()
          this.titulo = "Datos de Acreditacion/Habilitacion"
        }
      } catch (e) {
        console.log("error en la formacion y adquision de datos");
        mensaje.setMensaje("error en la formacion y adquision de datos")
        mensaje.advertencia()
        console.log(e);
      }
    },
    verifyOption() {
      if (this.$route.params.idx) this.frm = this.$route.params.idx;
      else this.frm = "all";
    },
<<<<<<< HEAD
  };
  </script>
  <style scoped>
  #margen{
   padding: 10px;
   }
 </style>
=======
    recargar(sw) {
      if (sw) this.getModuleDta();
    },

    async getDataComboWithData() {
      const m = new MensajeriaUtils(this.$toast)
      try {
        const data = {
          idx: "all",
          selected: this.seleccionados,
          model: this.reporte,
        };
        this.seleccionados = []
        const results = await srv.getcbxsWithData(data)
        if (results.ok) {
          this.labelDataFromCbx =  results.labels
          this.itemDataFromCbx = results.data
          this.cboxs = results.cboxs
          for (const key in this.cboxs) {
            this.seleccionados.push(this.cboxs[key].selected)
          }
        } else {
          m.setMensaje(results.message)
          m.advertencia()
        }

      } catch (error) {
        console.log(error);
        m.setMensaje('Error en dibujo de pantalla. Comuniquese con su administrador')
        m.advertencia()
      };

    },

    async getData(obj) {
      const mensaje = new MensajeriaUtils(this.$toast);
      try {
        this.swModificar = true;
        const data = { idx: obj.idx, modelo: obj.linked };
        const results = await srv.getDataByModelIdxEess(data);

        if (results.ok) {
          this.indexDatosSelected = Object.keys(results.data);
          this.datosSelected = results.data;

          for (const element of this.indexDatosSelected) {
            for (const key in this.datosSelected[element].campos) {
              this.datosSelected[element].campos[key][5] = false
            }
          }
        } else {
          mensaje.setMensaje(
            "Ocurrio un problema en la adquision de datos. " + results.message
          );
          mensaje.advertencia();
        }
      } catch (error) {
        console.log(error);
        mensaje.setMensaje(
          "Ocurrio un error en la Adquision de datos. Vuelva a Intentarlo, si el error persiste comuniquese con su Administrador"
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
        this.obtieneData();
        const data = {
          idx: "-1",
          modelo: this.parametros[this.indexParam].linked,
        };
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
        const modelo = this.parametros[this.indexParam].linked;
        let idx = "-1";
        const datos = utils.filterDataByModelParam(this.datosSelected);
        if (this.swModificar) idx = this.itemSelected[0].idx;
        else {
          for (const element in datos) {
            datos[element].institucion_id = this.seleccionados[2].value
          }
        }

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
          this.recargar(true);
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
    async obtieneData() {
      const mensaje = new MensajeriaUtils(this.$toast);
      try {
        this.swLoader = true;
        const data = {
          idx: "all",
          selected: this.seleccionados,
          model: "acrehab",
        };
        const results = await srv.getcbxs(data);

        if (results.ok) {
          this.seleccionados = [];

          this.selectedValor = [];

          this.cboxs = results.data;

          for (const obj in this.cboxs)
            this.seleccionados.push(this.cboxs[obj].selected);
          //obtiene opci default
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
  },
  beforeRouteUpdate(to, from) {
    // just use `this`
    this.frm = to.params.idx;
    this.getModuleDta();
  },

  watch: {
    itemSelected: {
      handler(val, oldVal) {
        if (val.length == 1) this.getData(val[0]);
        else {
          this.datosSelected = {};
          this.swModificar = false;
          this.cboxs = {}
        }
      },
      deep: true,
    },
    indexParam: function (val) {
      this.itemSelected = [];
      this.datosSelected = {};
    },
  },
};
</script>
>>>>>>> 1b5ca14d5d9b401886af9937b33d991e1eff2fcf
