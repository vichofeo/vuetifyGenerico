<template>
    <div>
        <v-card elevation="2" outlined class="text--primary elevation-2" dense v-if="computedDataGestor" flat>

            <v-card-text>
                <v-row>
                    <v-col class="grow">
                        <div class="font-weight-bold" v-if="obj.ente_gestor" style="color: rgb(29, 98, 161);">
                            CAJA: {{ obj.ente_gestor.toUpperCase() }} {{ obj.sigla_caja ? `(${obj.sigla_caja})` : '' }}
                        </div>
                        <div class="font-weight-medium" v-if="obj.estado.fecha_afiliacion"> Fecha de Afiliacion: {{
                            obj.estado.fecha_afiliacion }}</div>
                        <div class="font-weight-bold" v-if="obj.nombre_entidad" style="color: rgb(29, 98, 161);">ENTIDAD: {{
                            obj.nombre_entidad.toUpperCase() }}</div>
                        <div class="font-weight-medium">{{ obj.codigo_entidad }}</div>
                    </v-col>
                    <v-col class="shrink pa-2 align-self-end">

                        <slot />


                    </v-col>




                    <v-col cols="12" xs="12" sm="10" md="12" xl="12" lg="12">

                        <div v-if="datosBeneficio">
                            <!--<div-- class="text--primary font-weight-black text-justify">Titular / Beneficiario (s) </div-->

                            <bdpa-tit-ben :datosBenefio="datosBeneficio" :selectPersona="personaSelect" />
                            <div v-if="!Array.isArray(datosBeneficio.beneficiarios)">
                                <contenedor-alert class="text-caption" dark outlined border="bottom" color="grey darken-2"
                                    icon="mdi-alert">
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
                    </v-col>
                </v-row>
                <div v-if="obj.novedad">
                    <datos-novedad :novedad="obj.novedad" />
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

export default {
    components: {
        CChipColorEstado,
        DatosNovedad,
        BdpaTitBen,
        ContenedorAlert
    },
    props: {
        datosEnteGestor: { type: Object, default: {} }
    },
    data() {
        return {
            obj: null,
            datosBeneficio: null,
            personaSelect: null
        }
    },
    computed: {
        computedDataGestor() {
            this.obj = this.datosEnteGestor
            this.personaSelect = this.datosEnteGestor.persona
            this.obtieneBeneficiarios()
            return this.datosEnteGestor ? true : false;
        },
        fechaFiliacion() {
            return utils.parseFechaYMDToSlashDMY(this.obj.estado.fecha_afiliacion)
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
                        if (res.data[0].codigo == 300)
                            dats = res.data[0].mensaje
                        else
                            dats = this.formateaDatos(res.data)

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
                        let dats = res.data[0]
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


    },
    created() {
        //console.log("encreatesdd")
    },
    mounted() {
        //this.obtieneBeneficiarios()
    },

}
</script>

<style></style>
