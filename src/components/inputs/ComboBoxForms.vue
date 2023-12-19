<template>
  
    
      
        <v-combobox
          v-model="dataSelected"
          :items="items"
          
          chips
          v-bind="$attrs"
          @change="onChange"
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
                class="primary white--text"
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
    itemsCombo: {type: Array, default() {return []}},
    onChange: { type: Function, default() { return null; }}, 
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

  watch: {
    itemsCombo: {
      deep: true,
      handler: function (newValue, oldValue) {
        //console.log("control nuevo: ",newValue, "valor antiguo", oldValue)
        this.items =  newValue
        if(oldValue)
        this.dataSelected = this.items[0]
      },
    },
  },
};
</script>
