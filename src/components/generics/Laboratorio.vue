<template>
  <v-card class="mx-auto" density="compact">
    <v-card-item class="text-body-1">
      <v-toolbar density="compact" rounded>
        <v-toolbar-title class="text-subtitle-2">
          LABORATORIO
        </v-toolbar-title>
      </v-toolbar>
    </v-card-item>
    <v-card-text>
      <div class="form-group">
        <v-row dense  align="center">
          <v-col cols="3" xs="12" sm="6" md="4" lg="3" xl="3">
            Tipo de Muestra
          </v-col>
          <v-col cols="3" xs="12" sm="6" md="4" lg="3" xl="3">
            Fecha de la muestra
          </v-col>
          <v-col cols="3" xs="12" sm="6" md="4" lg="3" xl="3">
            Fecha de Envio de la muestra
          </v-col>
        </v-row>
        <v-row dense v-for="i in repeat" :key="uuid" align="center">
          <v-col cols="3" xs="12" sm="6" md="4" lg="3" xl="3">
            <list-box-forms 
            :label="`Tipo de Muestra`" 
            :selected="muestraSelected" :items="muestraItems"
              :onChange="onChange" 
              name="tipo_muestra"/>
          </v-col>
          <v-col cols="3" xs="12" sm="6" md="4" lg="3" xl="3">
            <calendar-forms name="fecha_muestra" :setFunction="onChange" />
          </v-col>
          <v-col cols="3" xs="12" sm="6" md="4" lg="3" xl="3">
            <calendar-forms name="fecha_envio" :setFunction="onChange" />
          </v-col>
        </v-row>
        <v-row dense align="center">
          <v-spacer></v-spacer>
          <div>
            <v-btn variant="flat" color="error" icon="mdi-numeric-negative-1" size="small" @click="minus"></v-btn>
            <v-btn variant="flat" color="success" icon="mdi-numeric-positive-1" size="small" @click="more"></v-btn>
          </div>
        </v-row>
      </div>
    </v-card-text>{{ laboratorio }}
  </v-card>
</template>

<script>
import CalendarForms from '../inputs/CalendarForms.vue';
import ListBoxForms from '../inputs/ListBoxForms.vue'
import { v4 } from 'uuid';

export default {
  components: { ListBoxForms, CalendarForms },
  data: () => ({
    repeat: 1,
    muestraSelected: { value: 0, title: "Orina" },
    muestraItems: [
      { value: 0, title: "Orina" },
      { value: 1, title: "Sangre" },
      { value: 2, title: "Flema" }
    ],
    laboratorio: {},

  }),
  methods: {
    uuid() {
      return v4()
    },
    onChange(datos) {
      console.log("ebtroooo", datos)
      this.laboratorio = { ...this.laboratorio, ...datos }
    },
    more() {
      if (this.repeat < 10) {
        this.repeat++;
      }
    },
    minus() {
      if (this.repeat > 1) {        
        this.repeat--;
      }
    },
  }
}
</script>

<style></style>