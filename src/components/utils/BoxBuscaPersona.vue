<template>
    <div>
        <header class="text-caption"> 
            
            <v-form ref="form" v-model="valid" lazy-validation>                                

                <v-row align="start" align-content="start" justify="center"   >                    
                    
                    <v-col cols="12" xs="12" sm="12" md="12" xl="2" lg="2" class="text-caption" align-self="end" >
                        <v-select v-model="tipo_documento" :items="items" 
                        :hint="`${tipo_documento}`" persistent-hint 
                        label="Tipo de Identificación"   
                        background-color = "#ffffff" 
                        :menu-props="{ top: true, offsetY: true }"
                        dense
                        prepend-inner-icon="mdi-card-account-details-outline"
                        ></v-select>
                    </v-col>
                    <v-col cols="12" xs="12" sm="12" md="12" xl="4" lg="4" class="text-caption" align-self="end">
                        <v-text-field v-model="numero_documento" label="Número Documento" type="number" step="any" min="0"
                            required :rules="numero_documentoRules" 
                            hint="Número Documento" 
                            persistent-hint
                            prepend-inner-icon="mdi-numeric" hide-details="auto" 
                            background-color="#ffffff" dense autofocus
                            clear-icon="mdi-close-circle"
                            clearable>
                        </v-text-field>
                    </v-col>
                    <v-col cols="12" xs="12" sm="12" md="12" xl="2" lg="2" class="text-caption" align-self="end">
                        <v-text-field v-model="complemento_documento" label="Compl. Ej. 1A" class="code"
                            @keyup="convierteComplementoMayuscula()" 
                            maxlength="2" color="blue" hint="Complemento"
                            persistent-hint hide-details="auto" 
                            background-color="#ffffff" 
                            dense
                            clear-icon="mdi-close-circle"
                            clearable></v-text-field>
                    </v-col>
                    <v-col cols="12" xs="12" sm="12" md="12" xl="3" lg="3" class="text-caption" align-self="end" v-if="extension">
                        <v-menu ref="comboDate" v-model="comboDate" :close-on-content-click="false"
                            transition="scale-transition" offset-y max-width="290px" min-width="auto">
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field v-model="fecha_nacimiento" 
                                label="Fecha Nacimiento" 
                                hint="Formato dd/mm/aaaa "
                                v-mask="'##/##/####'"
                                placeholder="dd/mm/aaaa"
                                    persistent-hint  prepend-inner-icon="mdi-calendar" v-bind="attrs" v-on="on"
                                    @blur="date = parseDate(fecha_nacimiento)" 
                                    background-color="#ffffff" required
                                    :rules="fecha_nacimientoRules" dense 
                                    clear-icon="mdi-close-circle"
                                    clearable
                                    v-if="requeridos[2]" 
                                     />

                                <v-text-field v-model="fecha_nacimiento" label="Fecha Nacimiento" 
                                placeholder="dd/mm/aaaa"
                                hint="Formato dd/mm/aaaa "
                                v-mask="'##/##/####'"
                                    persistent-hint prepend-inner-icon="mdi-calendar" v-bind="attrs" v-on="on"
                                    @blur="date = parseDate(fecha_nacimiento)" 
                                    background-color="#ffffff" 
                                    dense
                                    clear-icon="mdi-close-circle"
                                    clearable
                                    v-else />
                            </template>
                            <v-date-picker color="#1D62A1" v-model="date" locale="es-US"
                                :max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)"
                                min="1930-01-01" @input="comboDate = false"></v-date-picker>
                        </v-menu>
                    </v-col>

                    <v-col cols="12" xs="12" sm="1" md="1" xl="1" lg="1" class="text-left" align-self="center">
                        <v-tooltip bottom color="success">
                            <template v-slot:activator="{ on, attrs }">

                                <v-btn :disabled="!valid" color="primary" outlined @click="validate(); clicHere()" small fab
                                    v-bind="attrs" v-on="on">
                                    <v-icon>mdi-account-search-outline</v-icon>
                                </v-btn>
                            </template>
                            <span>Buscar</span>
                        </v-tooltip>
                    </v-col>                    
                </v-row>
            </v-form>
        </header>
        <!--v-breadcrumbs :items="itemsBread"></!--v-breadcrumbs-->
    </div>
