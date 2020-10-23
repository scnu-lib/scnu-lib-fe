import { get } from '@/Utils/request'
import { serverUrl } from '@/Utils/config'

export const listuserApi = (page:number = 0,size:number = 20)=>{
    return get(`${serverUrl}/account​/accounts/`,{page,size})
}
