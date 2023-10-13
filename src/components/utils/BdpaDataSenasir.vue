<template>
<!--    <div class="grey lighten-5">-->
    <div >
        <br></br>
        <ContenedorCard :title="`SENASIR ${valido ? '(Total Registros: ' + dataSenasir.length + ')' : ''}`"
            :color="valido ? 'amber darken-4' : 'grey darken-1'" icon="mdi-glasses">
            <div v-if="valido">
                
                <table-data :headers="headers" :items="dataSenasir" :opColor="4"/>
                
            </div>
            <div v-else>
                <contenedor-alert dark outlined border="bottom" color="grey darken-2" elevation="2" icon="mdi-alert"
                    prominent>
                    SENASIR:  {{ data.descripcionRespuesta }}
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
    name: "DatosSenasirFromBdpa",
    components: { ContenedorAlert, ContenedorCard, TableData },
    props: { data: { type: Object, default: () => (null) } },
    data() {
        return {
            dataSenasir: null,
            typeAlert: 'success',
            headers: [
                { value: "idAseguradoPrestacion", text: "ID ASEGURADO PRESTACION", align:"end" },
                { value: "beneficio", text: "BENEFICIO", align:"start" },
                { value: "codCaja", text: "COD. CAJA", align:"end" },
            ],
            
        }
    },
    methods: {
        
    },
    computed: {
        valido() {
            if (this.data.esValido && this.data.codigoRespuesta == "2") {
                const aux = this.data.datosBeneficioEnFormatoJson
                aux.id = 0
                this.dataSenasir = [aux]
                return true
            }
            return false


        }
    },
}
</script>

<style></style>