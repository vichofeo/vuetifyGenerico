<template>
    <v-card class="mx-auto" density="compact">
        <v-card-item class="text-body-1">
            <v-toolbar density="compact" rounded>
                <v-toolbar-title class="text-subtitle-2">
                    <v-switch v-model="hospitalizacion.sw_hosp" label="Hospitalizado"
                        color="error" value="error" inset hide-details
                        @click="getGestores"
                        ></v-switch>
                    </v-toolbar-title>
            </v-toolbar>
        </v-card-item>
        <v-card-text>
            <div v-if="hospitalizacion.sw_hosp" class="form-group">
                <v-row dense no-gutters>
                    <radio-btn-forms :items="estado_hosp" />
                </v-row>
                <v-row dense>
                    <v-col cols="6" xs="6" sm="4" xl="4" md="6">
                        <calendar-forms :label="`Fecha`" />
                    </v-col>
                    <v-col cols="6" xs="6" sm="4" xl="4" md="6" lg="6">
                        <list-box label="Elija el Gestor de salud" :items="gestorItems" :selected="gestorSelected"
                            :on-change="getEstablecimientos" />
                        <list-box :label="`Elija el Establecimiento de salud`" :items="establecimientosItems"
                            :selected="establecimientoSelected" />
                    </v-col>
                </v-row>
            </div>
        </v-card-text>
    </v-card>
</template>

<script>
import CalendarForms from '../inputs/CalendarForms.vue'
import ListBox from '../formsUtils/ListBox.vue'
import RadioBtnForms from '../inputs/RadioBtnForms.vue'

import * as srv from "@/service/GetData"

export default {
    components: { CalendarForms, RadioBtnForms, ListBox },
    data: () => ({

        gestorSelected: { value: '-1', title:"-SinDato-" },
        establecimientoSelected: {},
        hospitalizacion: {
            sw_hosp: false,
            fecha: null,

        },

        estado_hosp: { label: "Etapa Hospitalizacion", options: [{ value: 0, label: "Para hospitalizacion" }, { value: 1, label: "En hospitalizacion" }, { value: 2, label: "Para Alta Medica" }] },
        gestorItems: [],
        establecimientosItems: []

    }),
    methods: {
        async getGestores() {
            
            //obtoene listado de gestores y selec default            
            const results = await srv.getGestores(this.gestorSelected)
            this.gestorSelected = results.selected

            this.gestorItems = results.items

            this.getEstablecimientos(this.gestorSelected)


        },
        async getEstablecimientos(datos) {
            console.log(datos)
            //ontiene lista de establecimientos y opcion por default

            const results = await srv.getEstablecimientos(datos)
            //default de establecimiento
            this.establecimientoSelected = results.selected
            this.establecimientosItems = results.items

        },
        setEstablecimiento(selected) {
            this.hospitalizacion.establecimientoSelected = selected
        }
    },
    mounted() {
        this.getGestores()
    },
}
</script>

<style></style>