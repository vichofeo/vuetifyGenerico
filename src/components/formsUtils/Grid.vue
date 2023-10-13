<template>
  <v-card class="mx-auto">
    <v-card-text>
      <v-row>
        <v-col cols="6" xs="6" sm="4" xl="4" md="6" lg="6">
          <v-row v-for="i in rows">
            <v-text-field
              density="compact"
              variant="underlined"
              v-model="rmessage[i]"
              prepend-icon="mdi-table-row"
              clear-icon="mdi-close-circle"
              clearable
              :label="`Fila ${i}`"
              type="text"
              @click:clear="() => (rmessage[i] = '')"
            ></v-text-field>
          </v-row>
          <v-row>
            <v-spacer></v-spacer>
            <div v-if="swViewBtn">
              <v-btn
                variant="flat"
                color="error"
                icon="mdi-numeric-negative-1"
                size="small"
                @click="minusRow"
              ></v-btn>
              <v-btn
                variant="flat"
                color="success"
                icon="mdi-numeric-positive-1"
                size="small"
                @click="moreRow"
              ></v-btn>
            </div>
            <v-spacer></v-spacer>
          </v-row>
        </v-col>
        <v-col cols="6" xs="6" sm="4" xl="4" md="6" lg="6">
          <v-row v-for="i in columns">
            <v-text-field
              density="compact"
              variant="underlined"
              v-model="cmessage[i]"
              prepend-icon="mdi-table-column"
              clear-icon="mdi-close-circle"
              clearable
              :label="`Columna ${i}`"
              type="text"
              @click:clear="() => (cmessage[i] = '')"
            ></v-text-field>
          </v-row>
          <v-row>
            <v-spacer></v-spacer>
            <div v-if="swViewBtn">
              <v-btn
                variant="flat"
                color="error"
                icon="mdi-numeric-negative-1"
                size="small"
                @click="minusColumn"
              ></v-btn>
              <v-btn
                variant="flat"
                color="success"
                icon="mdi-numeric-positive-1"
                size="small"
                @click="moreColumn"
              ></v-btn>
            </div>
            <v-spacer></v-spacer>
          </v-row>
        </v-col>
      </v-row>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <btn-cancel-save :cancel="cancel" :save="save" />
    </v-card-actions>
    {{ cmessage }}
    {{ rmessage }}
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
  props: {
    answerType: { type: Number },
    saveData: { type: Function },
  },
  components: { BtnCancelSave },

  data: () => ({
    swViewBtn: true,
    rows: 1,
    rmessage: [],
    columns: 1,
    cmessage: [],
    answer: {},
  }),

  computed: {},

  methods: {
    save() {
      //alert("slavando");
      //recompone mensaje pregunta respuesta
      this.answer = this.rmessage.map((obj, i) => ({
        question: obj,
        order: i,
        type: this.answerType,
        answers: this.cmessage.map((o, j) => ({
          answer: o,
          order: j,
          type: this.answerType,
        })),
      }));
      this.saveData(this.answer)
      //console.log(this.answer);
    },
    cancel() {},

    clearMessage(i) {
      this.message[i] = "";
    },
    moreRow() {
      if (this.rows < 15) {
        this.rows++;
      }
    },
    minusRow() {
      if (this.rows > 1) {
        this.rmessage.pop();
        this.rows--;
      }
    },
    moreColumn() {
      if (this.columns < 15) {
        this.columns++;
      }
    },
    minusColumn() {
      if (this.columns > 1) {
        this.cmessage.pop();
        this.columns--;
      }
    },
  },
  watch: {
    answerType(nuevoValor, valorAnterior) {
      if (this.answerType > 1) {
        this.swViewBtn = false;
        this.message = [];
        this.repeat = 1;
      } else this.swViewBtn = true;
    },
  },
};
</script>

<style></style>
