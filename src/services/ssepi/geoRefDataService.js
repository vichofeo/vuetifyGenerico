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
    //popr grupo
    const res = await http().get(`api/geo/ssepi/${data.idx}/${data.modelo}`)
    return res.data
}

export const getDataParamEess = async(data)=>{
    const res = await http().get(`api/geo/eess/${data}`)
    return res.data
}

export const getDataParamEessByIdx = async(data)=>{
    //por grupo
    const res = await http().post(`api/geo/eess/get`, data)
    return res.data
}
export const saveDataParamEessByIdx = async(data)=>{
    const res = await http().post(`api/geo/eess`, data)
    return res.data
}

export const saveDataByModel = async(data)=>{
    const res = await http().post(`/api/geo/eess/save`, data)
    return res.data
}
export const getDataByModelIdxEess = async(data)=>{
    //individual 
    const res = await http().get(`api/geo/eess/${data.idx}/${data.modelo}`)
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

//para acreditacion y habilitacion
export const getcbxs =  async(data) =>{
    const res = await http().post(`/api/geo/eess/cbox`, data)
    return res.data
}
export const getcbxsWithData =  async(data) =>{
    const res = await http().post(`/api/geo/eess/cboxAcre`, data)
    return res.data
}