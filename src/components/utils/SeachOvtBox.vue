<template>
    <div>
        <header class="text-caption">
            <div align="center">
                    <v-avatar class="profile" color="grey" size="128" tile>
                            <v-img :src="avatarSearch" style="background:white;"></v-img>
                        </v-avatar>
                        <radio-opciones-search/>
                </div>
                <v-row align="start" align-content="start" justify="center"   >   
               

                <!--  <v-col cols="12" xs="12" sm="3" md="4" xl="4" lg="4" class="text-primary text-center" align-self="start">
                    <v-avatar class="profile" color="grey" size="50" tile>
                        <v-img :src="avatarSearch" style="background:white;"></v-img>
                    </v-avatar> {{ titlSearch }}
                </v-col>-->
                <v-col cols="12" xs="12" sm="12" md="4" xl="4" lg="4" class="text-caption" align-self="end">
                    <v-text-field v-model="identificadorNit" label="NIT Numero " type="number" step="any" min="0"
                        :rules="rules" hint="NIT Numero" persistent-hint hide-details="auto" background-color="#ffffff"
                        prepend-icon="mdi-numeric" dense autofocus clear-icon="mdi-close-circle" clearable />
                </v-col>
                <v-col cols="12" xs="12" sm="12" md="4" xl="4" lg="4" class="text-caption" align-self="end">
                    <v-text-field v-model="identificadorMat" label="Matricula Numero :" type="number" step="any" min="0"
                        :rules="rules" hint="MAT Numero" persistent-hint hide-details="auto" background-color="#ffffff"
                        prepend-icon="mdi-numeric" dense clear-icon="mdi-close-circle" clearable />
                </v-col>

                <v-col cols="12" xs="12" sm="1" md="2" xl="2" lg="2" class="text-left" align-self="center">
                    <v-tooltip bottom color="success">
                        <template v-slot:activator="{ on, attrs }">

                            <v-btn color="primary" outlined @click="clicHere()" small fab v-bind="attrs" v-on="on">
                                <v-icon>mdi-table-search</v-icon>
                            </v-btn>
                        </template>
                        <span>Buscar</span>
                    </v-tooltip>
                </v-col>
            </v-row>



        </header>
        <!--v-breadcrumbs :items="itemsBread"></!--v-breadcrumbs-->
    </div>
</template >

<script>
import RadioOpcionesSearch from './radioOpcionesSearch.vue'
import swOpciones from './swOpciones.vue'

export default {
    components: { swOpciones, RadioOpcionesSearch },
    props: {
        onClick: { typeof: Function, default() { return 'Default function' } },
        type: { type: String, default: "NONE" }
    },
    data: () => ({
        items: null,
        identificadorNit: null,
        identificadorMat: null,
        rules: [
            (value) => !!value || "Obligatorio.",
            (value) => (value && value.length >= 5) || "Mínimo 5 characters",
            (value) => (value && value > 0) || "No pueden ser menores a 0",
        ],
    }),
    computed: {
        itemsBread() {
            return [
                { text: this.$store.state.optionsServiceInterOp.selectedMore.title, disabled: false, href: "#" },
                { text: this.$store.state.optionsServiceInterOp.selected.title, disabled: true, href: "#" }
            ]

        },
        verificacion() {

        },
        avatarSearch() {
            return this.$store.state.optionsServiceInterOp.selectedMore.graph
        },
        titlSearch() {
            return this.$store.state.optionsServiceInterOp.selectedMore.title
        }

    },
    methods: {
        clicHere() {
            const datos = {}

            datos.nitEmpresa = this.identificadorNit
            datos.matriculaEmpresa = this.identificadorMat


            this.onClick(datos)
        },




    },
    watch: {

    },
}
</script>

<style></style>