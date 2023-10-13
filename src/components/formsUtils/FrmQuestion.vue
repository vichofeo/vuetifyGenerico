<template>
  <v-card class="mx-auto" density="compact" v-for="(obj, i) in questions">    
    <v-card-item class="text-body-1">
      <v-toolbar density="compact" rounded>
        <v-toolbar-title class="text-subtitle-2">{{ obj.question }}</v-toolbar-title>
        <v-divider inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-btn color="primary" dark class="text-subtitle-2"> Editar </v-btn>
        |
        <v-btn color="primary" dark class="text-subtitle-2"> Eliminar </v-btn>
      </v-toolbar>
    </v-card-item>
    <v-card-text>
      
      <frm-answer :type="obj.type" :answers="obj.answers" />
    </v-card-text>
  </v-card>
</template>

<script>
import FrmAnswer from "./FrmAnswer.vue";
/**
 * 0  -> 1 radio
 * 1  -> 2 check
 * 2  -> 4 texto
 * 3  -> 8 grid Respuestas
 *
 */
export default {
  components: { FrmAnswer },
  props: {
    questions: { type: Array, default: [] },
    type: { type: Number, default: 0 },
  },
};
</script>

<style></style>
