<template>
    <div>
        <v-card elevation="2" outlined class="text--primary elevation-2" dense v-if="computedDataGestor" flat>

            <v-card-text>

                <v-row>
                    <v-col cols="12" xs="12" sm="12" :md="colsNum" :xl="colsNum" :lg="colsNum">
                        <v-responsive>
                            <div class="font-weight-bold" v-if="obj.ente_gestor" style="color: rgb(29, 98, 161);">
                                CAJA: {{ obj.ente_gestor.toUpperCase() }} {{ obj.sigla_caja ? `(${obj.sigla_caja})` : '' }}
                            </div>
                            <div class="font-weight-medium" v-if="obj.estado.fecha_afiliacion"> Fecha de Afiliacion: {{
                                obj.estado.fecha_afiliacion }}</div>
                            <div class="font-weight-bold" v-if="obj.nombre_entidad" style="color: rgb(29, 98, 161);">
                                ENTIDAD: {{
                                    obj.nombre_entidad.toUpperCase() }}</div>
                            <div class="font-weight-medium">{{ obj.codigo_entidad }}</div>
                        </v-responsive>
                    </v-col>


                    <v-col class="pa-2 align-self-end" cols="12" xs="12" sm="12" md="1" xl="1" lg="1"
                        v-if="datosMenu.length > 0 && swRolAutorizado">

                        <b-dropdown size="sm" text="Acciones" block variant="outline-success" class="m-2 text-caption">

                            <b-dropdown-item @click="clickOpFrms(o.value)" v-for="(o, i) in datosMenu" :key="'dpdw-' + i">
                                <v-icon color="primary">{{ o.icon }}</v-icon><span style="color: rgb(29, 98, 161);">{{
                                    o.text }}</span>

                            </b-dropdown-item>

                        </b-dropdown>

                    </v-col>

                </v-row>
                <v-row dense no-gutters>

                    <v-col cols="12" xs="12" sm="12" md="12" xl="12" lg="12" v-if="indexSlide == 0">
                        <v-expand-transition>
                            <div v-if="datosBeneficio">
                                
                                       
                                        <bdpa-tit-ben :datosBenefio="datosBeneficio" :selectPersona="personaSelect" />



                                        <div v-if="!Array.isArray(datosBeneficio.beneficiarios)">
                                            <contenedor-alert class="text-caption" dark outlined border="bottom"
                                                color="grey darken-2" icon="mdi-alert">
                                                {{ datosBeneficio.beneficiarios }}
                                            </contenedor-alert>
                                        </div>
                                    
                                
                            </div>
                            <div v-else>

                                <contenedor-alert class="text-caption" dark outlined border="bottom" color="grey darken-2"
                                    icon="mdi-alert">
                                    No se encontro informacion de Beneficiarios.
                                </contenedor-alert>
                            </div>
                        </v-expand-transition>
                    </v-col>
                    
                    <v-col cols="12" xs="12" sm="10" md="12" xl="12" lg="12" v-else-if="indexSlide > 0">
                        
                        <v-expand-transition>
                            <bdpa-frm-baja v-if="indexSlide == 1" :datosEnteGestor="datosEnteGestor"
                                :click-reload="clickReload" :clickReturn="clickOpFrms" />

                            <bdpa-frm-novedad v-if="indexSlide == 2"  :datosEnteGestor="datosEnteGestor"
                                :click-reload="clickReload" :clickReturn="clickOpFrms" />
                        </v-expand-transition>
                    </v-col>
                </v-row>
                <div v-if="obj.novedades">

                    <datos-novedad :novedades="obj.novedades" />
                </div>
            </v-card-text>


        </v-card>

        <v-row v-else>
            Error de disenio, contactese con su administrador BDPATITBEN
        </v-row>
    </div>
</template>

<script>
import CChipColorEstado from '../asegurado/utils/CChipColorEstado.vue';
import DatosNovedad from './DatosNovedad.vue';
import * as srv from "@/services/InteroperabilidadService"
import * as utils from "@/components/asegurado/utils/varios"
import BdpaTitBen from './BdpaTitBen.vue';
import ContenedorAlert from './ContenedorAlert.vue';

import BdpaFrmBaja from './BdpaFrmBaja.vue';
import BdpaFrmNovedad from './BdpaFrmNovedad.vue';

import { getUsr } from '@/config/config';

