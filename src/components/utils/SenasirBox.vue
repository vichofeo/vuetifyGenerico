<template>
    <!--<div class="grey lighten-5">-->
    <div >
        <contenedor-search-people :onClick="onClick" :sw-loader="swLoader" :type-alert="typeAlert" :mensaje="mensaje"
            :requeridos="[1, 0, 1]">
            <datos-persona :persona="dataSenasir" v-if="dataSenasir" :noAvatar="true" />
        </contenedor-search-people>
    </div>
</template>

<script>
import SearchPeopleBox from './SearchPeopleBox.vue'
import { optionsToast } from './toastOptions.js'
import * as srv from "@/services/InteroperabilidadService";

import Loading from './Loading.vue'
import DatosPersona from './DatosPersona.vue';



import ContenedorSearchPeople from './ContenedorSearchPeople.vue';


export default {
    components: {
        SearchPeopleBox,
        Loading,
        DatosPersona,

        ContenedorSearchPeople
    },
    data() {
        return {
            dataSenasir: null,
            certificadoPdf: null,
            swLoader: false,
            mensaje: null,
            swAlert: false,
            typeAlert: 'success'
        }
    },
    methods: {

        async onClick(datos) {
            this.swLoader = true
            this.dataSenasir = null
            this.mensaje = null

            try {
                //realiza consulta a senasir
                console.log("senasir entrada", datos)
                const response = await srv.senasirConsultaEstadoAsegurado(datos);
                console.log("respuesta senasir", response)
                const data = response;
                if (data.esValido && data.codigoRespuesta == "2") {
                    const aux = data.datosPersonaEnFormatoJson
                    this.dataSenasir = {
                        numero_documento: aux.numeroDocumento,
                        complemento_documento: aux.codigoComplementoCarnet,
                        primer_apellido: aux.primerApellido,
                        segundo_apellido: aux.segundoApellido,
                        apellido_casada: aux.apellidoCasada,
                        nombres: aux.nombres,
                        fecha_nacimiento: aux.fechaNacimiento,
                        beneficio: data.datosBeneficioEnFormatoJson.beneficio
                    }

                    this.mensaje = data.mensaje + '. ' + data.descripcionRespuesta
                    this.mensaje = this.mensaje.replaceAll('Ã³','o')
                    this.typeAlert = 'success'


                } else if (!data.esValido) {
                    this.mensaje = "Por favor verifique que el campo Fecha de Nacimiento este correctamente llenado. Intentelo nuevamente"
                    this.typeAlert = 'error'

                } else {
                    this.mensaje = data.mensaje + '. ' + data.descripcionRespuesta
                    this.mensaje = this.mensaje.replaceAll('Ã³','o')
                    this.typeAlert = 'error'

                }

                this.swLoader = false
            } catch (e) {
                this.swLoader = false
                this.showError("No se pudo procesar la operación de busqueda. Vuelva a intentarlo y si persiste el error, comuniquese con el Administrador.")
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
