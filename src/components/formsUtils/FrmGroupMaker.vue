<template>
  <v-row dense no-gutters >
    <v-col cols="3" xs="12" sm="6"  md="4" lg="3" xl="3">
  <TextfieldForms :label="`Nombre Grupo de formularios`"  :name="`name_group`" :onChange="setValues"/>
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


  {{ message }}
</template>

<script>
import BtnNewForms from '../inputs/BtnNewForms.vue';
import TextfieldForms from '../inputs/TextfieldForms.vue';

import * as srv from "@/service/SaveData"

export default {
  name:"",
    components: { TextfieldForms, BtnNewForms },
    data : () =>({
      subfrm: {},
      message:""
    }),
    methods:{
      setValues(data){
        const aux = {...this.subfrm}
        this.subfrm= { ...aux, ...data}
      }, 
      async save(){
        //envia datos
        const datos = {
          nombre_grupo_formulario: this.subfrm.name_group,
          descripcion: this.subfrm.description,
          aplicacion_id:1
        }

        await srv.registrarGrupo(datos)
        this.message = "elemento guardado"
    }
}
}
</script>

<style>

</style>