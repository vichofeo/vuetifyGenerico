<template>
  <v-card class="mx-auto">

    <v-tabs v-model="tab"  background-color="transparent" color="basil" grow>
                    <v-tabs-slider></v-tabs-slider>
                    <v-tab  color="primary">Credenciales</v-tab>                    
                </v-tabs>
            
                <v-main>
                <v-container >
                    <v-row dense>
                        <v-col cols="12" xs="12" sm="12" xl="12" md="12" lg="12">
                            <v-tabs-items v-model="tab">
                                <v-tab-item > <CrudLicense/> </v-tab-item>
                            </v-tabs-items>
                        </v-col>
                    </v-row>
                </v-container>
            </v-main>

    
  </v-card>
</template>

<script>
import Persona from "@/components/generics/Persona.vue";
import CrudLicense from "@/components/pageAdmin/CrudLicense.vue";

export default {
  components: { Persona, CrudLicense },

  data: () => ({
    tab: null,
  }),

  computed: {},

  methods: {
    clickTab(op) {
      this.tab = "t1";
    },
    saveData(data) {
      this.tab = "t1";
    },
  },
};
</script>

<style></style>