export default {
    components: {
        CChipColorEstado,
        DatosNovedad,
        BdpaTitBen,
        ContenedorAlert,
        BdpaFrmBaja, BdpaFrmNovedad
    },
    props: {
        datosEnteGestor: { type: Object, default: {} },
        clickReload: { type: Function, default() { return null; }, }
    },
    data() {
        return {
            obj: null,
            datosBeneficio: null,
            personaSelect: null,
            indexSlide: 0,
            datosMenu: [],
            swRolAutorizado: false,
            rolesAutorizados: ['CAJA_WEB']
        }
    },
    computed: {
        computedDataGestor() {
            this.obj = this.datosEnteGestor
            this.personaSelect = this.datosEnteGestor.persona
            //comprueba rol
            this.swRolAutorizado = this.rolesAutorizados.indexOf(getUsr().codigoRol) >= 0
            this.obtieneBeneficiarios()
            return this.datosEnteGestor ? true : false;
        },
        fechaFiliacion() {
            return utils.parseFechaYMDToSlashDMY(this.obj.estado.fecha_afiliacion)
        },
        colsNum() {
            if (this.datosMenu.length > 0) return 10
            else return 12
        }
    },
    methods: {
        obtieneBeneficiarios() {
            const datos = this.datosEnteGestor
            //console.log("datos entrada busca rama", datos)
            if (datos) {
                if (datos.categoria == 'TITULAR') this.obtieneBeneficiariosxTitular(datos)
                else
                    this.obtieneTitularxBeneficiario(datos)
            } else this.datosBeneficio = null

        },
        formateaDatos(datos) {
            const peoples = datos.map((obj, i) => {
                let ci = null
                if (obj.documento_identidad)
                    ci = obj.complemento_documento && obj.complemento_documento != "NULL" ? `${obj.documento_identidad} - ${obj.complemento_documento}` : obj.documento_identidad
                else ci = `${obj.tipo_documento} ${obj.numero_documento}`

                return {
                    nombre: `${obj.primer_apellido} ${obj.segundo_apellido} ${obj.nombres}`,
                    fn: utils.formatFecha(obj.fecha_nacimiento),
                    ci: ci,
                    estado: obj.estado,
                    parentesco: obj.tipo_parentesco
                }
            })
            return peoples
        },
        obtieneBeneficiariosxTitular(datos) {
            if (datos.categoria == "TITULAR") {
                //console.log("xxxxxxxxxxxxx desde titular", datos.idAfiliadoEnteGestor)
                srv.bdpaBeneficiariosPorTitular({ idAfiliadoEnteGestor: datos.idAfiliadoEnteGestor })
                    .then((res) => {

                        let dats = null
                        if (res[0].codigo == 300)
                            dats = res[0].mensaje
                        else
                            dats = this.formateaDatos(res)

                        const titular = {
                            ...datos.persona,
                            estado: datos.estado,
                            parentesco: "TITULAR"
                        }

                        this.datosBeneficio = { titular: titular, beneficiarios: dats }

                        //console.log("titular Con beneficiarios", this.datosBeneficio)

                    }).catch((e) => console.log("erorr", e))

            } else return {}
        },

        obtieneTitularxBeneficiario(datos) {
            if (datos.categoria == "BENEFICIARIO") {
                //console.log("**********DEsde benefciario", datos.idAfiliadoEnteGestor)
                srv.bdpaTitularPorBeneficiario({ idAfiliadoEnteGestor: datos.idAfiliadoEnteGestor })
                    .then(res => {
                        //console.log("Buscnado datos con beneficiario")
                        let dats = res[0]
                        //console.log("titular desde el beneficiario", res)
                        dats.categoria = "TITULAR"
                        dats.tipo_parentesco = datos.categoria
                        dats.idAfiliadoEnteGestor = dats.fidAfiliadoEnteGestorTitular
                        let aux = this.formateaDatos([dats])

                        console.log("datos Titular", aux)
                        dats.persona = aux[0]

                        //console.log("obtiene totlar del beneficiario", dats)
                        this.obtieneBeneficiariosxTitular(dats)

                    })
                    .catch(e => { console.log("error Beneficiario", e) })

            } else return {}
        },
        clickOpFrms(value) {
            this.indexSlide = value
        },
        itemsBtns() {
            this.datosMenu = [];
            const params = []
            params[1] = { value: 1, text: "Baja de Registro", icon: 'mdi-account-off-outline', color:'red darken-2' }
            params[2] = { value: 2, text: "Reportar Novedad", icon: 'mdi-account-edit', color:'amber darken-2' },

                this.indexSlide = 0;

            if (this.datosEnteGestor.novedades.alerta > 0) {
                if (this.datosEnteGestor.novedades.alerta == 3) {
                    this.datosMenu.push(params[1])
                    this.datosMenu.push(params[2])
                } else this.datosMenu.push(params[this.datosEnteGestor.novedades.alerta])


                //if (this.datosEnteGestor.novedades.alerta == 1 || this.datosEnteGestor.novedades.alerta == 3) this.datosMenu.push(params[1])
            }
        }

    },
    created() {
        this.itemsBtns()

    },
    mounted() {
        //this.obtieneBeneficiarios()
    },

}
</script>

<style>

</style>
