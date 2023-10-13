<template>
    <div>
        <contenedor-search-people :onClick="onClick" :sw-loader="swLoader" :type-alert="typeAlert" :mensaje="mensaje">

            <bdpa-all-data 
            :data-info="dataInfo"             
            :dataSearch="dataSearch"
            :click-reload="onClick"
             v-if="swExistData" />
        </contenedor-search-people>

    </div>
</template>

<script>
import SearchPeopleBox from './SearchPeopleBox.vue'
import { optionsToast } from './toastOptions.js'


import * as srv from "@/services/InteroperabilidadService";



import Loading from './Loading.vue'
import BdpaMaker from './BdpaMaker.vue'
import BdpaAllData from './BdpaAllData.vue'

import ContenedorSearchPeople from './ContenedorSearchPeople.vue';

export default {
    components: {
        SearchPeopleBox,
        Loading,
        BdpaMaker,
        BdpaAllData, ContenedorSearchPeople
    },
    data() {
        return {
            dataInfo: null,
            dataCertificacion: null,
            dataOthers: [],
            dataSearch: [],

            swLoader: false,

            swExistData: false,
            mensaje: null,
            swAlert: false,
            typeAlert: 'success'
        }
    },
    methods: {
        optionSelect(obj) {
            const tmp = this.$store.state.optionsServiceInterOp
            this.$store.dispatch('updateOptionsServiceInterOp', { ...tmp, selected: obj })
            if (this.$store.state.optionsServiceInterOp.selected.value == 'CR') {

            }
        },
        async onClick(datos) {
            this.swLoader = true
            this.dataInfo = null
            this.dataCertificacion = []
            this.dataOthers = []

            this.dataSearch = []

            this.mensaje = null

            
            console.log("datos de entrada", datos)
            
            srv.bdpaBuscaPersona(datos).then(results => {                
               // srv.validacion({data:[datos]}).then(results => {
                this.dataInfo = results
                console.log("bdpa:", this.dataInfo)

                //verifica si hubo respuesta positiva
                if (this.dataInfo[0].error_segip || !this.dataInfo[0].hasOwnProperty('numero_documento')) {
                    this.mensaje = this.dataInfo[0].error_segip ? this.dataInfo[0].error_segip : "No se encontro datos. Por Favor Verifique sus parametros de busqueda."
                    this.mensaje = this.mensaje.replaceAll('null.', '')
                    this.typeAlert = "error"
                    this.swExistData = false                    

                } else {
                    this.swExistData = true
                    this.mensaje = "Busqueda Exitosa."
                    this.typeAlert = "success"

                    //busca certificacion pdf
                    this.dataInfo.map(async (obj, iii) => {
                        const [yyyy, mm, dd] = obj.fecha_nacimiento.split("-")
                        const ddmmyyyy = `${dd}/${mm}/${yyyy}`
                        const datosSearch = {
                            ...datos,
                            numero_documento: `${obj.numero_documento}${obj.complemento_documento != 'NULL' ? '-'+obj.complemento_documento : ''}` ,
                            complemento: obj.complemento_documento != 'NULL' ? obj.complemento_documento : null,
                            fecha_nacimiento: obj.fecha_nacimiento,
                            FechaNacimiento: obj.fecha_nacimiento,
                            fechaNacimiento: ddmmyyyy,
                            index: iii
                        }

                        this.dataSearch.push(datosSearch)
                        
                    

                    })
                    
                }




                this.swLoader = false
            }).catch(e => {
                console.log('error',e)
                this.showError("No se pudo procesar la operación de busqueda. Vuelva a intentarlo y si persiste el error, comuniquese con el Administrador.")
                this.swLoader = false
            })


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
        itemsBread() {
            return [
                { text: 'BDPA', disabled: false, href: "#" },
                { text: this.$store.state.optionsServiceInterOp.selected.title, disabled: true, href: "#" }
            ]

        }
    },


}
</script>
