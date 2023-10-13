<template>
    <div>

        <p>&nbsp;</p>
        <ContenedorCard 
        :title="`SUCURSALES (Total Registros: ${sucursales.ok?sucursales.total:0})`" 
        :color="sucursales.ok? 'teal darken-1': 'grey darken-1'"
            icon="mdi-home-city-outline">
            <div v-if="sucursales.ok">
                <table-data expand :headers="headers" :items="sucursales.data" :opColor="1">
                    <template v-slot:xpnd="item">
                    <DatosSucursal :sucursal="item.item"></DatosSucursal>
                </template>
                </table-data>
              
            </div>
            <div v-else>
                <contenedor-alert dark outlined border="bottom" color="grey darken-2" elevation="2" icon="mdi-alert"
                    prominent>
                    {{ sucursales.mensaje }}
                </contenedor-alert>
            </div>
        </ContenedorCard>




    </div>
</template>

<script>
import ContenedorAlert from './ContenedorAlert.vue'
import ContenedorCard from './ContenedorCard.vue'

import DatosSucursal from './DatosSucursal.vue'
import TableData from './TableData.vue'
export default {
    name: "windowssucursales",
    components: {  DatosSucursal, ContenedorCard, ContenedorAlert, TableData },
    props: {
        sucursales: { type: Object, default: {} }
    },
    data: () => ({
        datos: null,
        
        allOpenRows: [],
        headers: [
            { value: "Representante", text: "REPRESENTANTE", align:"start" },
            { value: "Sucursal", text: "SUCURSAL", },            
            { value: "Departamento", text: "DEPARTAMENTO", align:"start" },
            { value: "Municipio", text: "MUNICIPIO", align:"start", },

        ],
        
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
        
    },
}
</script>
<style>


</style>