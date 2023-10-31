<template>
  <v-combobox
    v-model="select"
    :items="items"
    :label="label"
    dense
    chips
    class="ml-auto"
    @change="onchangeHere"
  >
    <template v-slot:selection="data">
      <v-chip
        :key="JSON.stringify(data.item)"
        v-bind="data.attrs"
        :input-value="data.selected"
        :disabled="data.disabled"
        @click:close="data.parent.selectItem(data.item.text)"
      >
        <v-avatar
          class="accent white--text"
          left
          v-text="data.item.text?.slice(0, 1).toUpperCase()"
        ></v-avatar>
        {{ data.item.text }}
      </v-chip>
    </template>
  </v-combobox>
</template>

<script>
export default {
  props: {
    name: { type: String, default: null },
    items: { type: Array, default: [] },
    selected: { type: Object, default: () => ({ value: "-1", title: "-Sin Datos-" })},
    label: { type: String, default: "Unknow" },    
    onChange: {
      type: Function,
      default() {
        return "Default function";
      },
    },
  },

  data: () => ({
    select: {},
  }),

  methods: {
    onchangeHere() {
      if (this.name) this.onChange({ [`${this.name}`]: this.select.value });
      else this.onChange(this.select.value);
    },
  },
  mounted() {
    this.select = this.selected;
    this.onchangeHere();
  },
  watch: {
    selected: {
      deep: true,
      handler: function (newValue, oldValue) {
        this.select = newValue;
        this.onchangeHere();
      },
    },
  },
};
</script>

<style></style>
