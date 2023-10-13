<template>
  <v-table density="compact">
    <thead>
      <tr>
        <th class="text-left" v-for="value in [
          'formulario',
          'subformulario',
          'enunciado',
          'opcion',
          'conteo',
          'frms',
        ]" :key="uuid()">
          {{ value }}
        </th>

      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, i) in items" :key="uuid()">
        <td>{{ item.nombre_formulario }}</td>
        <td>{{ item.nombre_subfrm }}</td>
        <td>{{ item.enunciado }}</td>
        <td>{{ item.respuesta }}</td>
        <td>{{ item.respuestas }}</td>
        <td>{{ item.frms }}</td>
      </tr>
    </tbody>
  </v-table>
  <v-divider/>
  <v-table density="compact">
    <thead>
      <tr>
        <th class="text-left" v-for="value in [
          'ficha',
          'semana epidemiologica',
          'dpto',
          'gestor',
          'sexo',
          'positivos',
        ]" :key="uuid()">
          {{ value }}
        </th>

      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, i) in datos" :key="uuid()">
        <td>{{ item.ficha }}</td>
        <td>{{ item.semana_epidemiologica }}</td>
        <td>{{ item.nombre_dpto }}</td>
        <td>{{ item.nombre_institucion }}</td>
        <td>{{ item.sexo }}</td>
        <td>{{ item.positivos }}</td>
      </tr>
    </tbody>
  </v-table>
</template>

<script>
import * as srv from "@/service/GetData";
import TableDataUpDel from "@/components/formsUtils/TableDataUpDel.vue";
import { v4 as uuid } from "uuid";
export default {
  components: { TableDataUpDel },
  data: () => ({
    items: null,
    datos: [],

  }),
  methods: {
    async getData() {
//{frm:datos, conteo: conteo}
       const results = await srv.getReportAll();
       
       this.items = results.frm
       this.datos = results.conteo

    },
    changeObjToArray(items) {
      if (items) {
        this.datos = items.map((obj, i) => {
          let aux = Object.values(obj);
          this.idCol[i] = aux.shift();
          return aux;
        });
      } else this.datos = [];
    },
    uuid() {
      return uuid();
    },
  },
  created() {
    this.getData();
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
