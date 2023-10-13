<template>
    <div v-if="novedades.viewNovedad > 0 && novedades.nvs.length>0">
        
        <contenedor-alert class="text-caption text-justify mx-auto" outlined border="bottom" :color="getColor"
            icon="mdi-alert">
            <div v-for="(o, i) in datos" :key="'adv-' + i">
                
                
                <contenedor-card :color="getColor">
                    <template v-slot:heading>
                        
                        <span class="d-flex justify-space-between subtitle-2 mb-2">
                           ALERTA: {{o[0].claveDescripcion }}
                        </span>
                    </template>
                    <v-data-table dense
                        :headers="[{ text: 'COD. NOVEDAD', value: 'codigoNovedad' }, { text: 'REPORTADO POR', value: 'razonSocial' }, { text: 'REPORTADO EN FECHA', value: 'fechaCreacion' }]"
                        :items="o" 
                        
                        :hide-default-footer="o.length>10 ? false: true"
                        disable-sort 
                        />
                    <template v-slot:actions>
                        <v-icon class="mr-1" small>
                            mdi-comment-alert-outline
                        </v-icon>
                        <div class="caption grey--text font-weight-light" v-for="(m, ii) in msgNovedades[i]"
                            :key="'msgNvs' + ii">
                            {{ m.replaceAll('La Afiliación fue registrada con éxito. NOVEDAD:', '') }}
                        </div>
                    </template>
                </contenedor-card>
                <p v-if="Object.entries(datos).length>1">&nbsp;</p>
            </div>

        </contenedor-alert>
    </div>
</template>
<script>
import ContenedorAlert from './ContenedorAlert.vue'
import ContenedorCard from './ContenedorCard.vue'

export default {
    components: { ContenedorAlert, ContenedorCard },
    props: {
        novedades: { type: Object, default: {} }
    },
    data() {
        return {
            msgNovedades: {}
        }
    },
    watch: {
        novedades: {
            deep: true,
            handler: function (newVal, oldVal) {
                this.novedades = newVal
            },
        }
    },
    computed: {
        getColor() {
            return this.novedades.viewNovedad == 1 ? 'red darken-2' : 'amber darken-2'
        },
        datos() {
            const nvs = {}
            this.msgNovedades = {}
            for (const key in this.novedades.nvs) {
                const index = this.novedades.nvs[key].claveNovedad
                if (!Array.isArray(nvs[index])) {
                    nvs[index] = []
                    this.msgNovedades[index] = []
                }
                
                nvs[index].push(this.novedades.nvs[key])
                this.msgNovedades[index].push(this.novedades.nvs[key].detalleNovedad)
            }
            //filtra mensajes de novedad
            for (const key in this.msgNovedades) {
                this.msgNovedades[key] = this.msgNovedades[key].filter((item, index) => {
                    return this.msgNovedades[key].indexOf(item) === index
                })
            }
            return nvs
        }
    },
   
}
</script>