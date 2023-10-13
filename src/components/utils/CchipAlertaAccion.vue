<template>
  <div v-if="datos>0">
    <div v-if="datos==1">
    <v-icon class="material-icons"  color="red accent-3" >
      mdi-account-alert              
    </v-icon> <div class="red--text text--accent-4">Dar Baja</div>   
  </div>
  <div v-if="datos==2">
    <v-icon class="material-icons"  color="teal darken-3" >
      mdi-email-alert
    </v-icon> <div class="teal--text text--darken-4">Reportar</div>   
  </div>
  </div>
  <div v-else>
    -
  </div>
</template>

<script>
export default {
props:{
    datos: {type:Number, default: -1}
},
data() {
    return {
        
    }
},
}
</script>

<style>

</style>