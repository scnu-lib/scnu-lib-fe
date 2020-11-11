import Myerror from './Myerror';
// http请求返回的错误
class Httperror extends Myerror{
    constructor(status,code){
        super('Http request error status: '+status + code);
        this.status = status;
        this.code = code;
    }
}
export default Httperror