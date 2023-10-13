<template>
    <div v-if="estadoAsegurado">

        <p>&nbsp;</p>
        <contenedor-card :title="`BDPA ${estadoAsegurado.ok ? '(Total Registros: ' + estadoAsegurado.total + ')' : ': 0'}`"
            :color="estadoAsegurado.ok ? 'blue darken-1' : 'grey darken-1'" icon="mdi-account-switch">
            <div v-if="estadoAsegurado.ok">

                <v-data-table :headers="headers" :items="itemsTable" single-expand :expanded.sync="expanded" item-key="idx"
                    class="elevation-1" :item-class="row_classes" :page.sync="page" :items-per-page="itemsPerPage"
                    hide-default-footer @page-count="pageCount = $event" disable-sort @click:row="viewExpand">

                    <template v-slot:expanded-item="{ headers, item }">
                        <td :colspan="headers.length" class="grey lighten-5">
                            <bdpa-data-w-actions
                                :datos-ente-gestor="{ ...item, persona: estadoAsegurado.persona, search: estadoAsegurado.search }"
                                :click-reload="clickReload" />
                        </td>
                    </template>
                    <template v-slot:item.estado="{ item }">
                        <c-chip-color-estado :datos="item.estado" />
                    </template>
                    <template v-slot:item.novedades="{ item }">                        
                        <cchip-novedad :datos="item.novedades"/>
                    </template>
                </v-data-table>
                &nbsp;&nbsp;
                <b-pagination v-model="page" :total-rows="estadoAsegurado.total" :per-page="itemsPerPage"
                    aria-controls="my-table" pills>
                </b-pagination>



            </div>
            <div v-else>
                <contenedor-alert dark outlined border="bottom" color="grey darken-2" elevation="2" icon="mdi-alert"
                    prominent>
                    BDPA: {{ estadoAsegurado.mensaje }}
                </contenedor-alert>
            </div>
        </contenedor-card>


    </div>
</template>

<script>
import CChipColorEstado from '../asegurado/utils/CChipColorEstado.vue'
import CchipNovedad from './CchipNovedad.vue'
import ContenedorAlert from './ContenedorAlert.vue'
import ContenedorCard from './ContenedorCard.vue'
import DatosEGestor from './DatosEGestor.vue'

import * as utils from '@/components/asegurado/utils/varios'
import { getUsr } from "@/config/config"
import CchipAlertaAccion from './CchipAlertaAccion.vue'
import BdpaAlertaAccion from './BdpaAlertaAccion.vue'
import BdpaDataWActions from './BdpaDataWActions.vue'
import TableData from './TableData.vue'

export default {
    name: "BdpaDataEAWindows",
    components: { DatosEGestor, ContenedorAlert, ContenedorCard, CChipColorEstado, CchipNovedad, CchipAlertaAccion, BdpaAlertaAccion, BdpaDataWActions, TableData },
    props: {
        estadoAsegurado: { type: Object, default: {} },
        novedades: {type: Array, default() {return []}},
        clickReload: { type: Function, default() { return null; }, }
    },
    data: () => ({
        userLoged: getUsr(),

        headers: [
            { value: "sigla_caja", text: "ENTE GESTOR", align: "start", class: `blue darken-2 font-weight-light white--text`},
            { value: "nombre_entidad", text: "ENTIDAD EMPLEADORA", align: "start", class: `blue darken-2 font-weight-light white--text` },
            { value: "categoria", text: "TIPO", align: "start", class: `blue darken-2 font-weight-light white--text` },
            { value: "tipo_asegurado", text: "TIPO ASEGURADO", align: "start", class: `blue darken-2 font-weight-light white--text` },
            { value: "estado", text: "ESTADO", align: "center", class: `blue darken-2 font-weight-light white--text` },
            { value: "estado.fecha_afiliacion", text: "FECHA ESTADO", align: "center", class: `blue darken-2 font-weight-light white--text` },
            { value: "novedades", text: "ACCIONES", align: "center", class: `blue darken-2 font-weight-light white--text` },


        ],
        expanded: [],
        page: 1,
        pageCount: 0,
        itemsPerPage: 5,

        idEstadoInactivo: 104,
        idsEstadosActivos: [100, 102, 103, 105]
    }),
    methods: {
        handleRowClicked(item, index) {
            this.allOpenRows.map((ele) => {
                if (ele.id !== item.id && ele._showDetails) {
                    this.$set(ele, "_showDetails", !ele._showDetails);
                }
            });
            this.allOpenRows = [];
            this.$set(item, "_showDetails", !item._showDetails);
            this.allOpenRows.push(item);
        },

        row_classes(item) {
            return (item.idx % 2) ? 'white manito' : 'blue lighten-5 manito'
        },
        viewExpand(item, event) {
            if (event.isExpanded) {
                const indexExpanded = this.expanded.findIndex(i => i === item);
                this.expanded.splice(indexExpanded, 1)
            } else {
                this.expanded.push(item);
            }
        }
        
    },
    computed: {
        /**
         * alerta ACCION -{* baja=1 * novedad=2 * baja+novedad=3}
         * viewNovedad{1: alerta rojo, 2 alerta marilla: 4 alerta marilla por codigo de estado}
         */
        itemsTable() {
            //busca activos para baja: this.userLoged.enteGestor            
            const codigos = [100, 102, 103, 105]
            return this.estadoAsegurado.data.map((o, i) => {

                let alerta = -1
                let swViewNovedad = -1
                if(o.estado.codigo == this.idEstadoInactivo )
                alerta = -1
                else if (this.userLoged.enteGestor == o.ente_gestor ){
                    if(this.idsEstadosActivos.indexOf(o.estado.codigo) >= 0){                        
                        if(this.novedades[i].length >0)
                        alerta = 1
                        else alerta = 3
                        
                    }else alerta = -1
                    
                }else{
                    //es de  otro ente gestor y solo puede reportar novedades
                    if(codigos.indexOf(o.estado.codigo) >= 0){
                        if(this.novedades[i].length >0)
                        alerta = -1
                        else alerta = 2
                    }else alerta = -1                    
                }                    

                if(o.estado.codigo != this.idEstadoInactivo )
                if(this.novedades[i].length>0){                    
                    //if(this.userLoged.enteGestor == o.novedad.ente_gestor_anterior){                        
                        swViewNovedad = 1
                    //}else swViewNovedad = 2
                }else if(codigos.indexOf(o.estado.codigo) >= 0 && i>0)
                swViewNovedad = 4

                return {
                    ...o,
                    idx: i,
                    estado: {
                        ...o.estado,
                        fecha_afiliacion: utils.parseFechaYMDToSlashDMY(o.estado.fecha_afiliacion)
                    },
                    //alerta: alerta
                    novedades: { nvs: this.novedades[i], alerta: alerta, viewNovedad: swViewNovedad }
                }
            })
        }
    },
}
</script>
<style ></style>