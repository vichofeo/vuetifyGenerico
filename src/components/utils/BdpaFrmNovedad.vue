<template>
    <v-container style="max-width: 100%">
        <v-system-bar color="blue darken-2 white--text" dark>
            FORMULARIO DE REGISTRO DE NOVEDADES
        </v-system-bar>
        <v-form ref="form" v-model="valid" lazy-validation>
            <v-row>
                <v-col cols="12" xl="12" lg="12" md="12" sm="12" xs="12">
                    <v-row>
                        <v-col cols="6">
                            <v-select 
                            v-model="registro.motivo_novedad" id="motivo_novedad" 
                            :items="comboNovedadConsulta"
                            item-text="nombre" 
                            item-value="nombre" 
                            aria-readonly="true" label="Motivo de la novedad"
                                required :rules="rules" class="text"></v-select>
                        </v-col>
                        <v-col cols="6">
                            <v-textarea label="Detalle" v-model="registro.detalle_novedad" id="detalle_novedad" auto-grow
                                outlined rows="2" row-height="25" required :rules="rules" class="text" shaped></v-textarea>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" align="center" justify="center">
                    <v-progress-linear indeterminate color="teal" v-show="swLoad"></v-progress-linear>

                    <v-alert class="a" dense text type="error" v-show="showMensajeError">
                        <strong>{{ this.registro.mensaje }}</strong>
                    </v-alert>

                    <v-alert class="a" dense outlined type="success" v-show="showMensajeExito">
                        Mensaje: <strong>{{ this.registro.mensaje }}</strong>
                    </v-alert>
                </v-col>
            </v-row>
            <div>
                <v-btn :disabled="!valid" block color="green lighten-4" @click="validate" v-if="showBtn">
                    registrar Novedad
                </v-btn>
                <v-btn block color="blue lighten-3" @click="clickReturn(0)">Cancelar</v-btn>
            </div>
        </v-form>
    </v-container>
</template>

<script>
import * as srv from "@/services/InteroperabilidadService";
import moment from "moment";
import Swal from "sweetalert2";

export default {
    props: {
        datosEnteGestor: { type: Object, default: () => (null) },
        clickReload: { type: Function, default() { return null; }, },
        clickReturn: { type: Function, default() { return null; }, }
    },
    data() {
        return {
            valid: true,
            comboNovedadConsulta: [],
            swLoad: false,
            showMensajeExito: false,
            showMensajeError: false,
            showBtn: true,
            registro: { motivo_novedad: null, detalle_novedad: null, mensaje: null },
            rules: [
                v => !!v || 'Este valor es requerido.',
            ],
        }
    },
    mounted() {
        this.comboMotivoNovedad();
        this.valid = false
    },
    methods: {
        validate() {
            this.$refs.form.validate()
            if (this.valid) this.confirmarNovedad()
        },
        async comboMotivoNovedad() {
            const validos = [903, 904]
            const tmp = await srv.bdpaGetComboNovedad()
            this.comboNovedadConsulta = tmp.filter(obj => validos.indexOf(obj.id) >= 0)
            
            
        },
        async procesarNovedad() {
            console.log("insumos novedad",this.datosEnteGestor)
            let laNovedad = {};
            this.showMensajeExito = false;
            this.showMensajeError = false;
            this.showBtn = true
            this.swLoad = true

            laNovedad.tipo_documento = this.datosEnteGestor.search.tipo_documento;
            laNovedad.numero_documento = this.datosEnteGestor.persona.ci.trim();
            laNovedad.complemento_documento = this.datosEnteGestor.persona.complemento_documento
            laNovedad.fecha_nacimiento = this.datosEnteGestor.persona.fecha_nacimiento
            laNovedad.codigo_entidad = this.datosEnteGestor.codigo_entidad;
            laNovedad.tipo_asegurado = this.datosEnteGestor.tipo_asegurado
            const [dd, mm, yyyy] = this.datosEnteGestor.estado.fecha_afiliacion.split('/')
            laNovedad.fecha_inicio = `${yyyy}-${mm}-${dd}`
            laNovedad.detalleNovedad = this.registro.detalle_novedad;
            laNovedad.tipo_motivo = this.registro.motivo_novedad;
            laNovedad.idAfiliadoEnteGestor = this.datosEnteGestor.idAfiliadoEnteGestor


            
            console.log("datos entrada Novedad", laNovedad)

            try {
                let response = await srv.bdpaSaveNovedad(laNovedad);
                console.log('response', response);
                if (response.codigo_respuesta == 100) {
                    this.showMensajeExito = true;
                    this.showMensajeError = false;
                    this.showBtn = false
                    this.registro.mensaje = response.mensaje + '. La Pagina se reacargara en breves segundos.'

                    setTimeout(() => { this.clickReload(this.datosEnteGestor.search) }, 7000)

                } else {
                    this.showMensajeExito = false;
                    this.showMensajeError = true;
                    this.showBtn = true
                    this.registro.mensaje = response.mensaje;
                }
            } catch (error) {
                console.log(error);
                this.showMensajeError = true;
                    this.showBtn = false
                    this.registro.mensaje = 'La operación NO pudo ser procesada con éxito.';
            };


            this.swLoad = false
        },
        confirmarNovedad() {
            if (this.valid) {
                Swal.fire({
                    title: "Esta seguro de registrar la Novedad.",
                    text: "No podra revertir este cambio.",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Aceptar",
                }).then((result) => {
                    if (result.isConfirmed && this.valid) {
                        this.procesarNovedad();
                    }
                });
            }

        },
    },
}
</script>

<style></style>