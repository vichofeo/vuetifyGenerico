<template>
  <v-card class="mx-auto text-body-1" max-width="99%" density="compact" elevation="1">
    <h3>Agregar nueva Seccion al formulario <btn-dialog :type="'S'" :onClick="secondFunction"/></h3>

    <v-divider />
    <v-card-text>
      <v-expansion-panels class="mb-4" variant="inset">
        
        <v-expansion-panel v-for="(obj, i) in others" :key="`other${i}`">
          <v-expansion-panel-title
            expand-icon="mdi-plus"
            collapse-icon="mdi-minus"
            color="blue-darken-1"
          >
          <v-row no-gutters>
              <v-col  class="d-flex justify-start"> {{ obj.title }} </v-col>
            </v-row>
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <frm-other-maker :type="obj.type"/>
          </v-expansion-panel-text>
          
        </v-expansion-panel>

        <v-expansion-panel v-for="(obj, i) in sections" :key="i">
          <v-expansion-panel-title
            expand-icon="mdi-plus"
            collapse-icon="mdi-minus"
            color="blue-darken-1"
          >
            <v-row no-gutters>
              <v-col cols="5" class="d-flex justify-start"> {{ obj.name_section }} </v-col>
              <v-col cols="6" class="d-flex justify-end">
                <v-btn density="compact" size="small" class="text-subtitle-2"
                  >Editar(Alpha)</v-btn
                >
              </v-col>
              <v-col cols="1">.</v-col>
            </v-row>
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <h3>Agregar Nueva pregunta  <btn-dialog :type="`${obj.sfrm}`" :onClick="onclickSaveQuestion"/> </h3>
            
            <frm-question :questions="obj.questions" :type="obj.type"/>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card-text>
  </v-card>
</template>

<script>
import FrmQuestion from "./FrmQuestion.vue";
import BtnDialog from "../inputs/BtnDialog.vue";
import FrmOtherMaker from './FrmOtherMaker.vue';

/**
 * 0  -> 1 radio
 * 1  -> 2 check
 * 2  -> 4 texto
 * 3  -> 8 grid Respuestas
 *
 */
export default {
  name:"FrmSectionView",
  props:{
    sections: { type: Array, default: [] },
    others: { type: Array, default: [] },
    hereditaryFunction:{type: Function, default() {return null } },
    secondFunction:{type: Function, default() {return null } }
  },
  components: { FrmQuestion, BtnDialog, FrmOtherMaker },
  
  mounted() {},
  methods:{
    onclickSaveQuestion(data){
      //´reseva informacion en store 
      const aux1 = this.$store.state.frmSelect.gfrm
      const aux2 = this.$store.state.frmSelect.frm
      
      this.$store.commit('setFrm', {gfrm:aux1, frm:aux2, sfrm:data})
      
      this.secondFunction('P')
    }

  }
};
</script>

<style></style>
