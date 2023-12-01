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
    <ContenedorAlert
      dark
      outlined
      border="bottom"
      color="grey darken-2"
      elevation="2"
      icon="mdi-alert"
      prominent
    >
      ERROR DE DISENIO - EL FORMATO DE DATOS NO ES VALIDO EN ESTA SECCION
      COMUNIQUESE CON EL ADMINISTRADOR
    </ContenedorAlert>
  </div>
</template>

<script>
import ComboBoxForms from "@/components/inputs/ComboBoxForms.vue";
import CalendarForms from "@/components/inputs/CalendarForms.vue";

import ContenedorAlert from "@/components/utils/ContenedorAlert.vue";

export default {
  components: {
    ComboBoxForms,
    CalendarForms,
    ContenedorAlert,
  },
  name: "FrmByModelElementsBasics",
  props: {
    value: { type: Object, default: () => ({}) },
    lengthCols: { type: Number, default: 3 },
  },
  data() {
    return {};
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
  methods: {
    isObject(val) {
      if (val === null) {
        return false;
      }
      return  typeof val === "object";
    },
  },
};
</script>
