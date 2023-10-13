<template>
  <persona name="people" :setPeople="seteoPersona" />
  <v-divider />
  <list-box
    label="Tipo de Institucion"
    name="tipo"
    :items="tipoItems"
    :selected="tipoSelected"
    :onChange="seteoVars"
  />
  <list-box
    label="Seleccione una institucion"
    name="institucion"
    :items="institucionItems"
    :selected="institucionSelected"
    :onChange="seteoVars"
  />
  <list-box
    label="Seleccione la aplicacion"
    name="app"
    :items="appItems"
    :selected="appSelected"
    :onChange="seteoVars"
  />
  <list-box
    label="Seleccione una Rol"
    name="rol"
    :items="rolItems"
    :selected="rolSelected"
    :onChange="seteoVars"
  />
  <v-divider />
  
  <div class="form-group">
    <label>Credenciales</label>
  <v-col cols="3" xs="12" sm="6" md="4" lg="3" xl="3">
    <v-text-field v-model="datosCnf.login" clearable label="Login " placeholder="Login" />
  </v-col>
  <v-col cols="3" xs="12" sm="6" md="4" lg="3" xl="3">
    <v-text-field
      v-model="datosCnf.pass"
      clearable
      label="Password"
      placeholder="Password"
    />
  </v-col>
  <v-btn color="blue-darken-1" variant="text" @click="save"> Save </v-btn>
  </div>
  <div class="form-group">
    {{mensaje}}
    </div>
  {{ datosCnf }}
</template>

<script>
import * as people from "@/service/PeopleService";
import ListBox from "../formsUtils/ListBox.vue";
import Persona from "../generics/Persona.vue";
export default {
  components: { ListBox, Persona },
  data: () => ({
    tipoSelected: { value: "-1", title: "-Sin Dato-" },
    institucionSelected: { value: "-1", title: "-Sin Dato-" },
    appSelected: { value: "-1", title: "-Sin Dato-" },
    rolSelected: { value: "-1", title: "-Sin Dato-" },
    tipoItems: [],
    institucionItems: [],
    appItems: [],
    rolItems: [],
    datosCnf: {},
    mensaje: ""
  }),

  methods: {
    async getDataCnf() {
      const data = {
        tipoSelected: this.tipoSelected,
        institucionSelected: this.institucionSelected,
        appSelected: this.appSelected,
        rolSelected: this.rolSelected,
      };
      const r = await people.getDataCnfcre(data);

      this.tipoItems = r.tipo.tipoItems;
      this.datosCnf.tipo = this.tipoSelected = r.tipo.tipoSelected;

      this.institucionItems = r.institucion.institucionItems;
      this.datosCnf.institucion = this.institucionSelected =
        r.institucion.institucionSelected;

      this.appItems = r.app.appItems;
      this.datosCnf.app = this.appSelected = r.app.appSelected;

      this.rolItems = r.rol.rolItems;
      this.datosCnf.rol = this.rolSelected = r.rol.rolSelected;
    },

    seteoVars(data) {
      this.datosCnf = { ...this.datosCnf, ...data };
      this.tipoSelected = this.datosCnf.tipo;
      this.institucionSelected = this.datosCnf.institucion;
      this.appSelected = this.datosCnf.app;
      this.rolSelected = this.datosCnf.rol;
      this.getDataCnf();
    },
    seteoPersona(data) {
      this.datosCnf = { ...this.datosCnf, ...data };
    },
    async save(){
      const results = await people.saveCnfcre(this.datosCnf)
      
      this.mensaje = results.mensaje
    }
  },

  mounted() {
    this.getDataCnf();
  },
};
</script>

<style></style>
