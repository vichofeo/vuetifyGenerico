<template>
    <div>
        <v-col cols="12" align-self="center">
            <v-card elevation="1" dense>
                <v-row align="center" align-content="center" justify="center">
                    <v-col class="grow">
                        <datos-persona :persona="persona"></datos-persona>
                    </v-col>

                    <v-col class="grow">

                        <v-bottom-navigation background-color="success" dark>
                            <v-btn color="success" dark class="mr-2" @click="generarCertificado()">
                                <span>Certificado</span>
                                <span class="material-icons"> fact_check </span>
                            </v-btn>
                        </v-bottom-navigation>

                        <span>Haga clic en el boton para imprimir la Certificacion</span>
                    </v-col>
                </v-row>
            </v-card>
        </v-col>

       <view-pdf :show-modal-pdf="showModalPdf" :certificadoPdf="certificadoPdf" @click="onClick"></view-pdf>

    </div>
</template>
    
<script>

import DatosPersona from './DatosPersona.vue'
import ViewPdf from './ViewPdf.vue';
export default {
    components: {
        DatosPersona,
        ViewPdf
    },
    props: {
        dataSegip: {
            type: Object,
            default: {}
        }
    },
    data() {
        return {
            showModalPdf: false,
            certificadoPdf: null
        }
    },
    computed: {
        persona() {
            this.certificadoPdf = "data:application/pdf;base64," + this.dataSegip.certificado_pdf;
            return this.dataSegip
        },
        gestores() {
            const aux = {
                estado_asegurado: {
                    detalle: this.dataSegip.estado_afiliacion.map((obj, i) => ({
                        ente_gestor: obj.nombre_enteGestor,
                        codigo_entidad: '',
                        tipo_asegurado: obj.estado,
                        categoria: 'F. Filiacion: ' + obj.fecha_inicio,
                        nombre_entidad: obj.nombre_entidad,
                        novedad: {},
                        estado: {}
                    }))
                }
            }
            //aux.estado_asegurado.detalle = this.dataSegip.estado_afiliacion
            return aux
        }
    },
    methods: {
        generarCertificado() {
            this.showModalPdf = true;
        },
        onClick(){            
            this.showModalPdf = false
        }
    },
}
</script>
    
<style></style>
    