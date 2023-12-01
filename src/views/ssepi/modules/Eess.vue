<template>
  <div>
    <p>&nbsp;</p>
    <ContenedorCard color="teal dark-1" :title="titulo" :image="true">
      <FrmModelElements
        v-model="parametros[indexParam]"
        :lengthCols="4"
        :index-param="indexParam"
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
import TableData from "@/components/utils/TableData.vue";

import Loading from "@/components/utils/Loading.vue";
import ComboBoxForms from "@/components/inputs/ComboBoxForms.vue";
import CalendarForms from "@/components/inputs/CalendarForms.vue";
import FrmModelElements from "@/components/inputs/FrmModelElements.vue";

export default {
  components: {
    ContenedorCard,
    ContenedorAlert,
    TableData,
    Loading,
    ComboBoxForms,
    CalendarForms,
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
