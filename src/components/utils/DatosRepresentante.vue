<template>
    <div>
        <v-row dense v-if="computedData" align-content="center" justify="center">            
            <v-col cols="12" xs="12" sm="12" md="11" xl="11" lg="11">
                <v-card elevation="2" outlined>
                    <v-card-text >
                        <div class="font-weight-bold" style="color: rgb(29, 98, 161);">{{ obj.NombreVinculo.toUpperCase() }} ({{ obj.TipoVinculo.toUpperCase() }})</div>
                        <!-- <div class="font-weight-bold text-center">{{ obj.TipoVinculo.toUpperCase() }}</div> -->
                        <div><span class="font-weight-bold">Id.: </span> {{ obj.NumId }}</div>
                       <!-- <div class="text-center">Fec. Reg. {{ obj.FecRegistro }}</div> -->

                        <div v-if="obj.NumDoc">
                            <span class="font-weight-bold"> Num. Doc.: </span>{{ obj.NumDoc }}
                        </div>
                        <!--<div-- v-if="obj.FecDocumento">
                            <span class="font-weight-bold">Fec Doc.: </span>{{ obj.FecDocumento }}
                        </div-->
                        <div v-if="obj.IdLibro">
                            <span class="font-weight-bold">Libro: </span>{{ obj.IdLibro }}
                        </div>
                        <div v-if="obj.NumReg">
                            <span class="font-weight-bold">Num. Reg.: </span>{{ obj.NumReg }}
                        </div>
                        <div v-if="obj.NoticiaDocumento" class="text-justify text-caption">
                            {{ obj.NoticiaDocumento }}
                        </div>


                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <v-row v-else>
            Esta Empresa, no tiene representante asociadas a la matrícula.
        </v-row>
    </div>
</template>

<script>
import * as utils from "@/components/asegurado/utils/varios"



export default {
    components: {},
    props: {
        representante: { type: Object, default: {} },

    },
    data() {
        return {
            obj: []

        }
    },
    computed: {
        computedData() {
            if (this.representante) {
                this.obj = {
                    ...this.representante,
                    FecRegistro: utils.formatFecha(this.representante.FecRegistro),
                    FecDocumento: utils.formatFecha(this.representante.FecDocumento)
                }

                return true
            } else {
                this.obj = {}
                return false
            }

        },


    },
    methods: {

    },

}
</script>

<style></style>
