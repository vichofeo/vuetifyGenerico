import {http} from '../api'

export const getLgnUser = async()=>{
    const res = await http().post('api/getUsrLgn')
    return res.data
}

export const saveContrasena = async (data)=>{
    
    const res =  await http().put('/api/usr', data)    
    return res.data
}