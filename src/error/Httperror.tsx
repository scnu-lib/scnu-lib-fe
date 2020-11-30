import MyError from './MyError';
// http请求返回的错误
class HttpError extends MyError {
  constructor(status: string, code: string) {
    super('Http request error status: ' + status + code);
    this.status = status;
    this.code = code;
  }
}
export default HttpError;
