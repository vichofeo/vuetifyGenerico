<template>
    <!--
    <div class="fondoColor">
-->
<div ><v-responsive>
        <v-system-bar :color="colorTitleBarDefault" dark window>
            <v-btn :disabled="step === 1" text 
            v-if="step > 1"
            @click="step = 1">
                <v-icon color="blue darken-3" size="25">mdi-arrow-left-bold-outline</v-icon>
                <span class="blue--text" v-if="step > 1">Atras</span>
            </v-btn>


            <v-spacer></v-spacer>
            <div class="blue--text text--darken-2 subheading font-weight-bold">SERVICIOS DE INTEROPERABILIDAD
                {{ step != 1 ? ': ' + titleBar : '' }}</div>
            <v-spacer></v-spacer>

            <menu-icon :icon="iconBar"
                v-if="step != 1 && $store.state.optionsServiceInterOp.options.length > 1"></menu-icon>
        </v-system-bar>
    </v-responsive>


        <v-container id="consultas" fluid tag="section" >

            <v-window v-model="step">
                <v-window-item :value="1">
                    <div>&nbsp;</div>
                    <v-row justify="center" class="paddingBody">

                        <v-col cols="12" xs="12" sm="12" md="6" xl="4" lg="4" v-for="(obj, i ) in   byperson"
                            :key="'stpr-' + i" >

                            <ContenedorCardOnClick class="blue-grey lighten-5"
                            color="#1D62A1"  :image="true"
                                :avatar="obj.graph" 
                                :avatarName="obj.title"
                                :onClick="() => { ingresar(obj) }">
                                <div class="font-weight-black text-center text-h6 " style="color: rgb(29, 98, 161);">
                                    {{ obj.title }}
                                </div>
                                <div class="font-weight-bold text-center text-caption" style="color: rgb(29, 98, 161);">
                                    {{ obj.name }}
                                </div>
                                <br />
                            </ContenedorCardOnClick>
                            <br /><br />
                        </v-col>

                    </v-row>
                </v-window-item>

                <v-window-item :value="2" >

                    <Transition>
                        
                            <component :is="activeComponent"></component>
                        
                    </Transition>

                </v-window-item>
<!--
                <v-window-item :value="3">
                    <Transition>
                        
                            <component :is="activeComponentEmp"></component>
                        
                    </Transition>
                </v-window-item>
                -->
            </v-window>

            
        </v-container>

    </div>
</template>

<script>
import ASUSS from "@/assets/LogoBDPAv3.png" //"@/assets/logoAsuss_.png"
import SEGIP from "@/assets/logoSegip.png"
import OVT from "@/assets/logoOvt.png"
import SENASIR from "@/assets/logoSenasir.png"
import GESTORA from "@/assets/logoGestora.png"
import SEPREC from "@/assets/logoSeprec.png"
import DEFAULT from "@/assets/logo_asuss.png"

import BdpaBoxVue from './BdpaBox.vue'
import SegipMaker from "./SegipMaker.vue"
import OvtMaker from "./OvtMaker.vue"
import SenasirBox from './SenasirBox.vue'


import GestoraMaker from "./GestoraMaker.vue"
import SeprecBox from './SeprecBox.vue'

import ContenedorCardOnClick from "./ContenedorCardOnClick.vue"
import MenuIcon from './MenuIcon.vue'

export default {
    components: {
        BdpaBoxVue, SegipMaker, OvtMaker, SenasirBox,
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
            name: 'BASE DE DATOS DE LA POBLACION ASEGURADA',
            serv: 'Información de los asegurados Titulares y Beneficiarios. La BDPA incluye funcionalidades que posibilitan al Ente Gestor la validación de la identidad de los asegurados, la identificación de la fuente de pago, la información de rentistas y otros.',
            color: "light-blue darken-3",//"#1D62A1",
            component: 'BdpaBoxVue',
            graph: ASUSS,
            icon: "mdi-menu",
            options: [{ value: 'PR', title: 'Consulta de afiliacion / No Afiliacion', op: 'B' },]
        },
        {
            v: 'S',
            title: 'SEGIP',
            name: 'SERVICIO GENERAL DE IDENTIFICACION PERSONAL',
            serv: 'Servicio General de Identificación Personal, consulta devuelve información personal, introduciendo el número de Cédula de Identidad y la fecha de nacimiento.',
            color: "light-blue darken-3",//'indigo',
            component: 'SegipMaker',
            graph: SEGIP,
            icon: "mdi-menu",
            options: [{ value: 'CI', title: 'Consulta datos de Ciudadano', op: 'S' },
            { value: 'CR', title: 'Contrastación datos de Ciudadano', op: 'C' }
        ]
        },
        {
            v: 'R',
            title: 'SENASIR',
            name: 'SERVICIO NACIONAL DEL SISTEMA DE REPARTO',
            serv: 'Servicio Nacional de Reparto (SENASIR). Valida si la persona esta registrada en el SENASIR',
            color: "light-blue darken-3", //'info',
            component: 'SenasirBox',
            graph: SENASIR,
            icon: "mdi-menu",
            options: [{ value: 'RE', title: 'Informacion Rentista', op: 'R' }
            ]
        },
        {
            v: 'O',
            title: 'OVT',
            name:'OFICINA VIRTUAL DE TRAMITES - MINISTERIO DE TRABAJO',
            serv: 'Ministerio de Trabajo - OVT: Con esta opción en la consulta, despliega la información sobre la fuente de Pago de una persona. Reporte del Ultimo pago emitido en un periodo de 3 meses y adicionalmente nos permite saber la ENTIDAD y el NIT. Se debe introducir número de Cédula de Identidad y fecha de nacimiento',
            color: "light-blue darken-3", //'success',
            component: 'OvtMaker',
            graph: OVT,
            icon: "mdi-menu",
            options: [{ value: 'OVT', title: 'Consulta de Funcionario Público', op: 'P' },
            { value: 'OVT', title: 'Consulta ROE de Empresa', op: 'E' }
            ]
        },
        
        {
            v: 'G',
            title: 'GESTORA',
            name: 'PUBLICA DE LA SEGURIDAD SOCIAL DE LARGO PLAZO',
            serv: 'Gestora Pública de la Seguridad Social de Largo Plazo - Consulta los datos de Estado de ahorro personal previsional y los datos de una empresa registrada en la GESTORA. Por NIT o MATRICULA de Empresa.',
            color: "light-blue darken-3", //'purple',
            component: 'GestoraMaker',
            graph: GESTORA,
            icon: "mdi-menu",
            options: [{ value: 'RE', title: 'Consulta de Rentista', op: 'GR' },
            { value: 'EMP', title: 'Consulta de Empresas', op: 'GE' }
            ]
        },

        {
            v: 'SP',
            title: 'SEPREC',
            name: 'SERVICIO PLURINACIONAL DE REGISTRO DE COMERCIO',
            serv: 'Consulta al registro de empresas.',
            color: "light-blue darken-3", //'error',
            component: 'SeprecBox',
            graph: SEPREC,
            icon: "mdi-menu",
            options: [{ value: 'NIT', title: 'Buscar registro', op: 'SP' }]
        }
        ],


    }),

    computed: {
        
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

<style >
.fondoColor {
    height: 100%;
    background: url("../../assets/Background_sgpa.jpeg") no-repeat center center fixed;
}
.manito {
    cursor: pointer;
}


.paddingBody {
    padding: 2em;
}


.pagination .page-link {
        color: rgb(29, 98, 161);
}

.pagination .page-item.active .page-link {
    color: #fff;
        background-color:rgb(29, 98, 161);
}
</style>