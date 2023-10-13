<template>
    <div>
        <v-row dense v-if="computedDataGestor">
            {{ datosEnteGestor }}
            <v-col cols="12" xs="12" sm="12" md="12" xl="12" lg="12"
                v-for="(obj, i) in datosEnteGestor.estado_asegurado.detalle" :key="`datGesto_${i}`">
                <v-card elevation="2" outlined>
                    <v-row class="pa-4" justify="space-between">
                        <v-col cols="5">

                            <div class="text--primary">{{ obj.ente_gestor }}</div>
                            <div>
                                {{ obj.tipo_asegurado }}
                            </div>
                            <div>{{ obj.categoria }} <span class="text-right">
                                    <c-chip-color-estado :datos="obj.estado"></c-chip-color-estado>
                                </span></div>

                            <v-divider></v-divider>

                            <!-- datos de la rama  -->
                            <v-treeview :active.sync="active" :items="items" :load-children="fetchUsers" :open.sync="open"
                                activatable color="warning" open-on-click transition>
                                <template v-slot:prepend="{ item }">
                                    <v-icon v-if="!item.children">
                                        mdi-account
                                    </v-icon>
                                </template>
                            </v-treeview>

                        </v-col>
                        <v-divider vertical></v-divider>
                        <!-- datos en la otra mitad -->

                        <v-col class="d-flex text-center">
                            <v-scroll-y-transition mode="out-in">
                                <div v-if="!selected" class="text-h6 grey--text text--lighten-1 font-weight-light"
                                    style="align-self: center;">
                                    Seleccione una persona
                                </div>
                                <v-card v-else :key="selected.id" class="pt-6 mx-auto" flat max-width="400">
                                    <v-card-text>
                                        <v-avatar v-if="avatar" size="88">
                                            <v-img src="@/assets/logoAsuss_.png" class="mb-6"></v-img>
                                        </v-avatar>
                                        <h3 class="text-h5 mb-2">
                                            {{ selected.primer_apellido }} {{ selected.segundo_apellido }} {{
                                                selected.nombres }}
                                        </h3>
                                        <div class="blue--text mb-2">
                                            {{ selected.tipo_parentesco }}
                                        </div>
                                        <div class="blue--text subheading font-weight-bold">
                                            {{ selected.fecha_nacimiento }}
                                        </div>
                                    </v-card-text>
                                    <v-divider></v-divider>
                                    <v-row class="text-left" tag="v-card-text">
                                        <v-col class="text-right mr-4 mb-2" tag="strong" cols="6">
                                            Nro. Doc.:
                                        </v-col>
                                        <v-col>{{ selected.numero_documento }}</v-col>
                                        <v-col class="text-right mr-4 mb-2" tag="strong" cols="6">
                                            estado:
                                        </v-col>
                                        <v-col>
                                            {{ selected.estado }}
                                        </v-col>

                                    </v-row>
                                </v-card>
                            </v-scroll-y-transition>
                        </v-col>
                    </v-row>

                    <v-card-text v-if="obj.novedad">
                        <datos-novedad :novedad="obj.novedad" />
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <v-row v-else>
            {{ datosEnteGestor.mensaje }}
        </v-row>
    </div>
</template>

<script>
import CChipColorEstado from '../asegurado/utils/CChipColorEstado.vue';
import DatosNovedad from './DatosNovedad.vue';
import * as srv from '@/services/InteroperabilidadService'
import Etc from './Etc.vue';
export default {
    components: {
        CChipColorEstado,
        DatosNovedad,
        Etc
    },
    props: {
        datosEnteGestor: {
            type: Object,
            default: {}
        }
    },
    data() {
        return {
            active: [],
            avatar: null,
            open: [],
            users: [],
        }
    },
    computed: {
        computedDataGestor() {
            //reconstruye datps
            if (this.datosEnteGestor.estado_asegurado) {
                if (this.datosEnteGestor.estado_asegurado.detalle.length > 0) {
                    //existen registros                                        
                    return true
                } else return false
            } else return false;
        },

        items() {
            return [
                { name: 'Arbol de Beneficiarios', children: this.users },
            ]
        },
        selected() {
            if (!this.active.length) return undefined
            const id = this.active[0]
            return this.users.find(user => user.id === id)
        },
    },

    methods: {
        fetchUsers(item) {
            console.log("dato computado...", item)
            return item.children.push({ id: 1, name: "prueba" })
            consultaDatosTitBen

        },
        async consultaDatosTitBen() {

            const gestor = this.datosEnteGestor.estado_asegurado.detalle
            for (const key in gestor) {
                console.log("indes::", key)
                let categoria = gestor[key].categoria
                let id = gestor[key].idAfiliadoEnteGestor
                let parametroBeneficiario = {};
                parametroBeneficiario.idAfiliadoEnteGestor = id;
                if (categoria == "TITULAR") {
                    const results = await srv.bdpaBeneficiariosPorTitular(parametroBeneficiario)
                    console.log("beneficiarios", results)
                    const beneficiario = results.data;
                    let mensaje = null
                    if (beneficiario.length == 0) {
                        mensaje = "EL TITULAR NO TIENE BENEFICIARIOS";
                        console.log(mensaje)
                    }
                    const children = beneficiario.map((o, i) => ({
                        ...o,
                        name: `${o.primer_apellido} ${o.segundo_apellido} ${o.nombres}`,
                        id: i
                    }))
                    this.datosEnteGestor.estado_asegurado.detalle[key].peoples = [{
                        msj: mensaje,
                        name: `${this.datosEnteGestor.primer_apellido} ${this.datosEnteGestor.segundo_apellido} ${this.datosEnteGestor.nombres}`,
                        children: children
                    }]
                    console.log("titular beneficiarios", this.datosEnteGestor.estado_asegurado.detalle[key])
                } else {
                    let mensaje = "TITULAR DEL BENEFICIARIO";
                    console.log(mensaje)
                    const results = await srv.bdpaTitularPorBeneficiario(parametroBeneficiario)
                    const titular = results.data
                    const children = [{
                        ...this.datosEnteGestor,
                        name: `${this.datosEnteGestor.primer_apellido} ${this.datosEnteGestor.segundo_apellido} ${this.datosEnteGestor.nombres}`,
                        id: 10001
                    }]
                    console.log(children)

                    this.datosEnteGestor.estado_asegurado.detalle[key].peoples = [{
                        msj: mensaje,
                        name: `${titular.primer_apellido} ${titular.segundo_apellido} ${titular.nombres}`,
                        children: children
                    }]


                }
            }

        }
    },
    watch: {
        selected: 'randomAvatar',

    },

}
</script>

<style></style>
