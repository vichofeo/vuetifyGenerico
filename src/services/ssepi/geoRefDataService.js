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