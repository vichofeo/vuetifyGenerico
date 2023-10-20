<template>
  <div>
    
    <list-box-forms
      :items="appItems"
      :selected="appSelected"
      label="Seleccione la Aplicacion"
      name="app"
      :onChange="onchangeModule"
    />
    <list-box-forms
      :items="moduleItems"
      :selected="moduleSelected"
      label="Seleccione El modulo"
      name="module"
      :onChange="onchangeModule"
    />
    <check-forms
      :items="controllerItems"
      label="Selecciona los submodulos"
      name="controller"
      :onClick="onclick"
      :selected="controlleExist"
    />

    <v-btn color="blue-darken-1" variant="text" @click="save"> Save </v-btn>
    datos de envio
    {{ datos }}
  </div>
</template>

<script>
import CheckForms from "../inputs/CheckForms.vue";
import ListBoxForms from "../inputs/ListBoxForms.vue";
import * as srv from "@/services/admin/ConfigPageService";
export default {
  components: { ListBoxForms, CheckForms },
  data: () => ({
    appSelected: { value: "-1", title: "-Sin Datos-" },
    moduleSelected: { value: "-1", title: "-Sin Datos-" },
    controllerSelected: { value: "-1", title: "-Sin Datos-" },
    controlleExist: [],
    appItems: [],
    moduleItems: [],
    controllerItems: [],
    datos: {},
  }),
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      try {
        const data = {
          aplicacionSelected: this.appSelected,
          moduloSelected: this.moduleSelected,
          submoduloSelected: this.controllerSelected,
        };
        const result = await srv.getDataMCA(data);

        if (result.ok) {
          const datos = result.data;
          this.appSelected = datos.aplicacionSelected;
          this.appItems = datos.aplicacion;
          this.moduleSelected = datos.moduloSelected;
          this.moduleItems = datos.modulo;
          this.controllerSelected = datos.submoduloSelected;
          this.controllerItems = datos.submodulo;
          this.controlleExist = datos.controllerExist;
        } else {
          this.appSelected = null;
          this.appItems = null;
          this.moduleSelected = null;
          this.moduleItems = null;
          this.controllerSelected = null;
          this.controllerItems = null;
          this.controlleExist = null;
        }
      } catch (error) {
        console.log(error);
      }
    },
    async onchangeModule(data) {
      this.datos = { ...this.datos, ...data };
      const aux = {
        aplicacionSelected: { value: this.datos.app },
        moduloSelected: { value: this.datos.module },
        submoduloSelected: this.controllerSelected,
      };
      const result = await srv.getDataMCA(aux);
      const datos = result.data
      this.controlleExist = datos.controllerExist
    },
    async onclick(data) {
      this.datos = { ...this.datos, ...data };
    },
    async save() {
      await srv.saveDataMCA(this.datos);
      this.onchangeModule({ x: null });
    },
  },
};
</script>

<style></style>
