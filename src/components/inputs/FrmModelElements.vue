<template>
  <v-row v-if="!Array.isArray(item.valores)">
    <v-col
      cols="12"
      xs="12"
      sm="12"
      md="6"
      :xl="lengthCols"
      :lg="lengthCols"
      v-for="(obj, nameObj) in item.campos"
      :key="'srhTb' + nameObj"
    >
      <v-text-field
        v-model="item.valores[nameObj]"
        :label="obj[0]"
        :readonly="!obj[1]"
        :filled="!obj[1]"
        :rounded="!obj[1]"
        dense
        v-if="obj[3] == 'T' && !obj[5]"
      />

      <combo-box-forms
        v-model="item.valores[nameObj].selected"
        :items-combo="item.valores[nameObj].items"
        :label="obj[0]"
        :readonly="!obj[1]"
        :filled="!obj[1]"
        :rounded="!obj[1]"
        dense
        hide-details
        :disable-lookup="true"
        flat
        v-else-if="
          obj[3] == 'C' &&
          item.valores[nameObj] &&
          item.valores[nameObj].selected &&
          !obj[5]
        "
      />
      <CalendarForms
        v-model="item.valores[nameObj]"
        :label="obj[0]"
        :name="nameObj"
        v-else-if="obj[3] == 'F' && !obj[5]"
      />
      <div v-else>
        <div class="font-weight-black">{{ obj[0] }}:</div>
        <span v-if="obj[3] == 'T'">
          {{ item.valores[nameObj] }} {{ obj[5] }}</span
        >
        <span v-else> {{ item.valores[nameObj]?.selected?.text }}</span>
      </div>
    </v-col>
  </v-row>

  <div v-else>
    <div v-if="item.valores.length > 0">
      <table-data
        :headers="item.campos"
        :items="item.valores"
        :opColor="colors[indexParam]"
        :items-per-page="10"
      />{{ itemSelected }}
      <TableDataEdit :headers="item.campos" :items="item.valores" :opColor="'blue'" v-model="itemSelected"
                    :itemsPerPage="10"/>
    </div>
    <div v-else>
      <contenedor-alert
        dark
        outlined
        border="bottom"
        color="grey darken-2"
        elevation="2"
        icon="mdi-alert"
        prominent
      >
        -Sin Dato-
      </contenedor-alert>
    </div>
  </div>
</template>

<script>
import ContenedorAlert from "@/components/utils/ContenedorAlert.vue";
import TableData from "@/components/utils/TableData.vue";
import TableDataEdit from "@/components/utils/TableDataChecks.vue";

import Loading from "@/components/utils/Loading.vue";
import ComboBoxForms from "@/components/inputs/ComboBoxForms.vue";
import CalendarForms from "@/components/inputs/CalendarForms.vue";

export default {
  components: {
    ContenedorAlert,
    TableData,
    Loading,
    ComboBoxForms,
    CalendarForms,
    TableDataEdit
  },
  name: "FrmByModelElements",
  data() {
    return {
      colors: {
        Responsables: "indigo",
        Infraestructura: "teal",
        Mobiliario: "green",
        Equipamiento: "blue",
        Personal: "blue-grey",
      },
      itemSelected: [],
    };
  },
  props: {
    value: { type: Object, default: {} },
    lengthCols: { type: Number, default: 3 },
    indexParam: { type: String, default: "Responsables" },
  },

  computed: {
    item: {
      get() {
        return this.value;
      },
      set(newValue) {
        this.$emit("input", newValue);
      },
    },
  },
};
</script>
