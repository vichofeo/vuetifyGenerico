<template>
    <v-card class="mx-auto">

        <v-card-title
            :class="`${step != 1 ? colorTitleBar : colorTitleBarDefault} white--text  text-h6 font-weight-regular justify-center`">
            <div>SERVICIOS DE INTEROPERABILIDAD{{ step != 1 ? ': ' + titleBar : '' }}</div>
        </v-card-title>
        <v-system-bar :color="`${step != 1 ? colorTitleBar : colorTitleBarDefault}`" dark>
            <v-btn :disabled="step === 1" text @click="step = 1">
                <v-icon color="white" size="25">mdi-arrow-left-bold-outline</v-icon>
            </v-btn>
            
            <!-- v-icon color="white" size="25">mdi-arrow-right-bold-outline</v-icon -->
            <v-spacer></v-spacer>

            <v-icon color="white" size="25">{{ iconBar }}</v-icon>
        </v-system-bar>

        <v-window v-model="step">
            <v-window-item :value="1">
                <v-card-text>
                    <v-row dense>
                        <v-col cols="12" xs="10" sm="10" md="6" xl="6" lg="6">
                            <div class="font-weight-bold text-h6">Servicios por Persona</div>
                            <v-stepper vertical v-model="stepperVar">
                                <v-stepper-items>
                                    <span v-for="(obj, i ) in   byperson" :key="'stpr-' + i">
                                        <v-stepper-step :step="obj.v" complete editable :edit-icon="obj.icon"
                                            :color="obj.color">
                                            {{ obj.title }}
                                        </v-stepper-step>
                                        <v-stepper-content :step="obj.v">
                                            <v-card elevation="2" outlined>
                                                <v-card-text class="text--primary">
                                                    <v-row align-content="center" justify="center">
                                                        <v-col class="shrink">
                                                            <v-avatar class="profile" color="grey" size="160">
                                                                <v-img :src="obj.graph" style="background:white;"></v-img>
                                                            </v-avatar>
                                                        </v-col>
                                                        <div class="font-weight-black text-center text-h6">
                                                            Servicios {{ obj.title }}
                                                        </div>
                                                        <div class="text-center"> {{ obj.serv }} </div>
                                                    </v-row>
                                                </v-card-text>
                                                <v-card-actions class="text-center text--primary">
                                                    <div class="text-center">
                                                        <v-btn text dark :color="obj.color" @click="ingresar(obj, o)" small
                                                            v-for="(o, j) in obj.options" :key="`optionsService_${j}`">{{
                                                                o.title }}</v-btn>
                                                    </div>
                                                </v-card-actions>
                                            </v-card>
                                        </v-stepper-content>
                                    </span>
                                </v-stepper-items>
                            </v-stepper>
                        </v-col>
                        <v-col cols="12" xs="10" sm="10" md="6" xl="6" lg="6">
                            <div class="font-weight-bold text-h6">Servicios por Empresa</div>
                            <v-stepper vertical v-model="stepperEmp">
                                <v-stepper-items>
                                    <span v-for="(obj, i ) in   byEmp" :key="'stemp-' + i">
                                        <v-stepper-step :step="obj.v" editable :color="obj.color">
                                            {{ obj.title }}
                                        </v-stepper-step>
                                        <v-stepper-content :step="obj.v">
                                            <v-card :color="obj.color" dark>
                                                <v-card-title class="text-h6">
                                                    Servicios {{ obj.title }}
                                                </v-card-title>
                                                <v-card-text class="white text--primary">
                                                    <p>{{ obj.serv }}</p>
                                                </v-card-text>
                                                <v-card-actions class="white  text--primary">
                                                    <div class="text-center">
                                                        <v-btn text dark class="text-center text--primary"
                                                            @click="ingresarEmpresa(obj, o)" small
                                                            v-for="(o, j) in obj.options" :key="`optionsService_${j}`">{{
                                                                o.title }}</v-btn>
                                                    </div>
                                                </v-card-actions>
                                            </v-card>
                                        </v-stepper-content>
                                    </span>
                                </v-stepper-items>
                            </v-stepper>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-window-item>

            <v-window-item :value="2">

                <Transition>
                    <KeepAlive>
                        <component :is="activeComponent"></component>
                    </KeepAlive>
                </Transition>

            </v-window-item>

            <v-window-item :value="3">
                <Transition>
                    <KeepAlive>
                        <component :is="activeComponentEmp"></component>
                    </KeepAlive>
                </Transition>
            </v-window-item>
        </v-window>

        <v-divider></v-divider>

        <v-card-actions>
            <v-btn :disabled="step === 1" text @click="step = 1">
                Regresar
            </v-btn>
            
        </v-card-actions>
    </v-card>
</template>

<script>
import ASUSS from "@/assets/logoAsuss_.png"
import SEGIP from "@/assets/logoSegip.png"
import OVT from "@/assets/logoOvt.png"
import SENASIR from "@/assets/logoSenasir.png"
import GESTORA from "@/assets/logoGestora.png"
import SEPREC from "@/assets/logoSeprec.png"
import DEFAULT from "@/assets/logo_asuss.png"

import BdpaBoxVue from './BdpaBox.vue'
import SegipBox from './SegipBox.vue'
import OvtBox from './OvtBox.vue'
import SenasirBox from './SenasirBox.vue'

