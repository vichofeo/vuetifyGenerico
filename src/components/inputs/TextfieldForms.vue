<template>
  <v-responsive class="mx-auto">
    <v-text-field
      v-model.lazy="dataModel"
      :rules="[(v) => !!v || 'El valor del campo es requerido']"
      clearable
      :label="label"
      type="input"
      hint="Digite su Respuesta"
      variant="outlined"
      density="compact"
      class="text-subtitle-2"
    :placeholder="label"
    @update:modelValue="changes"
    ></v-text-field>
  </v-responsive>
  
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
    label: {type: String, default:"Default"},
    name: {type: String, default:"Default"},
    onChange: {type:Function,  default() { return null } }
  },
  data: () => ({
    dataModel: "",
  }),
  methods:{
    changes(){
      this.onChange({[`${this.name}`]:this.dataModel})
    }
  }
};
</script>

<style></style>
