<template>
   <v-btn
      variant="flat"
        size="small"
        color="error"
        @click="cancel"
      >
        Cancelar
      </v-btn>
      <v-btn
      variant="flat"
        size="small"
        color="success"
        @click="save"
      >
        Guardar
      </v-btn>
</template>

<script>
export default {
    props:{
        save:{type:Function},
        cancel:{type:Function}
    }

}
</script>

<style>

</style>