<template>
  <v-row dense no-gutters>
    <v-col cols="3" xs="12" sm="6" md="4" lg="3" xl="3">
      <TextfieldForms
        :label="`Nombre Subformulacion - Seccion`"
        :name="`name_sfrm`"
        :onChange="setValues"
      />
    </v-col>
    <v-col cols="3" xs="12" sm="6" md="4" lg="3" xl="3">
      <TextfieldForms
        :label="`Descripcion`"
        :name="`description`"
        :onChange="setValues"
      />
    </v-col>
  </v-row>
  <v-divider />

  <question-answer-form :hereditaryFunction="setQuestions" />

valor de subfrm:::
  {{ subfrm }}

  <br/>
  valor armado
  {{ questions }}
</template>

<script>
import BtnNewForms from "../inputs/BtnNewForms.vue";
import TextfieldForms from "../inputs/TextfieldForms.vue";

import * as srv from "@/service/SaveData";
import * as get from "@/service/GetData";
import ListBoxForms from "../inputs/ListBoxForms.vue";
import CheckForms from "../inputs/CheckForms.vue";
import QuestionAnswerForm from "./QuestionAnswerForm.vue";

export default {
  name: "",
  components: {
    TextfieldForms,
    BtnNewForms,
    ListBoxForms,
    CheckForms,
    QuestionAnswerForm,
  },

  props: {
    refer: { type: String, default: "-1" },
  },
  data: () => ({
    subfrm: {},

    message: "",

    questions: {},
  }),
  methods: {
    setValues(data) {
      const aux = { ...this.subfrm };
      this.subfrm = { ...aux, ...data };
    },
    setQuestions(data) {
      const aux = this.$store.state.frmSelect.frm
      //guardar datos
      this.questions = data;
      this.subfrm

      const datos ={question: data, section: {...this.subfrm, formulario: aux}}
      
      //envia datos para su almacenamiento
      srv.registrarSubFrmQuizz(datos)
    },
    async initialData() {
      
    },
    async save() {
      
      //envia datos
      const datos = {
        
      };

      
      this.message = "elemento guardado";
    },
  },
  created() {
    this.initialData();
  },
};
</script>

<style></style>
