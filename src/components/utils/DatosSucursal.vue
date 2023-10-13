<template>
    <div>
        <v-row dense v-if="computedData" align-content="center" justify="center">
            <v-col cols="12" xs="12" sm="12" md="11" xl="11" lg="11">
                <v-card elevation="2" outlined>
                    <v-card-text >
                        <div class=" font-weight-bold" style="color: rgb(29, 98, 161);" v-if="obj.Sucursal">{{ obj.Sucursal.toUpperCase() }}</div>
                        <div class=" font-weight-bold" style="color: rgb(29, 98, 161);" v-if="obj.nombreComercial">Matriz/Sucursal: {{ obj.nombreComercial.toUpperCase() }}</div>
                 
                        <div  v-if="obj.Representante">
                            <span class="font-weight-bold"> Representante: </span>{{ obj.Representante }}
                        </div>
                        <div  v-if="obj.tipo" style="color: rgb(29, 98, 161);">
                            <span class="font-weight-bold"> Tipo: </span>{{ obj.tipo }}
                        </div>
                        <div  v-if="obj.nit" style="color: rgb(29, 98, 161);">
                            <span class="font-weight-bold"> NIT: </span>{{ obj.nit }}
                        </div>
                        
                      <!--
                        <div  v-if="obj.Departamento">
                            <span class="font-weight-bold">Departamento: </span>{{ obj.Departamento }}
                        </div>                        
                        <div  v-if="obj.Municipio">
                            <span class="font-weight-bold">Municipio: </span>{{ obj.Municipio }}
                        </div>color="
                        -->
                        <div  v-if="obj.Direccion">
                            <span class="font-weight-bold">Direccion: </span>{{ obj.Direccion }}
                        </div>
                        <div  v-if="obj.direccion">
                            <span class="font-weight-bold">Direccion: </span>{{ obj.direccion }}
                        </div>
                        <div  v-if="obj.Zona">
                            <span class="font-weight-bold"> Zona: </span>{{ obj.Zona }}
                        </div>                        
                        <div  v-if="obj.Telefono">
                            <span class="font-weight-bold"> Telefono: </span>{{ obj.Telefono }}
                        </div>
                        <div  v-if="obj.telefono">
                            <span class="font-weight-bold"> Telefono: </span>{{ obj.telefono }}
                        </div>
                        <div  v-if="obj.celular">
                            <span class="font-weight-bold"> Celular: </span>{{ obj.celular }}
                        </div>
                        <div  v-if="obj.email">
                            <span class="font-weight-bold"> Correo Electronico: </span><a :href="'mailto:' + obj.email">{{obj.email}}</a> 
                        </div>
                 
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <v-row v-else>
            Esta Empresa, no tiene Sucursales asociadas a la matrícula.
        </v-row>
    </div>
</template>

<script>
import * as utils from "@/components/asegurado/utils/varios"



export default {
    components: {},
    props: {
        sucursal: { type: Object, default: {} },

    },
    data() {
        return {
            obj: []

        }
    },
    computed: {
        computedData() {
            if (this.sucursal ) {
                this.obj = this.sucursal
                return true

            } else {
                this.obj = []
                return false
            }

        },


    },
    methods: {

    },

}
</script>

<style></style>
