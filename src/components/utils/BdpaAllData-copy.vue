<template>
    <div v-if="dataInfo">

        <v-card v-if="multipleData" elevation="0">
            <v-card-text v-if="dataInfo && multipleData">
                <v-data-table v-model="peopleSelected" :headers="headersInfo" :items="peopleItems" single-select show-select
                    hide-default-footer class="elevation-1" dense disable-sort item-key="id" v-if="peopleItems">
                </v-data-table>
            </v-card-text>
        </v-card>

        <div v-if="onlyData && peopleSelected && peopleSelected[0] && peopleSelected[0].hasOwnProperty('nombres')">
            <datos-persona :noAvatar="true" :persona="peopleSelected[0]"></datos-persona>

            <BdpaDataEAWindow 
            :estadoAsegurado="estado_asegurado"
            :click-reload="clickReload"
            v-if="dataOthers[peopleSelected[0].id]"
            ></BdpaDataEAWindow>

           <!--
            <bdpa-data-gestora :data="dataOthers[peopleSelected[0].id].gestora"
                v-if="dataOthers[peopleSelected[0].id] && dataOthers[peopleSelected[0].id].gestora"></bdpa-data-gestora>
-->

            <bdpa-data-ovt :data="dataOthers[peopleSelected[0].id].ovt"
                v-if="dataOthers[peopleSelected[0].id] && dataOthers[peopleSelected[0].id].ovt"></bdpa-data-ovt>


            <bdpa-data-senasir :data="dataOthers[peopleSelected[0].id].senasir"
                v-if="dataOthers[peopleSelected[0].id] && dataOthers[peopleSelected[0].id].senasir"></bdpa-data-senasir>

            <datos-certificacion :pdfInfo="dataCert[peopleSelected[0].id]" />

        </div>
        <loading :swLoading="swLoader" />
    </div>
</template>

<script>

import * as util from "@/components/asegurado/utils/varios"

import BdpaDataEAWindow from './BdpaDataEAWindow.vue';

import BdpaDataEFPWindow from './BdpaDataEFPWindow.vue';
import DatosCertificacion from './DatosCertificacion.vue';
import DatosPersona from './DatosPersona.vue';
import BdpaDataOvt from './BdpaDataOvt.vue';
import BdpaDataSenasir from './BdpaDataSenasir.vue';
import BdpaDataGestora from './BdpaDataGestora.vue'

import * as srv from "@/services/InteroperabilidadService"

