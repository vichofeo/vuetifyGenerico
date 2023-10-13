<template>
  <v-card class="mx-auto">
    <v-layout>
      <v-app-bar density="compact" :elevation="1">
        <v-tabs v-model="tab" density="compact" bg-color="transparent" color="basil">
          <v-tab value="t1" color="primary" bg-color="error">Insertar</v-tab>
          <v-tab value="t2">Ver</v-tab>
          <v-tab value="t3">Imprimir</v-tab>
        </v-tabs>
        <v-app-bar-title>En desarrollo mental</v-app-bar-title>
      </v-app-bar>

      <v-main>
        <v-container fluid>
          <v-row dense>
            <v-col cols="12" xs="12" sm="12" xl="12" md="12" lg="12">
              <v-window v-model="tab">
                <v-window-item value="t1"> <frm-config :hereditaryFunction="clickTab" :secondFunction="clickTab" />
                </v-window-item>

                <v-window-item value="t2"> <frm-view /> </v-window-item>

                <v-window-item value="t3"> Three gfdg dfgdfgdf g </v-window-item>
                <v-window-item value="t4">
                  <frm-group-maker v-if="typeForm == 'G'" />
                  <frm-maker v-if="typeForm == 'F'" />
                  <frm-section-maker v-if="typeForm == 'S'" />
                  <question-answer-form :hereditaryFunction="saveQuestion" v-if="typeForm == 'P'" />
                </v-window-item>
              </v-window>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </v-layout>
  </v-card>
</template>

<script>
import QuestionAnswerForm from '@/components/formsUtils/QuestionAnswerForm.vue';
import FrmConfig from '@/components/formsUtils/FrmConfig.vue';
import FrmView from '@/components/formsUtils/FrmView.vue';
import FrmSectionMaker from '@/components/formsUtils/FrmSectionMaker.vue';
import FrmMaker from '@/components/formsUtils/FrmMaker.vue'
import FrmGroupMaker from '@/components/formsUtils/FrmGroupMaker.vue';

import * as srv from "@/service/SaveData"
import { sr } from 'date-fns/locale';
/**
 * 0  -> 1 radio
 * 1  -> 2 check
 * 2  -> 4 texto
 * 3  -> 8 grid Respuestas
 *
 */

export default {
  components: { QuestionAnswerForm, FrmConfig, FrmView, FrmSectionMaker, FrmMaker, FrmGroupMaker },
  data: () => ({
    tab: null,
    typeForm: 'P'
  }),

  computed: {},

  methods: {
    clickTab(op) {
      this.typeForm = op
      this.tab = "t4"
    },
    saveQuestion(data) {
      const aux = this.$store.state.frmSelect

      //console.log("desde la vista principal GFRMView", {...aux, question: data})
      srv.registrarQuizzAnswers({ ...aux, question: data })
      this.tab = "t1"

    }
  },
};
</script>

<style></style>
