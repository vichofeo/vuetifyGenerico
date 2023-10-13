<template>
  <div v-if="datos.viewNovedad > 0"> 
    <div v-if="datos.viewNovedad == 1">
      <v-icon class="material-icons" color="red darken-2">
        mdi-alert-circle-outline
      </v-icon>
      
    </div>
      <div v-else>
        <v-icon class="material-icons" color="amber darken-3">
          mdi-alert-outline
        </v-icon>
      </div>
    
  </div>
  <div v-else>
    -
  </div>
</template>

<script>
/**
 * viewNovedad = 1 alerta rojo + cod novedad
 * viewNovedad = 2 alerta amrillo
 * viewNovedad = 4 alerta amrillo // no tiene alerta pero pertenece a los codigos de estado
 * vienovedad = -1 mostrat guion
 */
export default {
  props: {
    datos: { type: Object, default: () => (null) }
  },
  data() {
    return {

    }
  },
}
</script>

<style></style>