//consumo de datos
import {http} from '../api'


//*************get data configpages */
export const getCnfPage = async()=>{
    const res = await http().get('/api/admin/datamore')
    return res.data
}
//***********dptos-minis */
export const getPais = async (data)=>{    
    const res =  await http().post('/api/admin/pais', data)    
    return res.data
}
export const getDpto = async (data)=>{    
    const res =  await http().post('/api/admin/dpto', data)    
    return res.data
}
export const getMuni = async (data)=>{    
    const res =  await http().post('/api/admin/muni', data)    
    return res.data
}

//--------------- GET DE GESTORES *****
export const getGestores = async (data)=>{    
    const res =  await http().post('/gestores', data)    
    return res.data
}
export const getEstablecimientos = async (data)=>{    
    const res =  await http().post('/establecimientos', data)    
    return res.data
}

//---------------------------------
//devuelve datos por departamento seleccionado
export const getDptosByDpto = async(dpto)=>{
    const res = await http().get('dptos/dp/'+dpto)
    return res.data
}
//devuelve datos de todas las provincias coordenas
export const getMuns = async ()=>{
    const res =  await http().get('/dptos/pp')    
    return res.data
}

export const getMunsByDpto= async (dpto) => {
    const res = await http().get('/dptos/pp/' + dpto)
    return res.data
}



export const getInforHospital= async (hosp) => {
    const res = await http().get('/est/infoh/' + hosp)
    return res.data
}

//****************************************************** */




