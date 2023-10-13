<template>
  <v-row no-gutters dense>
    <v-col cols="12" xs="12" sm="8" md="10" lg="10" xl="10">
      <v-card class="mx-auto" color="grey-lighten-3" >
        <v-card-text>
          <v-text-field
          v-model="persona.dni_persona"
            :loading="loading"
            density="compact"
            variant="solo"
            label="Doc. Identidad - Compl"
            append-inner-icon="mdi-magnify"
            single-line
            hide-details
            @click:append-inner="searchPeople"
            clearable
          ></v-text-field>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row >
    <v-row no-gutters dense v-if="!mensaje">
    <v-col cols="3" xs="12" sm="6" md="4" lg="3" xl="3">
      <v-text-field
        v-model="persona.primer_apellido"
        clearable
        label="Primer Apellido"
        placeholder="Primer Apellido"
      />
    </v-col>
    <v-col cols="3" xs="12" sm="6" md="4" lg="3" xl="3">
      <v-text-field
        v-model="persona.segundo_apellido"
        clearable
        label="Segundo Apellido"
        placeholder="Segundo Apellido"
      />
    </v-col>
    <v-col cols="3" xs="12" sm="6" md="4" lg="3" xl="3">
      <v-text-field
        v-model="persona.casada_apellido"
        clearable
        label="Apellido de casada"
        placeholder="Apellido de casada"
      />
    </v-col>
    <v-col cols="3" xs="12" sm="6" md="4" lg="3" xl="3">
      <v-text-field
        v-model="persona.nombres"
        clearable
        label="Nombres"
        placeholder="Nombres"
      />
    </v-col>
    <v-col cols="3" xs="12" sm="6" md="4" lg="3" xl="3">
      <v-text-field
        v-model="persona.telefono"
        clearable
        label="Telefono"
        placeholder="Telefono"
      />
    </v-col>
    <v-col cols="3" xs="12" sm="6" md="4" lg="3" xl="3">
      <radio-btn-forms
        :items="{
          label: 'Sexo',
          options: [
            { label: 'Masculino', value: 'M' },
            { label: 'Femenino', value: 'F' },
          ],
        }"
        name="sexo"
        :selected="persona.sexo"
        :onClick="setLugar"
      />
    </v-col>
    <v-col cols="3" xs="12" sm="6" md="4" lg="3" xl="3">
      <calendar-forms label="Fecha de Nacimiento" :yyyymmdd="persona.fecha_nacimiento" :setFunction="setLugar" name="fecha_nacimiento"/>
    </v-col>
    <v-col cols="3" xs="12" sm="6" md="4" lg="3" xl="3">
      <lugar-pais :set-lugar="setLugar" name="lugar" :selected="lugarSelected"/>
    </v-col>
    <v-col cols="3" xs="12" sm="6" md="4" lg="3" xl="3">
      <v-text-field
        v-model="persona.direccion"
        clearable
        label="Direccion Residencia"
        placeholder="Direccion"
      />
    </v-col>
    <v-col cols="3" xs="12" sm="6" md="4" lg="3" xl="3">
      <v-text-field
        v-model="persona.zona"
        clearable
        label="Zona Residencia"
        placeholder="Barrio"
      />
    </v-col>
    <v-col cols="3" xs="12" sm="6" md="4" lg="3" xl="3">
      <v-text-field
        v-model="persona.barrio"
        clearable
        label="Barrio "
        placeholder="Barrio"
      />
    </v-col>
  </v-row>
  
  <div class="form-group" v-else>
{{ mensaje }}
  </div>
  
</template>

<script>
import RadioBtnForms from "../inputs/RadioBtnForms.vue";
import LugarPais from "./LugarPais.vue";
import CalendarForms from "@/components/inputs/CalendarForms.vue"

import * as people from "@/service/PeopleService"

export default {
  props:{
    name: { type: String, default: "defaultPeople" },
    setPeople: {
      type: Function,
      default() {
        return "Default function";
      },
    },
  },
  components: { RadioBtnForms, LugarPais, CalendarForms  },
  data: () => ({
    loading: false,    
    mensaje: ' ',
    persona: {
      dni_persona: null,
      primer_apellido: null,
      segundo_apellido: null,
      casada_apellido: null,
      nombres: null,
      telefono: null,
      fecha_nacimiento: null,
      sexo: null,
      cod_pais: null,
      cod_dpto: null,
      cod_municipio: null,
      direccion: null,
      zona: null,
      barrio: null,
      lugar: {},
    },
    lugarSelected: {p:"-1", d:"-1", m:"-1"},
    loading: false,
  }),

  methods: {
    setLugar(dato) {
      this.persona = { ...this.persona, ...dato };
      this.setPeople({[`${this.name}`]: this.persona })
    },

   async searchPeople(){
    this.loading = true
    const result = await people.searchPeople({dni_persona: this.persona.dni_persona})
    if(result.status){
      this.mensaje = null
      this.persona = result.mensaje
      this.lugarSelected= {p:result.mensaje.cod_pais, d:result.mensaje.cod_dpto, m:result.mensaje.cod_municipio}
    }else{
      this.mensaje = result.mensaje
      this.persona = {}
    }

    this.loading = false
    },

  },
};
</script>

<style></style>
