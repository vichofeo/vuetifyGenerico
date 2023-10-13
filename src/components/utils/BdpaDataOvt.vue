<template>

    <!--<div class="grey lighten-5">-->
        <div >
            
        <br></br>
        
        <ContenedorCard :title="`OVT ${valido ? '(Total Registros: ' + dataEmpresa.length + ')' : ''}`"
            :color="valido ? 'green darken-1' : 'grey darken-1'" icon="mdi-hospital-building">
            <div v-if="valido">
                
                <table-data :headers="headers" :items="dataEmpresa" :op-color="2"/>
            </div>
            <div v-else>
                <contenedor-alert dark outlined border="bottom" color="grey darken-2" elevation="2" icon="mdi-alert"
                    prominent>
                    OVT: {{ data.mensaje }}
                </contenedor-alert>
            </div>

        </ContenedorCard>
    </div>
</template>

<script>
import ContenedorCard from './ContenedorCard.vue'
import ContenedorAlert from './ContenedorAlert.vue'
import TableData from './TableData.vue'
export default {
    name: "DatosOvtFromBdpa",
    components: { ContenedorAlert, ContenedorCard, TableData },
    props: { data: { type: Object, default: () => (null) } },
    data() {
        return {
            dataEmpresa: null,
            typeAlert: 'success',
            headers: [{ value: "caja.descripcion", text: "ENTE GESTOR", align: "start" },
            { value: "razonSocial", text: "ENTIDAD EMPLEADORA", align: "start" },
            { value: "nit", text: "NIT", align: "end" },
            { value: "gestion", text: "GESTION", align: "end"},
            { value: "periodo", text: "PERIODO", align: "start"},
            { value: "matriculaComercio", text: "MATRICULA", align: "start" },
            
        ],
            
        }
    },
    methods: {
        
    },
    computed: {
        valido() {
            if (this.data.finalizado == true) {
                const aux = this.data.datos
                this.dataEmpresa = aux.empresas.map((o, i) => ({ ...o, idx: i, matriculaComercio: o.matriculaComercio ? o.matriculaComercio : '-' }))
                return true
            }
            return false


        }
    },
}
</script>

<style></style>