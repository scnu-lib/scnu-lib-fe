export default function (date:string){
    return date.replace(/-/g,'.').replace('T',' ').replace('Z','').slice(0,-3);
}//处理一下日期格式