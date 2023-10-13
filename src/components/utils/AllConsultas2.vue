<template>
    <div class="fondoColor">
        <v-card class="mx-auto">
            <!--
        <v-card-title
            :class="`${step != 1 ? colorTitleBar : colorTitleBarDefault} white--text  text-h6 font-weight-regular justify-center`">
            <div>SERVICIOS DE INTEROPERABILIDAD{{ step != 1 ? ': ' + titleBar : '' }}</div>
        </v-card-title>
        -->
            <v-system-bar :color="colorTitleBarDefault" dark window>
                <v-btn :disabled="step === 1" text @click="step = 1">
                    <v-icon color="blue darken-3" size="25">mdi-arrow-left-bold-outline</v-icon><span class="blue--text" v-if="step > 1">Atras</span>
                </v-btn>

                <!-- v-icon color="white" size="25">mdi-arrow-right-bold-outline</v-icon -->
                <v-spacer></v-spacer>
                <div class="blue--text text--darken-2 subheading font-weight-bold">SERVICIOS DE INTEROPERABILIDAD
                    {{ step != 1 ? ': ' + titleBar : '' }}</div>
                <v-spacer></v-spacer>
               <!-- <v-icon color="blue darken-3" size="25" v-if="step != 1 && $store.state.optionsServiceInterOp.options.length > 1">{{ iconBar }}</v-icon> -->
<menu-icon :icon="iconBar" v-if="step != 1 && $store.state.optionsServiceInterOp.options.length > 1"></menu-icon>
                
            </v-system-bar>

            <v-window v-model="step">
                <v-window-item :value="1">
                    <v-card-text>
                        <v-divider></v-divider>
                        <v-row dense>

                            <v-col cols="12" xs="10" sm="10" md="6" xl="4" lg="4" v-for="(obj, i ) in   byperson"
                                :key="'stpr-' + i">



                                <ContenedorCardOnClick color="#1D62A1" class="px-5 py-3" 
                                :image="true" :avatar="obj.graph"
                                :onClick="()=>{ingresar(obj)}">
                                    <div class="font-weight-black text-center text-h6 " style="color: rgb(29, 98, 161);">
                                        {{ obj.title }}
                                    </div>
                                    <br /><br />
                                </ContenedorCardOnClick>

                                <!--
                                <v-hover v-slot="{ hover }" open-delay="200">

                                    <v-card :elevation="hover ? 16 : 0" :class="{ 'on-hover': hover }"
                                        class="rounded-lg mx-auto" @click="ingresar(obj)">
                                        <v-card-text class="text-center text--primary">
                                            <v-row align-content="center" justify="center">

                                                <v-col class="shrink">
                                                    <v-avatar class="profile" color="grey" size="140" tile>
                                                        <v-img :src="obj.graph" style="background:white;"
                                                            width="100%"></v-img>
                                                    </v-avatar>

                                                </v-col>
                                                <div class="font-weight-black text-center text-h6">
                                                    {{ obj.title }}
                                                </div>
                                               
                                            </v-row>

                                        </v-card-text>                            
                                    </v-card>
                                </v-hover>
-->

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

            <v-card-actions v-if="step > 1">
                <v-btn :disabled="step === 1" text @click="step = 1">
                    <v-icon  size="25">mdi-arrow-left-bold-outline</v-icon>Atras
                </v-btn>

            </v-card-actions>
        </v-card>
    </div>
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
import OvtMaker from "./OvtMaker.vue"
import SenasirBox from './SenasirBox.vue'


import GestoraMaker from "./GestoraMaker.vue"
import SeprecBox from './SeprecBox.vue'

import ContenedorCardOnClick from "./ContenedorCardOnClick.vue"
import MenuIcon from './MenuIcon.vue'

