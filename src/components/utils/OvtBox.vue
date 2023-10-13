<template>
<!--    <div class="grey lighten-5">-->
    <div >
        <contenedor-search-people :onClick="onClick" :sw-loader="swLoader" :type-alert="typeAlert" :mensaje="mensaje"
            :requeridos="[1, 0, 1]">
            <datos-persona :persona="dataOvt" v-if="dataOvt" :noAvatar="true" />

            <div v-if="dataEmpresa">
                <p> &nbsp;</p>
                <ContenedorCard :title="`Registros (Total: ${dataEmpresa.length})`" color="teal darken-1"
                    icon="mdi-hospital-building">

                    <table-data :headers="headers" :items="dataEmpresa" :opColor="1"/>
                </ContenedorCard>
            </div>
        </contenedor-search-people>
    </div>
</template>

<script>
import SearchPeopleBox from './SearchPeopleBox.vue'
import { optionsToast } from './toastOptions.js'
import * as srv from "@/services/InteroperabilidadService";


import DatosPersona from './DatosPersona.vue';
import DatosOvt from './DatosOvt.vue';

import ContenedorAlert from './ContenedorAlert.vue';
import ContenedorSearchPeople from './ContenedorSearchPeople.vue';
import ContenedorCard from './ContenedorCard.vue'
import TableData from './TableData.vue';



export default {
    components: {
        SearchPeopleBox,

        DatosPersona,
        DatosOvt,
        ContenedorAlert,
        ContenedorSearchPeople, ContenedorCard,
        TableData
    },
    data() {
        return {

            dataOvt: null,
            dataEmpresa: null,

            swLoader: false,
            mensaje: null,
            swAlert: false,
            typeAlert: 'success',

            headers: [{ value: "caja.descripcion", text: "ENTE GESTOR", align:"start" },
            { value: "razonSocial", text: "ENTIDAD EMPLEADORA", align:"start" },
            { value: "nit", text: "NIT", align:"end" },
            { value: "gestion", text: "GESTION", align:"end" },
            { value: "periodo", text: "PERIODO", align:"start" },
            { value: "matriculaComercio", text: "MATRICULA", align:"start" },
                
            ],
            
        }
    },
    methods: {

        async onClick(datos) {
            this.swLoader = true
            this.dataOvt = null
            this.dataEmpresa = null
            this.mensaje = null

            try {
                //realiza consulta a ovt            
                console.log("entrada... OVT", datos)
                const response = await srv.ovtConsultaEstadoFuentePago(datos);
                console.log("respuesta... OVT", response)
                const registros = response //response.data;
                if (registros.finalizado == true) {
                    
                    const aux = registros.datos
                    this.dataOvt = {
                        ...aux,
                        tipo_documento: aux.tipoDocumento,
                        ovt:true,
                        //numero_documento: datos.ci,
                        //complemento_documento: '',
                        primer_apellido: aux.primerApellido,
                        segundo_apellido: aux.segundoApellido,
                        nombres: aux.nombres,
                        fecha_nacimiento: aux.fechaNacimiento,
                        //estado: aux.estadoVerificacion
                    }
                    this.dataEmpresa = aux.empresas.map((o, i) => ({ ...o, idx: i,  matriculaComercio: o.matriculaComercio ? o.matriculaComercio : '-' }))
                    this.mensaje = registros.mensaje
                    this.typeAlert = 'success'

                } else {
                    this.mensaje = registros.mensaje
                    if (this.mensaje.indexOf("date") >= 0) this.mensaje = "Por Favor verifique que la Fecha de nacimiento NO este vacio y sea una fecha valida. Vuelva a Intentarlo."
                    this.typeAlert = 'error'

                }


                this.swLoader = false
            } catch (error) {
                this.showError('No se pudo procesar la operación de busqueda. Vuelva a intentarlo y si persiste el error, comuniquese con el Administrador.')
                this.swLoader = false
            }
        },
        showAdvertencia(mensaje) {
            this.$toast.warning(mensaje, optionsToast)
        },
        showInfo(mensaje) {
            this.$toast.info(mensaje, optionsToast)
        },
        showError(mensaje) {
            this.$toast.error(mensaje, optionsToast)
        },

        
    },




    computed: {

    },


}
</script>
