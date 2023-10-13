<template>
    <div>
        <div v-if="datosGestora">
            <datos-empresa :empresa="datosGestora"></datos-empresa>


            <p>&nbsp;</p>
            <ContenedorCard
                :title="`REPRESENTANTES (Total Registros: ${(datosGestora.representanteLegal && datosGestora.representanteLegal.length > 0) ? datosGestora.representanteLegal.length : 0})`"
                :color="(datosGestora.representanteLegal && datosGestora.representanteLegal.length > 0) ? 'teal darken-1' : ''"
                icon="mdi-human-male-board">
                <div v-if="datosGestora.representanteLegal && datosGestora.representanteLegal.length > 0">
                    <table-data  :headers="headers" :items="datosGestora.representanteLegal" :opColor="1">
                       
                        <template v-slot:xpnd="item">
                            
                            <DatosSucursal :sucursal="item.item.matrizSucursal"></DatosSucursal>
                        </template>
                        </table-data>
                  
                </div>
                <div v-else>
                    <contenedor-alert dark outlined border="bottom" color="grey darken-2" elevation="2" icon="mdi-alert"
                        prominent>
                        {{ datosGestora.mensaje }}
                    </contenedor-alert>
                </div>
            </ContenedorCard>
            <p>&nbsp;</p>
            <ContenedorCard
                :title="`MATRIZ-SUCURSAL (Total Registros: ${(datosGestora.matrizSucursal && datosGestora.matrizSucursal.length > 0) ? datosGestora.matrizSucursal.length : 0})`"
                :color="(datosGestora.matrizSucursal && datosGestora.matrizSucursal.length > 0) ? 'green darken-1' : ''"
                icon="mdi-home-city-outline">
                <div v-if="datosGestora.matrizSucursal && datosGestora.matrizSucursal.length > 0">
                    <table-data  :headers="headersMatriz" :items="datosGestora.matrizSucursal" :opColor="2"/>
                </div>
                <div v-else>
                    <contenedor-alert dark outlined border="bottom" color="grey darken-2" elevation="2" icon="mdi-alert"
                        prominent>
                        {{ datosGestora.mensaje }}
                    </contenedor-alert>
                </div>
            </ContenedorCard>

        </div>


    </div>
</template>

<script>
import ContenedorAlert from './ContenedorAlert.vue'
import ContenedorCard from './ContenedorCard.vue'
import DatosEmpresa from './DatosEmpresa.vue'


import DatosSucursal from './DatosSucursal.vue'
import TableData from './TableData.vue'


export default {
    name: "representantesEmpGestora",
    components: { ContenedorCard, ContenedorAlert, DatosEmpresa, DatosSucursal, TableData },
    props: {
        datosGestora: { type: Object, default: {} }
    },
    data: () => ({
        datos: null,
        perPage: 5,
        allOpenRows: [],      
        headers: [
            { value: "ci", text: "DOCUMENTO IDENTIFICACION", align:"start" },
            { value: "name", text: "REPRESENTANTE", align:"start"},            
            //{ value: "matrizSucursal.nombreComercial", text: "SUCURSAL", align:"end" },
            //{ value: "matrizSucursal.tipo", text: "TIPO SUCURSAL", align:"end", },

        ],
        headersMatriz: [
            { value: "tipo", text: "TIPO", align:"start" }, 
            { value: "nombreComercial", text: "NOMBRE", align:"start" },
            { value: "nit", text: "NIT", align:"end"},            
                       
            { value: "direccion", text: "DIRECCION", align:"start", },
            { value: "email", text: "EMAIL", align:"start", },
            { value: "telefono", text: "TELEFONO", align:"end" },
            { value: "celular", text: "CELULAR", align:"end" },
            
            

        ],
        currentPage: 1,
        rows: 0
    }),

    watch: {

    },

    computed: {

    },
    methods: {
        handleRowClicked(item, index) {
            this.allOpenRows.map((ele) => {
                if (ele.id !== item.id && ele._showDetails) {
                    this.$set(ele, "_showDetails", !ele._showDetails);
                }
            });
            this.allOpenRows = [];
            this.$set(item, "_showDetails", !item._showDetails);
            this.allOpenRows.push(item);
        },
        rowClass(item, type) {
            if (!item || type !== 'row') return
            if (item.idx % 2 === 0) return 'green lighten-5'
            else return 'white'
        }
    },
}
</script>

<style></style>
