<template>
   <div v-if="datos">
        <div v-if="datos.ok">
            <v-divider></v-divider>
            <ContenedorCard :title="`Estado de Fuente de Pago (Total: ${datos.total})`" 
            color="teal lighten-1" 
            icon="mdi-hospital-building">

                <b-table :items="datos.data.map((o, i) => ({ ...o, idx: i }))" :fields="headers" sma striped hover
                    :per-page="perPage" responsive head-variant="light" @row-clicked="handleRowClicked"
                    :tbody-tr-class="rowClass" :current-page="currentPage">


                    <template slot="row-details" slot-scope="data">
                        <b-button @click="data.toggleDetails">
                            {{ !data.detailsShowing ? 'Ocultar' : 'Mostrar' }} Detalles
                        </b-button>
                        <div>                            
                            <datos-ovt :datos-ovt="data.item" />
                        </div>
                    </template>
                </b-table>
                <b-pagination v-model="currentPage" :total-rows="datos.total" :per-page="perPage"
                    aria-controls="my-table" pills v-if="datos.total>perPage">
                </b-pagination>
            </ContenedorCard>


        </div>
        <div v-else>
            <contenedor-alert outlined type="warning" prominent border="left">
                {{ datos.mensaje }}
            </contenedor-alert>
        </div>

    </div>
    
</template>

<script>
import ContenedorAlert from './ContenedorAlert.vue'
import ContenedorCard from './ContenedorCard.vue'

import DatosOvt from './DatosOvt.vue'
export default {
    name: "windowsdatos",
    components: {  DatosOvt, ContenedorCard, ContenedorAlert },
    props: {
        datos: { type: Object, default: {} }
    },
    data: () => ({        
        estado_fuente_pago: null,
        perPage: 5,
        allOpenRows: [],
        headers: [{ key: "caja", label: "Caja", class: "text-left options-column" },
            { key: "periodo", label: "Periodo", class: "text-left options-column" },            
            { key: "nit", label: "NIT", class: "text-right options-column" },
            { key: "razon_social", label: "Entidad Empleadora", class: "text-left options-column" },
            { key: "tipo", label: "Tipo", class: "text-left options-column" },
        ],
        currentPage: 1,
    }),

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
            if (item.idx % 2 === 0) return 'teal lighten-5 manito'
            else return 'grey lighten-5 manito'
        }
    },

    watch: {
        datos(val, oldVal) {
            if (val) {
                this.estado_fuente_pago = val
                //                console.log("****", this.estado_fuente_pago)
            } else this.estado_fuente_pago = []
        },


    },
}
</script>
<style >

</style>