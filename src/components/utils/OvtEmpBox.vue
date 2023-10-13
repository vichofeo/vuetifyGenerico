<template>
    <!--<div class="grey lighten-5">-->
    <div >
        <seach-ovt-box :onClick="onClick" :type="typeSearch" />

        
        
                <v-row dense no-gutters>

                    <v-col cols="12" xs="10" sm="12" md="12" xl="12" lg="12">

                        <alert-box :mensaje="mensaje" :typeAlert="typeAlert" />
                        <datos-empresa :empresa="dataOvt" v-if="dataOvt"></datos-empresa>
                    </v-col>
                </v-row>
        
            <loading :swLoading="swLoader" />
        
        <p>&nbsp;</p>
    </div>
</template>
<script>

import { optionsToast } from './toastOptions.js'


import * as srv from "@/services/InteroperabilidadService"

import Loading from './Loading.vue'
import SearchEmpresaBox from './SearchEmpresaBox.vue';
import DatosEmpresa from './DatosEmpresa.vue';
import SeachOvtBox from './SeachOvtBox.vue';
import AlertBox from './AlertBox.vue';




export default {
    components: {
        Loading,
        SearchEmpresaBox,
        DatosEmpresa,
        SeachOvtBox,
        AlertBox,

    },
    data() {
        return {
            dataOvt: null,
            certificadoPdf: null,
            swLoader: false,
            mensaje: null,
            swAlert: false,
            typeAlert: 'success',
        }
    },
    methods: {

        async onClick(datos) {
            console.log("datos entreda OVt Empresa", datos)
            this.swLoader = true
            this.dataOvt = null
            this.mensaje = null
            this.swAlert = false


            srv.ovtConsultaEmpresa(datos).then(response => {
                //crv.getInfoEmpresaOvt(datos).then(response=>{
                console.log("ovt persona respuesta", response)
                let data = response;
                if (data.finalizado == null) {
                    this.mensaje = "No se encuentra una empresa con los parámetros enviados"
                    this.typeAlert = 'error'
                    
                } else {
                    this.dataOvt = data.datos
                    this.mensaje = "Consulta Exitosa. Registro Encontrado"
                    this.typeAlert = 'success'
                    
                }
                this.swLoader = false
            }).catch(e => {
                this.showError("No se pudo procesar la operación de busqueda OVT-Empresas." )
                this.swLoader = false
            })
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