export default {
    components: {
        BdpaBoxVue, SegipBox, OvtMaker, SenasirBox,
        GestoraMaker, SeprecBox,
        ContenedorCardOnClick,
        MenuIcon
    },
    data: () => ({
        colorTitleBarDefault: "grey lighten-2",
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
            serv: 'Información de los asegurados Titulares y Beneficiarios. La BDPA incluye funcionalidades que posibilitan al Ente Gestor la validación de la identidad de los asegurados, la identificación de la fuente de pago, la información de rentistas y otros.',
            color: "light-blue darken-3",//"#1D62A1",
            component: 'BdpaBoxVue',
            graph: ASUSS,
            icon: "mdi-account-details-outline",
            options: [{ value: 'PR', title: 'Consulta de afiliacion / No Afiliacion', op: 'B' },]
        },
        {
            v: 'S',
            title: 'SEGIP',
            serv: 'Servicio General de Identificación Personal, consulta devuelve información personal, introduciendo el número de Cédula de Identidad y la fecha de nacimiento.',
            color: "light-blue darken-3",//'indigo',
            component: 'SegipBox',
            graph: SEGIP,
            icon: "mdi-account-box-outline",
            options: [{ value: 'CI', title: 'Validacion de la Identidad', op: 'S' },]
        },
        {
            v: 'O',
            title: 'OVT',
            serv: 'Ministerio de Trabajo - OVT: Con esta opción en la consulta, despliega la información sobre la fuente de Pago de una persona. Reporte del Ultimo pago emitido en un periodo de 3 meses y adicionalmente nos permite saber la ENTIDAD y el NIT. Se debe introducir número de Cédula de Identidad y fecha de nacimiento',
            color: "light-blue darken-3", //'success',
            component: 'OvtMaker',
            graph: OVT,
            icon: "mdi-account-wrench-outline",
            options: [{ value: 'OVT', title: 'Reporte de Persona', op: 'P' },
            { value: 'OVT', title: 'Reporte de Empresas', op: 'E' }
            ]
        },
        {
            v: 'R',
            title: 'SENASIR',
            serv: 'Servicio Nacional de Reparto (SENASIR). Valida si la persona esta registrada en el SENASIR',
            color: "light-blue darken-3", //'info',
            component: 'SenasirBox',
            graph: SENASIR,
            icon: "mdi-account-reactivate-outline",
            options: [{ value: 'RE', title: 'Informacion Rentista', op: 'R' }
            ]
        },
        {
            v: 'G',
            title: 'GESTORA',
            serv: 'Gestora Pública de la Seguridad Social de Largo Plazo - Consulta los datos de Estado de ahorro personal previsional y los datos de una empresa registrada en la GESTORA. Por NIT o MATRICULA de Empresa.',
            color: "light-blue darken-3", //'purple',
            component: 'GestoraMaker',
            graph: GESTORA,
            icon: "mdi-account-settings-outline",
            options: [{ value: 'RE', title: 'Busqueda Rentista', op: 'GR' },
            { value: 'EMP', title: 'Busqueda Empresa', op: 'GE' }
            ]
        },

        {
            v: 'SP',
            title: 'SEPREC',
            serv: 'Consulta al registro de empresas.',
            color: "light-blue darken-3", //'error',
            component: 'SeprecBox',
            graph: SEPREC,
            icon: "mdi-domain",
            options: [{ value: 'NIT', title: 'Buscar registro', op: 'SP' }]
        }
        ],


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
        ingresar(obj) {
            this.step = 2
            const selected = obj.options[0]
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
<style lang="sass" scoped>
.v-card.on-hover.theme--dark 
    background-color: rgba(#FFF, 0.8)
    >.v-card__text 
        color: #000
</style>
<style >
.fondoColor {
    background-color: white;
    height: 100%;
}

.v-card--reveal {
    padding: 10px;
    align-items: center;
    top: 0;
    justify-content: center;
    opacity: 0.9;
    position: absolute;
    width: 99%;
    border-radius: 50px;

}
</style>