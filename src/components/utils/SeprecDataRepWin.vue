<template>
    <div>
        <div v-if="representantes.ok">
            <p>&nbsp;</p>
            <ContenedorCard :title="`REPRESENTANTES (Total Registros: ${representantes.total})`" color="green darken-1"
                icon="mdi-human-male-board">
                <table-data expand :headers="headers" :items="representantes.data" :opColor="2">
                    <template v-slot:xpnd="item">
                        <DatosRepresentante :representante="item.item"></DatosRepresentante>
                        </template>
                        
                        </table-data>
               
            </ContenedorCard>


        </div>
        <div v-else>
            <contenedor-alert outlined type="warning" prominent border="left">
                {{ sucursales.mensaje }}
            </contenedor-alert>
        </div>


    </div>
</template>

<script>
import ContenedorAlert from './ContenedorAlert.vue';
import ContenedorCard from './ContenedorCard.vue'

import DatosRepresentante from './DatosRepresentante.vue'
import TableData from './TableData.vue';
export default {
    name: "windowsrepresentantes",
    components: { DatosRepresentante, ContenedorCard, ContenedorAlert, TableData },
    props: {
        representantes: { type: Object, default: {} }
    },
    data: () => ({
        datos: null,
        perPage: 5,
        allOpenRows: [],
        headers: [
            {value: "NombreVinculo",  text: "REPRESENTANTE" , align:"start" },
            {value: "TipoVinculo",text: "TIPO", align:"start" },
            {value: "FecRegistro", text: "FECHA REGISTRO", align:"end" },
            {value: "FecDocumento", text: "FECHA DOCUMENTO", align:"end" },

        ],
        currentPage: 1,
        rows: 0
    }),



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
            if (item.idx % 2) return 'white manito'
            else return 'green lighten-5 manito'
        }
    },
}
</script>
<style >

</style>