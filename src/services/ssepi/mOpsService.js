//consumo de datos
import {http} from '../api'

//consultas para menu lateral
//devuelve 
export const getMenuGeoRef = async (data)=>{
    const res =  await http().get('/api/geo/menu', data)    
    return res.data
}

