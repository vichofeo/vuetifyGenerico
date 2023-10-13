<template>
  <v-card>
    <v-card-title>
      <div class="text-h6" style="color: rgb(29, 98, 161);">
        {{ datos.primer_apellido }} {{ datos.segundo_apellido }} {{ datos.nombres }}
      </div>
    </v-card-title>
    <v-card-text>
      <v-row align="center">
        <v-col class="shrink" v-if="!noAvatar">
          <v-avatar class="profile" color="grey" size="160" tile>
            <v-img :src="logoCard" style="background:white;"></v-img>
          </v-avatar>
        </v-col>
        <v-col class="grow text-primary" color="rgba(0, 0, 0, .4)">
          <div v-if="datos.ovt">
            <span class="font-weight-bold">Tipo de documento: </span> {{ datos.tipo_documento }}
          </div>
          <div v-else> 
            <span class="font-weight-bold">{{ datos.tipo_documento ? datos.tipo_documento : 'CI' }}: </span>
            {{ datos.numero_documento }} {{ datos.complemento_documento != 'NULL' && datos.complemento_documento ? ` -
            ${datos.complemento_documento}` : '' }}
          </div>
          <div><span class="font-weight-bold">Fecha Nacimiento: </span> {{ computedDateFormatted }}</div>
          <div><span class="font-weight-bold" v-if="datos.genero">Genero: </span> {{ datos.genero }}</div>
          <div><span class="font-weight-bold" v-if="datos.genero">CUA: </span> {{ datos.codigo_asegurado }}</div>
          <div v-show="datos.estadoVerificacion"><span class="font-weight-bold">Estado Verificacion: </span> {{ datos.estadoVerificacion }}</div>
          
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-text v-if="datos.beneficio">
      <span class="text-caption red--text"> {{ datos.beneficio }}</span>
    </v-card-text>
    
    <div v-if="datos && datos.hasOwnProperty('certificado_pdf') && datos.certificado_pdf">      
        <datos-certificacion :pdfInfo="datos" />
    </div>

  </v-card>
</template>

<script>
import ASUSS from "@/assets/logoAsuss_.png"
import SEGIP from "@/assets/logoSegip.png"
import OVT from "@/assets/logoOvt.png"
import SENASIR from "@/assets/logoSenasir.png"
import DEFAULT from "@/assets/logo_asuss.png"
import DatosCertificacion from './DatosCertificacion.vue'

export default {
  components: { DatosCertificacion },

  props: {
    persona: { type: Object, default: { nombres: '-Sin Datos-' } },

    clickIndex: { type: Function, default: null },
    noAvatar: { type: Boolean, default: false }

  },
  data() {
    return {
      datos: {}
    }
  },
  mounted() {
    this.datos = this.persona
  },
  computed: {
    computedDateFormatted() {
      return this.formatDate(this.datos.fecha_nacimiento);
    },
    logoCard() {
      //Para logo
      const op = this.$store.state.optionsServiceInterOp.selected.op
      let logo = ''
      switch (op) {
        case 'B':
          logo = ASUSS
          break;
        case 'S':
          logo = SEGIP
          break;
        case 'O':
          logo = OVT
          break;
        case 'R':
          logo = SENASIR
          break;
        default:
          logo = DEFAULT
          break;
      }
      return logo
    }
  },
  methods: {
    formatDate(date) {
      if (!date) return null;
      if (date.indexOf("/") > 0)
        return date
      else {
        const [year, month, day] = date.split("-");
        return `${day}/${month}/${year}`;
      }

    },
    clickHere(value) {
      this.clickIndex(value)
    }
  },
  watch: {
    persona: {
      deep: true,
      handler: function (newVal, OldVal) {
        this.datos = newVal
      },
    },
  },

}
</script>