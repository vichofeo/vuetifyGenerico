<template>
    <div>
        <v-row dense v-if="computedData">

            <v-col cols="12" xs="12" sm="12" md="12" xl="12" lg="12" v-for="(obj, i) in data" :key="`dataOvt_${i}`">

                <v-card elevation="2" outlined>
                    <v-card-text class="text--primary">
                        <div class="font-weight-black text-center">{{ obj.ente_gestor }}</div>
                        <div class="text-caption">
                            {{ obj.tipo_asegurado }} - {{ obj.categoria }}
                        </div>
                        <v-divider />
                        <div class="text-caption text--primary">
                            Entidad: {{ obj.nombre_entidad }}
                        </div>
                        <div class="text-caption">{{ obj.codigo_entidad }}</div>

                        <CChipColorEstado :datos="obj.estado" />
                    </v-card-text>

                </v-card>
            </v-col>
        </v-row>
        <v-row v-else>
            {{ data.mensaje }}
        </v-row>
    </div>
</template>

<script>
import CChipColorEstado from '../asegurado/utils/CChipColorEstado.vue';


import * as srv from '@/services/InteroperabilidadService'
export default {
    components: { CChipColorEstado},
    props: { estado_asegurado: { type: Object, default: {} } },
    data() {
        return {
            data: null
        }
    },
    computed: {
        computedData() {
            if (this.estado_asegurado) {
                this.data = this.estado_asegurado.detalle

                this.data.map((o,i)=>{
                    if(o.categoria=='TITULAR')
                    this.obtieneBeneficiariosxTitular(o.idAfiliadoEnteGestor)
                    else
                     this.obtienTitularxBeneficiario(o.idAfiliadoEnteGestor)
                })
                //obtiene 
                return true

            } else {
                this.data = []
                return false
            }

        },
    },
    methods: {
        async obtieneBeneficiariosxTitular(idAfiliadoEnteGestor) {
            let parametroBeneficiario = {};
                parametroBeneficiario.idAfiliadoEnteGestor = idAfiliadoEnteGestor;
            const results = await srv.bdpaBeneficiariosPorTitular(parametroBeneficiario)
            console.log("resulsss", results)
            const beneficiario = results.data;
            let mensaje = null
            if (beneficiario.length == 0) {
                mensaje = "EL TITULAR NO TIENE BENEFICIARIOS";
                console.log(mensaje)
            }

            return results
        },

        async obtienTitularxBeneficiario(idAfiliadoEnteGestor) {
            const results = await srv.bdpaTitularPorBeneficiario({ idAfiliadoEnteGestor: idAfiliadoEnteGestor })
            const titular = results.data
        }
    },
}
</script>

<style></style>
