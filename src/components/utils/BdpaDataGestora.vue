<template>
    <!--<div class="grey lighten-5">-->
    <div>
        <br></br>
        <ContenedorCard
            :title="`GESTORA ${valido ? '- CUA: ' + data.rentista.codigoUnicoAsegurado + ' (Total Registros: ' + dataGestora.length + ')' : ''}`"
            :color="valido ? 'teal darken-1' : 'grey darken-1'" icon="mdi-calendar-check">
            <div v-if="valido">

                <table-data :headers="headers" :items="dataGestora" :op-color="1" />
            </div>
            <div v-else>
                <contenedor-alert dark outlined border="bottom" color="grey darken-2" elevation="2" icon="mdi-alert"
                    prominent>
                    <!--  GESTORA: {{ data.mensaje }} -->
                    GESTORA: No se encontro Resultados
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
            dataGestora: null,
            typeAlert: 'success',
            headers: [
                { value: "tipoIdentificacion", text: "TIPO", align:"center" },
                { value: "numeroIdentificacion", text: "# IDENTIFICACION", align:"end" },
            { value: "entidadEmpleadora", text: "ENTIDAD EMPLEADORA", align:"start" },
            { value: "gestion", text: "GESTION", align:"end" },
            { value: "periodo", text: "PERIODO", align:"end" }
            ],

        }
    },
    methods: {

    },
    computed: {
        valido() {
            if (this.data.codigoRespuesta == 0) {
                //const aux = this.data.periodoCotizacion
                
                const aux = this.data.periodoCotizacion.periodoCotizacion
                //                if (!this.data.periodoCotizacion || this.data.periodoCotizacion.length <= 0) {
                if (!this.data.periodoCotizacion) {
                    this.data.mensaje = this.data.mensaje + '. Rentista ' + this.data.rentista.nombres + ' ' + this.data.rentista.primerApellido + ', no cuenta con datos de Periodo de Cotización'
                    return false
                }

                console.log("************************")
                console.log(aux)
                //this.dataGestora = aux.map((obj, i) => ({ ...obj, idx: i }))
                //this.dataGestora = aux.map((obj, i) => ({ ...obj, idx: i, entidadEmpleadora: this.data.periodoCotizacion.entidadEmpleadora, gestion: obj.split('-')[1], periodo: obj.split('-')[0] }))
                this.dataGestora = [{ ...this.data.periodoCotizacion,  gestion: aux.split('-')[0], periodo: aux.split('-')[1] }]
                return true
            }
            return false


        }
    },
}
</script>
  
<style></style>