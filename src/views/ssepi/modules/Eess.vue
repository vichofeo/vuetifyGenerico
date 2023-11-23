<template>
    <div>
        <p>&nbsp;</p>
        <ContenedorCard color="teal dark-1" :title="titulo" :image="true">            
            <div v-for="(item, index) in parametros" :key="index" v-if="parametros" >
                <v-card flat v-if="!Array.isArray(item.valores)">
                    <v-card-text>
                        <v-container>
                            <v-row>
                                <v-col cols="12" xs="12" sm="12" md="6" xl="3" lg="3" v-for="(obj, nameObj) in item.campos"
                                    :key="'srhTb' + nameObj">
                                    <v-text-field v-model="item.valores[nameObj]" :label="obj[0]" :readonly="!obj[1]"
                                        :filled="!obj[1]" :rounded="!obj[1]" dense v-if="obj[3] == 'T' && !obj[5]" />
    
                                    <combo-box-forms v-model="item.valores[nameObj].selected"
                                        :items-combo="item.valores[nameObj].items" :label="obj[0]" :readonly="!obj[1]"
                                        :filled="!obj[1]" :rounded="!obj[1]" dense hide-details :disable-lookup="true" flat
                                        v-else-if="obj[3] == 'C' && item.valores[nameObj] && item.valores[nameObj].selected && !obj[5]" />
                                    <CalendarForms :label="obj[0]" :name="nameObj" :yyyymmdd="item.valores[nameObj]"
                                        :set-function="()=> {}" v-else-if="obj[3] == 'F' && !obj[5]" />
                                    <div v-else>
    
                                        <div class="font-weight-black">
                                            {{ obj[0] }}:
                                        </div> <span v-if="obj[3] == 'T'">{{ item.valores[nameObj] }}</span>
                                        <span v-else> {{ item.valores[nameObj]?.selected?.text }}</span>
    
                                    </div>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card-text>
                    <v-card-text v-show="mensajePopup">
                        <contenedor-alert dark outlined border="bottom" color="grey darken-2" elevation="2" icon="mdi-alert"
                            prominent>
                            {{ mensajePopup }}
                        </contenedor-alert>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="$emit('input', false)">
                            Cancel
                        </v-btn>
                        <v-btn color="blue darken-1" text @click="saveItem" v-show="swEditable">
                            Grabar
                        </v-btn>
                    </v-card-actions>
                </v-card>
                <div v-else>
                    <p>&nbsp;</p>
                    <ContenedorCard :title="index" :color="`${colors[index]} darken-1`" icon="mdi-calendar-check">
                        <div v-if="item.valores.length > 0">
    
                            <table-data :headers="item.campos" :items="item.valores" :opColor="colors[index]"
                                :items-per-page="10" />
                        </div>
                        <div v-else>
                            <contenedor-alert dark outlined border="bottom" color="grey darken-2" elevation="2"
                                icon="mdi-alert" prominent>
                                -Sin Dato-
                            </contenedor-alert>
                        </div>
                    </ContenedorCard>
                </div>
            </div>
    
        </ContenedorCard>
    </div>
</template>

<script>
import * as srv from "@/services/ssepi/geoRefDataService";
import ContenedorCard from '@/components/utils/ContenedorCard.vue';
import ContenedorAlert from "@/components/utils/ContenedorAlert.vue";
import TableData from "@/components/utils/TableData.vue";

import Loading from "@/components/utils/Loading.vue";
import ComboBoxForms from "@/components/inputs/ComboBoxForms.vue";
import CalendarForms from '@/components/inputs/CalendarForms.vue';



export default {
  components: { ContenedorCard, ContenedorAlert, TableData, Loading, ComboBoxForms, CalendarForms },
  name: "MiEstablecimientoSalud",

  data: () => ({
    frm: null,
    parametros: null,
    swEditable: 0,
    mensajePopup: false,
    colors:{Infraestructura:"teal", Mobiliario:"green", Equipamiento: "blue", Personal:"orange"},
    titulo: ""

  }),
  mounted() {
    this.verifyOption();
    this.getModuleDta()
  },
  methods: {
    async getModuleDta() {
      try {
         const results = await srv.getDataParamEess(this.frm);
         this.parametros = results.data
        this.titulo = results.institucion.nombre_institucion + ': ' + Object.keys(this.parametros)
        
      } catch (e) {
        console.log("error en la formacion y adquision de datos");
        console.log(e);
      }
    },
    verifyOption() {
      if (this.$route.params.idx) this.frm = this.$route.params.idx;
      else this.frm = "all";
    },

    async saveItem() {
      this.swLoader = true;
      this.mensajePopup = "";

      const res = ""; //await srv.editSaveDataModRues({ [index]: this.editedItem })

      if (res.ok) {
        this.dialog = false;
      } else {
        this.mensajePopup =
          res.message +
          ". El campo editado excede en longitud de lo permitido. Intente nuevamente";
      }

      this.swLoader = false;
    },
  },
  beforeRouteUpdate(to, from) {
    // just use `this`
    this.frm = to.params.idx;
    this.getModuleDta()
  },
};
</script>
