<template>
  <v-card class="mx-auto">
    <v-card-title class="text-h6 font-weight-regular justify-space-between">
      <span>{{ dataFrm.frm_cod }}-{{ dataFrm.frm_name }}</span>
      <v-avatar color="primary" size="24" v-text="step"></v-avatar>
    </v-card-title>

    <v-window v-model="step">
      <v-window-item :value="i + 1" v-for="(obj, i ) in dataFrm.others" :key="`item${i}`">
        <v-card-title>{{ obj.title }}</v-card-title>
        {{ obj }}
        <v-card-text>

          <frm-other-maker :type="obj.type" />
        </v-card-text>
      </v-window-item>


      <v-window-item :value="i + dataFrm.others.length + 1" v-for="(obj, i ) in dataFrm.sections" :key="`sections${i}`">

        <v-card-title>{{ obj.name_section }}</v-card-title>
        <div v-for="(o, j) in obj.questions" :key="`enu${i}_${j}`">
          
          <v-card-text>
            <h5>{{ i + 1 + dataFrm.others.length }}.{{ j + 1 }}.- {{ o.question }}</h5>
            <frm-answer :type="o.type" :answers="o.answers" />
          </v-card-text>
        </div>
      </v-window-item>
    </v-window>

    <v-divider></v-divider>

    <v-card-actions>
      <v-btn v-if="step > 1" variant="text" @click="step--"> Back </v-btn>
      <v-spacer></v-spacer>
      <v-btn v-if="step < maximo" color="primary" variant="flat" @click="step++"> Next </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import * as srv from "@/service/GetData";
import FrmOtherMaker from "@/components/formsUtils/FrmOtherMaker.vue";
import FrmAnswer from "@/components/formsUtils/FrmAnswer.vue";
export default {
  beforeRouteUpdate(to, from) {
    // just use `this`
    this.frm = to.params.idx
    this.step = 1
    this.getData();
  },
  components: {
    FrmOtherMaker,
    FrmAnswer
  },
  data: () => ({
    dataFrm: {},
    step: 1,
    maximo: 1,
    frm: null
  }),

  methods: {
    async getData() {

      //obtiene formulario
      this.dataFrm = await srv.getfrmAllContent(this.frm);

      this.maximo = this.dataFrm.others.length

      if (this.dataFrm.sections) {
        this.maximo += this.dataFrm.sections.length
      }

    },
  },
  mounted() {
    this.frm = this.$route.params.idx
    this.getData();
  },


};
</script>

<style></style>
