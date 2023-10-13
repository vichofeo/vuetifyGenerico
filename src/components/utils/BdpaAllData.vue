<template>
    <div v-if="dataInfo">
        <loading :swLoading="swLoader" />
        <v-card elevation="0" class="grey" v-if="itemsTable.length > 1">

            <v-data-table v-model="itemSelected" :headers="headersInfo" :items="itemsTable" single-select show-select
                hide-default-footer class="elevation-1" dense disable-sort item-key="idx">
                <template v-slot:item.data-table-select="{ isSelected, select, item }">
                    <v-simple-checkbox color="teal" :value="isSelected"
                        @input="select($event); seleccionado(item.idx, $event)">
                    </v-simple-checkbox>
                </template>
            </v-data-table>

        </v-card>
        &nbsp;
        <div v-if="itemSelected.length > 0">
            <datos-persona :noAvatar="true" :persona="itemSelected[0]"></datos-persona>

            <BdpaDataEAWindow 
            :estadoAsegurado="estado_asegurado"
            :novedades="novedades" 
            :click-reload="clickReload" 
            v-if="novedades && novedades.length>0" />
            <loading-circle v-else />


            <bdpa-data-gestora :data="dataOthers.gestora"
                v-if="dataOthers && dataOthers.gestora"></bdpa-data-gestora>
                <loading-circle v-else/>


            <bdpa-data-ovt :data="dataOthers.ovt" v-if="dataOthers && dataOthers.ovt"></bdpa-data-ovt>
            <loading-circle v-else />

            <bdpa-data-senasir :data="dataOthers.senasir" v-if="dataOthers && dataOthers.senasir"></bdpa-data-senasir>
            <loading-circle v-else />

            <datos-certificacion :pdfInfo="dataOthers.crt" v-if="dataOthers && dataOthers.crt" />
            <loading-circle v-else />

        </div>

    </div>
</template>

<script>

import * as util from "@/components/asegurado/utils/varios"

import BdpaDataEAWindow from './BdpaDataEAWindow.vue';


import DatosCertificacion from './DatosCertificacion.vue';
import DatosPersona from './DatosPersona.vue';
import BdpaDataOvt from './BdpaDataOvt.vue';
import BdpaDataSenasir from './BdpaDataSenasir.vue';
import BdpaDataGestora from './BdpaDataGestora.vue'

import * as srv from "@/services/InteroperabilidadService"
import { optionsToast } from './toastOptions.js'