import OvtEmpBox from './OvtEmpBox.vue'
import GestoraBox from './GestoraBox.vue'
import SeprecBox from './SeprecBox.vue'
export default {
    components: {
        BdpaBoxVue, SegipBox, OvtBox, SenasirBox,
        OvtEmpBox, GestoraBox, SeprecBox
    },
    data: () => ({
        colorTitleBarDefault: "teal",
        colorTitleBar: null,
        titleBar: null,
        iconBar: null,
        step: 1,
        activeComponent: null,
        stepperVar: 'B',
        optionsSelected: {},
        activeComponentEmp: null,
        stepperEmp: 'O',
        optionsEmpSelected: {},
        byperson: [{
            v: 'B',
            title: 'BDPA',
            serv: 'Consulta de datos en BDPA, contrastacion con SEGIP, estado de renta OVT, si es Titular o si es BENEFICIARIO',
            color: "light-blue darken-3",//"#1D62A1",
            component: 'BdpaBoxVue',
            graph: ASUSS,
            icon: "mdi-account-details-outline",
            options: [{ value: 'PR', title: 'Persona', op: 'B' },
            { value: 'EG', title: 'Ente Gestor', op: 'B' },
            { value: 'RB', title: 'Arbol de Beneficiarios', op: 'B' },
            { value: 'OV', title: 'OVT', op: 'B' },
            { value: 'CR', title: 'Certificacion', op: 'B' }
            ]
        },
        {
            v: 'S',
            title: 'SEGIP',
            serv: 'Consulta de datos en contrastacion con SEGIP por interoperabilidad',
            color: 'indigo',
            component: 'SegipBox',
            graph: SEGIP,
            icon: "mdi-account-box-outline",
            options: [{ value: 'CI', title: 'Datos Persona', op: 'S' },
            { value: 'CIC', title: 'Certificacion SEGIP', op: 'S' },
            ]
        },
        {
            v: 'O',
            title: 'OVT',
            serv: 'Oficina Virtual de Tramites (OVT) - Ministerio de Trabajo. Consulta de datos para ver el estado de pago  e informacion del empleador',
            color: 'success',
            component: 'OvtBox',
            graph: OVT,
            icon: "mdi-account-wrench-outline",
            options: [{ value: 'OVT', title: 'Estado de Persona', op: 'O' }
            ]
        },
        {
            v: 'R',
            title: 'SENASIR',
            serv: 'Consulte el estado de cuenta de rentista',
            color: 'info',
            component: 'SenasirBox',
            graph: SENASIR,
            icon: "mdi-account-reactivate-outline",
            options: [{ value: 'RE', title: 'Informacion Rentista', op: 'R' }
            ]
        },
        {
            v: 'G',
            title: 'GESTORA',
            serv: 'Gestora Pública de la Seguridad Social de Largo Plazo - Consulta los datos de Rentista registrada en la GESTORA. ',
            color: 'purple',
            component: 'SenasirBox',
            graph: GESTORA,
            icon: "mdi-account-settings-outline",
            options: [{ value: 'RE', title: 'Informacion Rentista', op: 'R' }
            ]
        }
        ],

        byEmp: [
            {
                v: 'O',
                title: 'OVT',
                serv: 'Oficina Virtual de Tramites (OVT)- Ministerio de trabajo. Consulta NIT de empresa',
                color: 'success',
                component: 'OvtEmpBox',
                options: [{ value: 'OVT', title: 'Estado de Empresas', op: 'O' }
                ]
            },
            {
                v: 'GE',
                title: 'GESTORA',
                serv: 'Gestora Pública de la Seguridad Social de Largo Plazo - Consulta los datos de una empresa registrada en la GESTORA. ',
                color: 'purple',
                component: 'GestoraBox',
                options: [{ value: 'EMP', title: 'Informacion Empresa', op: 'GE' }
                ]
            },
            {
                v: 'SP',
                title: 'SEPREC',
                serv: 'Consulta de Empresas  para obtener informacion de la matricula en detalle o los datos del representante legal',
                color: 'error',
                component: 'SeprecBox',
                options: [{ value: 'NIT', title: 'Informacion Matricula', op: 'SP' },
                { value: 'MAT', title: 'Matricula en Detalle', op: 'SP' },
                { value: 'REP', title: 'Representante Legal', op: 'SP' }
                ]
            }
        ]
    }),

    computed: {
        currentTitle() {
            switch (this.step) {
                case 1:
                    return 'Sign-up'
                case 2:
                    return 'Create a password'
                default:
                    return 'Account created'
            }
        },
    },
    methods: {
        ingresar(obj, selected) {
            this.step = 2
            this.activeComponent = obj.component
            this.optionsSelected = selected
            const selectedMore = {
                title: obj.title,
                graph: obj.graph
            }
            
            this.$store.dispatch('updateOptionsServiceInterOp', { selected: selected, options: obj.options, selectedMore })
            //pinta el color de la barra de titulo
            this.colorTitleBar = obj.color
            this.titleBar = obj.title
            this.iconBar = obj.icon
        },
        ingresarEmpresa(obj, selected) {
            this.step = 3
            this.activeComponentEmp = obj.component
            this.optionsEmpSelected = selected
            selected.interTitle = obj.title
            selected.graph = obj.graph

            this.$store.dispatch('updateOptionsServiceInterOp', { selected: selected, options: obj.options })
            //pinta el color de la barra de titulo
            this.colorTitleBar = obj.color
            this.titleBar = obj.title
            this.iconBar = obj.icon
        }
    },
}
</script>
