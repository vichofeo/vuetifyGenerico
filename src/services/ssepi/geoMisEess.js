import {http} from '../api'

export const getDataMiseess = async()=>{
    const res = await http().get('api/geo/miseess')
    return res.data
}
