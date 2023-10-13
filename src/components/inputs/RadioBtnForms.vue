<template>
  <div>
    <v-row no-gutters>
      <v-radio-group inline :label="items.label" v-model="dataModel">
        <v-radio
          :label="obj.label"
          color="orange-darken-3"
          :value="obj.value"
          v-for="(obj, i) in items.options"
        ></v-radio>
      </v-radio-group>
      {{ dataModel }}
    </v-row>
  </div>
</template>

<script>
/**
 * 0  -> 1 radio
 * 1  -> 2 check
 * 2  -> 4 texto
 * 3  -> 8 grid Respuestas
 *
 */
export default {
  props: {
    items: { type: Object, default: () => {} },
    onClick: {
      type: Function,
      default() {
        return "Default function";
      },
    },
    name: { type: String, default: "defaultRadio" },
    selected: { type: String, default: null },
  },
  data: () => ({
    dataModel: "",
  }),

  methods: {
    verifiySelected() {
      if (this.selected) {
        this.dataModel = this.selected;
      }
    },
  },
  mounted() {
    this.verifiySelected();
  },
  watch: {
    dataModel: {
      deep: true,
      handler: function (newValue, oldValue) {

        this.onClick({ [`${this.name}`]: newValue })
      },
    },
    selected(newSelect, oldSelect) {      
        this.dataModel = newSelect
    },
  },
};
</script>

<style></style>
