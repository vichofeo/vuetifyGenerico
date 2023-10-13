<template>
    <div v-if="verifica">
        <div align="center">
            <v-avatar class="profile" color="grey" size="128" tile>
                <v-img :src="avatarSearch" style="background:white;"></v-img>
            </v-avatar>
            <radio-opciones-search />
        </div>

        <!--<v-card elevation="2" class="grey lighten-5">-->
        <div>


            <v-row justify="center" align="stretch">
                <v-col cols="12" xs="12" sm="12" md="10" xl="9" lg="8" class="white">
                    <v-card class="text-center pa-2" outlined tile>
                        <div class="font-weight-black" style="color: rgb(29, 98, 161);">{{ titulo.toUpperCase() }}</div>
                        <div class="font-weight-bold text-caption" style="color: rgb(29, 98, 161);">{{
                            subtitulo.toUpperCase() }}</div>
                        <alert-box :mensaje="mensaje" :typeAlert="typeAlert" />
                    </v-card>
                    <v-row no-gutters v-for="(ar, i) in campos.in" :key="`contrastacion${i}`" align="stretch"
                        justify="space-around">
                        <v-col cols="8" xs="12" sm="6" md="6" xl="6" lg="6" align-self="stretch">
                            <v-card class="text-right pa-2" outlined tile>
                                <v-select v-model="setSegip[ar]" :hint="`${setSegip[ar].text}`" :items="itemsTipoPersona"
                                    dense item-text="text" :label="campos.label[i]" persistent-hint return-object
                                    single-line v-if="i == 0" :prepend-inner-icon="campos.icon[i]">

                                </v-select>
                                <v-text-field v-model="setSegip[ar]" :label="campos.label[i]" :type="campos.type[i]"
                                    step="any" min="0" :hint="campos.label[i]" hide-details="auto" dense
                                    background-color="#ffffff" clear-icon="mdi-close-circle" clearable
                                    v-else-if="ar != 'fechaNacimiento'" :required="ar == 'ci' ? true : false"
                                    :rules="ar == 'ci' ? numero_documentoRules : otherRules"
                                    :prepend-inner-icon="campos.icon[i]">

                                </v-text-field>
                                <v-text-field v-model="setSegip[ar]" :label="campos.label[i]" :type="campos.type[i]"
                                    v-mask="['##/##/####']" :hint="campos.label[i]" hide-details="auto" dense
                                    placeholder="dd/mm/aaaa" background-color="#ffffff" clear-icon="mdi-close-circle"
                                    clearable v-else :prepend-inner-icon="campos.icon[i]">

                                </v-text-field>
                            </v-card>

                        </v-col>
                        <v-col cols="4" xs="12" sm="6" md="6" xl="6" lg="6" align-self="stretch">
                            <v-card class="text-left pa-2" outlined tile elevation="0">
                                <v-fade-transition leave-absolute>
                                    <div v-if="getSegip && getSegip[campos.out[i]] && !loading">

                                        <v-icon light :color="constrastacion.color[getSegip[campos.out[i]]]">
                                            {{ constrastacion.icon[getSegip[campos.out[i]]] }}
                                        </v-icon>
                                        {{ constrastacion.salida[getSegip[campos.out[i]]] }}
                                    </div>
                                    <v-progress-circular v-else-if="loading" size="32" color="success" indeterminate />

                                    <v-icon v-else-if="i == 0" x-large :color="campos.colorIcon[i]">{{ campos.icon[i]
                                    }}</v-icon>
                                    <v-icon v-else large :color="campos.colorIcon[i]">{{ campos.icon[i] }}</v-icon>
                                </v-fade-transition>

                            </v-card>
                        </v-col>
                    </v-row>
                    <v-row no-gutters justify="space-around">
                        <v-col cols="12" xs="12" sm="12" md="12" xl="12" lg="12">
                            <v-card class="pa-2" outlined tile>

                                <div class="text-right">
                                    <v-tooltip bottom color="success">
                                        <template v-slot:activator="{ on, attrs }">

                                            <v-btn color="primary" outlined @click="clicHere()" small v-bind="attrs"
                                                v-on="on">
                                                <v-icon>mdi-account-details</v-icon>
                                                Verificar
                                            </v-btn>
                                        </template>
                                        <span>Haga clic para verificar sus datos</span>
                                    </v-tooltip>
                                </div>


                                <alert-box :mensaje="mensaje" :typeAlert="typeAlert" />
                            </v-card>
                        </v-col>

                    </v-row>
                </v-col>

            </v-row>
        </div>

        <p>&nbsp;</p>



    </div>
    <div v-else>
        Error de disenio opcion no valida, comuniquese con el administrador. {{
            this.$store.state.optionsServiceInterOp.selected.op }}
    </div>
