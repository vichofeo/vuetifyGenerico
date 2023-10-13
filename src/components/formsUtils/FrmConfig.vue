<template>
  <v-card
    class="mx-auto"
    variant="outlined"
    :style="'border: 1px solid #1D62A1;'"
    density="compact"
    elevation="0"
  >
    <v-sheet outlined color="blue">
      <v-row dense no-gutters>
        <v-col cols="6" xs="5" sm="5" xl="6" md="6" lg="6">
          Seleccione un grupo y un formulario o cree su formulario en el grupo
        </v-col>
        <v-col cols="6" xs="5" sm="5" xl="6" md="6" lg="6">
          <v-row dense>
            <v-col cols="8">
              <list-box
                :label="`Seleccione un Grupo - Formulario`"
                :items="grpItems"
                :selected="grpSelected"
                :onChange="onChangeGrp"
              />
            </v-col>
            <v-col cols="4">
              <btn-dialog
                :type="'G'"
                :onClick="secondFunction"
                :label="`Nuevo grupo`"
              />
            </v-col>
          </v-row>
          <v-row dense>
            <v-col cols="8">
              <list-box
                :label="`Seleccione Formulario`"
                :items="frmItems"
                :selected="frmSelected"
                :onChange="onChangeFrm"
              /> </v-col
            ><v-col cols="4">
              <btn-dialog
                :type="'F'"
                :onClick="secondFunction"
                :label="`Nuevo Formulario`"
              />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-sheet>

    <v-card-text>
      {{ frmSelected.title }}
      <table-data-up-del
        :items="items"
        :titles="['Name', 'calorias']"
        :fmodify="modifySecFrm"
        :fdelete="deleteSecFrm"
      />
      
    </v-card-text>
  </v-card>
  <!-- Grupo Formularioes -->
  <v-card-text>    
    <frm-section
      :sections="datosFrm.sections"
      :others="datosFrm.others"
      :hereditaryFunction="hereditaryFunction"
      :secondFunction="secondFunction"
      v-if="frmSelected.value != '-1'"
    />
  </v-card-text>
</template>

<script>
import ListBox from "@/components/formsUtils/ListBox.vue";
import TableDataUpDel from "@/components/formsUtils/TableDataUpDel.vue";
import FrmSection from "@/components/formsUtils/FrmSection.vue";

import BtnDialog from "../inputs/BtnDialog.vue";

import * as srv from "@/service/GetData";

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
  components: { ListBox, TableDataUpDel, FrmSection, BtnDialog },
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

      this.$store.commit('setFrm', {gfrm:data.value})  
      this.onChangeFrm(frmAux)
      
    },
    async onChangeFrm(data) {
      //alamcena en memoria el frmSeleccionado
      const aux = this.$store.state.frmSelect.gfrm
      this.$store.commit('setFrm', {gfrm:aux ,frm:data.value})
      this.frmSelected = data;
      this.datosFrm = await srv.getfrmAllContent(this.frmSelected.value)

    },
    modifySecFrm(idx) {
      alert("idx para moduifcoa:" + idx);
    },
    deleteSecFrm(idx) {
      alert("idx para eliminar:" + idx);
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
