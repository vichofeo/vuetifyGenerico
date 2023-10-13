<template>
 <v-card class="mx-auto" density="compact">
    <v-card-item class="text-body-1">
      <v-toolbar density="compact" rounded>
        <v-toolbar-title class="text-subtitle-2">
          CONTACTOS
        </v-toolbar-title>
      </v-toolbar>
    </v-card-item>
    <v-card-text>
      <div class="form-group">
        <v-row dense  align="center">
          
        </v-row>
        <v-row dense v-for="i in repeat" :key="uuid" align="center">
          <v-col cols="12" >
            <persona/>
          </v-col>
          
          <v-col cols="3" xs="12" sm="6" md="4" lg="3" xl="3">
            <list-box-forms :label="`Parentesco`" :selected="parentescoSelected" :items="parentescoItems" :onChange="onChange"/>
          </v-col>
          <v-col cols="3" xs="12" sm="6" md="4" lg="3" xl="3">
            <textfield-forms :label="`Direccion`" />
          </v-col>
          <v-col cols="3" xs="12" sm="6" md="4" lg="3" xl="3">
            <textfield-forms :label="`Telefono`"/>
          </v-col>
          <v-col cols="3" xs="12" sm="6" md="4" lg="3" xl="3">
            <calendar-forms :label="`Fecha de Contacto`"/>
          </v-col>
          <v-col cols="3" xs="12" sm="6" md="4" lg="3" xl="3">
            <textfield-forms :label="`Lugar de Contacto`"/>
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





<v-row dense no-gutters v-for="i in repeat">
    
    
      <v-col cols="3" xs="12" sm="6"  md="4" lg="3" xl="3">
  
    </v-col>
    <v-col cols="3" xs="12" sm="6"  md="4" lg="3" xl="3">
        
    </v-col>  
    <v-col cols="3" xs="12" sm="6"  md="4" lg="3" xl="3">
        
    </v-col>
    <v-col cols="3" xs="12" sm="6"  md="4" lg="3" xl="3">
  
    </v-col>
    <v-col cols="3" xs="12" sm="6"  md="4" lg="3" xl="3">
        
    </v-col>
    
</v-row>

      
</template>

<script>
import CalendarForms from '../inputs/CalendarForms.vue';
import ListBoxForms from '../inputs/ListBoxForms.vue'
import RadioBtnForms from '../inputs/RadioBtnForms.vue';
import TextfieldForms from '../inputs/TextfieldForms.vue';
import Persona from './Persona.vue';

export default {
  components: { ListBoxForms,  CalendarForms, RadioBtnForms, TextfieldForms, Persona },
data:()=>({
    repeat: 1,
    parentescoSelected: {value:0, title:"to"},
    parentescoItems:[{value:0, title:"tio"},
    {value:1, title:"Sobrino"},
    {value:2, title:"Amigo"}],
    radioCarnet:{label: "Vericado con carnet", options:[{value:'Y', label:"Si"}, {value:'N', label:"No"}]},
}),
methods:{
    onChange (datos){

    },
    more() {
      if (this.repeat < 10) {
        this.repeat++;
      }
    },
    minus() {
      if (this.repeat > 1) {
        //this.message.pop();
        this.repeat--;
      }
    },
}
}
</script>

<style>

</style>