import Loading from './Loading.vue'
export default {
    components: {

        BdpaDataEAWindow,
        BdpaDataEFPWindow,
        DatosCertificacion,
        DatosPersona,
        BdpaDataOvt,
        BdpaDataSenasir,
        BdpaDataGestora, Loading
    },
    props: {
        dataInfo: { type: Array, default: [] },
        dataCert: { type: Array, default: [] },
        dataOthers: { type: Array, default: () => ([]) },
        dataSearch: { type: Array, default: () => ([]) },
        clickReload: { type: Function, default() { return null; }, }
    },
    data() {
        return {
            headersInfo: [{ text: "Nombre", value: "nombre", class:"grey lighten-2"}, { text: "Nro. Documento", value: "ci", class:"grey lighten-2" }, { text: "Fecha Nacimiento", value: "fn", class:"grey lighten-2" }],

            peopleSelected: [],
            peopleItems: [],

            estado_asegurado: null,
            estado_fuente_pago: null,
            estado_certificado: null, 

            swLoader: false,

        }
    },
    computed: {
        multipleData() {
            return this.dataInfo.length > 1
        },
        onlyData() {
            if (this.dataInfo.length > 0) {
                if (this.dataInfo.length == 1) {
                    this.peopleSelected = this.dataInfo.map((o, i) => ({ ...o, id: i }))
                    return true
                } else return true
            } return false
        },
    },
    created() {
        this.initial()
    },
    methods: {
        initial() {
            this.nombreSelect = null
            this.peopleSelected = []
            this.peopleItems = []
            this.estado_asegurado = null
            this.estado_fuente_pago = null
            this.estado_certificado = null
        }
    },
    mounted() {
        if (this.dataInfo) {
            this.peopleItems = this.dataInfo.map((o, i) => ({
                ...o,
                nombre: `${o.primer_apellido} ${o.segundo_apellido} ${o.nombres}`,
                ci: `${o.numero_documento} ${o.complemento_documento && o.complemento_documento != 'NULL' ? ' - ' + o.complemento_documento : ''} `,
                fn: util.formatFecha(o.fecha_nacimiento),
                id: i,
            }))

        } else this.peopleItems = []
    },
    watch: {
        dataInfo: {
            handler: function (val, oldVal) {
                this.peopleSelected = []
                if (val) {
                    this.peopleItems = this.dataInfo.map((o, i) => ({
                        ...o,
                        nombre: `${o.primer_apellido} ${o.segundo_apellido} ${o.nombres}`,
                        ci: `${o.numero_documento} ${o.complemento_documento && o.complemento_documento != 'NULL' ? ' - ' + o.complemento_documento : ''} `,
                        fn: util.formatFecha(o.fecha_nacimiento),
                        id: i,
                    }))

                } else this.peopleItems = []
            },
            deep: true
        },
        async peopleSelected(newSelect, oldSelect) {
            //console.log("tablaSeleted PeopleSelected", newSelect)
            if (newSelect && newSelect.length > 0) {


const index = newSelect[0].id
//console.log("datos In:::::", this.dataOthers)
const datosSearch = this.dataSearch[index] //await this.dataOthers[index]
//console.log("datos Index:::::", index)
//console.log("datos In:::::", datosSearch)
//realiza busqueda de datos de estado asegurado
//const estado_asegurado = await srv.bdpaEstadoAfiliado(datosSearch.search)
try {
    
    this.swLoader=true
    console.log("Datos entrada estadoAsegurado", datosSearch)    
const response = await srv.bdpaEstadoAfiliado(datosSearch)
const ea = response[0]
console.log("respuesta estadoAsegurado", ea)
//busca dato del estado asegurado

                //estado asegurado 
                //if (newSelect[0].hasOwnProperty('estado_asegurado') && newSelect[0].estado_asegurado.hasOwnProperty('detalle') && newSelect[0].estado_asegurado.detalle.length > 0) {
                    if (ea.hasOwnProperty('estado_asegurado') && ea.estado_asegurado.hasOwnProperty('detalle') && ea.estado_asegurado.detalle.length > 0) {
                    const peopleResults = {
                        nombre: `${newSelect[0].primer_apellido} ${newSelect[0].segundo_apellido} ${newSelect[0].nombres}`,
                        ci: `${newSelect[0].numero_documento} ${newSelect[0].complemento_documento && newSelect[0].complemento_documento != 'NULL' ? ' - ' + newSelect[0].complemento_documento : ''} `,
                        fn: util.formatFecha(newSelect[0].fecha_nacimiento),
                    }
                    // search:this.dataOthers[newSelect[0].id].search
                    
                    this.estado_asegurado = { ok: true, 
                        data: ea.estado_asegurado.detalle, 
                        persona: peopleResults, 
                        total: ea.estado_asegurado.detalle.length,
                        search: datosSearch }

                } else //this.estado_asegurado = { ok: false, mensaje: "No se encontraron resultados con los datos introducidos." }
                this.estado_asegurado = { ok: false, mensaje: ea.mensaje }


                //prepara certificacion 
                console.log("-----", this.estado_asegurado)



                if (this.dataInfo.length === 1) {
                    this.estado_certificado = await this.dataCert[0]
                } else
                    this.estado_certificado = this.dataCert[newSelect[0].id]
                //console.log("====",this.estado_certificado)

                this.swLoader=false
            } catch (error) {
    console.log("##################", error)
    this.swLoader=false
}
            } else {
                this.nombreSelect = null
                this.estado_asegurado = null
                this.estado_fuente_pago = null
                this.estado_certificado = null
            }
        }
    },

}
</script>

<style></style>
