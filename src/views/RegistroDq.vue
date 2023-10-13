<template>
  <v-card class="mb-12" color="lighten-1">
    <v-card-title>REGISTRAR DENUNCIA - QUEJA</v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12" xs="12" sm="12" md="6" xl="3" lg="3" v-for="(obj, ii) in comboxes" :key="'comboxes_' + ii"
            v-if="ii > 0">
            <v-combobox v-model="cSelected[ii]" :items="obj" :label="cLabel[ii]" chips class="ml-auto" dense
              @change="getInfoCombos()">
              <template v-slot:selection="data">
                <v-chip :key="JSON.stringify(data.item.text)" v-bind="data.attrs" :input-value="data.selected"
                  :disabled="data.disabled" @click:close="data.parent.selectItem(data.item.text)">
                  <v-avatar class="accent white--text" left v-text="data.item.text.slice(0, 1).toUpperCase()"></v-avatar>
                  {{ data.item.text }}
                </v-chip>
              </template>
            </v-combobox>
          </v-col>
        </v-row>
        <v-row justify="center" dense>
          <v-col cols="12" xs="12" sm="12" md="12" xl="12" lg="12" class="text-center caption">
            <v-sheet class="text-justify mx-auto" max-width="100%">
              <v-slide-group v-model="modelIndexTop" show-arrows mandatory>
                <v-slide-item v-for="(item, i) in parametros" :key="'menEst_' + i" v-slot="{ active, toggle }">
                  <v-btn class="mx-2" :input-value="active" active-class="success white--text" rounded small @click="
                            toggle();
                            getMoreDataRUES(modelIndexTop);
                          ">
                    {{ StringToFrase(i) }}
                  </v-btn>
                </v-slide-item>
              </v-slide-group>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-text>
      <v-container>
        <v-form ref="form" v-model="valid" lazy-validation>{{ registro }}
          <v-row>
            <v-col cols="12" xs="12" sm="6" md="3" lg="4" xl="4">
              <v-text-field class="ml-6 rounded-lg" v-model="registro.hr_cite" label="HOJA DE RUTA Y CITE *" required
                clear-icon="mdi-close-circle" clearable hint="Nro Hoja Ruta" persistent-hint hide-details="auto" dense
                :rules="campoRules" />
            </v-col>
            <v-col cols="12" xs="12" sm="6" md="3" lg="4" xl="4">
              <v-menu ref="comboDate" v-model="comboDate" :close-on-content-click="false" transition="scale-transition"
                offset-y max-width="290px" min-width="auto">
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field v-model="registro.fecha_ingreso" label="FECHA DE INGRESO *" hint="Formato dd/mm/aaaa "
                    v-mask="'##/##/####'" placeholder="dd/mm/aaaa" persistent-hint prepend-inner-icon="mdi-calendar"
                    v-bind="attrs" v-on="on" @blur="date = parseDate(registro.fecha_ingreso)" background-color="#ffffff"
                    required :rules="fecha_nacimientoRules" dense clear-icon="mdi-close-circle" clearable />
                </template>
                <v-date-picker color="#1D62A1" v-model="date" locale="es-US" :max="
                          new Date(
                            Date.now() - new Date().getTimezoneOffset() * 60000
                          )
                            .toISOString()
                            .substr(0, 10)
                        " min="1930-01-01" @input="comboDate = false"></v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="12" xs="12" sm="6" md="3" lg="4" xl="4">
              <v-text-field class="ml-6 rounded-lg" v-model="registro.tipo_denuncia" label="TIPO DE DENUNCIA *" required
                clear-icon="mdi-close-circle" clearable hint="Tipo Denuncia" persistent-hint hide-details="auto"
                dense /></v-col>
            <v-col cols="12" xs="12" sm="6" md="3" lg="4" xl="4">
              <v-text-field class="ml-6 rounded-lg" v-model="registro.denunciante"
                label="ENTE GESTOR/ INSTITUCION /EMPRESA / DENUNCIANTE / SOLICITANTE  *" required
                clear-icon="mdi-close-circle" clearable hint="A quien denuncia" persistent-hint hide-details="auto" dense
                :rules="campoRules" />
            </v-col>
            <v-col cols="12" xs="12" sm="6" md="3" lg="4" xl="4">
              <v-text-field class="ml-6 rounded-lg" v-model="registro.referencia" label="REFERENCIA *" required
                clear-icon="mdi-close-circle" clearable hint="Referencia" persistent-hint hide-details="auto" dense
                :rules="campoRules" />
            </v-col>
            <v-col cols="12" xs="12" sm="6" md="3" lg="4" xl="4">
              <v-text-field class="ml-6 rounded-lg" v-model="registro.aa_tipo_accion"
                label="ACCIONES ASUMIDAS - TIPO DE ACCIÓN *" required clear-icon="mdi-close-circle" clearable
                hint="Tipo de accion asumida" persistent-hint hide-details="auto" dense :rules="campoRules" />
            </v-col>
            <v-col cols="12" xs="12" sm="6" md="3" lg="4" xl="4">
              <v-text-field class="ml-6 rounded-lg" v-model="registro.aa_nro_cite"
                label="ACCIONES ASUMIDAS - Nro. DE CITE *" required clear-icon="mdi-close-circle" clearable
                hint="Nro de cite de accion asumida" persistent-hint hide-details="auto" dense :rules="campoRules" />
            </v-col>
            <v-col cols="12" xs="12" sm="6" md="3" lg="4" xl="4">
              <v-text-field class="ml-6 rounded-lg" v-model="registro.estado_actual_qd"
                label="ESTADO ACTUAL DE LA QUEJA O DENUNCIA *" required clear-icon="mdi-close-circle" clearable
                hint="Estado Actual" persistent-hint hide-details="auto" dense :rules="campoRules" />
            </v-col>
            <v-col cols="12" xs="12" sm="6" md="3" lg="4" xl="4">
              <v-text-field class="ml-6 rounded-lg" v-model="registro.tiempo_promedio_respuesta_asuss_dias"
                label="TIEMPO PROMEDIO DE RESPUESTA ASUSS (EN DÍAS) *" required clear-icon="mdi-close-circle" clearable
                hint="Tiempo respuesta dias" persistent-hint hide-details="auto" dense type="number" step="any" min="0"
                prepend-inner-icon="mdi-numeric" align-self="end"  />
            </v-col>
            <v-col cols="12" xs="12" sm="6" md="3" lg="4" xl="4">
              <v-text-field class="ml-6 rounded-lg" v-model="registro.tiempo_promedio_respuesta_denunciado_dias"
                label="TIEMPO PROMEDIO DE RESPUESTA DEL DENUNCIADO (EN DÍAS) *" required clear-icon="mdi-close-circle"
                clearable hint="Tiempo respuesta denunciado dias" persistent-hint hide-details="auto" dense type="number"
                step="any" min="0" prepend-inner-icon="mdi-numeric" align-self="end"  />
            </v-col>
            <v-col cols="12" xs="12" sm="6" md="3" lg="4" xl="4">
              <v-text-field class="ml-6 rounded-lg" v-model="registro.sa_tipo_sancion"
                label="SANCIONES APLICADAS - TIPO DE SANCIÓN *" required clear-icon="mdi-close-circle" clearable
                hint="Tipo sancion aplicada" persistent-hint hide-details="auto" dense :rules="campoRules" />
            </v-col>
            <v-col cols="12" xs="12" sm="6" md="3" lg="4" xl="4">
              <v-text-field class="ml-6 rounded-lg" v-model="registro.sa_nro_cite"
                label="SANCIONES APLICADAS - Nro. DE CITE *" required clear-icon="mdi-close-circle" clearable
                hint="Nro de cite sancion aplicada" persistent-hint hide-details="auto" dense :rules="campoRules" />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" xs="12" sm="6" md="6" xl="6" lg="6" class="text-left" align-self="center">
              <v-tooltip bottom color="success">
                <template v-slot:activator="{ on, attrs }">
  
                  <v-btn :disabled="!valid" color="primary" outlined @click="validate(); saveItem()" v-bind="attrs"
                    v-on="on">
                    <v-icon>mdi-account-search-outline</v-icon>
                    grabar
                  </v-btn>
                </template>
                <span>Buscar</span>
              </v-tooltip>
            </v-col>
          </v-row>
        </v-form>
      </v-container>
    </v-card-text>
  
    <loading :swLoading="swLoader" mensaje="Cargando Informacion, espere por favor..." />
    <v-snackbar v-model="showResult" :timeout="5000" top>
      {{ mensajePopup }}
    </v-snackbar>
  </v-card>
