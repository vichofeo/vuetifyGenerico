<template>
  <v-table density="compact">
    <thead>
      <tr>
        <th class="text-left" v-for="value in titles" :key="uuid()">{{value}}</th>
        <th>Opciones</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, i) in datos" :key="uuid()">
        <td v-for="(value, j) in item" :key="uuid()"  >{{ value }}</td>
        <td><btn-update-del :idx="`${idCol[i] }`" :fmodify="fmodify" :fdelete="fdelete"/></td>
      </tr>
    </tbody>
  </v-table>
  {{ datos }}
  {{ idCol }}
</template>

<script>
import { v4 as uuid } from "uuid";
import BtnUpdateDel from './BtnUpdateDel.vue';
export default {
  components: { BtnUpdateDel },
  props: {
    items: { type: Array, default: [] },
    titles: { type: Array, default: [] },
    fmodify: {type: Function, default() { return null }},
    fdelete: {type: Function, default() { return null }},
    },

  data: () => ({
    datos: [],
    idCol:[]
  }),
  methods: {
    changeObjToArray() {
      if(this.items){
        this.datos = this.items.map((obj, i) => {
        let aux = Object.values(obj)
        this.idCol[i] = aux.shift()        
        return aux
      });
      }else this.datos=[]
      
      
    },

    uuid() {
      return uuid();
    },
  },
  mounted() {
    this.changeObjToArray();
  },
  items: {
      deep: true,
      handler: function (newValue, oldValue) {
        this.items = newValue;
      },
    },
};
</script>

<style></style>
