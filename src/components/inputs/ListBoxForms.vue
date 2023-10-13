<template>
  <v-combobox variant="solo" v-model="select" :items="items" :label="label" density="compact"
    @update:modelValue="onchangeHere">
    <template v-slot:selection="data">
      <v-chip variant="text" :key="JSON.stringify(data.item)" v-bind="data.attrs" :model-value="data.selected"
        :disabled="data.disabled" size="small" @click:close="data.parent.selectItem(data.item)">
        <template v-slot:prepend>
          <v-avatar color="primary" class="bg-accent text-uppercase" start>{{
            data.item.title.slice(0, 1)
          }}</v-avatar>
        </template>
        {{ data.item.title }}
      </v-chip>
    </template>
  </v-combobox>
</template>
  
<script>

export default {
  props: {
    items: { type: Array, default: [] },
    selected: { type: Object, default: () => ({ value: "-1", title: "-Sin Datos-" }) },
    label: { type: String, default: "Unknow" },
    name: { type: String, default: null },
    onChange: {
      type: Function,
      default() {
        return "Default function";
      },
    },
  },

  data: () => ({
    select: {}
  }),
  
  methods: {
    onchangeHere() {
      if(this.name)
      this.onChange({ [`${this.name}`]: this.select.value })
      else
      this.onChange(this.select.value)
    }
  },
mounted() {
  this.select = this.selected
  this.onchangeHere()
},
  watch: {
    selected: {
      deep: true,
      handler: function (newValue, oldValue) {
        this.select = newValue;
        this.onchangeHere()
      },
    },
  },
};
</script>
  
<style></style>
  