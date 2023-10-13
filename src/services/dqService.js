import { http } from "./api";

export const listado = async (data)=>{
    const res =  await http().post('/api/dqlist', data)    
    return res.data
}

export const combos = async (data)=>{
    const res =  await http().post('/api/dqcombo', data)    
    return res.data
}

export const registro = async (data)=>{
    const res =  await http().post('/api/dqadd', data)    
    return res.data
}