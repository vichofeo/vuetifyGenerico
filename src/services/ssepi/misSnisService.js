import {http} from '../api'

export const getDataMysnis = async(data)=>{
    const res = await http().post('api/snis/f301', data)
    return res.data
}
