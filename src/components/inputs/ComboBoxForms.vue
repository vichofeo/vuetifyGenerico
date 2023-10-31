<template>
  
    
      
        <v-combobox
          v-model="dataSelected"
          :items="items"
          
          chips
          v-bind="$attrs"
        >
          <template v-slot:selection="data">
            <v-chip
              :key="JSON.stringify(data.item.value)"
              v-bind="data.attrs"
              :input-value="data.selected"
              :disabled="data.disabled"
              @click:close="data.parent.selectItem(data.item.value)"
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
  name: "ComboBoxPersonalizado",
  props: {        
    value: { type: Object, default: {value:-1,text:'-Sin Dato-'} },
    itemsCombo: {type: Array, default: []}
  },
  data() {
    return {
      select: {},
      items: [],
    };
  },

  mounted() {
    this.items = this.itemsCombo
  },
  computed: {
    dataSelected: {
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
