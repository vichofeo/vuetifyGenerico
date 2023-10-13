<template>
    <div>       
        <v-expand-transition>
            <DatosEGestor :datosEnteGestor="datosEnteGestor" v-if="indexSlide == 0">
                <b-dropdown size="sm" text="Acciones" block variant="outline-success" class="m-2 text-caption">
                    <b-dropdown-item @click="clickHere(o.value)" v-for="(o, i) in datosMenu" :key="'dpdw-'+i">{{ o.text
                    }}</b-dropdown-item>

                </b-dropdown>
            </DatosEGestor>
            <bdpa-frm-baja v-if="indexSlide == 1 && datosEnteGestor.novedad.alerta == 1" :datosEnteGestor="datosEnteGestor" />
            <bdpa-frm-novedad v-if="indexSlide == 2 && datosEnteGestor.novedad.alerta == 2" />
        </v-expand-transition>
    </div>
</template>

<script>
import BdpaFrmBaja from './BdpaFrmBaja.vue';
import BdpaFrmNovedad from './BdpaFrmNovedad.vue';
import DatosEGestor from './DatosEGestor.vue'

export default {
    name: "contenedorAccion",
    components: { DatosEGestor, BdpaFrmBaja, BdpaFrmNovedad },
    props: {
        datosEnteGestor: { type: Object, default: () => (null) },        
    },
    data() {
        return {
            indexSlide: 0,
            datosMenu: []
        };
    },
    created() {
        this.itemsBtns()

    },
    mounted() {


    },
    computed: {


    },

    methods: {
        clickHere(value) {
            this.indexSlide = value
        },
        itemsBtns() {
            this.indexSlide = 0;
            if (this.datosEnteGestor.novedad.alerta > 0) {
                if (this.datosEnteGestor.novedad.alerta == 1) {
                    this.datosMenu = [
                        { value: 0, text: "Ver Informacion" },
                        { value: 1, text: "Baja de Registro" },
                        { value: 2, text: "Reportar Novedad" }]
                } else {
                    this.datosMenu = [
                        { value: 0, text: "Ver Informacion" },
                        { value: 2, text: "Reportar Novedad" }]
                }
            } else {
                this.datosMenu = [];
            }
        }
    },
}
</script>

<style></style>