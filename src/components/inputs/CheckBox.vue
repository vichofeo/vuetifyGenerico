<template>
  <div>
    
      <v-row no-gutters>
        <v-col cols="12" sm="4" md="4" v-for="(obj, i) in answers">
          <v-checkbox
            v-model="dataModel"
            :label="obj.answer"
            color="orange-darken-3"
            :value="obj.answer"
            hide-details
          ></v-checkbox>
        </v-col>       
      

      </v-row>
    
  </div>
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
  props:{
    answers:{type: Array, default: []}
  },
  data: () => ({
    dataModel: [],
  }),
};
</script>
