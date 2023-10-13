<template>
    <div>
        <v-row  v-if="computedDataEmpresa" align-content="center" justify="center">
            <v-col cols="12" xs="12" sm="12" md="12" xl="12" lg="12">
                <v-card elevation="2" outlined>
                    <v-card-text>
                        <v-row dense>
                            <v-col class="grow">
                                <div class="font-weight-black" v-if="obj.razonSocial" style="color: rgb(29, 98, 161);">{{ obj.razonSocial.toUpperCase() }}</div>
                                <div class="font-weight-black" v-if="obj.RazonSocial" style="color: rgb(29, 98, 161);">{{ obj.RazonSocial.toUpperCase() }}</div>
                                <v-divider />
                                <v-row>
                                    <v-col :cols="colsNum" xs="12" sm="12" :md="colsNum" :xl="colsNum" :lg="colsNum" >
                                        <div v-if="obj.nit">
                                            <span class="font-weight-bold">NIT: </span> {{ obj.nit }}
                                        </div>
                                        <div v-if="obj.Nit">
                                            <span class="font-weight-bold">NIT: </span> {{ obj.Nit }}
                                        </div>
                                        <div v-if="obj.tipoIdentificacion">
                                            <span class="font-weight-bold">{{ obj.tipoIdentificacion }}: </span> {{ obj.numeroIdentificacion }}
                                        </div>
                                        <div v-if="obj.IdMatricula">
                                            <span class="font-weight-bold">MATRICULA: </span>{{ obj.IdMatricula }}
                                        </div>
                                        <div v-if="obj.matriculaComercio">
                                            <span class="font-weight-bold">MATRICULA: </span>{{ obj.matriculaComercio }}
                                        </div>
                                        <div v-if="obj.estadoVerificacion">
                                            <span class="font-weight-bold">Estado verificacion: </span>{{ obj.estadoVerificacion }}
                                        </div>
                                        <div v-if="obj.descripcion">{{ obj.descripcion }}</div>
                                        <div v-if="obj.empresas">{{ obj.empresas }}</div>

                                        <div  v-if="obj.fechaInscripcion">
                                            <span class="font-weight-bold">Fecha de Inscripcion: </span>{{ obj.fechaInscripcion }}
                                        </div>
                                        <div  v-if="obj.FechaUltRenovacion">
                                            <span class="font-weight-bold">Fecha de la última renovación: </span>{{ obj.FechaUltRenovacion }}
                                        </div>
                                        <div  v-if="obj.FecVigenciaMatricula">
                                            <span class="font-weight-bold">Fecha Vigencia Matricula: </span>{{ obj.FecVigenciaMatricula }}
                                        </div>
                                        <div  v-if="obj.UltGestionRenovada">
                                            <span class="font-weight-bold">Última gestión renovada: </span>{{ obj.UltGestionRenovada }}
                                        </div>
                                        <div  v-if="obj.tipoEmpresa">
                                            <span class="font-weight-bold">Tipo Empresa: </span>{{ obj.tipoEmpresa }}
                                        </div>
                                        <div  v-if="obj.hasOwnProperty('sector')">
                                            <span class="font-weight-bold">Sector: </span>{{ obj.sector? obj.sector : '-S/D-'}}
                                        </div>
                                        <div  v-if="obj.hasOwnProperty('actividadPrincipal')">
                                            <span class="font-weight-bold">Actividad Principal: </span>{{ obj.actividadPrincipal ? obj.actividadPrincipal: '-S/D-' }}
                                        </div>
                                        <div class=" " v-if="obj.direccion">
                                             <span class="font-weight-bold">Direccion: </span> {{ obj.direccion }} 
                                        </div>
                                        <div class="  text-right" v-if="obj.estado">
                                            <span class="font-weight-bold red--text"> {{ obj.estado }} </span>
                                        </div>
                                        
                                    </v-col>
                                    <v-col :cols="colsNum" xs="12" sm="12" :md="colsNum" :xl="colsNum" :lg="colsNum"
                                        v-if="obj.Departamento">
                                        <div  v-if="obj.FechaUltRenovacion">
                                            <span class="font-weight-bold">Departamento: </span>{{ obj.Departamento }}
                                        </div>
                                        <div  v-if="obj.Provincia">
                                            <span class="font-weight-bold">Provincia: </span>{{ obj.Provincia }}
                                        </div>
                                        <div  v-if="obj.Municipio">
                                            <span class="font-weight-bold">Municipio: </span>{{ obj.Municipio }}
                                        </div>
                                        <div  v-if="obj.CalleAv">
                                            <span class="font-weight-bold">Calle/Avenida: </span>{{ obj.CalleAv }}
                                        </div>
                                        <div  v-if="obj.EntreCalles">
                                            <span class="font-weight-bold"> Entre Calles: </span>{{ obj.EntreCalles }} # {{ obj.Nro }}
                                        </div>
                                        <div  v-if="obj.Zona">
                                           <span class="font-weight-bold"> Zona:  </span>{{ obj.Zona }}
                                        </div>
                                        <div  v-if="obj.Edificio">
                                           <span class="font-weight-bold"> Ed:  </span>{{ obj.Edificio }} P. {{ obj.Piso }} Of. {{ obj.NroOficina }}
                                        </div>
                                        <div  v-if="obj.Telefono">
                                           <span class="font-weight-bold"> Telefono  </span>{{ obj.Telefono }} 
                                        </div>
                                        <div  v-if="obj.CorreoElectronico">
                                           <span class="font-weight-bold"> Correo Electronico:  </span><a :href="'mailto:' + obj.CorreoElectronico">{{obj.CorreoElectronico }}</a>
                                        </div>
                                    </v-col>
                                </v-row>
                            </v-col>
                            <!--v-col class="shrink" v-if="!noAvatar">
                                <v-avatar class="profile" color="grey" size="160" tile>
                                    <v-img :src="logoCard" style="background:white;"></v-img>
                                </v-avatar>
                            </!--v-col-->
                        </v-row>
                    </v-card-text>
                    <!--v-card-text-- v-if="obj.Actividad">
                        {{ obj.Actividad }}
                    </!--v-card-text-->
                    <v-card-actions v-if="obj.hasOwnProperty('numeroTrabajadores')">
                        <v-row class="text-left red--text" dense>
                            <v-col class="text-right mr-4 mb-2" tag="strong" cols="5">
                                Numero Trabajadores:
                            </v-col>
                            <v-col>{{ obj.numeroTrabajadores }}</v-col>
                        </v-row>
                        
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
        <v-row v-else>
            No ingreso al componente{{ empresa.mensaje }}
        </v-row>
    </div>
