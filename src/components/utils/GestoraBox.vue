<template>
    <div>
        <contenedor-search-emp :onClick="onClick" :sw-loader="swLoader" :type-alert="typeAlert" :mensaje="mensaje">
            <datos-gestora :datos-gestora="dataGestora" v-if="dataGestora" />
        </contenedor-search-emp>


    </div>
</template>

<script>

import { optionsToast } from './toastOptions.js'
import * as srv from "@/services/InteroperabilidadService";

import Loading from './Loading.vue'
import SearchEmpresaBox from './SearchEmpresaBox.vue';
import DatosGestora from './DatosGestora.vue';

import ContenedorSearchEmp from './ContenedorSearchEmp.vue';



export default {
    components: {
        Loading,
        SearchEmpresaBox,
        DatosGestora,

        ContenedorSearchEmp
    },
    data() {
        return {
            dataGestora: null,
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
            this.dataGestora = null
            this.mensaje = null
            try {


                //realiza consulta a ovt
                console.log("datos entrada desde gestora:", datos)
                let results = await srv.gestoraConsultaEmpresas(datos);
                console.log("datos respuesta gestora:", results)
                if (results.codigoRespuesta == 0) {
                    const datos = results
                    this.mensaje = results.mensaje
                    this.typeAlert = 'success'

                    //temproall verificar luego cn datos real
                    //datos.empresa.representanteLegal = datos.empresa.representanteLegal


                    if (!datos.empresa.representanteLegal || datos.empresa.representanteLegal.length <= 0) {
                        this.mensaje = this.mensaje + '. La empresa ' + datos.empresa.razonSocial + ', no cuenta con informacion de Representante Legal'
                        this.typeAlert = 'warning'
                    }
                    datos.empresa.mensaje = this.mensaje
                    this.dataGestora = datos.empresa
                    this.dataGestora.representanteLegal = datos.empresa.representanteLegal.map((o, i) => ({
                        ...o,
                        idx: i,
                        name: `${o.primerApellido} ${o.segundoApellido} ${o.nombres}`,
                        ci: `${o.tipoIdentificacion} ${o.numeroIdentificacion} ${o.complemento ? ' - ' + o.complemento : ''}`
                    }))

                } else {
                    this.mensaje = results.mensaje
                    this.typeAlert = "error"

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

        typeSearch() {
            return this.$store.state.optionsServiceInterOp.selected.op
        }
    },


}
</script>
