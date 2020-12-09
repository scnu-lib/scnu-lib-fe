const initState = {clientWidth:0};
const globalConfigReducer = (state:object = initState,action: object)=>{
    switch(action.type){
        case'CHANGE_CLIENTWIDTH':return {...state,clientWidth:action.data};
        default:return state;
    }
}
export const changeClient = (width:number) => {
    return {
        type:'CHANGE_CLIENTWIDTH',
        data:width
    }
}

export default globalConfigReducer;