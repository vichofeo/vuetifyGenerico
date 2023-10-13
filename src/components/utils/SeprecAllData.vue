<template>
    <div v-if="datos">

        <v-card v-if="multipleData">
            <v-card-text v-if="datos && multipleData">
                <v-data-table v-model="empresaSelected" :headers="headersInfo" :items="datos" single-select show-select
                    hide-default-footer class="elevation-1" dense disable-sort item-key="idx" v-if="datos">
                </v-data-table>

            </v-card-text>
        </v-card>
    
        <div v-if="onlyData && empresaSelected && empresaSelected[0] && empresaSelected[0].infoMatricula">

            <datos-empresa :empresa="empresaSelected[0].infoMatricula"></datos-empresa>

            <seprec-data-suc-win :sucursales="dataSucursal"></seprec-data-suc-win>

            <seprec-data-rep-win :representantes="dataRepresentante"></seprec-data-rep-win>

        </div>
    
    </div>
</template>

<script>
import DatosEmpresa from './DatosEmpresa.vue'
import SeprecDataRepWin from './SeprecDataRepWin.vue'
import SeprecDataSucWin from './SeprecDataSucWin.vue'
export default {
    components: { DatosEmpresa, SeprecDataSucWin, SeprecDataRepWin },

    props: {
        datos: { type: Array, default: [] }
    },
    data: () => ({
        headersInfo: [{ text: "Matricula", value: "IdMatricula" }, { text: "Razon Social", value: "RazonSocial" }, { text: "NIT", value: "Nit" }],
        empresaSelected: [],
        datosItems: []
    }),

    computed: {
        multipleData() {
            return this.datos.length > 1
        },
        onlyData() {
            if (this.datos.length > 0) {
                if (this.datos.length == 1) {
                    this.empresaSelected = this.datos
                    return true
                } else return true
            } return false
        },
        dataSucursal() {
            if (this.multipleData || this.onlyData) {
                if (this.empresaSelected.length > 0) {

                    if (this.empresaSelected[0].infoMatricula.MatriculaDatosSucList1
                        && this.empresaSelected[0].infoMatricula.MatriculaDatosSucList1.MatriculaDatosSuc
                        && this.empresaSelected[0].infoMatricula.MatriculaDatosSucList1.MatriculaDatosSuc.length > 0)
                        return { ok: true, data: this.empresaSelected[0].infoMatricula.MatriculaDatosSucList1.MatriculaDatosSuc, total: this.empresaSelected[0].infoMatricula.MatriculaDatosSucList1.MatriculaDatosSuc.length }
                    else return { ok: false, mensaje: "Sin Sucursales" }

                } else return null
            } else {
                return null
            }
        },
        dataRepresentante() {
            if (this.multipleData || this.onlyData) {
                if (this.empresaSelected.length > 0) {

                    if (this.empresaSelected[0].representantes
                        && this.empresaSelected[0].representantes.Representante
                        && this.empresaSelected[0].representantes.Representante.length > 0)
                        return { ok: true, data: this.empresaSelected[0].representantes.Representante, total: this.empresaSelected[0].representantes.Representante.length }
                    else return { ok: false, mensaje: "Sin Datos de Representantes" }

                } else return null
            } else {
                return null
            }
        }
    },

    watch: {
        datos(n, o) {
            if (n) {
                this.empresaSelected = []
            }

        }
    },

}
</script>

<style></style>