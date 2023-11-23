import {http} from '../api'


export const getReportGral = async(dataIndex)=>{
    const res = await http().get('api/geo/reportgral/'+dataIndex)
    return res.data
}