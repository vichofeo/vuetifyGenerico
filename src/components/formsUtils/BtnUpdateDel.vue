<template>
  <v-btn
  class="text-none ms-4 text-white"
    variant="flat"
    size="small"
    color="blue-darken-1"
    @click="fmodify(idx)"
    prepend-icon="mdi-image-edit-outline"
    density="compact"
  >    
    Modificar
  </v-btn>
  <v-btn
  class="text-none ms-4 text-white"
    variant="flat"
    size="small"
    color="red-darken-1"
    @click="fdelete(idx)"
    prepend-icon="mdi-delete-forever-outline"
    density="compact"
  >
    
    Eliminar
  </v-btn>
</template>

<script>
export default {
  props: {
    fmodify: {
      type: Function,
      default() {
        return null;
      },
    },
    fdelete: {
      type: Function,
      default() {
        return null;
      },
    },
    idx: { type: String, default: "-1" },
  },
  methods:{}
};
</script>

<style></style>
