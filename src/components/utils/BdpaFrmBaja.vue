<template>
    <v-container style="max-width: 100%">
        <v-system-bar color="teal lighten-1 white--text" dark>
            FORMULARIO DE BAJA
        </v-system-bar>
        <v-form ref="form" v-model="valid" lazy-validation> 
        <v-row>
            <v-col cols="12" xl="12" lg="12" md="12" sm="12" xs="12">
                <v-row>
                    <v-col cols="6">
                        <v-select v-model="registro.motivo_baja" id="motivo_baja" :items="comboBajaConsulta"
                            item-text="nombre" item-value="sigla" aria-readonly="true" label="Motivo de baja"
                            required :rules="rules" 
                            class="text"></v-select>
                    </v-col>
                    <v-col cols="6">
                        <v-textarea label="Detalle" v-model="registro.detalle_baja" id="detalle_baja" auto-grow outlined
                            rows="2" row-height="25" 
                            required :rules="rules" 
                            class="text" shaped></v-textarea>
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
            <v-btn :disabled="!valid" block color="teal lighten-4" @click="validate" v-if="showBtn">registrar Baja</v-btn>
            <v-btn block color="blue lighten-3" @click="clickReturn(0)" >Cancelar</v-btn>
        </div>
    </v-form>
    </v-container>
</template>

<script>
import * as srvBajaDefinitva from "@/services/InteroperabilidadService";
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
            comboBajaConsulta: [],
            swLoad: false,
            showMensajeExito: false,
            showMensajeError: false,
            showBtn: true,
            registro: { motivo_baja: null, detalle_baja: null, mensaje: null },
            rules: [
            v => !!v || 'Este valor es requerido.',
        ],
        }
    },
    mounted() {
        this.comboMotivoBaja();
        this.valid = false
    },
    methods: {
        validate() {
            this.$refs.form.validate()
            if(this.valid) this.confirmarBaja()
        },
        async comboMotivoBaja() {
            await srvBajaDefinitva.bdpaGetParametricaByConsultasBaja("TIPO_MOTIVO")
                .then((res) => {
                    this.comboBajaConsulta = res.data;
                    console.log('this.comboBajaConsulta', this.comboBajaConsulta);
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        async procesarBaja(item) {
            let bajaTitular = {};
            this.showMensajeExito = false;
            this.showMensajeError = false;
            this.showBtn = true
            console.log('item', item);
            bajaTitular.tipo_documento = 'CI';
            bajaTitular.numero_documento = this.datosEnteGestor.persona.ci.trim();
            const [dd, mm, yyyy] = this.datosEnteGestor.persona.fn.split('-')
            bajaTitular.fecha_nacimiento = this.datosEnteGestor.persona.fn // `${yyyy}-${mm}-${dd}`
            bajaTitular.codigo_entidad = this.datosEnteGestor.codigo_entidad;
            bajaTitular.fecha_fin = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
            bajaTitular.tipo_motivo = this.registro.motivo_baja;
            bajaTitular.descripcion_motivo = this.registro.detalle_baja;

            console.log("datos entrada baja", bajaTitular)
            let response = await srvBajaDefinitva.bdpaBajaDefinitiva(bajaTitular);
            console.log('response', response);
            if (response.codigo_respuesta == 100) {
                this.showMensajeExito = true;
                this.showMensajeError = false;
                this.showBtn = false
                this.registro.mensaje = response.mensaje +'. La Pagina se reacargara en breves segundos.'

                //Baja exitosa, actualiza datos
                //this.actualizarData()
                //this.clickReload(datosEnteGestor.search)
                setTimeout(() => { this.clickReload(this.datosEnteGestor.search) }, 5000)
                
            } else {
                this.showMensajeExito = false;
                this.showMensajeError = true;
                this.showBtn = true
                this.registro.mensaje = response.mensaje;
            }
        },
        confirmarBaja() {
            if(this.valid){
                Swal.fire({
                title: "Esta seguro de realizar la baja de titular? Recuerde tambien que se dará de baja a sus beneficiarios.",
                text: "No podra revertir este cambio.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Aceptar",
            }).then((result) => {
                if (result.isConfirmed && this.valid) {
                    this.procesarBaja();
                }
            });
            }
            
        },
    },
}
</script>

<style></style>