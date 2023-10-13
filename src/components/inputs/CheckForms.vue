<template>
  <div>
    {{ label }}
    <v-row no-gutters>
      <v-col cols="12" sm="4" md="4" v-for="(obj, i) in items">
        <v-checkbox v-model="dataModel" :label="obj.title" color="orange-darken-3" :value="obj.value"
          hide-details></v-checkbox>
      </v-col>
    </v-row>
    {{ dataModel }}
  </div>
</template>
<script>

export default {
  props: {
    items: { type: Array, default: [] },
    onClick: { type: Function, default() { return "Default function"; }, },
    name: { type: String, default: "defaultCheck" },
    label: { type: String, default: "defaultCheck" },
    selected: { type: Array, default: [] }
  },
  data: () => ({
    dataModel: [],
  }),
  methods: {
    verifiySelected() {
      if (this.selected && this.selected.length > 0) {
        this.dataModel = this.selected
      }
    }
  },
  mounted() {
    this.verifiySelected()
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
  