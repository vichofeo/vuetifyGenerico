<template>
  <v-main>
    <v-row no-gutters>
      <v-col cols="12" >
        <v-card>
          <v-card-title>Administracion de usuarios</v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
<ContenedorCard title="Lista de usuarios" :color="'teal'">
  <TableData :headers="headers" :items="items" :opColor="'teal'" v-model="itemSelected"></TableData>
</ContenedorCard>
              </v-col>
              <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
formuarlio  {{ itemSelected }}
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
import ContenedorCard from '@/components/utils/ContenedorCard.vue';
import TableData from '@/components/utils/TableDataChecks.vue';
export default {
  components: { ContenedorCard, TableData },
data() {
  return {
    itemSelected: [],
    items: [],
    selected: {},
    headers:[
      {value: 'nombre_institucion', text:'Institucion'},
			{value: "dni_persona", text: "DNI"},
			{value: "primer_apellido", text:"P. Apellido"},
			{value: "nombres", text: "Nombre"},
			{value: "login", text: "Login"}
    ]
  }
},
methods: {
  async init(){
    try {
      const results =  await srv.getWeUsers()
      this.items = results.items    
    } catch (error) {
        console.log(error);
    };
    
    

  }
},
mounted() {
  this.init()
},
}
</script>