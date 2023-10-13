<template>
    <div v-if="pdfInfo && pdfInfo.hasOwnProperty('certificado_pdf')">

        <v-col cols="12" align-self="center" 
        v-if="pdfInfo && pdfInfo.hasOwnProperty('certificado_pdf')">
            <v-responsive>
                <v-btn  
                block
                elevation="2" 
                x-large 
                color="teal lighten-1 " 
                dark 
                class="btn-multiline  text-caption no-text-transform pa-10" 
                @click="generarCertificado()">
                    <v-icon dark> fact_check </v-icon>
                    <span v-if="pdfInfo.mensajeCertificado" class="text-wrap ma-auto float-none"> {{ pdfInfo.mensajeCertificado }}</span>
                    <p v-else class="text-wrap ma-auto">Reporte de Estado de Registro en la BDPA</p>
                </v-btn>
                
               

            </v-responsive>
        </v-col>

        <view-pdf :show-modal-pdf="showModalPdf" :certificadoPdf="certificadoPdf" @click="onClick"></view-pdf>
    </div>
    <div v-else-if="pdfInfo.mensaje" class="grey lighten-5 ">
        <contenedor-alert dark outlined border="bottom" color="grey darken-2" elevation="2" icon="mdi-alert"
                    prominent>
                    ESTADO DE REGISTRO BDPA: {{ pdfInfo.mensaje }}
                </contenedor-alert>
    </div>
</template>

<script>

import ContenedorAlert from './ContenedorAlert.vue';
import ViewPdf from './ViewPdf.vue'
export default {
    components: {
    ViewPdf,
    ContenedorAlert
},
    props: {
        pdfInfo: { type: Object, default: null }

    },
    data() {
        return {
            showModalPdf: false,
            certificadoPdf: null
        }
    },
    computed: {


    },
    methods: {
        certificar() {
            this.certificadoPdf = "data:application/pdf;base64," + this.pdfInfo.certificado_pdf;
        },
        generarCertificado() {
            this.certificar()
            this.showModalPdf = true;
        },
        onClick(value) {
            this.showModalPdf = value
        }
    },
}
</script>

<style>
.btn-multiline > span {
  width: 100%
}
</style>