</template>

<script>

import { mask, TheMask } from "vue-the-mask"

import IMG from "@/assets/logoSegipQR.png"

import * as srv from "@/services/InteroperabilidadService"
import RadioOpcionesSearch from './radioOpcionesSearch.vue'
import AlertBox from './AlertBox.vue'



export default {

    name: "SegipMaker",
    directives: { mask },
    components: { TheMask, RadioOpcionesSearch, AlertBox, },
    data() {
        return {
            campos: {
                in: ["tipoPersona", "ci", "complemento", "apellidoPaterno", "apellidoMaterno", "nombres", "fechaNacimiento"],
                out: ["TipoPersona", "NumeroDocumento", "Complemento", "PrimerApellido", "SegundoApellido", "Nombres", "FechaNacimiento"],
                label: ['Origen Nacionalidad', 'Numero Documento', 'Complemento', 'Primer Apellido', 'Segundo Apellido', 'Nombres', 'Fecha Nacimiento'],
                type: ['text', 'number', "text", "text", "text", "text", 'text'],
                icon: ['mdi-account-tie', 'mdi-card-account-details-outline', 'mdi-card-account-details', 'mdi-human-greeting', 'mdi-human-greeting', 'mdi-human-greeting', 'mdi-calendar'],
                colorIcon: ['red darken-2', 'orange darken-2', 'orange darken-2', 'teal darken-2', 'teal darken-2', 'teal darken-2', 'blue darken-2']

            },
            setSegip: {
                "tipoPersona": { value: 1, text: "Nacional" },
                "ci": null,
                "complemento": null,
                "apellidoPaterno": null,
                "apellidoMaterno": null,
                "nombres": null,
                "fechaNacimiento": null
            },
            itemsTipoPersona: [{ value: 1, text: "Nacional" }, { value: 2, text: "Extranjer(@)" }],
            getSegip: {},
            loading: false,
            image: IMG,
            mensaje: "",
            constrastacion: {
                salida: ["No Corresponde", "Corresponde", "No verificado"],
                icon: ["mdi-close-circle", "mdi-check-circle", "mdi-alert"],
                color: ["error", "success", "warning"]
            },
            titulo: "Constrastacion de datos de Ciudadano",
            subtitulo: "Introduzca al menos el numero de documento",
            typeAlert: "success",
            swAlert: false,

            numero_documentoRules: [
                v => (!!v) || 'Numero de documento es requerido',
                v => (v && v.length >= 5) || 'El Numero debe tener menos de 5 caracteres',
            ],
            otherRules: []

        }
    },
    computed: {
        verifica() {
            const op = this.$store.state.optionsServiceInterOp.selected.op
            return op == 'C';
        },
        avatarSearch() {
            return this.$store.state.optionsServiceInterOp.selectedMore.graph
        },
    },
    methods: {
        async clicHere() {
            this.loading = true
            this.mensaje = ""
            this.getSegip = {}

            let documento = this.setSegip.ci
            if (this.setSegip.complemento != undefined && this.setSegip.complemento != "") {
                documento = this.setSegip.ci + "-" + this.setSegip.complemento;
            }

            const datos = { ...this.setSegip, tipoPersona: this.setSegip.tipoPersona.value, ci: documento }

            try {

                const response = await srv.segipConsultaConstrastacionDatosPersona(datos)
                console.log("respuesta", response)
                if (response.esValido) {
                    this.mensaje = response.mensaje + '. ' + response.descripcionRespuesta
                    switch (response.codigoRespuesta) {
                        case 0:
                            this.typeAlert = "error"
                            break;
                        case 1:
                            this.typeAlert = "error"
                            this.mensaje =  response.descripcionRespuesta
                            break;
                        case 2:
                            this.typeAlert = "success"
                            break;
                        case 3:
                            this.typeAlert = "warning"
                            break;
                        case 4:
                            this.typeAlert = "warning"
                            break;
                        case 5:
                            this.typeAlert = "warning"
                            break;
                        default:
                            this.typeAlert = "info"
                            break;
                    }

                    this.getSegip = response.codigoRespuesta > 1 ? response.datosPersonaEnFormatoJson : {}
                } else {
                    this.typeAlert = "error"
                    this.mensaje = response.mensaje + '. ' + response.descripcionRespuesta
                }

            } catch (error) {
                this.mensaje = "No se pudo procesar la operación de busqueda. Vuelva a intentarlo y si persiste el error, comuniquese con el Administrador."
                console.log(this.mensaje)
            }
            setTimeout(() => { this.loading = false }, 2000)
        },

    },

}
</script>

<style></style>