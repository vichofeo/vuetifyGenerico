<template>
    <div>
        <div class="font-weight-bold" v-if="personas.length > 0">
            Beneficiarios : {{ personas.length }}
            <div class="font-weight-light">
                <v-simple-table dense>
                    <template v-slot:default>
                        <thead>
                            <tr>
                                <th class="text-left" v-for="c in headersTable" :key="c">
                                    {{ c }}
                                </th>

                                <th class="text-left">
                                    Afiliacion
                                </th>
                                <th class="text-left">
                                    Fecha
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for=" (item, index) in items" :key="`${index}`">
                                <td v-for="i in item" :key="i">{{ i }}</td>


                                <td>
                                    <CChipColorEstadoVue :datos="personas[index].estado" />
                                </td>
                                <td>{{ getTipoFecha(personas[index].estado) }}</td>

                            </tr>
                        </tbody>
                    </template>
                </v-simple-table>
            </div>

        </div>
        <div v-else>
            Beneficiarios:{{ personas.length }}
        </div>
        <button @click="obtieneItems">aki</button>
    </div>
</template>
<script>

import moment from 'moment'
import CChipColorEstadoVue from './CChipColorEstado.vue';
import * as utils from "@/components/asegurado/utils/varios"
export default {
    name: "TablePersonas",
    props: {
        personas: {
            type: Array,
            default: () => []
        },
        cabeceras: {
            type: Object,
            default: {}
        }
    },
    components: {
        CChipColorEstadoVue
    },
    data: () => ({
        headersTable: [],
        items: []

    }),
    mounted() {
        this.obtieneItems()
    },
    methods: {

        obtieneItems() {
            this.items = []

            const aux = Object.entries(this.cabeceras)
            this.headersTable = aux.map(([columnId, column], index) => {
                return columnId.replace("_", " ")
            })

            for (let index = 0; index < this.personas.length; index++) {
                const obj = this.personas[index];
                const myobj = []
                aux.map(([columnId, column], index) => {

                    if (Array.isArray(column)) {
                        let aux = column.map(v => obj[v])
                        myobj[index] = aux.join(" ")
                    } else if (column.indexOf("|") != -1) {
                        myobj[index] = this.formatFecha(obj[column.split("|")[0]])
                    } else
                        myobj[index] = obj[column]
                })
                //console.log("m,uestra ")
                //console.log(myobj)
                this.items.push(myobj)
            }



        },
        formatFecha(fecha) {
            return moment(fecha).format("DD/MM/YYYY")
        },
        getTipoFecha(obj) {
            if (obj.codigo == "100") return "";
            if (obj.codigo == "101") return this.formatFecha(obj.fecha_baja)
            if (obj.codigo == "102") return this.formatFecha(obj.fecha_ampliacion)
            if (obj.codigo == "103") return this.formatFecha(obj.fecha_cesantia)
            if (obj.codigo == "104") return ""
            return "--"
        },

    },
    
}
</script>