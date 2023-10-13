<template>
    <div >
        <contenedor-search-emp :onClick="onClick" :sw-loader="swLoader" :type-alert="typeAlert" :mensaje="mensaje">

            <seprec-all-data :datos="dataSeprec" v-if="dataSeprec" />
        </contenedor-search-emp>


    </div>
</template>

<script>

import { optionsToast } from './toastOptions.js'
import * as srv from "@/services/InteroperabilidadService";



import SeprecAllData from './SeprecAllData.vue';



import * as utils from "@/components/asegurado/utils/varios"

import ContenedorSearchEmp from './ContenedorSearchEmp.vue';


export default {
    components: {

        SeprecAllData,
        ContenedorSearchEmp
    },
    data() {
        return {
            dataSeprec: null,
            swLoader: false,
            mensaje: null,

            typeAlert: 'success'
        }
    },
    methods: {


        async onClick(datos) {

            this.swLoader = true
            this.dataSeprec = null
            this.mensaje = null

            //realiza consulta a todos los servicios gestora
            console.log("datos entrada desde SEPREC:", datos)

            const error = []
            let porNit = null
            let porMat = null
            let porRep = null
            try {
                if (datos.tipoEmpresa == 'NIT') {
                    console.log("inicia busqueda por nit")
                    let r = await srv.seprecBusquedaxNit(datos)
                    console.log("nit",r.error)
                    if (!r || r.error == "0001") {
                        this.typeAlert = "error"

                        //this.pauseMessage()
                        error.push("BUSQUEDA POR NIT: Por Favor Verifique sus parametros, por NIT: " + datos.nitEmpresa + ", No se encontro resultados")
                    } else {
                        this.showInfo("Busqueda Exitosa. Total de registros encontrados: " + r.cantidad)
                        porNit = r.detalle.infoNit
                        porMat = []
                        porRep = []
                        for (const key in porNit) {
                            console.log("key::", key)
                            porNit[key].Nit = `${datos.numeroIdentificacion} ----  ${key}`

                            const matricula = porNit[key].IdMatricula

                            r = await srv.seprecBusquedaxMatricula({ matriculaEmpresa: matricula })
                            console.log("matricula",r)
                            if (r.error == "0001") {
                                error.push("BUSQUEDA POR MATRICULA: Por Favor Verifique sus parametros, por MATRICULA: " + matricula + ", No se encontro resultados")
                                porNit[key].infoMatricula = null
                                //porMat.push(null)
                            } else {
                                porNit[key].infoMatricula = r.detalle.infoMatricula
                                //porMat.push(r.detalle.infoMatricula)
                            }

                            r = await srv.seprecBusquedaRepresentantexMatricula({ matriculaEmpresa: matricula })
                            console.log("representantes",r)
                            if (r.error == "0001") {
                                error.push("BUSQUEDA DE REPRESENTANES: Por Favor Verifique sus parametros, por NIT: " + matricula + ", No se encontro resultados")
                                porNit[key].representantes = null
                                //porRep.push(null)
                            } else {
                                //porRep.push(r.detalle.Representantes)
                                //ordena representantes
                                r.detalle.Representantes.Representante.sort((x, y) => y.FecRegistro.localeCompare(x.FecRegistro))
                                r.detalle.Representantes.Representante = r.detalle.Representantes.Representante.map((o, i) => ({ ...o, FecRegistro: utils.parseFechaYMDToSlashDMY(o.FecRegistro), FecDocumento: utils.parseFechaYMDToSlashDMY(o.FecDocumento) }))
                                porNit[key].representantes = r.detalle.Representantes
                            }
                        }
                        this.dataSeprec = porNit.map((o, i) => ({ ...o, idx: i }))//{ xnit: porNit.map((o,i)=>({...o, idx:i})), xmat: porMat, xrep: porRep }
                    }
                } else {
                    console.log("por matricula")
                    let r = await srv.seprecBusquedaxMatricula(datos)
                    console.log("Matricula", r)
                    if (r.error == "0001") {
                        this.typeAlert = "error"
                        //this.pauseMessage()
                        error.push("Por Favor Verifique sus parametros, por MATRICULA: " + datos.numeroIdentificacion + ", No se encontro resultados")
                    } else {
                        this.showInfo("Busqueda Exitosa. Total de registros encontrados: " + r.cantidad)
                        const aux = r.detalle.infoMatricula
                        porNit = [{ IdMatricula: aux.IdMatricula, RazonSocial: aux.RazonSocial, Nit: r.detalle.infoMatricula.Nit, infoMatricula: aux }]
                        //porNit[0] = { ...porNit[0], infoMatricula: aux }
                        //porMat = [aux]

                        r = await srv.seprecBusquedaRepresentantexMatricula(datos)
                        console.log("Representante", r)
                        if (r.error == "0001") {
                            error.push("BUSQUEDA DE REPRESENTANES: Por Favor Verifique sus parametros, por MATRICULA: " + datos.numeroIdentificacion + ", No se encontro resultados")
                            porNit[0].representantes = null
                            //porRep=[null]
                        } else {
                            //porRep = [r.detalle.Representantes]
                            r.detalle.Representantes.Representante.sort((x, y) => y.FecRegistro.localeCompare(x.FecRegistro))
                            r.detalle.Representantes.Representante = r.detalle.Representantes.Representante.map((o, i) => ({ ...o, FecRegistro: utils.parseFechaYMDToSlashDMY(o.FecRegistro), FecDocumento: utils.parseFechaYMDToSlashDMY(o.FecDocumento) }))
                            porNit[0] = { ...porNit[0], representantes: r.detalle.Representantes }
                        }

                        this.dataSeprec = porNit.map((o, i) => ({ ...o, idx: i }))//{ xnit: porNit.map((o,i)=>({...o, idx:i})), xmat: porMat, xrep: porRep }
                    }
                }

                if (error.length > 0)
                    this.mensaje = error.join(". ")
                else {
                    this.typeAlert = 'success'

                    this.mensaje = "Busqueda exitosa"
                }

                this.swLoader = false
            } catch (e) {
                this.swLoader = false
                this.showError("No se pudo procesar la operación de busqueda. Vuelva a intentarlo y si persiste el error, comuniquese con el Administrador." )
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
        typeSearch() {
            return this.$store.state.optionsServiceInterOp.selected.op
        }
    },


}
</script>
