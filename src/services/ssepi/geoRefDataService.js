import {http} from '../api'


export const getDataLatLngEess = async(dataIndex)=>{
    const res = await http().get('api/geo/ssepi/'+dataIndex)
    return res.data
}

export const postDataLatLngEess = async(data)=>{
    const res = await http().put('api/geo/ssepi',data)
    return res.data
}

export const getDataEess = async(data)=>{
    const res = await http().get(`api/geo/ssepi/${data.idx}/${data.modelo}`)
    return res.data
}

export const getDataParamEess = async(data)=>{
    const res = await http().get(`api/geo/eess/${data}`)
    return res.data
}

//datos para usuario
export const getWeUsers = async ()=>{
    const res = await http().get(`/api/geo/weusers`)
    return res.data
}
//recupera dato seleccionado o buscado
export const getWeUser = async (data)=>{
    const res = await http().get(`/api/geo/weusers/${data}`)
    return res.data
}

export const saveWeUser = async (data)=>{
    const res = await http().post(`/api/geo/weuser`, data)
    return res.data
}