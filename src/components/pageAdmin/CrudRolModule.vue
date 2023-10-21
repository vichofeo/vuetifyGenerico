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
      :items="roleItems"
      :selected="roleSelected"
      label="Seleccione El Rol"
      name="role"
      :onChange="onchangeRole"
    />

    <check-forms
      :items="moduleItems"
      label="Seleccione los modulos del Rol"
      name="module"
      :onClick="onclick"
      :selected="moduleExist"
    />

    <v-btn color="blue-darken-1" variant="text" @click="save"> Save </v-btn>
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
    roleSelected: { value: "-1", title: "-Sin Datos-" },
    moduleSelected: { value: "-1", title: "-Sin Datos-" },
    moduleExist: [],
    appItems: [],
    roleItems: [],
    moduleItems: [],
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
          rolSelected: this.roleSelected,
          moduloSelected: this.moduleSelected,
        };
        console.log("***********", data);
        const datos = await srv.getRoleMod(data);

        this.appSelected = datos.data.aplicacionSelected;
        this.appItems = datos.data.aplicacion;
        this.roleSelected = datos.data.rolSelected;
        this.roleItems = datos.data.rol;
        this.moduleSelected = datos.data.moduleSelected;
        this.moduleItems = datos.data.modulo;
        this.moduleExist = datos.data.moduleExist;
      } catch (error) {
        console.log(error);
      }
    },
    async onchangeModule(data) {
      this.datos = { ...this.datos, ...data };
      const aux = {
        aplicacionSelected: { value: this.datos.app },
        rolSelected: { value: this.datos.role },
        moduloSelected: this.moduleSelected,
      };
      const datos = await srv.getRoleMod(aux);
      
      this.roleSelected = datos.data.rolSelected;
      this.roleItems = datos.data.rol;
      this.moduleExist = datos.data.moduleExist;
    },
    async onchangeRole(data) {
      this.datos = { ...this.datos, ...data };
      const aux = {
        aplicacionSelected: { value: this.datos.app },
        rolSelected: { value: this.datos.role },
        moduloSelected: this.moduleSelected,
      };
      const datos = await srv.getRoleMod(aux);
      
      this.moduleSelected = datos.data.moduleSelected;
        this.moduleItems = datos.data.modulo;
        this.moduleExist = datos.data.moduleExist;
    },
    async onclick(data) {
      this.datos = { ...this.datos, ...data };
    },
    async save() {
      await srv.saveRoleMod(this.datos);
      this.onchangeModule({ x: null });
    },
  },
};
</script>

<style></style>
