<template>
  <v-btn
    class="text-none ms-4 text-white"
    dark
    
    variant="flat"
    size="small"
    color="success"
    prepend-icon="mdi-newspaper-variant-multiple-outline"
    density="compact"
    @click="clicked"
  >
    {{label}}
  </v-btn>
  
</template>

<script>
import QuestionAnswerForm from "@/components/formsUtils/QuestionAnswerForm.vue";
export default {
  components: {QuestionAnswerForm},

  props: {    
    type: { type: String, default: "P" },
    onClick:{type: Function, default() {return null } },
    label: {type: String, default: "Nuevo"}
  },
  data: () => ({
    dialog: false,
  }),
  methods:{
    clicked (){
      this.onClick(this.type)
    }
  }
};
</script>

<style></style>
