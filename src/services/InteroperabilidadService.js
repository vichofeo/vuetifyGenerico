//consumo de datos
import {  http } from '@/services/api'


//para realizar consultas
//GESTORA
export async function gestoraConsultaEmpresas(datos) {
    const callUrl = '/v2/interoperabilidad/gestora/consultaEmpresa'
    const res = await http().post(callUrl, datos);
    
    return res.data
}

export async function gestoraConsultaRentista(datos) {
    const callUrl = '/v2/interoperabilidad/gestora/consultaEstadoFuentePago'
    const res = await http().post(callUrl, datos);    
    return res.data
}



//SEPREC
export async function seprecBusquedaxNit(datos) {
    const callUrl = `/v2/interoperabilidad/seprec/consultaEmpresa/nit`//'/busquedaxNit'    
    const respuesta = await http().post(callUrl, datos)
    return respuesta.data;
}


export async function seprecBusquedaxMatricula(datos) {
    const callUrl = `/v2/interoperabilidad/seprec/consultaEmpresa/matricula`//'/busquedaxMatricula'     
    const respuesta = await http().post(callUrl, datos)
    return respuesta.data;
}

export async function seprecBusquedaRepresentantexMatricula(datos) {
    const callUrl = `/v2/interoperabilidad/seprec/consultaRepresentantesSeprec/matricula` //'/busquedaRepresentantexMatricula'

    const respuesta = await http().post(callUrl, datos)
    return respuesta.data;
}

//ovt
export const ovtConsultaEmpresa = async (datos)=>{  
  const callUrl = '/v2/interoperabilidad/ovt/consultaEmpresas'
  const respuesta = await http().post(callUrl, datos)
  return respuesta.data;
}

export const ovtConsultaEstadoFuentePago = async (datos)=>{    
    const callUrl = '/v2/interoperabilidad/ovt/consultaEstadoFuentePago'
  const respuesta = await http().post(callUrl, datos)
  if(respuesta)
  return respuesta.data;
  else return {finalizado: false, mensaje: "Servicio Inaccesible. Comuniquese con su administrador",}
}

//senasir
export const senasirConsultaEstadoAsegurado = async (datos)=>{   
    const callUrl = '/v2/interoperabilidad/senasir/consultaEstadoAsegurado'
  const respuesta = await http().post(callUrl, datos)
  return respuesta.data;
}

//SEGIP
export const segipConsultaDatosPersona = async (datos)=>{        
    const callUrl = '/v2/interoperabilidad/segip/consultaDatosPersona'
    const respuesta = await http().post(callUrl, datos)
    return respuesta.data;
}

export const segipConsultaCertificadoPersona = async (datos)=>{        
    const callUrl = '/v2/interoperabilidad/segip/consultaCertificadoPersona'
    const respuesta = await http().post(callUrl, datos)
    return respuesta.data;
}

export const segipConsultaConstrastacionDatosPersona = async (datos)=>{    
    const callUrl = '/v2/interoperabilidad/segip/consultaContrastacionDatosPersona'
    const respuesta = await http().post(callUrl, datos)
    return respuesta.data;
}

//BDPA
export const bdpaBuscaPersona = async (datos)=>{    
    const callUrl = '/v1/consultas/buscarPersonasPorCi'
    const respuesta = await http().post(callUrl, datos)
    return respuesta.data;
}

export const bdpaEstadoAfiliado = async (datos)=>{       
    const callUrl = '/v1/consultas/estadoAfiliadoBDPA'
    const respuesta = await http().post(callUrl, datos)    
    return respuesta.data;
}

export const bdpaNovedadEgestorAfiliado = async (datos)=>{       
    const callUrl = '/v1/novedadesEnteGestor/novedadesPorAfiliado'
    const respuesta = await http().post(callUrl, datos)    
    return respuesta.data;
}

export const bdpaBeneficiariosPorTitular = async (datos)=>{    
    const callUrl = '/v1/consultas/beneficiariosPorTitular'
    const respuesta = await http().post(callUrl,datos)
    return respuesta.data
}

export const bdpaTitularPorBeneficiario = async (datos)=>{    
    const callUrl = '/v1/consultas/titularPorBeneficiario'
    const respuesta= await http().post(callUrl,datos);
    return respuesta.data
}
export const bdpafindCertificacion = async (datos)=>{ 
   const callUrl = '/v1/certificacion/findCertificacion'
   const respuesta =  await http().post(callUrl,datos)
   return respuesta.data

}
export const bdpaBajaDefinitiva = async(datos)=>{
    let response={};
    try {
        response =await http().put('/v1/afiliado/baja-definitiva-titular', datos);
        return response.data;
    } catch (error) {
        if(response.codigo_respuesta==503){
            return response.data;
        }else{
            response.mensaje="Ocurrió un problema con el servidor por favor contáctese con su administrador .";
            response.codigo_respuesta=503;
            return response;
        }
        
    }  
    
}

 export const bdpaGetParametricaByConsultasBaja = async(pGrupo)=>{  
    return  await http().get(`/v1/parametricas/getByGrupoConsultasBaja/${pGrupo}` , {});
}

export const validacion = async (datos)=>{  
    return await http().post('/v1/validacion/afiliado',datos); 

}
//bdpa Novedades
export const bdpaGetComboNovedad = async()=>{  
    const url = 'v1/parametricas/getByGrupo/TIPO_NOVEDAD'
    const respuesta =   await http().get(url , {});
    return respuesta.data
}


export const bdpaSaveNovedad = async (datos)=>{ 
    const callUrl = 'v1/novedades/registroNovedadAfiliado'
    const respuesta =  await http().post(callUrl,datos)
    return respuesta.data
 //return await http().post(callUrl,datos)
 }