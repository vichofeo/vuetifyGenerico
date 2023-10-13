<template>
  <v-container class="bg-grey-lighten-2">
    <v-table class="text-subtitle-1">
      <thead>
      <tr>
        <th class="text-left">
          
        </th>
        <th class="text-left" v-for="(obj, i) in answers[0].answers" >
          {{obj.answer}}
        </th>
      </tr>
    </thead>
      <tbody>
        <tr v-for="(obj, i) in answers">
          <td>{{ obj.question }}</td>
          <td v-for="(o, j) in obj.answers" class="text-left"> 
              
            <v-text-field v-model.number="dataModel[i][j]" :rules="[(v) => !!v || 'El valor del campo es requerido']"
              
            variant="outlined" density="compact" class="text-subtitle-2"></v-text-field>
          
          </td>
        </tr>
      </tbody>
    </v-table>
   
  </v-container>
  {{ dataModel }}
</template>

<script>
import { reactive } from "vue";
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
  setup(props) {
    const data = props.answers.map((obj, i) => {
      return obj.answers.map((o, j) => {
        return 0;
      });
    });

    const dataModel = reactive({
      ...data,
    });
    return { dataModel };
  },
};
</script>

<style></style>
