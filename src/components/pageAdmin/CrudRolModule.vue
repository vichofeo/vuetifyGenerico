<template>
    <list-box-forms :items="appItems" :selected="appSelected" label="Seleccione la Aplicacion" name="app"
        :onChange="onchangeModule" />
    <list-box-forms :items="roleItems" :selected="roleSelected" label="Seleccione El Rol" name="role"
        :onChange="onchangeModule" />
    
    
    <check-forms :items="moduleItems" label="Seleccione los modulos del Rol" name="module" :onClick="onclick"
        :selected="moduleExist" />

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
        roleSelected: { value: "-1", title: "-Sin Datos-" },
        moduleSelected: { value: "-1", title: "-Sin Datos-" },
        moduleExist: [],
        appItems: [],
        roleItems: [],
        moduleItems: [],
        datos: {}
    }),
    mounted() {
        this.getData()
    },
    methods: {
        async getData() {
            const data = { app: this.appSelected, role: this.roleSelected, module: this.moduleSelected }
            console.log("***********", data)
            const datos = await srv.getRoleMod(data)

            this.appSelected = datos.appSelected
            this.appItems = datos.appItems
            this.roleSelected = datos.roleSelected
            this.roleItems = datos.roleItems
            this.moduleSelected = datos.moduleSelected
            this.moduleItems = datos.moduleItems
            this.moduleExist = datos.moduleExist
        },
        async onchangeModule(data) {
            this.datos = { ...this.datos, ...data }
            const aux = { app: { value: this.datos.app }, role: { value: this.datos.role }, module: this.moduleSelected }
           const datos = await srv.getRoleMod(aux)
            this.moduleExist = datos.moduleExist
        },
        async onclick(data) {
            this.datos = { ...this.datos, ...data }
        },
        async save() {
            await srv.saveRoleMod(this.datos)
            this.onchangeModule({ x: null })
        },
    },
}
</script>
  
<style></style>