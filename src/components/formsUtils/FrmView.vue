<template>
  <v-card class="mx-auto" variant="outlined" :style="'border: 1px solid #1D62A1;'" density="compact" elevation="0">
    <v-sheet outlined color="blue">
      <v-row dense no-gutters>
        <v-col cols="6" xs="5" sm="5" xl="6" md="6" lg="6">
          Seleccione un grupo y un formulario o cree su formulario en el grupo
        </v-col>
        <v-col cols="6" xs="5" sm="5" xl="6" md="6" lg="6">
          <v-row dense>
            <v-col cols="8">
              <list-box :label="`Seleccione un Grupo - Formulario`" :items="grpItems" :selected="grpSelected"
                :onChange="onChangeGrp" />
            </v-col>
            <v-col cols="4">
              <btn-dialog :type="'G'" :onClick="secondFunction" :label="`Nuevo grupo`" />
            </v-col>
          </v-row>
          <v-row dense>
            <v-col cols="8">
              <list-box :label="`Seleccione Formulario`" :items="frmItems" :selected="frmSelected"
                :onChange="onChangeFrm" /> </v-col><v-col cols="4">
              <btn-dialog :type="'F'" :onClick="secondFunction" :label="`Nuevo Formulario`" />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-sheet>

    <v-card-text>
      <v-card-title>{{ grpSelected.title }}</v-card-title>
      <v-card-subtitle>{{ frmSelected.title }}</v-card-subtitle>
    </v-card-text>

    <v-card-text v-for="(obj, i) in datosFrm.others" :key="uuid">
      <h3>{{ i + 1 }}.- {{ obj.title }}</h3>
      <div >
        <frm-other-maker :type="obj.type"/>
      </div>
    </v-card-text>

    <v-card-text v-for="(obj, i) in datosFrm.sections" :key="uuid">
      <h3>{{ i + 1 + datosFrm.others.length}}.- {{ obj.name_section }}</h3>
      <div v-for="(o, j) in obj.questions" :key="uuid">
        <h4>{{ i + 1 + datosFrm.others.length}}.{{ j + 1 }}.- {{ o.question }}</h4>
                
        <frm-answer :type="o.type" :answers="o.answers" />
      </div>
    </v-card-text>

  </v-card>
  <!-- Grupo Formularioes -->
</template>

<script>
import ListBox from "@/components/formsUtils/ListBox.vue";
import TableDataUpDel from "@/components/formsUtils/TableDataUpDel.vue";
import FrmSection from "@/components/formsUtils/FrmSection.vue";

import BtnDialog from "../inputs/BtnDialog.vue";

import * as srv from "@/service/GetData";
import FrmAnswer from "./FrmAnswer.vue";
import FrmOtherMaker from "./FrmOtherMaker.vue";

export default {
  name: "FrmMaker",
  props: {
    hereditaryFunction: {
      type: Function,
      default() {
        return null;
      },
    },
    secondFunction: {
      type: Function,
      default() {
        return null;
      },
    },
  },
  components: { ListBox, TableDataUpDel, FrmSection, BtnDialog, FrmAnswer, FrmOtherMaker },
  data: () => ({
    grpSelected: {},
    grpItems: [],
    frmSelected: {},
    frmItems: [],
    items: [
      { id: 100, name: "formulario XX", calories: 159 },
      { id: 101, name: "seccion YYY", calories: 237 },
    ],
    //datosFrm: null,
    datosFrm: [],
  }),
  methods: {
    async onChangeGrp(data) {
      this.grpSelected = data;
      const res = await srv.getFormularios(data);

      const frmAux = res.selected;
      this.frmItems = res.items;


      this.onChangeFrm(frmAux)

    },
    async onChangeFrm(data) {
      //alamcena en memoria el frmSeleccionado
      const aux = this.$store.state.frmSelect.gfrm

      this.frmSelected = data;
      this.datosFrm = await srv.getfrmAllContent(this.frmSelected.value)

    },

    async initData() {
      const res = await srv.getGrupoForms();

      this.grpItems = res.items;
      this.grpSelected = res.selected;

      this.onChangeGrp(this.grpSelected);
    },
  },

  created() {
    this.initData();
  },
};
</script>

<style></style>
