<template>
  <div id="margen">
    <p>&nbsp;</p>
    <ContenedorCard color="#1D62A1" :title="titulo" :image="true">
      <FrmModelElements
        v-model="parametros[indexParam]"
        :lengthCols="6"
        :index-param="indexParam"
        :index-from-url="indexReal"
        :recarga="recargar"
        v-if="indexParam"
        :forEdit="true"
      />
    </ContenedorCard>
  </div>
</template>

<script>
import * as srv from "@/services/ssepi/geoRefDataService";
import ContenedorCard from "@/components/utils/ContenedorCard.vue";
import ContenedorAlert from "@/components/utils/ContenedorAlert.vue";

import FrmModelElements from "@/components/inputs/FrmModelElements.vue";

export default {
  components: {
    ContenedorCard,
    ContenedorAlert,

    FrmModelElements,
  },
  name: "MiEstablecimientoSalud",

  data: () => ({
    frm: null,
    parametros: null,
    swEditable: 0,
    mensajePopup: false,
    colors: {
      Infraestructura: "teal",
      Mobiliario: "green",
      Equipamiento: "blue",
      Personal: "orange",
    },
    titulo: "",
    indexParam: null,
    indexReal: null,
  }),
  mounted() {    
    this.verifyOption();
    this.getModuleDta();
  },
  methods: {
    async getModuleDta() {
      try {
        const results = await srv.getDataParamEess(this.frm);
        this.parametros = results.data;
        this.indexParam = Object.keys(this.parametros)[0];
        this.indexReal =  this.frm
        this.titulo =
          results.institucion.nombre_institucion + ": " + this.indexParam;
      } catch (e) {
        console.log("error en la formacion y adquision de datos");
        console.log(e);
      }
    },
    verifyOption() {      
      if (this.$route.params.idx) this.frm = this.$route.params.idx;
      else this.frm = "all";
    },


    recargar(sw){
      if(sw)
      this.getModuleDta()
    }
  },
  beforeRouteUpdate(to, from) {
    // just use `this`
    this.frm = to.params.idx;
    this.getModuleDta();
  },
};
</script>
<style scoped>
 #margen{
  padding: 10px;
  }
</style>
