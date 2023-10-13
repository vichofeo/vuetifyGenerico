<template>
  <v-card class="mx-auto text-body-1">
    <v-card-text>
      <v-row dense no-gutters v-for="i in repeat">
        <v-col>
        <v-text-field
          density="compact"
          variant="underlined"
          v-model="message[i]"
          :readonly="answerType==2 ? true: false"
          append-icon="mdi-delete-forever-outline"
          :prepend-icon="icons[answerType]"
          clear-icon="mdi-close-circle"
          :clearable ="answerType==2 ? false: true"
          :label="`Respuesta ${i}`"
          type="text"
          @click:clear=" clearMessage(i)"
        ></v-text-field>
      </v-col>
      </v-row>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <div v-if="swViewBtn">
        <v-btn
          variant="flat"
          color="error"
          icon="mdi-numeric-negative-1"
          size="small"
          @click="minus"
        ></v-btn>
        <v-btn
          variant="flat"
          color="success"
          icon="mdi-numeric-positive-1"
          size="small"
          @click="more"
        ></v-btn>
      </div>
      <v-spacer></v-spacer>
      <btn-cancel-save :cancel="cancel" :save="save" />
    </v-card-actions>
    {{ message }}
  </v-card>
</template>

<script>
import BtnCancelSave from "./BtnCancelSave.vue";
/**
 * 0  -> 1 radio
 * 1  -> 2 check
 * 2  -> 4 texto
 * 3  -> 8 grid Respuestas
 *
 */
export default {
  components: { BtnCancelSave },

  props: {
    answerType: { type: Number, default: 0 },
    saveData: {type: Function}
  },
  data: () => ({
    swViewBtn: true,
    repeat: 1,
    message: [],
    answer: [],
    icons: [
      "mdi-radiobox-blank",
      "mdi-checkbox-marked-outline",
      "mdi-card-text-outline",
      "mdi-grid",
    ],
  }),

  computed: {},
  mounted() {
    this.verifySwViewBtn();
  },
  methods: {
    save() {
      //alert("slavando");
      //arma respuesta 
      this.answer = this.message.map((o, i)=>({
        answer: o,
          order: i,
          type: this.answerType,
      }))
      this.saveData(this.answer)
      //console.log(this.answer)
    },
    cancel() {},

    clearMessage(i) {
      this.message[i] = "";
    },
    more() {
      if (this.repeat < 10) {
        this.repeat++;
      }
    },
    minus() {
      if (this.repeat > 1) {
        this.message.pop();
        this.repeat--;
      }
    },
    verifySwViewBtn() {
      if (this.answerType > 1) {
        this.swViewBtn = false;
        this.message = [];
        this.repeat = 1;
        this.message[this.repeat] = 'Open'
        
      } else this.swViewBtn = true;
    },
  },
  watch: {
    answerType(nuevoValor, valorAnterior) {
      
      this.verifySwViewBtn();
    },
  },
};
</script>

<style></style>
