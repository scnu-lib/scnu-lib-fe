//定期查询、处理未处理的rejectedPromise（未处理拒绝跟踪器）（基于window实现）

const unhandleRejection = () =>{
    const map = new Map()
    window.onunhandledrejection = (event:object) => {
        map.set(event.promise,event.reason)
    }
    window.onrejectionhandled = (event:object)=>{
        map.delete(event.promise)
    }
    setInterval(()=>{
        map.forEach((promise,reason)=>{
            //console.log(reason.message?reason.message:reason)
            promise.catch(err=>console.log(err))

        })
        map.clear()
    },60000)

}

export default unhandleRejection