<template>
  <v-row v-if="!Array.isArray(item.valores)">
    <v-col cols="12" xs="12" sm="12" md="6" :xl="lengthCols" :lg="lengthCols"
      v-for="(obj, nameObj) in item.campos" :key="'srhTb' + nameObj" >
      
      <!-- solo texto -->
      <v-text-field
        v-model="item.valores[nameObj]"
        type="text"
        :label="obj[0]"
        :readonly="!obj[1]"
        :filled="!obj[1]"
        :rounded="!obj[1]"
        :maxlength="obj[4]"
        dense
        v-if ="obj[3] == 'TT' && !obj[5]"
      />
      <!-- solo numero -->
      <v-text-field
        v-model="item.valores[nameObj]"
        type="number"
        :label="obj[0]"
        :readonly="!obj[1]"
        :filled="!obj[1]"
        :rounded="!obj[1]"
        :maxlength="obj[4]"
        dense
        v-else-if ="obj[3] == 'TN' && !obj[5]"
      />
      <!-- solo email -->
      <v-text-field
        v-model="item.valores[nameObj]"
        type="email"
        :label="obj[0]"
        :rules="[rulesEmail.email]"
        :readonly="!obj[1]"
        :filled="!obj[1]"
        :rounded="!obj[1]"
        :maxlength="obj[4]"
        dense
        v-else-if ="obj[3] == 'TM' && !obj[5]"
      />
      <!-- solo decimal -->
      <v-text-field
        v-model="item.valores[nameObj]"
        type="number"
        step="0.000000000001" max="999.999"
        :label="obj[0]"
        :readonly="!obj[1]"
        :filled="!obj[1]"
        :rounded="!obj[1]"
        dense
        v-else-if ="obj[3] == 'TD' && !obj[5]"
      />

      <!-- texto abierto -->
      <v-textarea
        outlined
        v-model="item.valores[nameObj]"
        no-resize
        :label="obj[0]"
        :maxlength="obj[4]"
        rows="1"
        v-else-if ="obj[3] == 'TA' && !obj[5]"
      />

      
      <combo-box-forms
        v-model="item.valores[nameObj].selected"
        :items-combo="item.valores[nameObj].items[item.valores[item.valores[nameObj].dependency].selected.value]"
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
          item.valores[nameObj].selected && item.valores[nameObj].dependency && 
          item.valores[nameObj].items[item.valores[item.valores[nameObj].dependency].selected.value] &&
          !obj[5]
        "
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
        <span v-if="obj[3] == 'TT'">
          {{ item.valores[nameObj] }} </span
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
  data () {
      return {
        rulesEmail: {
          email: value => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || 'Invalid e-mail.'
          },
        },
      }
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