</template>

<script>
import * as srv from "@/services/dqService";

import ContenedorAlert from "@/components/utils/ContenedorAlert.vue";
import Loading from "@/components/utils/Loading.vue";

import { cnf } from "@/assets/cnf";


export default {
  components: { ContenedorAlert, Loading },
  name: "AllEditions",
  data() {
    return {
      cnfData: cnf.ar1,
      parametros: {},
      cSelected: [
        { value: "Seguridad Social (CAJAS)", text: "Seguridad Social (CAJAS)" },
        { value: "-1", text: "-Todos-" },
        { value: "-1", text: "-Todos-" },
        { value: "-1", text: "-Todos-" },
        { value: "-1", text: "-Todos-" },
        { value: "-1", text: "-Todos-" },
        { value: "-1", text: "-Todos-" },
        { value: "-1", text: "-Todos-" },
        { value: "-1", text: "-Todos-" },
      ],
      comboxes: [],
      cLabel: [],
      modelIndexTop: 0,




      dialog: false,
      editedItem: {},

      mensajePopup: "",
      swLoader: false,
      registro: { hr_cite : null,
fecha_ingreso : null,
tipo_denuncia : null,
denunciante : null,
 referencia : null,
aa_tipo_accion : null,
aa_nro_cite : null,
estado_actual_qd : null,
tiempo_promedio_respuesta_asuss_dias : 0,
tiempo_promedio_respuesta_denunciado_dias : 0,
sa_tipo_sancion : null,
sa_nro_cite : null },

      valid: false,
      date: null,
      comboDate: false,
      fecha_nacimientoRules: [(v) => !!v || "Fecha Denuncia es requerido"],
      numeroRules: [
        v => (!!v) || 'Numero de documento es requerido',
      ],
      campoRules: [(v) => !!v || "Este campo es requerido"],
      showResult: false
    };
  },

  mounted() {
    this.initial();
  },
  methods: {
    async initial() {
      this.getInfoCombos();
    },
    async getInfoCombos() {
      const res = await srv.combos({ op: 0, selected: this.cSelected, restriccion: this.cnfData });
      console.log(res);
      this.cSelected = res.body.listSelect;
      this.comboxes = res.body.listBox;
      this.cLabel = res.body.listLabel;
    },
    StringToFrase(cadena) {
      return cadena
        .replaceAll("_", " ")
        .toLowerCase()
        .replace(/(^\w{1})|(\s+\w{1})/g, (letra) => letra.toUpperCase());
    },
    /**
     * obtiene datos del modulo seleccionado para dataTable
     * @param {*} opRues: opcion de menu de modulos
     */


    async saveItem() {
      try {
        this.swLoader = true;
      this.showResult = false
      this.mensajePopup = "";

      //vsalidad informacion
      let sw = 0
      for (const key in this.registro) {        
        if ( this.registro[key]=== null || this.registro[key] === '') {
          sw = 1
          break
        }
      }

      if (sw == 1) {
        this.showResult = true
        this.mensajePopup = "Los campos con (*) son necesario, no pueden ser vacios ni contener espacios"
        this.swLoader = false;
        return null
      }
      const res = await srv.registro({ combo:this.cSelected, data: this.registro, restriccion: this.cnfData });

      if (res.ok) {
        this.showResult = true
        this.mensajePopup = res.message        
        this.dialog = false;
        setTimeout(() => {
          this.$router.push({ name: "listado" });
}, 2000);
      } else {
        this.mensajePopup =
          res.message +
          ". El campo editado excede en longitud de lo permitido. Intente nuevamente";
      }

      this.swLoader = false;
      } catch (error) {
        this.showResult = true
        this.mensajePopup = "Ha ucurrido un error, si esto persiste posiblemente no tenga conexion a internet. Comuniquese con su administrador"
      };
      
    },
    parseDate(date) {
      if (!date) return null;

      const [day, month, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },
    formatDate(date) {
      if (!date) return null;
      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    },
    validate() {
      this.$refs.form.validate()
    },
  },
  watch: {
    date(val) {
      this.registro.fecha_ingreso = this.formatDate(this.date);
    },
  },
};
</script>

<style></style>
