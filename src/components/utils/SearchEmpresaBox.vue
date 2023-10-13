<template>
    <div>
        <header class="text-caption">

            <v-form ref="form" v-model="valid" lazy-validation>
                <div align="center">
                    <v-avatar class="profile" color="grey" size="128" tile>
                        <v-img :src="avatarSearch" style="background:white;"></v-img>
                    </v-avatar>
                    <radio-opciones-search />
                </div>
                <v-row v-if="verificacion" align="start" align-content="start" justify="center">

                    <!--<v-col cols="12" xs="12" sm="12" md="4" xl="4" lg="4" class="text-primary text-center"
                        align-self="start">
                        <v-avatar class="profile" color="grey" size="50" tile>
                            <v-img :src="avatarSearch" style="background:white;"></v-img>
                        </v-avatar> {{ titlSearch }}
                    </v-col>-->

                    <v-col cols="12" xs="12" sm="12" md="4" xl="4" lg="4" class="text-caption" align-self="end">
                        <v-select v-model="selected" :hint="`${selected.title}`" :items="items" item-text="title"
                            item-value="value" label="Tipo de Identificacion" persistent-hint return-object
                            background-color="#ffffff" dense prepend-inner-icon="mdi-cards-variant"></v-select>
                    </v-col>

                    <v-col cols="12" xs="12" sm="12" md="4" xl="4" lg="4" class="text-caption" align-self="end">
                        <v-text-field v-model="identificador" :label="`${selected.value} Numero :`" type="number" step="any"
                            min="0" 
                            :rules="rules" required 
                            :hint="`${selected.value} Numero`" persistent-hint
                            hide-details="auto" prepend-inner-icon="mdi-numeric" background-color="#ffffff" dense autofocus
                            clear-icon="mdi-close-circle" clearable>

                        </v-text-field>
                    </v-col>

                    <v-col cols="12" xs="12" sm="1" md="4" xl="2" lg="2" class="text-left" align-self="start">
                        <v-tooltip bottom color="success">
                            <template v-slot:activator="{ on, attrs }">

                                <v-btn :disabled="!valid" color="primary" outlined @click="validate(); clicHere()" small fab
                                    v-bind="attrs" v-on="on">
                                    <v-icon>mdi-table-search</v-icon>
                                </v-btn>
                            </template>
                            <span>Buscar</span>
                        </v-tooltip>
                    </v-col>
                </v-row>
                <v-row v-else>Opcion de busqueda no valido. "Error de disenio SearchEmpresa '{{ type }}'"</v-row>



            </v-form>
        </header>
        <!--v-breadcrumbs :items="itemsBread"></!--v-breadcrumbs-->
    </div>
</template>

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
        valid: true,
        gestoraSelected: { value: 'NIT', title: 'NIT' },
        gestoraItems: [{ value: 'NIT', title: 'NIT' },
        { value: 'GOB', title: 'GOB' },
        { value: 'SUP', title: 'SUP' },
        { value: 'RCM', title: 'RCM' }],
        seprecOvtSelected: { value: 'NIT', title: 'NIT' },
        seprecOvtItems: [{ value: 'NIT', title: 'NIT' },
                        { value: 'MAT', title: 'MATRICULA' },
                        ],
        selected: null,
        items: null,
        identificador: null,

        rules: [
            (value) => !!value || "Obligatorio.",
            (value) => (value && value.length >= 2) || "Mínimo 5 characters",
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
            switch (this.type) {
                case 'GE':
                    this.selected = this.gestoraSelected
                    this.items = this.gestoraItems
                    return true
                    break
                case 'E':
                    this.selected = this.seprecOvtSelected
                    this.items = this.seprecOvtItems
                    return true
                    break
                case 'SP':
                    this.selected = this.seprecOvtSelected
                    this.items = this.seprecOvtItems
                    return true
                    break
                default:
                    return false
                    break;
            }
        },
        avatarSearch() {
            return this.$store.state.optionsServiceInterOp.selectedMore.graph
        },
        titlSearch() {
            return this.$store.state.optionsServiceInterOp.selectedMore.title
        }

    },
    methods: {
        validate() {
            this.$refs.form.validate()
        },

        clicHere() {
            const datos = {}
            if (this.type == 'O' || this.type == 'SP') {
                if (this.selected.value == 'NIT')
                    datos.nitEmpresa = this.identificador //!= '' ? this.nitEmpresa: null                
                else datos.matriculaEmpresa = this.identificador
            }

            //!='' ? this.matriculaEmpresa: null
           // datos.tipoIdentificacion = this.selected.value
            //datos.numeroIdentificacion = this.identificador
datos.tipoEmpresa = this.selected.value
datos.codigoEmpresa = this.identificador
            


            this.onClick(datos)
        },




    },
    watch: {

    },

}
</script>

<style></style>