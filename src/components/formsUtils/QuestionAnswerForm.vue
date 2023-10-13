<template>
  <v-card  variant="flat" >
    <v-card-title>
      <v-row>
        <v-col cols="6" xs="6" sm="6" xl="6" md="6" lg="6">
          <v-text-field
            density="compact"
            variant="underlined"
            v-model="message"
            append-icon="mdi-frequently-asked-questions"
            clear-icon="mdi-close-circle"
            clearable
            label="Formule su pregunta"
            type="text"
            
          ></v-text-field>
        </v-col>
        <v-col cols="6" xs="6" sm="6" xl="6" md="6" lg="6">
          <v-combobox
            variant="underlined"
            v-model="select"
            :items="items"
            label="Tipo de respuesta"
          >
            <template v-slot:selection="data">
              <v-chip
                variant="text"
                :key="JSON.stringify(data.item)"
                v-bind="data.attrs"
                :model-value="data.selected"
                :disabled="data.disabled"
                size="small"
                @click:close="data.parent.selectItem(data.item)"
              >
                <template v-slot:prepend>
                  <v-avatar color="primary" class="bg-accent text-uppercase" start>{{
                    data.item.title.slice(0, 1)
                  }}</v-avatar>
                </template>
                {{ data.item.title }}
              </v-chip>
            </template>
          </v-combobox>
        </v-col>
      </v-row>
    </v-card-title>
    <v-card-text>
      
      <radio-check-text :answerType="select.value" :saveData="saveData" v-if="select.value <= 2" />
      <grid :answerType="select.value" :saveData="saveData" v-if="select.value == 3" />
    </v-card-text>
    
  </v-card>
  {{ answer }}
</template>

<script>
import Grid from "./Grid.vue";
import RadioCheckText from "./RadioCheckText.vue";
import * as srv from "@/service/GetData"
/**
 * 0  -> 1 radio
 * 1  -> 2 check
 * 2  -> 4 texto
 * 3  -> 8 grid Respuestas
 *
 */
export default {
  name:"Question-Answer",
  props:{
    hereditaryFunction:{type: Function, default() {return null } },
    
  },
  components: { RadioCheckText, Grid },
  data: () => ({
    answer:[],
    message: "",
    select: { },
    items: [],
  }),

  computed: {},

  methods: {
   saveData(data){
    this.answer = {
        question:this.message,
        order:0,
        type: this.select.value,
        answers: data
    }
    this.hereditaryFunction(this.answer)
   },
   async initialData(){
    const data =  await srv.getTypeQuestion()
    this.select = data.selected
    this.items =  data.items
   }
  },
  created(){
    this.initialData()
  }
};
</script>

<style></style>
