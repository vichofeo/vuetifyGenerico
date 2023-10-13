<template>
<table class="table table-hover table-striped table-responsive" id="divTable">
                 <thead class="thead-dark">
                     <tr>
                         
                         <th scope="col">Tipo Afiliado</th>
                         
                         <th scope="col">Ente Gestor</th>
                         
                         <th scope="col">Tipo Asegurado</th>
                         <th scope="col">Estado</th>
                         <th scope="col">Fecha</th>
                     </tr>
                 </thead>
                 <tbody>
                     <tr v-for="r in registrosEstadoAsegurado">
                         
                         <td>{{ r.categoria}}</td>
                         
                         <td>{{ r.ente_gestor}}</td>
                         
                         <td>{{ tipoAsegurado}}</td>        
                         <td>
                             <CChipColorEstadoVue :datos="r.estado"/>
                         </td>
                         <td>
                            {{getTipoFecha(r.estado)}}
                         </td>

                     </tr>
                 </tbody>
             </table>
</template>
<script>
import CChipColorEstadoVue from './CChipColorEstado.vue';
import * as utils from "@/components/asegurado/utils/varios"
export default {

    props:{
        registrosEstadoAsegurado :{
            type: Array,
default : ()=>[]
        }
    },
    components:{
        CChipColorEstadoVue
    },
    methods :{
        getTipoFecha(obj) {
           
            return utils.getFechaEstadoAfiliado(obj)
        }
    }
}
</script>