</template>

<script>
import * as utils from "@/components/asegurado/utils/varios"

import OVT from "@/assets/logoOvt.png"
import GESTORA from "@/assets/logoGestora.png"
import SEPREC from "@/assets/logoSeprec.png"
import DEFAULT from "@/assets/logo_asuss.png"

export default {
    components: {},
    props: {
        empresa: { type: Object, default: {} },
        noAvatar: { type: Boolean, default: false }
    },
    data() {
        return {
            obj: null

        }
    },
    computed: {
        computedDataEmpresa() {
            if (this.empresa) {
                this.obj = this.empresa
                //fecha
                this.obj.fechaInscripcion = utils.parseFechaYMDToSlashDMY(this.obj.fechaInscripcion) 
                this.obj.FechaUltRenovacion = utils.parseFechaYMDToSlashDMY(this.obj.FechaUltRenovacion) 
                this.obj.FecVigenciaMatricula = utils.parseFechaYMDToSlashDMY(this.obj.FecVigenciaMatricula) 

                return true

            } else {
                this.obj = null
                return false
            }

        },
        logoCard() {
            const op = this.$store.state.optionsServiceInterOp.selected.op
            let logo = ''
            switch (op) {
                case 'E':
                    logo = OVT
                    break;
                case 'GE':
                    logo = GESTORA
                    break;
                case 'SP':
                    logo = SEPREC
                    break;

                default:
                    logo = DEFAULT
                    break;
            }
            return logo
        },
        colsNum() {
            if (this.obj.Departamento) return 6
            else return 12
        }

    },
    methods: {
        formatDate(date) {
            if(date){
                const [year, month, day] = date.split("-");
                return `${day}/${month}/${year}`;
            }else return null
        },
    },

}
</script>

<style></style>
