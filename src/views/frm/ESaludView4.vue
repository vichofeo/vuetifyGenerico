<template>
  <v-card
    class="mx-auto"
    variant="outlined"
    :style="'border: 1px solid #1D62A1;'"
    density="compact"
    elevation="0"
  >
   

    <v-card-text>
      <v-card-title>{{ secSelected.title }}</v-card-title>
      <v-card-subtitle>{{ frmSelected.title }}</v-card-subtitle>
    </v-card-text>
  </v-card>
  <!-- Grupo Formularioes -->
  <v-card-text v-for="(obj, i) in datosFrm.sections" :key="uuid">
    <h3>{{ i + 1 }}.- {{ obj.name_section }}</h3>
    <div v-for="(o, j) in obj.questions" :key="uuid">
      <h4>{{ i + 1 }}.{{ j + 1 }}.- {{ o.question }}</h4>
      <frm-answer :type="o.type" :answers="o.answers" />
    </div>
  </v-card-text>
</template>

<script>
import ListBox from "@/components/formsUtils/ListBox.vue";
import TableDataUpDel from "@/components/formsUtils/TableDataUpDel.vue";
import FrmSection from "@/components/formsUtils/FrmSection.vue";


import FrmAnswer from "@/components/formsUtils/FrmAnswer.vue";

import { getDataFrm } from "@/service/data/datos";
import { SNIS } from "@/service/data/snis";
import { HET } from "@/service/data/het";

import { v4 as uuid } from "uuid"

export default {
  components: { ListBox, TableDataUpDel, FrmSection, FrmAnswer },
  data: () => ({
    secSelected: { value: 2, title: "Grupo Formulario Configurables" },
    secItems: [
      { value: 0, title: "Grupo Formulario 000" },
      { value: 1, title: "Grupo Formulario 001" },
      { value: 2, title: "Grupo Formulario 002" },
      { value: 3, title: "Grupo Formulario 003" },
    ],
    frmSelected: { value: 2, title: "Formulario Grid" },
    frmItems: [
      { value: 0, title: "formu 000" },
      { value: 1, title: "formu 001" },
      { value: 2, title: "formu 002" },
      { value: 3, title: "formu 003" },
    ],
    items: [
      { id: 100, name: "formulario XX", calories: 159 },
      { id: 101, name: "seccion YYY", calories: 237 },
    ],
    //datosFrm: null,
    datosFrm: [],
  }),
  methods: {
    uuid() {
      return uuid();
    },
    onChangeSec(data) {
      this.secSelected = data;
    },
    onChangeFrm(data) {
      this.frmSelected = data;
      this.datosFrm.length = 0
      this.datosFrm = []
      switch (this.frmSelected.value) {
        case 0:
          this.datosFrm = getDataFrm();
          break;
        case 1:
          this.datosFrm = SNIS;
          break;
        case 2:
          this.datosFrm = HET;
          break;
        default:
          this.datosFrm = getDataFrm();
          break;
      }

    },
    modifySecFrm(idx) {
      alert("idx para moduifcoa:" + idx);
    },
    deleteSecFrm(idx) {
      alert("idx para eliminar:" + idx);
    },
    initData() {
      this.datosFrm = []
      this.datosFrm = getDataFrm();
      console.log(this.datosFrm);
      switch (this.frmSelected.value) {
        case 0:
          this.datosFrm = getDataFrm();
          break;
        case 1:
          this.datosFrm = SNIS;
          break;
        case 2:
          this.datosFrm = HET;
          break;
        default:
          this.datosFrm = getDataFrm();
          break;
      }
    },
  },

  mounted() {
    this.initData();
    /*this.datosService.getDatos.then((datosFrm) => {
              this.datosFrm = datosFrm;
          });
      */
  },
};
</script>

<style></style>
