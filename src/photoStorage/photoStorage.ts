import COS, { UploadBody } from 'cos-js-sdk-v5';
import { getImgCredentials } from '../Services/auth';

export const postPhoto = (
  photo: UploadBody,
  Key: string,
  resolve: Function,
  reject: Function,
  changeLoading: Function,
  type: 'avatar' | 'actPoster',
) => {
  const cos = new COS({
    //从服务器拿临时密钥
    getAuthorization: (options, callback) => {
      getImgCredentials()
        .then(res => {
          console.log(options);
          callback({
            TmpSecretId: res.data.credentials.tmpSecretId,
            TmpSecretKey: res.data.credentials.tmpSecretKey,
            SecurityToken: res.data.credentials.sessionToken,
            // 建议返回服务器时间作为签名的开始时间，避免用户浏览器本地时间偏差过大导致签名错误
            StartTime: res.data.startTime, // 时间戳，单位秒，如：1580000000
            ExpiredTime: res.data.expiredTime, // 时间戳，单位秒，如：1580000900
          });
        })
        .catch(err => {
          reject(err); //只能每次new一个，否则无法显示错误
        });
    },
  });

  cos.putObject(
    {
      Bucket: 'pages-1304363322' /* 必须 */,
      Region: 'ap-guangzhou' /* 存储桶所在地域，必须字段 */,
      Key: `photo/${type}/${Key}` /* 必须 */,
      StorageClass: 'STANDARD',
      Body: photo, // 上传文件对象
      onProgress(progressData) {
        changeLoading(progressData.percent);
      },
    },
    function(err, data) {
      if (err) {
        reject(err);
      }
      resolve(data);
      console.log(err || data);
    },
  );
};

export const getPhoto = (Key: string, type: 'avatar' | 'actPoster') => {
  if (Key === '-1')
    return 'https://pages-1304363322.cos.ap-guangzhou.myqcloud.com/photo/%E4%B8%8B%E8%BD%BD.png';
  // 返回默认上传图片
  const src = `https://pages-1304363322.cos.ap-guangzhou.myqcloud.com/photo/${type}/${Key}`;
  return src;
};

export const delPhoto = (Key: string, type: 'avatar' | 'actPoster') => {
  cos.deleteObject(
    {
      Bucket: 'pages-1304363322' /* 必须 */,
      Region: 'ap-guangzhou' /* 存储桶所在地域，必须字段 */,
      Key: `photo/${type}/${Key}` /* 必须 */,
    },
    function(err, data) {
      console.log(err || data);
    },
  );
};
