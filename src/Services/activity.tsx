import { get, post, put } from '@/Utils/request'
import { serverUrl } from '@/Utils/config'

export const listactApi = (label:string,page:number=0,size:number = 20) =>{
    return get(`${serverUrl}/activity/activities`,{label,page,size})
}

export const createactApi = (title:string,startTime:Date,endTime:Date,signUpDeadline:Date,maxParticipant:number,location:string,labels:[],details:object) =>{
    return post(`${serverUrl}/activity/activities`,{title,startTime,endTime,signUpDeadline,maxParticipant,location,labels,details})
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

