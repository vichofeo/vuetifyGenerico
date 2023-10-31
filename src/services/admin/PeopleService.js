//consumo de datos
import {http} from '../api'

//para realizar consultas
//devuelve 
export const searchPeople = async (data)=>{
    const res =  await http().post('/api/admin/people', data)    
    return res.data
}

export const getDataCnfcre = async (data)=>{
    const res =  await http().post('/api/admin/getDataConfigCre', data)    
    return res.data
}

export const saveCnfcre = async (data)=>{
    const res =  await http().post('/api/admin/saveConfigCre', data)    
    return res.data
}