<template>
    <div>
        <v-row dense v-if="computedDataOvt">

            <v-col cols="12" xs="12" sm="12" md="11" xl="11" lg="11">
                <v-card elevation="2" outlined class="elevation-2" flat >
                    <!--<v-card-title class="blue lighten-2 white--text text-h6" v-show="obj.razon_social">ESTADO FUENTE PAGO </v-card-title>
                    <v-card-title class="red accent-2 white--text text-h6" v-show="obj.razonSocial">EMPRESAS</v-card-title>
                    -->
                    <v-card-text  >                        
                        <div class=" font-weight-bold text-justify" style="color: rgb(29, 98, 161);" v-show="obj.razon_social">{{ obj.razon_social }}</div>
                        <div class=" font-weight-bold text-justify" style="color: rgb(29, 98, 161);" v-show="obj.razonSocial">{{ obj.razonSocial }}</div>
                        <div v-show="obj.nit"> NIT: {{ obj.nit }}  </div>
                        <div v-show="obj.matriculaComercio"> Matricula Comercio: {{ obj.matriculaComercio }}  </div>
                        <div v-show="obj.descripcion">{{ obj.descripcion }}</div>
                        
                        <div class="" v-if="obj.caja.descripcion">
                            <span class="font-weight-bold">Caja: </span> {{ obj.caja.descripcion }}
                        </div>
                        <div class="font-weight-bold text-justify" v-else-if="obj.caja" style="color: rgb(29, 98, 161);">
                              {{ obj.caja.toUpperCase() }}
                        </div>
                        <div v-show="obj.periodo"><span class="font-weight-bold">Periodo: </span> {{ obj.periodo }}</div>
                        <div v-show="obj.gestion"><span class="font-weight-bold">Gestion: </span> {{ obj.gestion }}</div>
                        
                        <div v-show="obj.beneficio" class="">
                            <div class="font-weight-black text-justify">Beneficio</div>
                            <div>{{ obj.beneficio }}</div>
                        </div>

                        <div v-show="obj.tipo" class="">
                            <div class="font-weight-black red--text">Tipo: {{ obj.tipo }}</div>
                            
                        </div>
                    </v-card-text>

                </v-card>
            </v-col>
        </v-row>
        <v-row v-else>
            -Sin datos-
        </v-row>
    </div>
</template>

<script>

export default {
    components: {},
    props: { datosOvt: { type: Object, default: {} } },
    data() {
        return {
            obj: null
        }
    },
    computed: {
        computedDataOvt() {
            if (this.datosOvt) {
                this.obj = this.datosOvt
                return true
            } else {
                this.obj = []
                return false
            }



        },
    },

}
</script>

<style></style>
