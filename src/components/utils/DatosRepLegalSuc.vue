<template>
    <div>
        <div v-if="computedData">
            <v-card v-for="(obj, i) in representante" :key="`reprLgl_${i}`" dense>
                <v-row dense align-content="center" justify="center">
                    <v-col cols="6" xs="12" sm="12" md="6" xl="6" lg="6">
                        <datos-persona :persona="obj.persona" :noAvatar="true" />
                    </v-col>
                    <v-col cols="6" xs="12" sm="12" md="6" xl="6" lg="6">
                        <datos-matriz-suc :matrizSucursal="obj.matrizSucursal"></datos-matriz-suc>
                    </v-col>                    
                </v-row>
            </v-card>
        </div>


    </div>
</template>

<script>
import DatosMatrizSuc from './DatosMatrizSuc.vue'
import DatosPersona from './DatosPersona.vue'



export default {
    components: { DatosPersona, DatosMatrizSuc },

    props: { representanteLegal: { type: Array, default: [] } },
    data() {
        return {
            representante: null,

        }
    },
    computed: {
        computedData() {
            if (this.representanteLegal) {
                const aux = this.representanteLegal.map((obj, i) => ({
                    ...obj,
                    persona: {
                        tipo_documento: obj.tipoIdentificacion,
                        numero_documento: obj.numeroIdentificacion,
                        complemento_documento: obj.complemento,
                        primer_apellido: obj.primerApellido,
                        segundo_apellido: obj.segundoApellido,
                        nombres: obj.nombres,
                    }
                }))
                this.representante = aux

                return true

            } else {
                this.obj = null
                return false
            }

        },
    },

}
</script>

<style></style>
