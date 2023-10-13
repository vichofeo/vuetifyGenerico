<template>
  <v-tooltip bottom :color="results.iconColor">
    <template v-slot:activator="{ on, attrs }">
      <v-chip
        v-bind="attrs"
        v-on="on"
        dark
        x-small
        class="ma-2"
        :color="results.color"
        outlined
      >
        <v-icon :color="results.iconColor" class="material-icons">
          {{ results.icono }}
        </v-icon>
           {{ results.texto }} 
      </v-chip>
    </template>
    <span>{{ results.descripcion_afiliacion ? results.descripcion_afiliacion+"/":'' + results.descripcion }}</span>
  </v-tooltip>
</template>

<script>
import * as utils from "@/components/asegurado/utils/varios";
export default {
  name: "ChipColorEstado",
  props: {
    datos: {
      type: Object,
      default: () => {},
    },
  },

  data() {
    return {
      results: {},
    };
  },

  mounted() {
    this.configura();
  },

  methods: {
    configura() {
      this.results = utils.setPaletaEstados(this.datos);
    },
  },
  watch: {
    datos: {
      deep: true,
      handler: function () {
        this.configura();
      },
    },
  },
};
</script>
