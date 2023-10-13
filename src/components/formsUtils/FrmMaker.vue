<template>
  <v-row dense no-gutters >
    
    <v-col cols="3" xs="12" sm="6"  md="4" lg="3" xl="3">
      <list-box-forms :label="`Seleccione para que enfermedad es el Formulario`" :selected="enferSelected" :items="enferItems" :name="`enfermedad`" :onChange="setValues"/>
    </v-col>
  </v-row>
  <check-forms :label="`Incluya formas predetermidad haciendo clic`" :items="frmopsItems" :name="`opcionales`" :onClick="setValues"/>
  <v-row dense no-gutters >
    <v-col cols="3" xs="12" sm="6"  md="4" lg="3" xl="3">
  <TextfieldForms :label="`Codigo Formulario`"  :name="`cod_frm`" :onChange="setValues"/>
  </v-col>
  <v-col cols="3" xs="12" sm="6"  md="4" lg="3" xl="3">
  <TextfieldForms :label="`Nombre Formulario`"  :name="`name_frm`" :onChange="setValues"/>
  </v-col>
  <v-col cols="3" xs="12" sm="6"  md="4" lg="3" xl="3">
  <TextfieldForms :label="`Descripcion`"  :name="`description`" :onChange="setValues"/>
  </v-col>
  </v-row>
  <v-row dense no-gutters >
    <v-divider/>
    <v-spacer/>
    <BtnNewForms :label="`Guardar`" :onClick="save"/>
  </v-row>


  {{ subfrm }}
</template>

<script>
import BtnNewForms from '../inputs/BtnNewForms.vue';
import TextfieldForms from '../inputs/TextfieldForms.vue';

import * as srv from "@/service/SaveData"
import * as get from "@/service/GetData"
import ListBoxForms from '../inputs/ListBoxForms.vue';
import CheckForms from '../inputs/CheckForms.vue';


export default {
  name:"",
    components: { TextfieldForms, BtnNewForms, ListBoxForms, CheckForms },
    data : () =>({
      subfrm: {},
      message:"",
      enferSelected:{},
      enferItems: [],
      frmopsSelected:{},
      frmopsItems: [],
      

    }),
    methods:{
      
      setValues(data){
        const aux = {...this.subfrm}
        this.subfrm= { ...aux, ...data}
      }, 
      async initialData(){
        let aux = await get.getEnfermedad()
        this.enferSelected = aux.selected
        this.enferItems = aux.items
       
        aux= await get.getfrmOptions()
        this.frmopsSelected = aux.selected
        this.frmopsItems = aux.items

        

      },
      async save(){
        //envia datos
        const datos = {
          grupo_formulario_id: this.$store.state.frmSelect.gfrm,
          cod_enfermerdad: this.subfrm.enfermedad,
          codigo_formulario: this.subfrm.cod_frm, 
          nombre_formulario: this.subfrm.name_frm, 
          descripcion: this.subfrm.description,
          opcionales: this.subfrm.opcionales
        }

        await srv.registrarFrm(datos)
        this.message = "elemento guardado"
    }
},
created(){
  this.initialData()
}
}
</script>

<style>

</style>