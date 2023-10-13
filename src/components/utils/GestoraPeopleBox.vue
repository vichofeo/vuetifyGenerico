<template>
    <div>
        <contenedor-search-people :onClick="onClick" :sw-loader="swLoader" :type-alert="typeAlert" :mensaje="mensaje"
            :requeridos="[1, 0, 1]" :extension="true">
            <datos-persona :persona="dataRentista" v-if="dataRentista" :noAvatar="true" />

            <div v-if="dataCotizacion">
                <p>&nbsp;</p>
                <ContenedorCard
                    :title="`Periodos Cotización (Total: ${dataCotizacion.length > 0 ? dataCotizacion.length : 0})`"
                    :color="dataCotizacion.length > 0 ? 'teal darken-1' : 'grey darken-1'" icon="mdi-calendar-check">
                    <div v-if="dataCotizacion.length > 0">
                        
                        <table-data :headers="headers" :items="dataCotizacion" :opColor="1"/>
                    </div>
                    <div v-else>
                        <contenedor-alert dark outlined border="bottom" color="grey darken-2" elevation="2" icon="mdi-alert"
                            prominent v-if="dataRentista && dataRentista.mensaje">
                            {{ dataRentista.mensaje }}
                        </contenedor-alert>
                    </div>
                </ContenedorCard>
            </div>
            <div v-else>
                <contenedor-alert dark outlined border="bottom" color="grey darken-2" elevation="2" icon="mdi-alert"
                    prominent v-if="dataRentista && dataRentista.mensaje">
                    {{ dataRentista.mensaje }}
                </contenedor-alert>
            </div>

        </contenedor-search-people>
    </div>
</template>

<script>
import SearchPeopleBox from './SearchPeopleBox.vue'
import { optionsToast } from './toastOptions.js'
import * as srv from "@/services/InteroperabilidadService";


import DatosPersona from './DatosPersona.vue';
import DatosOvt from './DatosOvt.vue';

import ContenedorAlert from './ContenedorAlert.vue';
import ContenedorSearchPeople from './ContenedorSearchPeople.vue';
import ContenedorCard from './ContenedorCard.vue'
import TableData from './TableData.vue';



export default {
    components: {
        SearchPeopleBox,

        DatosPersona,
        DatosOvt,
        ContenedorAlert,
        ContenedorSearchPeople, ContenedorCard,
        TableData
    },
    data() {
        return {

            dataRentista: null,
            dataCotizacion: null,

            swLoader: false,
            mensaje: null,
            swAlert: false,
            typeAlert: 'success',

            headers: [
                { value: "tipoIdentificacion", text: "TIPO", align:"center" },
                { value: "numeroIdentificacion", text: "# IDENTIFICACION", align:"end" },
            { value: "entidadEmpleadora", text: "ENTIDAD EMPLEADORA", align:"start" },
            { value: "gestion", text: "GESTION", align:"end" },
            { value: "periodo", text: "PERIODO", align:"end" }
            ],
         
        }
    },
    methods: {

        async onClick(datos) {
            this.swLoader = true
            this.dataRentista = null
            this.dataCotizacion = null

            this.mensaje = null

            try {      
                //realiza consulta a gestora
                //datos.fechaNacimiento = datos.fecha_nacimiento
                datos.tipoDocumento = datos.tipoDocumento=='CI'? 'I': datos.tipoDocumento
                console.log("solicitud... GESTORA people", datos)
                const results = await srv.gestoraConsultaRentista(datos);
                console.log("respuesta... GESTORA people", results)

                if (results.codigoRespuesta == 0) {

                    this.mensaje = results.mensaje
                    this.typeAlert = 'success'


                    if (!results.periodoCotizacion) {
                    
                        this.mensaje = this.mensaje + '. El rentista ' + results.rentista.nombres + ' ' + results.rentista.primerApellido + ', no cuenta con datos de Periodo de Cotización'
                        this.typeAlert = 'warning'
                    }

                    results.rentista.mensaje = this.mensaje
                    this.dataRentista = {
                        ...results.rentista,
                        primer_apellido: results.rentista.primerApellido,
                        segundo_apellido: results.rentista.segundoApellido,
                        tipo_documento: datos.tipoIdentificacion,
                        complemento_documento: results.rentista.complemento,
                        numero_documento: results.rentista.numeroIdentificacion,
                        fecha_nacimiento: results.rentista.fechaNacimiento,
                        codigo_asegurado: results.rentista.codigoUnicoAsegurado,
                    }
                    //this.dataCotizacion = results.periodoCotizacion.map((obj, i) => ({ ...obj, idx: i, gestion:obj.periodoCotizacion.substring(0,4), periodo: obj.periodoCotizacion.substring(4,2) }))
                    this.dataCotizacion = [{...results.periodoCotizacion, gestion:results.periodoCotizacion.periodoCotizacion.substring(0,4), periodo: results.periodoCotizacion.periodoCotizacion.substring(4,2)}]
                    
                    console.log("*********", this.dataCotizacion)
                } else {
                    this.mensaje = 'No se encontro Resultados.'//results.mensaje
                    this.typeAlert = "error"
                }
                this.swLoader = false

            } catch (error) {
                console.log("%%%%%%%%%%error",error)
                this.showError('No se pudo procesar la operación de busqueda. Vuelva a intentarlo y si persiste el error, comuniquese con el Administrador.')
                this.swLoader = false
            }
        },
        showAdvertencia(mensaje) {
            this.$toast.warning(mensaje, optionsToast)
        },
        showInfo(mensaje) {
            this.$toast.info(mensaje, optionsToast)
        },
        showError(mensaje) {
            this.$toast.error(mensaje, optionsToast)
        },

        
    },




    computed: {

    },


}
</script>
