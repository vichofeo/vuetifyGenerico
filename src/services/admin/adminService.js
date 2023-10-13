import { http } from "../api";

export const login = async (data)=>{
    const res =  await http().post('/api/login', data)    
    return res.data
}