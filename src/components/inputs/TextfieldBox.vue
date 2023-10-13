<template>
  <v-responsive class="mx-auto">
    <v-text-field
      v-model="dataModel"
      :rules="[(v) => !!v || 'El valor del campo es requerido']"
      clearable
      label="Respuesta"
      type="input"
      hint="Digite su Respuesta"
      variant="outlined"
      density="compact"
      class="text-subtitle-2"
      v-for="(obj, i) in answers"
    ></v-text-field>
  </v-responsive>
  {{ dataModel }}
</template>

<script>
/**
 * 0  -> 1 radio
 * 1  -> 2 check
 * 2  -> 4 texto
 * 3  -> 8 grid Respuestas
 *
 */
export default {
  props: {
    answers: { type: Array, default: [] },
  },
  data: () => ({
    dataModel: "",
  }),
};
</script>

<style></style>
