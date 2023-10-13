//consumo de datos
import {httpSSI} from './api'

//para realizar consultas
//devuelve 
export const getDptos = async ()=>{
    const res =  await httpSSI().get('/dptos/dp')    
    return res.data
}

//devuelve datos por departamento seleccionado
export const getDptosByDpto = async(dpto)=>{
    const res = await httpSSI().get('dptos/dp/'+dpto)
    return res.data
}
//devuelve datos de todas las provincias coordenas
export const getMuns = async ()=>{
    const res =  await httpSSI().get('/dptos/pp')    
    return res.data
}

export const getMunsByDpto= async (dpto) => {
    const res = await httpSSI().get('/dptos/pp/' + dpto)
    return res.data
}

export const getCombox = async (data)=>{
    const res =  await httpSSI().post('/est/cbo', data)    
    return res.data
}

export const getInforHospital= async (data) => {
    //const res = await httpSSI().get('/est/infoh/' + hosp +'/'+gestion)
    const res = await httpSSI().post('/est/infoh', data)
    return res.data
}

//****************************************************** */
export async function getCliente(id) {
    const res = await httpSSI().get("/cliente/" + id)
    return res.data
}

export const registrar = async (datos)=>{
    return httpSSI().post('/beneficiario/ente-gestor', datos)
}

export const baja = async (datos)=>{
return  httpSSI().put('/beneficiario/ente-gestor', datos)
    
}
export const ampliacion = async(datos)=>{
    return httpSSI().put('/beneficiario/ampliacion-fecha', datos)
}

//******************** ADQUISICION DE DATOS PARA CUADROS DE DATOS (std)******** */

export const dataStd = async(datos) =>{
    const res = await httpSSI().post('/est/std', datos)
 return res.data
}

//******************* carga de exceles */
export const cargaT01 = async(datos) =>{
    const res = await httpSSI().post('/c/t1', datos)
 return res.data
}

export const cargaT02 = async(datos) =>{
    const res = await httpSSI().post('/c/t2', datos)
 return res.data
}

export const cargaResult = async() =>{
    const res = await httpSSI().post('/c/r00')
 return res.data
}

export const normalize01 = async(data) =>{
    const res = await httpSSI().post('/c/r01', data)
 return res.data
}

export const normalize02 = async(data) =>{
    const res = await httpSSI().post('/c/r02', data)
 return res.data
}

export const normalize03 = async() =>{
    const res = await httpSSI().post('/c/r03')
 return res.data
}

//************************** loaders XLSX */
export const initialXlsx = async (data) =>{
    const res = await httpSSI().post('loader/initializexlsx', data)
    return res.data
}
export const xlsxLoad = async (data) =>{
    const res = await httpSSI().post('loader/xlsx', data)
    return res.data
}

export const xlsxNormalize = async (data) =>{
    const res = await httpSSI().post('loader/normalize', data)
    return res.data
}

export const xlsxRuesInfo = async (data) =>{
    const res = await httpSSI().post('loader/resumenrues', data)
    return res.data
}
//suprmodrues
export const xlsxSuprModRues = async (data) =>{
    const res = await httpSSI().post('loader/suprmodrues', data)
    return res.data
}

//********************************** ediciones */
export const editGetComboxs = async (data) =>{
    const res = await httpSSI().post('loader/comboMedido', data)
    return res.data
}
export const editGetDataModRues = async (data) =>{
    const res = await httpSSI().post('loader/dataModRues', data)
    return res.data
}

export const editSaveDataModRues = async (data) =>{
    const res = await httpSSI().post('loader/dataModRuesSave', data)
    return res.data
}