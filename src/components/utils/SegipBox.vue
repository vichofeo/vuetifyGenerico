<template>
    <div>
        <contenedor-search-people :onClick="onClick" :sw-loader="swLoader" :type-alert="typeAlert" :mensaje="mensaje">
            <div v-if="swCrt">
                <datos-persona :persona="dataSegip" :no-avatar="true" v-if="dataSegip && dataSegip.hasOwnProperty('certificado_pdf')
                    && $store.state.optionsServiceInterOp.selected.value == 'CI'" />
            </div>
            <div v-else>
                <datos-persona :persona="dataSegip" :no-avatar="true"
                    v-if="dataSegip && $store.state.optionsServiceInterOp.selected.value == 'CI'" />
            </div>



        </contenedor-search-people>
    </div>
</template>

<script>
import SearchPeopleBox from './SearchPeopleBox.vue'
import { optionsToast } from './toastOptions.js'
import * as srv from "@/services/InteroperabilidadService";


import DatosPersona from './DatosPersona.vue';

import ContenedorSearchPeople from './ContenedorSearchPeople.vue';

import { getUsr } from '@/config/config';

export default {
    components: {
        SearchPeopleBox,

        DatosPersona,

        ContenedorSearchPeople
    },
    data() {
        return {
            dataSegip: null,
            certificadoPdf: null,
            swLoader: false,
            mensaje: null,
            swAlert: false,
            typeAlert: 'success',
            swCrt: false
        }
    },
    methods: {

        async onClick(datos) {
            this.swLoader = true
            this.dataSegip = null
            this.mensaje = null

            try {
                console.log("segip entrada", datos)
                let response = await srv.segipConsultaDatosPersona(datos);
                let registros = response
                console.log("registro", registros)
                if (registros.esValido && registros.codigoRespuesta == 2) {
                    if (registros.datosPersonaEnFormatoJson != null) {
                        const aux = registros.datosPersonaEnFormatoJson
                        this.dataSegip = {
                            numero_documento: aux.NumeroDocumento,
                            complemento_documento: aux.Complemento,
                            primer_apellido: aux.PrimerApellido,
                            segundo_apellido: aux.SegundoApellido,
                            nombres: aux.Nombres,
                            fecha_nacimiento: aux.fechaNacimiento
                        }
                    }
                    this.mensaje = registros.mensaje + '. ' + registros.descripcionRespuesta
                    this.typeAlert = "success"
                } else {
                    //error segig
                    //this.errorSegip = true;
                    //this.mensaje = registros.mensaje + '. ' + registros.descripcionRespuesta
                    this.mensaje = registros.descripcionRespuesta
                    if (registros.codigoRespuesta == 3)
                        this.mensaje = this.mensaje + '. Por favor introduzca la fecha de nacimiento para una busqueda mas precisa.'
                    this.typeAlert = "error"
                }
                const usrData = getUsr();

                if (registros.codigoRespuesta == 2) {

                    if (usrData.codigoRol == "ADM_ASUSS" || usrData.codigoRol == "CONS_ASUSS") {
                        this.swCrt = true
                        response = await srv.segipConsultaCertificadoPersona(datos);
                        registros = response;
                        console.log("registro Certificacion", registros)
                        if (registros.esValido && registros.codigoRespuesta == 2) {
                            if (registros.reporteCertificacion != null) {
                                this.dataSegip.certificado_pdf = registros.reporteCertificacion
                                this.dataSegip.mensajeCertificado = "Certificación de datos del ciudadano"
                            } else this.dataSegip.certificado_pdf = null

                            this.mensaje = registros.descripcionRespuesta
                        } else {
                            this.mensaje = registros.mensaje + '. ' + registros.descripcionRespuesta
                        }
                    } else this.swCrt = false
                }
                this.swLoader = false
            } catch (error) {
                this.showError("No se pudo procesar la operación de busqueda. Vuelva a intentarlo y si persiste el error, comuniquese con el Administrador.")
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
        itemsBread() {
            return [
                { text: 'SEGIP', disabled: false, href: "#" },
                { text: this.$store.state.optionsServiceInterOp.selected.title, disabled: true, href: "#" }
            ]

        }
    },


}
</script>
