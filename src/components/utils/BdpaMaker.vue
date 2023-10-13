<template>
    <div v-if="dataInfo">
        <v-row align="center" v-if="type == 'PR'" align-content="center" justify="center">
            <v-col cols="12" xs="12" sm="12" md="6" xl="6" lg="6"
            v-for="(obj, i ) in dataInfo" :key="`infoPer_${i}`" align-self="center">
                <datos-persona :persona="obj" />
            </v-col>
        </v-row>
        <v-row align="center" v-if="type == 'EG'" align-content="center" justify="center">
            <v-col cols="12" xs="12" sm="12" md="6" xl="6" lg="6"
            v-for="(obj, i ) in dataInfo" :key="`infoPer_${i}`" align-self="center">
                <datos-persona :persona="obj" :indexControl="i" :clickIndex="clickIndexSelected" />                
            </v-col>   
           
            <datos-bdpa :estado_asegurado="dataInfo[indexSelected].estado_asegurado"/>
        </v-row>
        <v-row align="center" v-if="type == 'RB'" align-content="center" justify="center">
            <v-col cols="12" xs="12" sm="12" md="6" xl="6" lg="6"
            v-for="(obj, i ) in dataInfo" :key="`infoPer_${i}`" align-self="center">
                <datos-persona :persona="obj" :indexControl="i" :clickIndex="clickIndexSelected" />
                
            </v-col>
            
            <datos-rama-beneficiarios :datosEnteGestor="dataInfo[indexSelected]" />
        </v-row>
        <v-row align="center" v-if="type == 'OV'" align-content="center" justify="center">
            <v-col cols="12" xs="12" sm="12" md="6" xl="6" lg="6"
            v-for="(obj, i ) in dataInfo" :key="`infoPer_${i}`" align-self="center">
                <datos-persona :persona="obj" :indexControl="i" :clickIndex="clickIndexSelected" />
                
            </v-col>
            
            <datos-ovt :datos-ovt="dataInfo[indexSelected]" />
        </v-row>
        <v-row align="center" v-if="type == 'CR'" align-content="center" justify="center">
            <v-col cols="12"  xs="12" sm="12" md="11" xl="11" lg="11"
            align-self="center">
               <datos-certificacion :data-info="dataInfo[0]"/>
            </v-col>
        </v-row>
        
    </div>
</template>

<script>
import DatosBdpa from './DatosBdpa.vue'
import DatosCertificacion from './DatosCertificacion.vue'

import DatosOvt from './DatosOvt.vue'
import DatosPersona from './DatosPersona.vue'
import DatosRamaBeneficiarios from './DatosRamaBeneficiarios.vue'
export default {
    components: {
        DatosPersona,
        
        DatosRamaBeneficiarios,
        DatosOvt,
        DatosCertificacion,
        DatosBdpa
    },
    props: {
        type: { type: String, default: 'PR' },
        dataInfo: { type: Array, default: [] }
    },
    data() {
        return {
            indexSelected: 0
        }
    },
    computed: {
        computedDataGestor() {
            return this.formatDate(this.datos.fecha_nacimiento);
        },
    },
    methods: {
        clickIndexSelected(value) {
            this.indexSelected = value
        }
    },
    watch: {
        /*type(newQuestion, oldQuestion) {
            this.indexSelected = 0
        },*/
        dataInfo: {
            handler: function (val, oldVal) {
                this.indexSelected = 0
            },
            deep: true
        }
    },
}
</script>

<style></style>