import Loading from './Loading.vue'
import LoadingCircle from './LoadingCircle.vue';
export default {
    components: {

        BdpaDataEAWindow,

        DatosCertificacion,
        DatosPersona,
        BdpaDataOvt,
        BdpaDataSenasir,
        BdpaDataGestora, Loading,
        LoadingCircle
    },
    props: {
        dataInfo: { type: Array, default: [] },
        dataSearch: { type: Array, default: () => ([]) },
        clickReload: { type: Function, default() { return null; }, }
    },
    data() {
        return {
            headersInfo: [{ text: "Nombre", value: "nombre", class: "grey lighten-2" }, { text: "Nro. Documento", value: "ci", class: "grey lighten-2" }, { text: "Fecha Nacimiento", value: "fn", class: "grey lighten-2" }],
            itemSelected: [],
            itemsTable: [],

            estado_asegurado: null,
            dataOthers: null,

            swLoader: false,

            novedades: null,

            idEstadoInactivo: 104,


        }
    },
    computed: {

    },
    created() {

    },

    methods: {
        seleccionado(index, flag) {
            if (flag) {
                this.searchEA(index)
            }
        },
        itemesTable() {
            this.itemSelected = []
            this.itemsTable = []
            this.dataOthers = null
            this.estado_asegurado = null

            if (this.dataInfo && this.dataInfo.length > 0) {
                this.itemsTable = this.dataInfo.map((o, i) => ({
                    ...o,
                    nombre: `${o.primer_apellido} ${o.segundo_apellido} ${o.nombres}`,
                    ci: `${o.numero_documento} ${o.complemento_documento && o.complemento_documento != 'NULL' ? ' - ' + o.complemento_documento : ''} `,
                    fn: util.formatFecha(o.fecha_nacimiento),
                    idx: i,
                }))
            }

            if (this.itemsTable.length == 1) {
                this.itemSelected = this.itemsTable
                this.searchEA(0)
            }
        },

        async searchEA(index) {
            this.swLoader = true
            this.dataOthers = null
            this.estado_asegurado = null
            this.novedades = null

            try {
                const datosSearch = this.dataSearch[index]

                console.log("Datos entrada estadoAsegurado", datosSearch)
                const response = await srv.bdpaEstadoAfiliado(datosSearch)
                const ea = response[0]
                console.log("respuesta estadoAsegurado", ea)
                if (ea.hasOwnProperty('estado_asegurado') && ea.estado_asegurado.hasOwnProperty('detalle') && ea.estado_asegurado.detalle.length > 0) {
                                        
                    this.estado_asegurado = {
                        ok: true,
                        data: ea.estado_asegurado.detalle,
                        persona: this.itemSelected[0],
                        total: ea.estado_asegurado.detalle.length,
                        search: datosSearch
                    }
                    this.searchNovedad(ea.estado_asegurado.detalle)

                } else {
                    this.novedades = [0]
                    this.estado_asegurado = { ok: false, mensaje: ea.mensaje }
                }
                //obtiene demas datos servicios
                this.moreData(datosSearch)

            } catch (e) {
                console.log("%%%%%%%%%error", e)
                this.$toast.error('Error en tiempo de corrida, comuniquese con su administrador BDPA-ALL-DATA', optionsToast)
            }


            this.swLoader = false
        },
        async moreData(datos) {
            try {
                //busca datos en ovt, senasir y gestora
                console.log("entrada others", datos)
                const ovt = await srv.ovtConsultaEstadoFuentePago(datos);
                console.log("respuesta... OVT", ovt)


                //busqueda en senasir            
                const senasir = await srv.senasirConsultaEstadoAsegurado(datos);
                console.log("respuesta senasir", senasir)

                //consulta certificacion
                datos.numero_documento = datos.ci
                datos.complemento_documento = datos.complemento
                console.log("entrada certificado", datos)
                const certificado = await srv.bdpafindCertificacion(datos)
                console.log("respuesta certificado", certificado)
                if (certificado.codigo == 500 || certificado.codigo == 300) certificado.persona = {}

                //consulta gestora
                datos.tipoDocumento = datos.tipoDocumento=='CI'? 'I': datos.tipoDocumento
                console.log("entrada others Gestora", datos)
                const gestora = await srv.gestoraConsultaRentista(datos);
                console.log("respuesta gestora", gestora)
                

                this.dataOthers = { ovt: ovt, senasir: senasir, gestora: gestora, crt: certificado }
            } catch (e) {
                console.log("%%%%%%%%%error", e)
                this.$toast.error('Error en tiempo de corrida, comuniquese con su administrador BDPA-ALL-DATA-MORE', optionsToast)
            }
        },
        searchNovedad(obj) {
            console.log("In Novedad::", obj)
            this.novedades = []
            for (const key in obj) {
                if(obj[key].estado.codigo == this.idEstadoInactivo)
                    this.novedades[key] = []
                else{
                    const n = obj[key].novedades 
                    //await srv.bdpaNovedadEgestorAfiliado({ idAfiliadoEnteGestorNovedad: obj[key].idAfiliadoEnteGestor })  
                    //formatea fecha de creacion              
                    this.novedades[key]=n.map((o,i)=>({...o, fechaCreacion: this.parseFecha(o.fechaCreacion)}))
                }
                
            }            
        },
        parseFecha(fecha) {
            const [yyyy, mm, dd] = fecha.split('-')
            const d1 = dd.substring(0, 2)
            return `${d1}/${mm}/${yyyy}`
        }
    },
    mounted() {
        this.itemesTable()
    },
    watch: {
        dataInfo: {
            handler: function (val, oldVal) {
                if (val) {
                    this.itemesTable()
                }
            },
            deep: true
        }

    },

}
</script>

<style></style>
