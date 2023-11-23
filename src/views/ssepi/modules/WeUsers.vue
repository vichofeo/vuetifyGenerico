<template>
  <v-main>
    <v-row no-gutters>
      <v-col cols="12">
        <v-card>
          <v-card-text>
            <v-row>
              <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
                <ContenedorCard title="Lista de usuarios" :color="'blue darken-2'"
                  :avatar="`/img/${institucion.nombre_corto}.png`">
                  <TableData :headers="headers" :items="items" :opColor="'blue'" v-model="itemSelected"
                    :itemsPerPage="10"></TableData>
                </ContenedorCard>
              </v-col>
              <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
                <ContenedorCard title="Formulario de datos" color="#7796bd" icon="mdi-account-multiple-plus">
                  <div>
                    <BoxBuscaPersona :onClick="buscar" v-if="swEditar"></BoxBuscaPersona>
                    <v-row v-if="datosBuscar.exito">
                      <v-col cols="12" xs="12" sm="12" md="6" xl="4" lg="4" v-for="(obj, nameObj) in datosBuscar.campos"
                        :key="'srhTb' + nameObj">
                        <v-text-field v-model="datosBuscar.valores[nameObj]" :label="obj[0]" :readonly="!obj[1]"
                          :filled="!obj[1]" :rounded="!obj[1]" dense v-if="obj[3] == 'T'" />

                        <combo-box-forms v-model="datosBuscar.valores[nameObj].selected"
                          :items-combo="datosBuscar.valores[nameObj].items" :label="obj[0]" :readonly="!obj[1]"
                          :filled="!obj[1]" :rounded="!obj[1]" dense hide-details :disable-lookup="true" flat v-else-if="obj[3] == 'C' &&
                            datosBuscar.valores[nameObj] &&
                            datosBuscar.valores[nameObj].selected
                            " />
                        <CalendarForms :label="obj[0]" :name="nameObj" :yyyymmdd="datosBuscar.valores[nameObj]"
                          :set-function="() => { }" v-else-if="obj[3] == 'F'" />
                        <div v-else>
                          <div class="font-weight-black">{{ obj[0] }}:</div>
                          <span v-if="obj[3] == 'T'">{{
                            datosBuscar.valores[nameObj]
                          }}</span>
                          <span v-else>
                            {{
                              datosBuscar.valores[nameObj]?.selected?.text
                            }}</span>
                        </div>
                      </v-col>
                      <v-col cols="12" xs="12" sm="12" md="12" xl="12" lg="12" v-if="datosBuscar.instituciones">
                        <combo-box-forms v-model="datosBuscar.instituciones.selected"
                          :items-combo="datosBuscar.instituciones.items" dense hide-details :disable-lookup="true" flat />
                      </v-col>
                      <v-col cols="12" xs="12" sm="12" md="6" xl="6" lg="6">
                        <v-text-field append-icon="mdi-account" name="login" label="Login" type="text"
                          v-model="datosBuscar.valores.login" :error="error" :rules="[rules.required]"></v-text-field>
                      </v-col>
                      <v-col cols="12" xs="12" sm="12" md="6" xl="6" lg="6">
                        <v-text-field :type="hidePassword ? 'password' : 'text'" :append-icon="hidePassword ? 'mdi-eye-off' : 'mdi-eye'
                          " name="password" label="Password" id="password" :rules="[rules.required]"
                          v-model="datosBuscar.valores.passs" :error="error"
                          @click:append="hidePassword = !hidePassword"></v-text-field>
                      </v-col>
                      <v-btn block color="primary" @click="guardar()" :loading="loading">Guardar</v-btn>
                    </v-row>
                    <div v-else-if="datosBuscar.mensaje">
                      <contenedor-alert dark outlined border="bottom" color="grey darken-2" elevation="2" icon="mdi-alert"
                        prominent>
                        {{ datosBuscar.mensaje }}
                      </contenedor-alert>
                    </div>
                  </div>
                  <template v-slot:actions>
                    <v-icon class="mr-1" small> mdi-clock-outline </v-icon>
                    <span class="caption grey--text font-weight-light">Por favor verifique sus campos para la busqueda y
                      el
                      guardado</span>
                  </template>
                </ContenedorCard>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-main>
</template>

<script>
import * as srv from "@/services/ssepi/geoRefDataService";
import ContenedorCard from "@/components/utils/ContenedorCard.vue";
import TableData from "@/components/utils/TableDataChecks.vue";
import BoxBuscaPersona from "@/components/utils/BoxBuscaPersona.vue";

import ComboBoxForms from "@/components/inputs/ComboBoxForms.vue";
import CalendarForms from "@/components/inputs/CalendarForms.vue";
import ContenedorAlert from "@/components/utils/ContenedorAlert.vue";

import { optionsToast } from "@/components/utils/toastOptions";

export default {
  components: {
    ContenedorCard,
    TableData,
    BoxBuscaPersona,
    ComboBoxForms,
    CalendarForms,
    ContenedorAlert,
  },
  data() {
    return {
      itemSelected: [],
      items: [],
      selected: {},
      headers: [
        { value: "nombre_institucion", text: "Institucion" },
        { value: "dni_persona", text: "DNI" },
        { value: "primer_apellido", text: "P. Apellido" },
        { value: "nombres", text: "Nombre" },
        { value: "login", text: "Login" },
      ],
      datosBuscar: [],
      swEditar: true,
      rules: {
        required: (value) => !!value || "Required.",
      },
      hidePassword: true,
      error: false,
      loading: false,
      institucion: {},
    };
  },
  methods: {
    async init() {
      try {
        const results = await srv.getWeUsers();
        this.items = results.items;
        this.institucion = results.institucion;
      } catch (error) {
        console.log(error);
      }
    },
    async buscar(datos, edit) {
      if (edit) {
        if (datos.length > 0) {
          const results = await srv.getWeUser(datos[0].dni_persona);
          this.datosBuscar = results.data["Personal"];
          this.datosBuscar.exito = true;
          this.datosBuscar.valores.login = datos[0].login;
          this.datosBuscar.valores.passs = "*****";
          this.swEditar = false;
        } else {
          this.swEditar = true;
          this.datosBuscar = [];
        }
      } else {
        const results = await srv.getWeUser(datos.numero_documento);
        this.datosBuscar = results.data["Personal"];
        this.swEditar = true;
      }
    },
    async guardar() {
      const data = {};
      for (const key in this.datosBuscar.valores) {
        if (
          this.datosBuscar.valores[key] &&
          typeof this.datosBuscar.valores[key] == "object"
        ) {
          data[key] = this.datosBuscar.valores[key].selected.value;
        } else data[key] = this.datosBuscar.valores[key];
      }

      const datos = {
        insert: this.swEditar,
        data: data,
        institucion: this.datosBuscar?.instituciones?.selected,
      };
      console.log(datos);

      const results = await srv.saveWeUser(datos);

      if (results.ok) {
        //this.init()
        this.datosBuscar = [];
        this.itemSelected = [];
        this.showInfo(results.message);
      } else this.showError("Ocurrio un error. " + results.message);
    },

    showAdvertencia(mensaje) {
      this.$toast.warning(mensaje, optionsToast);
    },
    showInfo(mensaje) {
      this.$toast.info(mensaje, optionsToast);
    },
    showError(mensaje) {
      this.$toast.error(mensaje, optionsToast);
    },
  },
  mounted() {
    this.init();
  },
  watch: {
    itemSelected: {
      deep: true,
      handler: function (newValue, oldValue) {
        this.buscar(newValue, true);
      },
    },
  },
};
</script>