</template>

<script>


import moment from "moment";



export default {

    props: {
        onClick: { type: Function, default() { return 'Default function' } },
        requeridos: { type: Array, default: () => ([1, 0, 0]) },
        extension: {type: Boolean, default: false}        
    },
    data: () => ({
        valid: true,
        date: null,
        tipo_documento: "CI",
        items:['CI', 'PAS', 'CNA'],
        numero_documento: null,
        numero_documentoRules: [
            v => (!!v) || 'Numero de documento es requerido',
            v => (v && v.length >= 5) || 'El Numero debe tener menos de 5 caracteres',            
        ],
        complemento_documento: null,
        fecha_nacimiento: null, //(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),

        fecha_nacimientoRules: [(v) => !!v || "Fecha Nacimiento es requerido"],

        comboDate: false,
    }),
    computed: {
        itemsBread() {
            return [
                { text: this.$store.state.optionsServiceInterOp.selectedMore.title, disabled: false, href: "#" },
                { text: this.$store.state.optionsServiceInterOp.selected.title, disabled: true, href: "#" }
            ]

        },
        computedDateFormatted() {
            return this.formatDate(this.date);
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
            datos.tipo_documento = this.tipo_documento
            datos.fecha_nacimiento = null
            datos.complemento = null
            
            //datos.tipoDocumento = this.tipo_documento
            datos.dni = this.numero_documento
            //datos.numeroIdentificacion = this.numero_documento
            
            if (this.fecha_nacimiento != null && this.fecha_nacimiento != '') {
                if (this.validateDate(this.fecha_nacimiento)){                
                    datos.fecha_nacimiento = moment(this.fecha_nacimiento, "DD/MM/YYYY").format("YYYY-MM-DD")            
                }
            }
            if (this.complemento_documento != undefined && this.complemento_documento != "") {
                datos.numero_documento = this.numero_documento + "-" + this.complemento_documento;
                datos.complemento = this.complemento_documento
            } else {
                datos.numero_documento = this.numero_documento;
            }

            this.onClick(datos)
        },
        validateDate(fechaIn) {
            const DATE_REGEX = /^(0[1-9]|[1-2]\d|3[01])(\/)(0[1-9]|1[012])\2(\d{4})$/
            const CURRENT_YEAR = new Date().getFullYear()

            /* Comprobar formato dd/mm/yyyy, que el no sea mayor de 12 y los días mayores de 31 */
            if (!fechaIn.match(DATE_REGEX)) {
                return false
            }

            /* Comprobar los días del mes */
            const day = parseInt(fechaIn.split('/')[0])
            const month = parseInt(fechaIn.split('/')[1])
            const year = parseInt(fechaIn.split('/')[2])
            const monthDays = new Date(year, month, 0).getDate()
            if (day > monthDays) {
                return false
            }

            /* Comprobar que el año no sea superior al actual*/
            if (year > CURRENT_YEAR) {
                return false
            }
            return true
        },
        formatDate(date) {
            if (!date) return null;
            const [year, month, day] = date.split("-");
            return `${day}/${month}/${year}`;
        },
        parseDate(date) {
            if (!date) return null;

            const [day, month, year] = date.split("/");
            return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
        },

        convierteComplementoMayuscula() {
            if (
                this.complemento_documento != null &&
                this.complemento_documento != undefined
            ) {
                this.complemento_documento = this.complemento_documento.toUpperCase();
            }
        },
    },
    watch: {

        date(val) {
            this.fecha_nacimiento = this.formatDate(this.date);
        },
    },

}
</script>

<style></style>