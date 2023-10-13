<template>
    <div v-if="datos">
        <v-row align="center" v-if="type == 'NIT'" align-content="center" justify="center">
            <v-col cols="6" v-for="(obj, i ) in data.xnit" :key="`infoEmpMak_${i}`" align-self="center">
                <datos-matricula :matricula="obj" />
            </v-col>
        </v-row>
        <div v-if="type == 'MAT'">
            <v-row align="center" align-content="center" justify="center">
                <v-col cols="6" v-for="(obj, i ) in data.xnit" :key="`infoEmpMak_${i}`" align-self="center">
                    <datos-matricula :matricula="obj" :indexControl="i" :clickIndex="clickIndexSelected" />
                </v-col>
            </v-row>
            <v-row align-content="center" justify="center" dense>
                <datos-empresa :empresa="datosMatricula" :noAvatar="true" />
                <datos-sucursal :sucursal="datosMatricula.MatriculaDatosSucList1.MatriculaDatosSuc" />
            </v-row>
        </div>
        <div v-if="type == 'REP'">
            <v-row align="center" v-if="type == 'REP'" align-content="center" justify="center">
                <v-col cols="6" v-for="(obj, i ) in data.xnit" :key="`infoEmpMak_${i}`" align-self="center">
                    <datos-matricula :matricula="obj" :indexControl="i" :clickIndex="clickIndexSelected" />
                </v-col>
            </v-row>
            <v-row align-content="center" justify="center" dense>
                <datos-representante :representantes="datosRepresentante" />
            </v-row>

        </div>

    </div>
</template>

<script>
import DatosEmpresa from './DatosEmpresa.vue'
import DatosMatricula from './DatosMatricula.vue'
import DatosPersona from './DatosPersona.vue'
import DatosRepresentante from './DatosRepresentante.vue'
import DatosSucursal from './DatosSucursal.vue'

export default {
    components: {
        DatosMatricula,
        DatosEmpresa,
        DatosPersona,
        DatosSucursal,
        DatosRepresentante

    },
    props: {
        type: { type: String, default: 'O' },
        dataInfo: { type: Object, default: {} }
    },
    data() {
        return {
            indexSelected: 0,
            data: null
        }
    },
    computed: {
        datos() {
            this.indexSelected = 0
            if (this.dataInfo) {
                this.data = this.dataInfo
                return true
            }
            else return false
        },
        datosMatricula() {
            const aux = this.data.xmat[this.indexSelected]
            return {
                ...aux,
                razonSocial: aux.RazonSocial,
                fechaInscripcion: aux.FechaInscripcion,
                nit: aux.Nit,
                actividadPrincipal: aux.Actividad
            }
        },
        datosRepresentante() {
            const aux =  this.data.xrep[this.indexSelected]
            if(aux.Representante) return aux.Representante
            else return []
        }

    },
    methods: {
        clickIndexSelected(value) {
            this.indexSelected = value
        }
    },
    watch: {
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
