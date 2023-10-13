<template>
  <list-box-forms :items="appItems" :selected="appSelected" label="Seleccione la Aplicacion" name="app"
    :onChange="onchangeModule" />
  <list-box-forms :items="moduleItems" :selected="moduleSelected" label="Seleccione El modulo" name="module" 
  :onChange="onchangeModule"/>
  <check-forms :items="controllerItems" 
  label="Selecciona los submodulos" 
  name="controller" 
  :onClick="onclick" 
  :selected="controlleExist"
  />
  
  <v-btn color="blue-darken-1" variant="text" @click="save">
    Save
  </v-btn>
  {{ datos }}
</template>

<script>
import CheckForms from '../inputs/CheckForms.vue'
import ListBoxForms from '../inputs/ListBoxForms.vue'
import * as srv from '@/service/ConfigPage'
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
    datos: {}
  }),
  mounted() {
    this.getData()
  },
  methods: {
    async getData() {
      const data = { app: this.appSelected, module: this.moduleSelected, controller: this.controllerSelected }
      const datos = await srv.getDataMCA(data)

      this.appSelected = datos.appSelected
      this.appItems = datos.appItems
      this.moduleSelected = datos.moduleSelected
      this.moduleItems = datos.moduleItems
      this.controllerSelected = datos.controllerSelected
      this.controllerItems = datos.controllerItems
      this.controlleExist = datos.controllerExist
    },
    async onchangeModule(data) {      
      this.datos = { ...this.datos, ...data }
      const aux = { app: {value:this.datos.app}, module: {value:this.datos.module}, controller: this.controllerSelected }
      const datos = await srv.getDataMCA(aux)
      this.controlleExist = datos.controllerExist
    },
    async onclick(data) {
      this.datos = { ...this.datos, ...data }      
    },
    async save() {    
     await srv.saveDataMCA(this.datos)
     this.onchangeModule({x:null})
    },
  },
}
</script>

<style></style>