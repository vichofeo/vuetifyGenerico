import { http } from "./api";

export const getData = async ()=>{
    const res =  await http().get('/api/hl7')    
    return res.data
}

export const getModules = async ()=>{
    const res =  await http().get('/api/admin/module')    
    return res.data
}