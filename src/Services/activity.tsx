import { del, get, post, put } from '@/Utils/request'
import { serverUrl,VolunteerApplicationState } from '@/Utils/config'

export const listactApi = (label:string,page:number=0,size:number = 20) =>{
    return get(`${serverUrl}/activity/activities`,{label,page,size})
}

export const createactApi = (act:object) =>{
    return post(`${serverUrl}/activity/activities`,{...act})
}

export const detailApi = (activityID:number) =>{
    return get(`${serverUrl}/activity/activities/${activityID}`,{activityID})
}

export const changeactApi = (activityID:number,newact:object) =>{
    return put(`${serverUrl}/activity/activities/${activityID}`,{activityID},newact)
}

export const actsignupApi = (activityID:number,userID:number) =>{
    return put(`${serverUrl}/activity/activities/${activityID}/sign-up/${userID}`,{activityID,userID})
}

export const actsigninApi = (activityID:number,userID:number) =>{
    return put(`${serverUrl}/activity/activities/${activityID}/sign-in/${userID}`,{activityID,userID},{userID})
}
export const volsignupApi = (activityID:number,userID:number) =>{
    return put(`${serverUrl}/activity/activities/${activityID}/volunteer/${userID}`,{activityID,userID})
}
export const delvolApi = (activityID:number,userID:number)=>{
    return del(`${serverUrl}/activity/activities/${activityID}/volunteer/${userID}`,{activityID,userID})
}

export const uservolsignupApi = (activityID:number,userID:number,state:VolunteerApplicationState,reason:string)=>{
    return put(`${serverUrl}/activity/activities/${activityID}/volunteer-application/${userID}`,{state,reason})
}