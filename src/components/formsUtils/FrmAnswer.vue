<template>
  <v-card class="text-body-1" density="compact" elevation="0" variant="flat">
    
      <radio-btn-box v-if="type == 0" :answers="answers"/>
      <check-box v-if="type == 1" :answers="answers"/>
      <textfield-box v-if="type == 2" :answers="answers"/>
      <grid-box v-if="type == 3" :answers="answers"/>
    
  </v-card>
</template>

<script>
import RadioBtnBox from "@/components/inputs/RadioBtnBox";
import CheckBox from "@/components/inputs/CheckBox";
import TextfieldBox from "@/components/inputs/TextfieldBox.vue";
import GridBox from "@/components/inputs/GridBox.vue";
/**
 * 0  -> 1 radio
 * 1  -> 2 check
 * 2  -> 4 texto
 * 3  -> 8 grid Respuestas
 *
 */
export default {
  components: { RadioBtnBox, CheckBox, TextfieldBox, GridBox },
  props: {
    type: { type: Number, default: 0 },
    answers: { type: Array, default: [] },
  },
  data: () => ({
    ex4: ["warning"],
  }),
};
</script>

<style></style>
