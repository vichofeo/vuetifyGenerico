<template>

  <v-card class="mx-auto" density="compact">
    <v-card-item class="text-body-1">
      <v-toolbar density="compact" rounded>
        <v-toolbar-title class="text-subtitle-2">
          {{ label }}
        </v-toolbar-title>
      </v-toolbar>
    </v-card-item>
    <v-card-text>
      <div class="form-group">
        <v-row dense  align="center">
          <v-col cols="3" xs="12" sm="6" md="4" lg="3" xl="3">
            <lugar-pais :set-lugar="setLugar" />
          </v-col>
          <v-col cols="3" xs="12" sm="6" md="4" lg="3" xl="3">
            <v-text-field v-model="lugarPersona.ciudad" clearable label="Zona" placeholder="Barrio" />
            <v-text-field v-model="lugarPersona.barrio" clearable label="Barrio" placeholder="Barrio" />
          </v-col>
          <v-col cols="3" xs="12" sm="6" md="4" lg="3" xl="3">
            <calendar-forms :label="`Fecha Posible Contagio`" :setFunction="setfechaInfectado" />
          </v-col>
          
        </v-row>        
      </div>
    </v-card-text>{{ antEpi }}
  </v-card>


</template>
  
<script>
import CalendarForms from '../inputs/CalendarForms.vue'


import LugarPais from './LugarPais.vue'

export default {
  props:{
    label:{type:String, default:"Lugar probable de Infeccion"}
  },
  components: { LugarPais, CalendarForms },
  data: () => ({
    lugarPersona: {
      lugar: null,
      ciudad: null,
      zona: null,
      fecha_infectado: null

    },
    loading: false,
  }),

  methods: {
    setLugar(dato) {
      this.lugarPersona = { ...this.lugarPersona, ...dato }
    },
    setfechaInfectado(dato) {
      this.lugarPersona = { ...this.lugarPersona, fecha: dato }
    }
  },
}
</script>
  
<style></style>